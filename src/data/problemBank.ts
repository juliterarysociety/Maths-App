import { ProblemData } from '../types';

export const trigPythagorasLadder: ProblemData = {
  id: 'class10_right_triangle_abc',
  grade: 'Class 10',
  topic: 'Trigonometry & Pythagoras Theorem',
  title: 'Right Triangle ABC & Trigonometric Ratios',
  statement:
    'In a right triangle ABC, angle B is 90°, AB is 3 cm, and BC is 4 cm. Draw the triangle and solve the following step-by-step questions.',
  xpReward: 60,
  diagram_config: {
    diagram_id: 'right_triangle_abc',
    board_config: {
      boundingbox: [-1, 5, 5, -1],
      axis: true,
      grid: false,
      showNavigation: false,
      showCopyright: false,
      keepaspectratio: true,
    },
    elements: [
      {
        id: 'pB',
        type: 'point',
        parents: [[0, 0]],
        attributes: { name: 'B (0,0)', fixed: true, size: 3, color: '#2563eb' },
      },
      {
        id: 'pA',
        type: 'point',
        parents: [[0, 3]],
        attributes: { name: 'A (0,3)', fixed: true, size: 3, color: '#2563eb' },
      },
      {
        id: 'pC',
        type: 'point',
        parents: [[4, 0]],
        attributes: { name: 'C (4,0)', fixed: true, size: 3, color: '#2563eb' },
      },
      {
        id: 'triABC',
        type: 'polygon',
        parents: ['pA', 'pB', 'pC'],
        attributes: {
          borders: { strokeColor: '#3b82f6', strokeWidth: 2.5 },
          fillColor: '#eff6ff',
          fillOpacity: 0.5,
        },
      },
      {
        id: 'angleB',
        type: 'angle',
        parents: ['pC', 'pB', 'pA'],
        attributes: {
          radius: 0.5,
          fillColor: '#ef4444',
          name: '90°',
          strokeColor: '#dc2626',
        },
      },
    ],
  },
  steps: [
    {
      id: 'step-1',
      step_number: 1,
      title: 'Find Hypotenuse AC',
      instruction:
        'In right triangle ABC with ∠B = 90°, side AB is perpendicular to BC. Apply the Pythagorean Theorem to find the hypotenuse AC.',
      latex_equation: 'AC^2 = AB^2 + BC^2 = 3^2 + 4^2 = 9 + 16 = 25',
      student_task: 'Calculate the exact length of hypotenuse AC (in cm):',
      expected_answer: ['5', '5 cm', '5cm'],
      unit: 'cm',
      hint: 'Take the principal square root of 25: \\sqrt{25} = 5.',
      explanation: 'By Pythagoras Theorem: AC = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5\\text{ cm}.',
      keypad_shortcuts: ['5', '√', 'cm'],
    },
    {
      id: 'step-2',
      step_number: 2,
      title: 'Evaluate sin(C)',
      instruction:
        'For acute angle C at vertex (4,0), side AB (3 cm) is the opposite side and AC (5 cm) is the hypotenuse.',
      latex_equation: '\\sin(C) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}} = \\frac{AB}{AC}',
      student_task: 'Find the value of \\sin(C) as a fraction (e.g. 3/5) or decimal:',
      expected_answer: ['3/5', '0.6', '3 / 5', '.6'],
      hint: 'Substitute AB = 3 and AC = 5 into the ratio \\frac{AB}{AC}.',
      explanation: '\\sin(C) = \\frac{3}{5} = 0.6.',
      keypad_shortcuts: ['3/5', '0.6', '/'],
    },
    {
      id: 'step-3',
      step_number: 3,
      title: 'Evaluate tan(A)',
      instruction:
        'Now look at acute angle A at vertex (0,3). Side BC (4 cm) is the opposite side and side AB (3 cm) is the adjacent side.',
      latex_equation: '\\tan(A) = \\frac{\\text{Opposite}}{\\text{Adjacent}} = \\frac{BC}{AB}',
      student_task: 'What is the value of \\tan(A)?',
      expected_answer: ['4/3', '4 / 3', '1.33', '1.333', '1.34'],
      hint: 'The side opposite to angle A is BC (4 cm), and the adjacent side is AB (3 cm).',
      explanation: '\\tan(A) = \\frac{BC}{AB} = \\frac{4}{3} \\approx 1.33.',
      keypad_shortcuts: ['4/3', '1.33', '/'],
    },
  ],
};

