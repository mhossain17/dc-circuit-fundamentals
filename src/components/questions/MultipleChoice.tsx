"use client";

import { cn } from "@/lib/utils/cn";
import type { MCQQuestion, MCQAnswer, StudentAnswer } from "@/types/questions";

interface Props {
  question: MCQQuestion;
  index: number;
  answer?: MCQAnswer;
  onAnswer: (a: StudentAnswer) => void;
  readonly?: boolean;
}

export function MultipleChoice({ question, index, answer, onAnswer, readonly }: Props) {
  return (
    <div className="card-surface p-5 space-y-4">
      <div className="flex items-start gap-2">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-redhawks-red text-white text-xs font-bold flex items-center justify-center">{index}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-xs font-eng text-redhawks-gray-400">Multiple Choice</span>
            <span className="text-xs font-eng text-redhawks-gray-400">{question.pointsValue} pt{question.pointsValue !== 1 ? "s" : ""}</span>
          </div>
          <p className="text-sm font-semibold text-redhawks-black dark:text-redhawks-white leading-relaxed">{question.prompt}</p>
        </div>
      </div>

      <div className="space-y-2 pl-8">
        {question.options.map((opt) => {
          const selected = answer?.selectedId === opt.id;
          return (
            <button
              key={opt.id}
              disabled={readonly}
              onClick={() => onAnswer({ type: "mcq", selectedId: opt.id })}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm transition-all border-2",
                selected
                  ? "border-redhawks-red bg-redhawks-red/10 text-redhawks-black dark:text-redhawks-white"
                  : "border-transparent bg-redhawks-gray-50 dark:bg-redhawks-gray-900 text-redhawks-gray-700 dark:text-redhawks-gray-300 hover:border-redhawks-gray-300 dark:hover:border-redhawks-gray-600",
                readonly && "cursor-default"
              )}
            >
              <span className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold",
                selected ? "border-redhawks-red bg-redhawks-red text-white" : "border-redhawks-gray-300 dark:border-redhawks-gray-600"
              )}>
                {selected && "✓"}
              </span>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
