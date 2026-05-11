export type QuestionType =
  | "mcq"
  | "drag_drop"
  | "matching"
  | "short_response"
  | "numeric"
  | "prediction";

interface BaseQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  pointsValue: number;
  danielsonIndicator?: string;
}

export interface MCQQuestion extends BaseQuestion {
  type: "mcq";
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
}

export interface NumericQuestion extends BaseQuestion {
  type: "numeric";
  correctValue: number;
  tolerance: number;
  toleranceType: "absolute" | "percent";
  unit: string;
}

export interface DragDropQuestion extends BaseQuestion {
  type: "drag_drop";
  items: { id: string; label: string }[];
  zones: { id: string; label: string; correctItemId: string }[];
}

export interface MatchingQuestion extends BaseQuestion {
  type: "matching";
  pairs: { id: string; left: string; right: string }[];
}

export interface ShortResponseQuestion extends BaseQuestion {
  type: "short_response";
  placeholder: string;
}

export interface PredictionQuestion extends BaseQuestion {
  type: "prediction";
  revealAfterSimulation: boolean;
  predictionPrompt: string;
}

export type Question =
  | MCQQuestion
  | NumericQuestion
  | DragDropQuestion
  | MatchingQuestion
  | ShortResponseQuestion
  | PredictionQuestion;

/* Answer shapes */
export interface MCQAnswer        { type: "mcq";           selectedId: string }
export interface NumericAnswer    { type: "numeric";       value: string }
export interface DragDropAnswer   { type: "drag_drop";     placements: Record<string, string> } // zoneId → itemId
export interface MatchingAnswer   { type: "matching";      pairs: Record<string, string> }       // leftId → rightId
export interface ShortAnswer      { type: "short_response"; text: string }
export interface PredictionAnswer { type: "prediction";    text: string; revisedAfter?: string }

export type StudentAnswer =
  | MCQAnswer
  | NumericAnswer
  | DragDropAnswer
  | MatchingAnswer
  | ShortAnswer
  | PredictionAnswer;

export interface QuestionGrade {
  earned: number;
  correct: boolean | null;
  requiresReview?: boolean;
}

export interface GradeResult {
  score: number;
  maxScore: number;
  percentage: number;
  results: Record<string, QuestionGrade>;
}
