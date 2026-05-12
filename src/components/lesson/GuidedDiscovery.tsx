"use client";

import { useState } from "react";
import { Search, Lightbulb } from "lucide-react";
import type { Lesson } from "@/types/curriculum";

interface Props {
  lesson: Lesson;
  completedSteps: string[];
  onToggleStep: (id: string) => void;
}

export function GuidedDiscovery({ lesson, completedSteps, onToggleStep }: Props) {
  const [showHints, setShowHints] = useState<Set<string>>(new Set());

  const toggleHint = (id: string) => {
    setShowHints((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const total = lesson.guidedDiscoverySteps.length;

  return (
    <div className="section-reveal space-y-5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-redhawks-red" />
          <h2 className="text-xl font-bold text-redhawks-black dark:text-redhawks-white">Guided Discovery</h2>
        </div>
        {total > 0 && (
          <span className={`text-xs font-eng font-bold px-2.5 py-1 rounded-full ${
            completedSteps.length >= total
              ? "bg-circuit-lime/15 text-circuit-lime"
              : "bg-amber-500/15 text-amber-500"
          }`}>
            {completedSteps.length}/{total} steps done
          </span>
        )}
      </div>
      <p className="text-sm text-redhawks-gray-500 dark:text-redhawks-gray-400">
        Check off each step as you complete it. <strong className="text-redhawks-black dark:text-redhawks-white">All steps must be done before you can move on.</strong>
      </p>

      <div className="space-y-4">
        {lesson.guidedDiscoverySteps.map((step, i) => {
          const done = completedSteps.includes(step.id);
          const hintVisible = showHints.has(step.id);

          return (
            <div key={step.id} className={`card-surface p-5 transition-all ${done ? "border-l-4 border-l-circuit-lime opacity-75" : "border-l-4 border-l-redhawks-gray-200 dark:border-l-redhawks-gray-700"}`}>
              <div className="flex items-start gap-3">
                <button
                  onClick={() => onToggleStep(step.id)}
                  className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${done ? "bg-circuit-lime border-circuit-lime" : "border-redhawks-gray-300 dark:border-redhawks-gray-600 hover:border-circuit-lime"}`}
                  aria-label={done ? "Mark incomplete" : "Mark complete"}
                >
                  {done && <span className="text-black text-sm font-bold">✓</span>}
                  {!done && <span className="text-xs font-bold text-redhawks-gray-400">{i + 1}</span>}
                </button>

                <div className="flex-1">
                  <p className={`text-sm leading-relaxed ${done ? "line-through text-redhawks-gray-400" : "text-redhawks-black dark:text-redhawks-white"}`}>
                    {step.instruction}
                  </p>

                  {step.hint && (
                    <div className="mt-3">
                      <button
                        onClick={() => toggleHint(step.id)}
                        className="flex items-center gap-1.5 text-xs text-circuit-lime hover:text-circuit-lime-dim transition-colors"
                      >
                        <Lightbulb className="w-3 h-3" />
                        {hintVisible ? "Hide hint" : "Show hint"}
                      </button>
                      {hintVisible && (
                        <div className="mt-2 px-3 py-2 bg-circuit-lime/10 border border-circuit-lime/30 rounded-lg">
                          <p className="text-xs text-redhawks-gray-700 dark:text-redhawks-gray-300 italic">{step.hint}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