export const quadRootsFactorization: ProblemData = {
  id: 'quad_roots_factorization',
  grade: 'Class 10',
  topic: 'Quadratic Equations',
  title: 'Solving Quadratics by Factorization',
  statement:
    'Solve the quadratic equation x^2 - 5x + 6 = 0 by splitting the middle term to determine its factors and roots.',
  xpReward: 50,
  steps: [
    {
      id: 'quad-factor-1',
      step_number: 1,
      title: 'Splitting the Middle Term',
      instruction:
        'For equation x^2 - 5x + 6 = 0, find two numbers that multiply to +6 and sum to -5. Enter the smaller number of the pair:',
      latex_equation: 'p \\cdot q = 6 \\quad \\text{and} \\quad p + q = -5 \\implies p = -3, \\, q = -2',
      student_task: 'Enter the smaller factor number (e.g. -3):',
      expected_answer: ['-3', '- 3'],
      hint: 'Consider negative factor pairs of 6: (-1)(-6) = 6 and (-2)(-3) = 6. Compare (-2) + (-3) = -5.',
      explanation: 'The factors are -3 and -2, because (-3) * (-2) = 6 and (-3) + (-2) = -5.',
      keypad_shortcuts: ['-3', '-2', '-'],
    },
    {
      id: 'quad-factor-2',
      step_number: 2,
      title: 'Factored Form Representation',
      instruction:
        'Rewrite the quadratic as (x - 2)(x - 3) = 0. By the zero-product property, either (x - 2) = 0 or (x - 3) = 0.',
      latex_equation: '(x - 2)(x - 3) = 0 \\implies x - 2 = 0 \\quad \\text{or} \\quad x - 3 = 0',
      student_task: 'What is the smaller root of the equation?',
      expected_answer: ['2', 'x=2', 'x = 2'],
      hint: 'Set x - 2 = 0 to find the first root.',
      explanation: 'Solving x - 2 = 0 gives x = 2; solving x - 3 = 0 gives x = 3. The smaller root is 2.',
      keypad_shortcuts: ['2', '3', 'x=2'],
    },
    {
      id: 'quad-factor-3',
      step_number: 3,
      title: 'Verify Larger Root',
      instruction:
        'Now solve the second linear factor: x - 3 = 0.',
      latex_equation: 'x - 3 = 0 \\implies x = 3',
      student_task: 'What is the larger root of the quadratic equation?',
      expected_answer: ['3', 'x=3', 'x = 3'],
      hint: 'Add 3 to both sides of x - 3 = 0.',
      explanation: 'The larger root is x = 3. Both roots {2, 3} satisfy 2^2 - 5(2) + 6 = 0 and 3^2 - 5(3) + 6 = 0.',
      keypad_shortcuts: ['3', 'x=3'],
    },
  ],
};

export const quadDiscriminantNature: ProblemData = {
  id: 'quad_discriminant_nature',
  grade: 'Class 10',
  topic: 'Quadratic Equations',
  title: 'Discriminant & Nature of Roots',
  statement:
    'For the quadratic equation 2x^2 - 4x + 2 = 0, calculate the discriminant D = b^2 - 4ac and determine the number of distinct real roots.',
  xpReward: 45,
  steps: [
    {
      id: 'disc-step-1',
      step_number: 1,
      title: 'Calculate Discriminant Value',
      instruction:
        'Identify coefficients a = 2, b = -4, and c = 2. Compute D = b^2 - 4ac.',
      latex_equation: 'D = (-4)^2 - 4(2)(2) = 16 - 16 = 0',
      student_task: 'What is the value of the discriminant D?',
      expected_answer: ['0', 'D=0'],
      hint: '(-4)^2 is 16. 4 * 2 * 2 is also 16.',
      explanation: 'D = 16 - 16 = 0.',
      keypad_shortcuts: ['0', 'D=0'],
    },
    {
      id: 'disc-step-2',
      step_number: 2,
      title: 'Identify Nature of Roots',
      instruction:
        'When D = 0, the quadratic formula x = (-b ± \\sqrt{D}) / 2a yields equal roots. How many distinct real roots does this equation have?',
      latex_equation: 'D = 0 \\implies \\text{Two equal real roots (1 distinct root)}',
      student_task: 'Enter the number of distinct real roots (e.g. 1):',
      expected_answer: ['1', 'one', '1 distinct root'],
      hint: 'Since both roots coincide at x = -b / (2a) = 4 / 4 = 1, there is exactly 1 distinct real root.',
      explanation: 'When D = 0, the equation has two coincident real roots, meaning 1 distinct real root.',
      keypad_shortcuts: ['1', '2', '0'],
    },
  ],
};

