import type { Question } from "./questions";

export type MarkingPeriod = 1 | 2 | 3;

export type SimulationKey =
  | "breadboard"
  | "safety-gallery"
  | "notation-converter"
  | "component-identifier"
  | "multimeter"
  | "resistor-color-code"
  | "ohms-law"
  | "series-circuit"
  | "parallel-circuit"
  | "soldering";

export interface GuidedStep {
  id: string;
  instruction: string;
  hint?: string;
}

export interface ConceptBlock {
  id: string;
  heading: string;
  body: string;
  formula?: string;
  example?: string;
}

export interface ReflectionConfig {
  prompts: string[];
}

export interface Standard {
  code: string;
  framework: "ETA-i EM1" | "NYS CDOS" | "NYS NGLS" | "NOCTI";
  description: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  number: string;
  title: string;
  aim: string;
  swbat: string[];
  whyItMatters: string;
  simulationKey: SimulationKey | null;
  simInteractionThreshold?: number;
  socraticPrompts: string[];
  guidedDiscoverySteps: GuidedStep[];
  conceptReveal: ConceptBlock[];
  questions: Question[];
  reflection: ReflectionConfig;
  standards: string[];
  danielsonIndicators: string[];
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  markingPeriod: MarkingPeriod;
  description: string;
  lessons: Lesson[];
  colorClass?: string;
}

export interface LabMaterial {
  name: string;
  quantity: string;
  source: "student_ee_box" | "communal";
  notes?: string;
}

export interface Lab {
  id: string;
  lessonId: string;
  title: string;
  instructions: string;
  materials: LabMaterial[];
}
