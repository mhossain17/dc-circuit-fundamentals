"use client";

import { useState } from "react";
import type { ShortResponseQuestion, ShortAnswer, StudentAnswer } from "@/types/questions";

interface Props {
  question: ShortResponseQuestion;
  index: number;
  answer?: ShortAnswer;
  onAnswer: (a: StudentAnswer) => void;
  readonly?: boolean;
}

export function ShortResponse({ question, index, answer, onAnswer, readonly }: Props) {
  const [text, setText] = useState(answer?.text ?? "");

  return (
    <div className="card-surface p-5 space-y-4">
      <div className="flex items-start gap-2">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-redhawks-red text-white text-xs font-bold flex items-center justify-center">{index}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-xs font-eng text-redhawks-gray-400">Short Response</span>
            <span className="text-xs font-eng text-redhawks-gray-400">{question.pointsValue} pt{question.pointsValue !== 1 ? "s" : ""}</span>
          </div>
          <p className="text-sm font-semibold text-redhawks-black dark:text-redhawks-white leading-relaxed">{question.prompt}</p>
        </div>
      </div>

      <div className="pl-8 space-y-1">
        <textarea
          value={text}
          disabled={readonly}
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value.trim()) onAnswer({ type: "short_response", text: e.target.value });
          }}
          placeholder={question.placeholder}
          rows={4}
          className="w-full px-3 py-2 text-sm border border-[var(--card-border)] rounded-lg bg-[var(--card-bg)] text-redhawks-black dark:text-redhawks-white focus:outline-none focus:ring-2 focus:ring-circuit-lime resize-y disabled:opacity-60"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-redhawks-gray-400 italic">Teacher-reviewed — answer thoroughly.</p>
          <span className="text-xs font-eng text-redhawks-gray-400">{text.length} chars</span>
        </div>
      </div>
    </div>
  );
}