export const zeroesPolynomialsGraph: ProblemData = {
  id: 'zeroes_polynomials_graph',
  grade: 'Class 10',
  topic: 'Polynomials',
  title: 'Zeroes of a Linear Polynomial',
  statement:
    'Find the zero of the polynomial p(x) = 2x - 6 and determine where its graph intersects the x-axis.',
  xpReward: 35,
  steps: [
    {
      id: 'zero-step-1',
      step_number: 1,
      title: 'Solve for p(x) = 0',
      instruction:
        'A zero of a polynomial is the value of x for which p(x) = 0. Set 2x - 6 = 0 and solve for x.',
      latex_equation: '2x - 6 = 0 \\implies 2x = 6 \\implies x = 3',
      student_task: 'What is the value of the zero x?',
      expected_answer: ['3', 'x=3', 'x = 3'],
      hint: 'Add 6 to both sides, then divide by 2.',
      explanation: '2x = 6 gives x = 3.',
      keypad_shortcuts: ['3', 'x=3'],
    },
    {
      id: 'zero-step-2',
      step_number: 2,
      title: 'X-Intercept Coordinates',
      instruction:
        'At the x-axis, the y-coordinate is always 0. What is the x-coordinate of the point of intersection (x, 0)?',
      latex_equation: '(x, y) = (3, 0)',
      student_task: 'What is the x-coordinate of the intersection point?',
      expected_answer: ['3'],
      hint: 'The x-intercept occurs where p(x) = y = 0, which corresponds to the zero x = 3.',
      explanation: 'The graph intersects the x-axis at the point (3, 0).',
      keypad_shortcuts: ['3', '0'],
    },
  ],
};

export const arithmeticProgression10th: ProblemData = {
  id: 'arithmetic_progression_10th',
  grade: 'Class 10',
  topic: 'Arithmetic Progressions',
  title: '10th Term of an Arithmetic Progression',
  statement:
    'Given the arithmetic progression 2, 7, 12, 17, ..., find the common difference d and the 10th term a_10 using the general term formula.',
  xpReward: 40,
  steps: [
    {
      id: 'ap-step-1',
      step_number: 1,
      title: 'Determine Common Difference',
      instruction:
        'In AP: 2, 7, 12, ..., the first term is a_1 = 2 and second term is a_2 = 7. Calculate d = a_2 - a_1.',
      latex_equation: 'd = 7 - 2 = 5',
      student_task: 'What is the common difference d?',
      expected_answer: ['5', 'd=5', 'd = 5'],
      hint: 'Subtract the first term (2) from the second term (7).',
      explanation: 'd = 7 - 2 = 5.',
      keypad_shortcuts: ['5', 'd=5'],
    },
    {
      id: 'ap-step-2',
      step_number: 2,
      title: 'Compute 10th Term',
      instruction:
        'Use the n-th term formula: a_n = a + (n - 1)d with a = 2, n = 10, and d = 5.',
      latex_equation: 'a_{10} = 2 + (10 - 1) \\times 5 = 2 + 45 = 47',
      student_task: 'What is the value of the 10th term a_10?',
      expected_answer: ['47', 'a10=47', 'a_10=47'],
      hint: '(10 - 1) * 5 = 9 * 5 = 45. Then add the first term 2.',
      explanation: 'a_{10} = 2 + 45 = 47.',
      keypad_shortcuts: ['47', '45', '+'],
    },
  ],
};

