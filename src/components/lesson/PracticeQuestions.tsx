"use client";

import { ClipboardList } from "lucide-react";
import { QuestionRouter } from "@/components/questions/QuestionRouter";
import type { Lesson } from "@/types/curriculum";
import type { StudentAnswer } from "@/types/questions";

interface Props {
  lesson: Lesson;
  answers: Record<string, StudentAnswer>;
  onAnswer: (questionId: string, answer: StudentAnswer) => void;
}

export function PracticeQuestions({ lesson, answers, onAnswer }: Props) {
  const totalPoints = lesson.questions.reduce((sum, q) => sum + q.pointsValue, 0);
  const answeredCount = lesson.questions.filter((q) => answers[q.id]).length;

  return (
    <div className="section-reveal space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-redhawks-red" />
          <h2 className="text-xl font-bold text-redhawks-black dark:text-redhawks-white">Practice Questions</h2>
        </div>
        <div className="text-xs font-eng text-redhawks-gray-500 dark:text-redhawks-gray-400">
          {answeredCount}/{lesson.questions.length} answered · {totalPoints} pts
        </div>
      </div>

      <p className="text-sm text-redhawks-gray-500 dark:text-redhawks-gray-400">
        Apply what you learned. Your answers will be graded automatically and included in your PDF.
      </p>

      <div className="space-y-6">
        {lesson.questions.map((question, i) => (
          <QuestionRouter
            key={question.id}
            question={question}
            index={i + 1}
            answer={answers[question.id]}
            onAnswer={(ans) => onAnswer(question.id, ans)}
          />
        ))}
      </div>
    </div>
  );
}
