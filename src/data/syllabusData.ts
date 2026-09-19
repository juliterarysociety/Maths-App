export interface LessonNode {
  id: string;
  title: string;
  subtitle: string;
  type: 'lesson' | 'practice' | 'quiz' | 'boss';
  state: 'completed' | 'active' | 'locked';
  stars?: number; // 0 to 3
  xpReward: number;
  problemId?: string;
  bossType?: 'chest' | 'castle';
}

export interface SyllabusUnit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  color: 'emerald' | 'blue' | 'purple' | 'amber';
  badge: string;
  totalLessons: number;
  completedLessons: number;
  nodes: LessonNode[];
}

export const syllabusData: SyllabusUnit[] = [
  {
    id: 'unit-1',
    unitNumber: 1,
    title: 'Unit 1: Quadratic Equations & Polynomials',
    description: 'Master quadratic forms, zeroes, and the discriminant formula',
    color: 'emerald',
    badge: 'Algebra Mastery',
    totalLessons: 5,
    completedLessons: 5,
    nodes: [
      {
        id: 'node-1-1',
        title: 'Zeroes of Polynomials',
        subtitle: 'Geometric representation of zeroes on graph',
        type: 'lesson',
        state: 'completed',
        stars: 3,
        xpReward: 30,
      },
      {
        id: 'node-1-2',
        title: 'Factorization Method',
        subtitle: 'Splitting the middle term of ax² + bx + c',
        type: 'practice',
        state: 'completed',
        stars: 3,
        xpReward: 35,
      },
      {
        id: 'node-1-3',
        title: 'Completing the Square',
        subtitle: 'Derivation of the quadratic root expression',
        type: 'lesson',
        state: 'completed',
        stars: 3,
        xpReward: 40,
      },
      {
        id: 'node-1-4',
        title: 'The Discriminant (b² - 4ac)',
        subtitle: 'Real, equal, and imaginary root criteria',
        type: 'quiz',
        state: 'completed',
        stars: 3,
        xpReward: 45,
      },
      {
        id: 'node-1-5',
        title: 'Castle of Quadratics',
        subtitle: 'Unit 1 Mastery Checkpoint Challenge',
        type: 'boss',
        state: 'completed',
        stars: 3,
        xpReward: 80,
        bossType: 'castle',
      },
    ],
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    title: 'Unit 2: Triangles & Trigonometry',
    description: 'Pythagoras theorem, sin/cos/tan ratios, and geometric constructions',
    color: 'blue',
    badge: 'CBSE Chapter 8 & 9',
    totalLessons: 5,
    completedLessons: 1,
    nodes: [
      {
        id: 'node-2-1',
        title: 'Right-Angled Triangle Essentials',
        subtitle: 'Hypotenuse, opposite, and adjacent sides',
        type: 'lesson',
        state: 'completed',
        stars: 3,
        xpReward: 30,
        problemId: 'class10_right_triangle_abc',
      },
      {
        id: 'node-2-2',
        title: 'Trigonometric Ratios in Triangle ABC',
        subtitle: 'Calculate sin(C), tan(A), and hypotenuse with JSXGraph',
        type: 'practice',
        state: 'active',
        stars: 0,
        xpReward: 60,
        problemId: 'class10_right_triangle_abc',
      },
      {
        id: 'node-2-3',
        title: 'Trig Values for 30°, 45°, 60°',
        subtitle: 'Standard trigonometric values and derivations',
        type: 'lesson',
        state: 'locked',
        stars: 0,
        xpReward: 35,
      },
      {
        id: 'node-2-4',
        title: 'Fundamental Identities',
        subtitle: 'sin²θ + cos²θ = 1 and 1 + tan²θ = sec²θ',
        type: 'quiz',
        state: 'locked',
        stars: 0,
        xpReward: 45,
      },
      {
        id: 'node-2-5',
        title: 'Ancient Temple of Trigonometry',
        subtitle: 'Unit 2 Boss Checkpoint: Heights & Distances',
        type: 'boss',
        state: 'locked',
        stars: 0,
        xpReward: 100,
        bossType: 'chest',
      },
    ],
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    title: 'Unit 3: Circles & Coordinate Geometry',
    description: 'Tangents from an external point and Cartesian distance formula',
    color: 'purple',
    badge: 'CBSE Chapter 7 & 10',
    totalLessons: 5,
    completedLessons: 0,
    nodes: [
      {
        id: 'node-3-1',
        title: 'Tangents to a Circle',
        subtitle: 'Radius perpendicular to tangent at contact point',
        type: 'lesson',
        state: 'locked',
        stars: 0,
        xpReward: 30,
        problemId: 'class10_circle_tangent',
      },
      {
        id: 'node-3-2',
        title: 'Length of External Tangents',
        subtitle: 'Equal tangents theorem with dynamic circle diagram',
        type: 'practice',
        state: 'locked',
        stars: 0,
        xpReward: 50,
        problemId: 'class10_circle_tangent',
      },
      {
        id: 'node-3-3',
        title: 'Cartesian Distance Formula',
        subtitle: 'Pythagorean deduction between P(x₁,y₁) and Q(x₂,y₂)',
        type: 'lesson',
        state: 'locked',
        stars: 0,
        xpReward: 40,
        problemId: 'class11_distance_formula',
      },
      {
        id: 'node-3-4',
        title: 'Section & Midpoint Formula',
        subtitle: 'Internal division of line segments in ratio m:n',
        type: 'quiz',
        state: 'locked',
        stars: 0,
        xpReward: 45,
      },
      {
        id: 'node-3-5',
        title: "Dragon's Lair Grand Exam",
        subtitle: 'Comprehensive Board Exam Style Review Test',
        type: 'boss',
        state: 'locked',
        stars: 0,
        xpReward: 120,
        bossType: 'castle',
      },
    ],
  },
];
