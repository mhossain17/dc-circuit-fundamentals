"use client";

import { useState } from "react";
import type { NumericQuestion, NumericAnswer, StudentAnswer } from "@/types/questions";

interface Props {
  question: NumericQuestion;
  index: number;
  answer?: NumericAnswer;
  onAnswer: (a: StudentAnswer) => void;
  readonly?: boolean;
}

export function NumericEntry({ question, index, answer, onAnswer, readonly }: Props) {
  const [local, setLocal] = useState(answer?.value ?? "");

  return (
    <div className="card-surface p-5 space-y-4">
      <div className="flex items-start gap-2">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-redhawks-red text-white text-xs font-bold flex items-center justify-center">{index}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-xs font-eng text-redhawks-gray-400">Numeric Answer</span>
            <span className="text-xs font-eng text-redhawks-gray-400">{question.pointsValue} pt{question.pointsValue !== 1 ? "s" : ""}</span>
          </div>
          <p className="text-sm font-semibold text-redhawks-black dark:text-redhawks-white leading-relaxed">{question.prompt}</p>
        </div>
      </div>

      <div className="pl-8 flex items-center gap-2">
        <input
          type="number"
          step="any"
          value={local}
          disabled={readonly}
          onChange={(e) => {
            setLocal(e.target.value);
            if (e.target.value) onAnswer({ type: "numeric", value: e.target.value });
          }}
          onBlur={() => { if (local) onAnswer({ type: "numeric", value: local }); }}
          className="w-40 px-3 py-2 text-sm font-eng border border-[var(--card-border)] rounded-lg bg-[var(--card-bg)] text-redhawks-black dark:text-redhawks-white focus:outline-none focus:ring-2 focus:ring-circuit-lime"
          placeholder="Enter value"
        />
        {question.unit && (
          <span className="text-sm font-eng text-redhawks-gray-500 dark:text-redhawks-gray-400">{question.unit}</span>
        )}
        <span className="text-xs text-redhawks-gray-400 dark:text-redhawks-gray-500 ml-2">
          (±{question.tolerance}{question.toleranceType === "percent" ? "%" : ` ${question.unit}`} tolerance)
        </span>
      </div>
    </div>
  );
}