export const class10CircleTangent: ProblemData = {
  id: 'class10_circle_tangent',
  grade: 'Class 10',
  topic: 'Circles & Tangents',
  title: 'Tangent Length from an External Point',
  statement:
    'A circle has center O at (0,0) and radius r = 3 cm. A tangent PT touches the circle at point T(0,3) from external point P(4,3). Find the length of tangent PT.',
  xpReward: 50,
  diagram_config: {
    diagram_id: 'circle_tangent_p',
    board_config: {
      boundingbox: [-2, 5, 6, -2],
      axis: true,
      grid: false,
      showNavigation: false,
      showCopyright: false,
      keepaspectratio: true,
    },
    elements: [
      {
        id: 'pO',
        type: 'point',
        parents: [[0, 0]],
        attributes: { name: 'O (0,0)', fixed: true, size: 3, color: '#1e293b' },
      },
      {
        id: 'circ',
        type: 'circle',
        parents: ['pO', 3],
        attributes: { strokeColor: '#0284c7', strokeWidth: 2, fillColor: '#f0f9ff', fillOpacity: 0.3 },
      },
      {
        id: 'pT',
        type: 'point',
        parents: [[0, 3]],
        attributes: { name: 'T (0,3)', fixed: true, size: 3, color: '#0284c7' },
      },
      {
        id: 'pP',
        type: 'point',
        parents: [[4, 3]],
        attributes: { name: 'P (4,3)', fixed: true, size: 3, color: '#ef4444' },
      },
      {
        id: 'segOT',
        type: 'segment',
        parents: ['pO', 'pT'],
        attributes: { strokeColor: '#0284c7', strokeWidth: 2, dash: 2 },
      },
      {
        id: 'segPT',
        type: 'segment',
        parents: ['pP', 'pT'],
        attributes: { strokeColor: '#16a34a', strokeWidth: 3 },
      },
      {
        id: 'segOP',
        type: 'segment',
        parents: ['pO', 'pP'],
        attributes: { strokeColor: '#64748b', strokeWidth: 1.5, dash: 3 },
      },
    ],
  },
  steps: [
    {
      id: 'tangent-step-1',
      step_number: 1,
      title: 'Radius-Tangent Perpendicularity',
      instruction:
        'By the fundamental Circle Theorem, the tangent at any point of a circle is perpendicular to the radius through the point of contact.',
      latex_equation: '\\angle OTP = 90^\\circ \\implies \\triangle OTP \\text{ is a right triangle}',
      student_task: 'What is the angle between radius OT and tangent line PT in degrees?',
      expected_answer: ['90', '90°', '90 deg', '90 degrees'],
      unit: '°',
      hint: 'Radius meeting tangent at the point of contact forms a right angle.',
      explanation: 'The angle between radius and tangent at point of contact is always 90°.',
      keypad_shortcuts: ['90', '°'],
    },
    {
      id: 'tangent-step-2',
      step_number: 2,
      title: 'Calculate Tangent Length PT',
      instruction:
        'Since T is at (0,3) and P is at (4,3), notice the horizontal segment along y = 3.',
      latex_equation: 'PT = |x_P - x_T| = |4 - 0| = 4\\text{ cm}',
      student_task: 'What is the length of tangent PT in cm?',
      expected_answer: ['4', '4 cm', '4cm'],
      unit: 'cm',
      hint: 'Distance between (0,3) and (4,3) is 4 - 0 = 4.',
      explanation: 'The tangent length PT is 4 cm.',
      keypad_shortcuts: ['4', 'cm'],
    },
  ],
};

