import type {
  Question,
  StudentAnswer,
  GradeResult,
  QuestionGrade,
  MCQAnswer,
  NumericAnswer,
  DragDropAnswer,
  MatchingAnswer,
  MCQQuestion,
  NumericQuestion,
  DragDropQuestion,
  MatchingQuestion,
} from "@/types/questions";

export function autoGrade(
  questions: Question[],
  answers: Record<string, StudentAnswer>
): GradeResult {
  let score = 0;
  let maxScore = 0;
  const results: Record<string, QuestionGrade> = {};

  for (const q of questions) {
    maxScore += q.pointsValue;
    const answer = answers[q.id];

    if (!answer) {
      results[q.id] = { earned: 0, correct: false };
      continue;
    }

    switch (q.type) {
      case "mcq": {
        const a = answer as MCQAnswer;
        const correct = a.selectedId === (q as MCQQuestion).correctOptionId;
        results[q.id] = { earned: correct ? q.pointsValue : 0, correct };
        break;
      }
      case "numeric": {
        const a = answer as NumericAnswer;
        const nq = q as NumericQuestion;
        const studentVal = parseFloat(a.value);
        if (isNaN(studentVal)) {
          results[q.id] = { earned: 0, correct: false };
          break;
        }
        const diff = Math.abs(studentVal - nq.correctValue);
        const within =
          nq.toleranceType === "absolute"
            ? diff <= nq.tolerance
            : nq.correctValue !== 0
            ? diff / Math.abs(nq.correctValue) <= nq.tolerance / 100
            : diff === 0;
        results[q.id] = { earned: within ? q.pointsValue : 0, correct: within };
        break;
      }
      case "drag_drop": {
        const a = answer as DragDropAnswer;
        const dq = q as DragDropQuestion;
        const allCorrect = dq.zones.every(
          (zone) => a.placements[zone.id] === zone.correctItemId
        );
        results[q.id] = { earned: allCorrect ? q.pointsValue : 0, correct: allCorrect };
        break;
      }
      case "matching": {
        const a = answer as MatchingAnswer;
        const mq = q as MatchingQuestion;
        const allCorrect = mq.pairs.every(
          (pair) => a.pairs[pair.id] === pair.right
        );
        results[q.id] = { earned: allCorrect ? q.pointsValue : 0, correct: allCorrect };
        break;
      }
      case "short_response":
      case "prediction":
        results[q.id] = { earned: 0, correct: null, requiresReview: true };
        break;
    }

    score += results[q.id].earned;
  }

  return {
    score,
    maxScore,
    percentage: maxScore > 0 ? (score / maxScore) * 100 : 0,
    results,
  };
}
