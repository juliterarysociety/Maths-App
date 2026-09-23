import { ProblemStep } from '../types';

/**
 * Safely evaluates a single token which could be a number, negative number,
 * or a square root expression (e.g. "sqrt(3)", "-sqrt(4)", or "\sqrt{5}").
 */
const parseToken = (token: string): number | null => {
  if (!token) return null;
  let clean = token.trim();

  // Strip wrapping parentheses if present e.g. "(sqrt(3))" or "(-5)"
  if (clean.startsWith('(') && clean.endsWith(')')) {
    clean = clean.slice(1, -1).trim();
  }

  // Handle optional leading negative sign for square roots: e.g. "-sqrt(3)"
  let sign = 1;
  if (clean.startsWith('-')) {
    sign = -1;
    clean = clean.slice(1).trim();
  } else if (clean.startsWith('+')) {
    clean = clean.slice(1).trim();
  }

  // Handle sqrt(x) or \sqrt{x}
  const sqrtMatch = clean.match(/^(?:\\sqrt\{|sqrt\()(\d+(?:\.\d+)?)(?:\}|\))$/);
  if (sqrtMatch) {
    const radicand = parseFloat(sqrtMatch[1]);
    if (isNaN(radicand) || radicand < 0) return null;
    return sign * Math.sqrt(radicand);
  }

  // Handle standard decimal or integer (e.g. "3.14", "5", "0.5")
  if (/^\d+(?:\.\d+)?$/.test(clean)) {
    const val = parseFloat(clean);
    return isNaN(val) ? null : sign * val;
  }

  return null;
};

/**
 * Parses user input or expected strings into numeric floating point values,
 * supporting fractions ("3/5"), square roots ("sqrt(3)/2"), and decimals.
 * Strictly rejects division by zero, malformed fractions, and invalid fallthrough.
 */
export const parseNumericValue = (val: string): number | null => {
  if (!val) return null;
  let clean = val.trim().toLowerCase().replace(/\s+/g, '');
  if (!clean) return null;

  // Normalize LaTeX fractions \frac{a}{b} -> a/b
  clean = clean.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1/$2');

  // Strip common trailing unit suffixes before parsing
  clean = clean.replace(/(cm|m|°|deg|degrees|units)$/g, '').trim();

  // Fraction handling: if a slash is present, it MUST strictly evaluate as a fraction
  if (clean.includes('/')) {
    const parts = clean.split('/');
    if (parts.length !== 2) {
      return null;
    }
    const num = parseToken(parts[0]);
    const den = parseToken(parts[1]);

    // Strictly reject missing tokens or division by zero (den === 0)
    if (num === null || den === null || den === 0) {
      return null;
    }
    return num / den;
  }

  // Single token handling (decimal, integer, or standalone sqrt)
  return parseToken(clean);
};

/**
 * Validates whether student input matches the expected answer or any accepted variants,
 * with tolerance for units, whitespace, case, and numeric fraction/decimal equivalence.
 */
export const validateAnswer = (
  userInput: string,
  expectedOrStep: string | string[] | ProblemStep,
  acceptedAnswers?: string[]
): boolean => {
  if (!userInput || !userInput.trim()) return false;

  const cleanInput = userInput.trim().toLowerCase();

  let expectedList: string[] = [];

  if (typeof expectedOrStep === 'object' && expectedOrStep !== null && 'expected_answer' in expectedOrStep) {
    const exp = expectedOrStep.expected_answer;
    expectedList = Array.isArray(exp) ? exp : [exp];
  } else if (Array.isArray(expectedOrStep)) {
    expectedList = [...expectedOrStep];
  } else {
    expectedList = [expectedOrStep];
  }

  if (acceptedAnswers && acceptedAnswers.length > 0) {
    expectedList = [...expectedList, ...acceptedAnswers];
  }

  // 1. Direct string match (trimmed, lowercased, ignoring unit spaces)
  const directMatch = expectedList.some((exp) => {
    const cleanExp = exp.trim().toLowerCase();
    if (cleanInput === cleanExp) return true;
    // Strip common units like cm, m, °, deg, degrees, units
    const strippedInput = cleanInput.replace(/(cm|m|°|deg|degrees|units|\s)/g, '');
    const strippedExp = cleanExp.replace(/(cm|m|°|deg|degrees|units|\s)/g, '');
    return strippedInput === strippedExp;
  });

  if (directMatch) return true;

  // 2. Numeric equivalence for fractions, square roots, and decimals (e.g. 3/5 == 0.6, sqrt(3)/2 == 0.866)
  const userNum = parseNumericValue(cleanInput);
  if (userNum !== null) {
    for (const exp of expectedList) {
      const expNum = parseNumericValue(exp);
      if (expNum !== null && Math.abs(userNum - expNum) < 0.015) {
        return true;
      }
    }
  }

  return false;
};
