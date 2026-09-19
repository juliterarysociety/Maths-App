export interface DiagramElement {
  id: string;
  type: string;
  parents: any[];
  attributes?: Record<string, any>;
}

export interface BoardConfig {
  boundingbox?: number[];
  axis?: boolean;
  grid?: boolean;
  showNavigation?: boolean;
  showCopyright?: boolean;
  keepaspectratio?: boolean;
  [key: string]: any;
}

export interface DiagramConfig {
  diagram_id: string;
  board_config: BoardConfig;
  elements: DiagramElement[];
}

export interface ProblemStep {
  id: string;
  step_number: number;
  title: string;
  instruction: string;
  latex_equation: string;
  student_task: string;
  expected_answer: string | string[];
  unit?: string;
  hint: string;
  explanation: string;
  keypad_shortcuts?: string[];
}

export interface ProblemData {
  id: string;
  grade: string;
  topic: string;
  title: string;
  statement: string;
  steps: ProblemStep[];
  diagram_config?: DiagramConfig;
  xpReward: number;
}
