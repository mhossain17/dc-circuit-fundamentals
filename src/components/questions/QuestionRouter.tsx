import type { Question, StudentAnswer } from "@/types/questions";
import { MultipleChoice } from "./MultipleChoice";
import { NumericEntry } from "./NumericEntry";
import { DragAndDrop } from "./DragAndDrop";
import { Matching } from "./Matching";
import { ShortResponse } from "./ShortResponse";
import { PredictionQuestion } from "./PredictionQuestion";

interface Props {
  question: Question;
  index: number;
  answer?: StudentAnswer;
  onAnswer: (answer: StudentAnswer) => void;
  readonly?: boolean;
}

export function QuestionRouter({ question, index, answer, onAnswer, readonly }: Props) {
  const common = { index, readonly };

  switch (question.type) {
    case "mcq":          return <MultipleChoice   question={question} answer={answer as any} onAnswer={onAnswer} {...common} />;
    case "numeric":      return <NumericEntry      question={question} answer={answer as any} onAnswer={onAnswer} {...common} />;
    case "drag_drop":    return <DragAndDrop       question={question} answer={answer as any} onAnswer={onAnswer} {...common} />;
    case "matching":     return <Matching          question={question} answer={answer as any} onAnswer={onAnswer} {...common} />;
    case "short_response": return <ShortResponse  question={question} answer={answer as any} onAnswer={onAnswer} {...common} />;
    case "prediction":   return <PredictionQuestion question={question} answer={answer as any} onAnswer={onAnswer} {...common} />;
    default:             return null;
  }
}
