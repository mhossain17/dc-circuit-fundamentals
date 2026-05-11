"use client";

import { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import type { Lesson } from "@/types/curriculum";

export function ConceptReveal({ lesson }: { lesson: Lesson }) {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <div className="section-reveal space-y-5">
      <div className="flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-circuit-lime" />
        <h2 className="text-xl font-bold text-redhawks-black dark:text-redhawks-white">Concept Reveal</h2>
      </div>
      <p className="text-sm text-redhawks-gray-500 dark:text-redhawks-gray-400">
        Based on your exploration, here's the formal explanation of what you discovered:
      </p>

      <div className="space-y-3">
        {lesson.conceptReveal.map((block, i) => (
          <div key={block.id} className="card-surface overflow-hidden border-l-4 border-l-circuit-lime">
            <button
              className="w-full flex items-center justify-between p-5 text-left hover:bg-redhawks-gray-50 dark:hover:bg-redhawks-gray-800 transition-colors"
              onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
            >
              <h3 className="font-bold text-redhawks-black dark:text-redhawks-white">{block.heading}</h3>
              <ChevronDown className={`w-4 h-4 text-redhawks-gray-400 transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
            </button>

            {openIdx === i && (
              <div className="px-5 pb-5 border-t border-[var(--card-border)] space-y-3">
                <p className="text-sm text-redhawks-black dark:text-redhawks-white leading-relaxed whitespace-pre-line mt-4">
                  {block.body}
                </p>
                {block.formula && (
                  <div className="bg-redhawks-black dark:bg-redhawks-gray-900 rounded-lg p-4">
                    <p className="font-eng text-circuit-lime text-sm whitespace-pre-line text-center">{block.formula}</p>
                  </div>
                )}
                {block.example && (
                  <div className="bg-redhawks-gray-50 dark:bg-redhawks-gray-800 rounded-lg p-4">
                    <p className="text-xs font-semibold text-redhawks-gray-500 dark:text-redhawks-gray-400 mb-1.5">Example:</p>
                    <p className="font-eng text-sm text-redhawks-black dark:text-redhawks-white whitespace-pre-line">{block.example}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