export const class11DistanceFormula: ProblemData = {
  id: 'class11_distance_formula',
  grade: 'Class 10',
  topic: 'Coordinate Geometry',
  title: 'Distance Between Two Points',
  statement:
    'Given points P(1, 1) and Q(4, 5) on the Cartesian coordinate plane, find the straight-line distance PQ using the distance formula.',
  xpReward: 50,
  diagram_config: {
    diagram_id: 'distance_formula_pq',
    board_config: {
      boundingbox: [-1, 6, 6, -1],
      axis: true,
      grid: true,
      showNavigation: false,
      showCopyright: false,
      keepaspectratio: true,
    },
    elements: [
      {
        id: 'pP',
        type: 'point',
        parents: [[1, 1]],
        attributes: { name: 'P (1,1)', fixed: true, size: 3, color: '#6366f1' },
      },
      {
        id: 'pQ',
        type: 'point',
        parents: [[4, 5]],
        attributes: { name: 'Q (4,5)', fixed: true, size: 3, color: '#6366f1' },
      },
      {
        id: 'segPQ',
        type: 'segment',
        parents: ['pP', 'pQ'],
        attributes: { strokeColor: '#4f46e5', strokeWidth: 3 },
      },
      {
        id: 'pR',
        type: 'point',
        parents: [[4, 1]],
        attributes: { name: 'R (4,1)', fixed: true, size: 2, color: '#94a3b8' },
      },
      {
        id: 'segPR',
        type: 'segment',
        parents: ['pP', 'pR'],
        attributes: { strokeColor: '#94a3b8', strokeWidth: 1.5, dash: 2 },
      },
      {
        id: 'segQR',
        type: 'segment',
        parents: ['pQ', 'pR'],
        attributes: { strokeColor: '#94a3b8', strokeWidth: 1.5, dash: 2 },
      },
    ],
  },
  steps: [
    {
      id: 'dist-step-1',
      step_number: 1,
      title: 'Compute Coordinate Differences',
      instruction:
        'Calculate horizontal change \\Delta x = x_2 - x_1 and vertical change \\Delta y = y_2 - y_1.',
      latex_equation: '\\Delta x = 4 - 1 = 3, \\quad \\Delta y = 5 - 1 = 4',
      student_task: 'What is \\Delta x^2 + \\Delta y^2?',
      expected_answer: ['25'],
      hint: '3^2 + 4^2 = 9 + 16 = 25.',
      explanation: 'The sum of squared differences is 9 + 16 = 25.',
      keypad_shortcuts: ['25'],
    },
    {
      id: 'dist-step-2',
      step_number: 2,
      title: 'Apply Distance Formula',
      instruction:
        'Take the square root to determine distance d(P, Q).',
      latex_equation: 'd(P, Q) = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} = \\sqrt{25}',
      student_task: 'What is the distance between P and Q?',
      expected_answer: ['5', '5 units'],
      hint: '\\sqrt{25} = 5.',
      explanation: 'The distance d(P, Q) = 5 units.',
      keypad_shortcuts: ['5'],
    },
  ],
};

/**
 * Registry of all available interactive problem sets keyed by problem ID.
 */
export const problemBank: Record<string, ProblemData> = {
  class10_right_triangle_abc: trigPythagorasLadder,
  trig_pythagoras_ladder: trigPythagorasLadder,
  quad_roots_factorization: quadRootsFactorization,
  quad_discriminant_nature: quadDiscriminantNature,
  zeroes_polynomials_graph: zeroesPolynomialsGraph,
  arithmetic_progression_10th: arithmeticProgression10th,
  class10_circle_tangent: class10CircleTangent,
  circle_tangent_external: class10CircleTangent,
  class11_distance_formula: class11DistanceFormula,
};

export const defaultProblem: ProblemData = trigPythagorasLadder;
export const mockProblem: ProblemData = trigPythagorasLadder;

export const sampleProblems: ProblemData[] = [
  trigPythagorasLadder,
  quadRootsFactorization,
  quadDiscriminantNature,
  zeroesPolynomialsGraph,
  arithmeticProgression10th,
  class10CircleTangent,
  class11DistanceFormula,
];

/**
 * Safely resolves a ProblemData from an ID with fallback to the default problem.
 */
export const getProblemById = (problemId?: string): ProblemData => {
  if (!problemId) return defaultProblem;
  return problemBank[problemId] || defaultProblem;
};
