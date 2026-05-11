"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { MatchingQuestion, MatchingAnswer, StudentAnswer } from "@/types/questions";

interface Props {
  question: MatchingQuestion;
  index: number;
  answer?: MatchingAnswer;
  onAnswer: (a: StudentAnswer) => void;
  readonly?: boolean;
}

export function Matching({ question, index, answer, onAnswer, readonly }: Props) {
  const [pairs, setPairs] = useState<Record<string, string>>(answer?.pairs ?? {});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  const rightOptions = question.pairs.map((p) => p.right);
  const usedRights = Object.values(pairs);

  const handleLeft = (id: string) => {
    if (readonly) return;
    setSelectedLeft(id === selectedLeft ? null : id);
  };

  const handleRight = (right: string) => {
    if (readonly || !selectedLeft) return;
    const newPairs = { ...pairs, [selectedLeft]: right };
    setPairs(newPairs);
    setSelectedLeft(null);
    onAnswer({ type: "matching", pairs: newPairs });
  };

  const clearPair = (leftId: string) => {
    if (readonly) return;
    const newPairs = { ...pairs };
    delete newPairs[leftId];
    setPairs(newPairs);
    onAnswer({ type: "matching", pairs: newPairs });
  };

  return (
    <div className="card-surface p-5 space-y-4">
      <div className="flex items-start gap-2">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-redhawks-red text-white text-xs font-bold flex items-center justify-center">{index}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-xs font-eng text-redhawks-gray-400">Matching</span>
            <span className="text-xs font-eng text-redhawks-gray-400">{question.pointsValue} pts</span>
          </div>
          <p className="text-sm font-semibold text-redhawks-black dark:text-redhawks-white leading-relaxed">{question.prompt}</p>
        </div>
      </div>

      <p className="text-xs text-redhawks-gray-400 pl-8">Click a left item, then click the matching right item to pair them.</p>

      <div className="pl-8 grid grid-cols-2 gap-4">
        {/* Left column */}
        <div className="space-y-2">
          {question.pairs.map((pair) => {
            const matched = pairs[pair.id];
            return (
              <div key={pair.id} className="space-y-1">
                <button
                  disabled={readonly || !!matched}
                  onClick={() => handleLeft(pair.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm border-2 transition-all",
                    selectedLeft === pair.id ? "border-redhawks-red bg-redhawks-red/10" :
                    matched ? "border-circuit-lime/30 bg-circuit-lime/5 cursor-default" :
                    "border-redhawks-gray-200 dark:border-redhawks-gray-700 hover:border-redhawks-red"
                  )}
                >
                  {pair.left}
                </button>
                {matched && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-circuit-lime font-eng">→ {matched}</span>
                    {!readonly && (
                      <button onClick={() => clearPair(pair.id)} className="text-xs text-redhawks-gray-400 hover:text-redhawks-red">✕</button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right column */}
        <div className="space-y-2">
          {rightOptions.map((right) => {
            const used = usedRights.includes(right);
            return (
              <button
                key={right}
                disabled={readonly || used || !selectedLeft}
                onClick={() => handleRight(right)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm border-2 transition-all",
                  used ? "opacity-40 cursor-default border-redhawks-gray-200 dark:border-redhawks-gray-700" :
                  selectedLeft ? "border-redhawks-gray-300 dark:border-redhawks-gray-600 hover:border-circuit-lime hover:bg-circuit-lime/10" :
                  "border-redhawks-gray-200 dark:border-redhawks-gray-700 cursor-default"
                )}
              >
                {right}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
