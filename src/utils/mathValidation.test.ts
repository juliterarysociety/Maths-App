import { describe, it, expect } from 'vitest';
import { parseNumericValue, validateAnswer } from './mathValidation';
import { ProblemStep } from '../types';

describe('parseNumericValue - Standard Inputs', () => {
  it('parses standard integers and decimals', () => {
    expect(parseNumericValue('12')).toBe(12);
    expect(parseNumericValue('3.14')).toBeCloseTo(3.14);
    expect(parseNumericValue('-5')).toBe(-5);
  });

  it('parses valid fractions', () => {
    expect(parseNumericValue('1/2')).toBe(0.5);
    expect(parseNumericValue('3/5')).toBe(0.6);
    expect(parseNumericValue('7/2')).toBe(3.5);
    expect(parseNumericValue('-3/5')).toBeCloseTo(-0.6);
  });

  it('handles invalid numeric strings gracefully', () => {
    expect(parseNumericValue('')).toBeNull();
    expect(parseNumericValue('abc')).toBeNull();
  });
});

describe('parseNumericValue - Division-by-Zero and Malformed Rejection', () => {
  it('strictly returns null for division by zero', () => {
    expect(parseNumericValue('3/0')).toBeNull();
    expect(parseNumericValue('0/0')).toBeNull();
    expect(parseNumericValue('-5/0')).toBeNull();
    expect(parseNumericValue('12/0.0')).toBeNull();
  });

  it('returns null for malformed fractions and multiple slashes', () => {
    expect(parseNumericValue('5/2/3')).toBeNull();
    expect(parseNumericValue('4/abc')).toBeNull();
    expect(parseNumericValue('xyz/2')).toBeNull();
    expect(parseNumericValue('/5')).toBeNull();
    expect(parseNumericValue('5/')).toBeNull();
  });

  it('parses square roots and radical fractions', () => {
    expect(parseNumericValue('sqrt(4)')).toBe(2);
    expect(parseNumericValue('sqrt(9)')).toBe(3);
    expect(parseNumericValue('\\sqrt{16}')).toBe(4);
    expect(parseNumericValue('sqrt(3)/2')).toBeCloseTo(0.866025, 4);
    expect(parseNumericValue('1/sqrt(2)')).toBeCloseTo(0.707106, 4);
  });

  it('parses LaTeX fractions', () => {
    expect(parseNumericValue('\\frac{3}{5}')).toBe(0.6);
    expect(parseNumericValue('\\frac{1}{2}')).toBe(0.5);
  });
});

describe('validateAnswer', () => {
  it('validates direct string matches regardless of whitespace and case', () => {
    expect(validateAnswer('sin(theta)', 'sin(theta)')).toBe(true);
    expect(validateAnswer(' sin(theta) ', 'sin(theta)')).toBe(true);
    expect(validateAnswer('SIN(THETA)', 'sin(theta)')).toBe(true);
  });

  it('validates numeric equivalence between fractions and decimals', () => {
    expect(validateAnswer('0.6', '3/5')).toBe(true);
    expect(validateAnswer('3/5', '0.6')).toBe(true);
    expect(validateAnswer('0.5', '1/2')).toBe(true);
  });

  it('validates radicals and decimal approximations', () => {
    expect(validateAnswer('sqrt(3)/2', '0.866')).toBe(true);
    expect(validateAnswer('0.866', 'sqrt(3)/2')).toBe(true);
  });

  it('never accepts division by zero even if expected answer is 3', () => {
    expect(validateAnswer('3/0', '3')).toBe(false);
    expect(validateAnswer('3/0', '3/0')).toBe(true); // Exact string match only if expected was literally "3/0"
  });

  it('strips common units such as cm, m, degrees', () => {
    expect(validateAnswer('5 cm', '5')).toBe(true);
    expect(validateAnswer('5m', '5 m')).toBe(true);
    expect(validateAnswer('30°', '30 deg')).toBe(true);
  });

  it('validates against a ProblemStep object', () => {
    const mockStep: ProblemStep = {
      id: 'step-1',
      step_number: 1,
      title: 'Hypotenuse calculation',
      instruction: 'Find the hypotenuse',
      latex_equation: 'c^2 = a^2 + b^2',
      student_task: 'Calculate c',
      expected_answer: ['5', '5 cm'],
      hint: '3-4-5 triangle',
      explanation: '9 + 16 = 25',
    };

    expect(validateAnswer('5', mockStep)).toBe(true);
    expect(validateAnswer('5cm', mockStep)).toBe(true);
    expect(validateAnswer('6', mockStep)).toBe(false);
  });

  it('validates accepted alternative answers array', () => {
    expect(validateAnswer('4/5', '0.8', ['4/5', '8/10'])).toBe(true);
    expect(validateAnswer('8/10', '0.8', ['4/5', '8/10'])).toBe(true);
    expect(validateAnswer('9/10', '0.8', ['4/5', '8/10'])).toBe(false);
  });

  it('rejects incorrect answers', () => {
    expect(validateAnswer('1/3', '1/2')).toBe(false);
    expect(validateAnswer('wrong', 'right')).toBe(false);
    expect(validateAnswer('', '5')).toBe(false);
    expect(validateAnswer('   ', '5')).toBe(false);
  });
});
