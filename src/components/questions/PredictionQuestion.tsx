"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { PredictionQuestion as PredictionQ, PredictionAnswer, StudentAnswer } from "@/types/questions";

interface Props {
  question: PredictionQ;
  index: number;
  answer?: PredictionAnswer;
  onAnswer: (a: StudentAnswer) => void;
  readonly?: boolean;
}

export function PredictionQuestion({ question, index, answer, onAnswer, readonly }: Props) {
  const [prediction, setPrediction] = useState(answer?.text ?? "");

  return (
    <div className="card-surface p-5 space-y-4">
      <div className="flex items-start gap-2">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-redhawks-red text-white text-xs font-bold flex items-center justify-center">{index}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-eng text-redhawks-gray-400">Prediction</span>
              {question.revealAfterSimulation && (
                <span className="text-xs font-eng px-1.5 py-0.5 rounded bg-circuit-lime/10 text-circuit-lime border border-circuit-lime/30">
                  Revisit after sim
                </span>
              )}
            </div>
            <span className="text-xs font-eng text-redhawks-gray-400">{question.pointsValue} pt{question.pointsValue !== 1 ? "s" : ""}</span>
          </div>
          <p className="text-sm font-semibold text-redhawks-black dark:text-redhawks-white leading-relaxed">{question.prompt}</p>
        </div>
      </div>

      <div className="pl-8 space-y-3">
        <div className="p-3 rounded-lg border border-circuit-lime/20 bg-circuit-lime/5">
          <p className="text-xs font-eng text-circuit-lime mb-2">Your Prediction:</p>
          <p className="text-sm text-redhawks-gray-600 dark:text-redhawks-gray-400 italic mb-2">{question.predictionPrompt}</p>
          <textarea
            value={prediction}
            disabled={readonly}
            onChange={(e) => {
              setPrediction(e.target.value);
              if (e.target.value.trim()) onAnswer({ type: "prediction", text: e.target.value });
            }}
            placeholder="Write your prediction before running the simulation..."
            rows={3}
            className={cn(
              "w-full px-3 py-2 text-sm border border-[var(--card-border)] rounded-lg bg-[var(--card-bg)]",
              "text-redhawks-black dark:text-redhawks-white focus:outline-none focus:ring-2 focus:ring-circuit-lime resize-y",
              "disabled:opacity-60"
            )}
          />
        </div>
        <p className="text-xs text-redhawks-gray-400 italic">
          Predictions are not graded on correctness — you earn points for making a thoughtful attempt.
        </p>
      </div>
    </div>
  );
}
