"use client";

import { useState } from "react";
import { MessageCircle, ChevronDown } from "lucide-react";
import type { Lesson } from "@/types/curriculum";

export function SocraticPrompts({ lesson }: { lesson: Lesson }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [responses, setResponses] = useState<Record<number, string>>({});

  return (
    <div className="section-reveal space-y-5">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-redhawks-red" />
        <h2 className="text-xl font-bold text-redhawks-black dark:text-redhawks-white">Discussion Questions</h2>
      </div>
      <p className="text-sm text-redhawks-gray-500 dark:text-redhawks-gray-400">
        Think carefully about each question. There may not be one right answer — what matters is your reasoning.
      </p>

      <div className="space-y-3">
        {lesson.socraticPrompts.map((prompt, i) => (
          <div key={i} className="card-surface overflow-hidden">
            <button
              className="w-full flex items-start gap-3 p-4 text-left hover:bg-redhawks-gray-50 dark:hover:bg-redhawks-gray-800 transition-colors"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-redhawks-red text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="flex-1 font-semibold text-redhawks-black dark:text-redhawks-white text-sm leading-relaxed">
                {prompt}
              </p>
              <ChevronDown className={`w-4 h-4 text-redhawks-gray-400 shrink-0 transition-transform mt-0.5 ${openIdx === i ? "rotate-180" : ""}`} />
            </button>

            {openIdx === i && (
              <div className="px-4 pb-4 border-t border-[var(--card-border)]">
                <p className="text-xs text-redhawks-gray-500 dark:text-redhawks-gray-400 mt-3 mb-2">
                  Your thinking (optional — for your own notes):
                </p>
                <textarea
                  value={responses[i] ?? ""}
                  onChange={(e) => setResponses((prev) => ({ ...prev, [i]: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 text-sm bg-redhawks-gray-50 dark:bg-redhawks-gray-900 border border-[var(--card-border)] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-circuit-lime text-redhawks-black dark:text-redhawks-white"
                  placeholder="Write your thinking here..."
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
