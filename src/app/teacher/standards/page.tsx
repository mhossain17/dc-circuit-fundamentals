"use client";

import { useState } from "react";
import { ALL_UNITS } from "@/lib/curriculum/units";
import { STANDARDS as ALL_STANDARDS } from "@/lib/curriculum/standards";
import { cn } from "@/lib/utils/cn";

const FRAMEWORKS = ["ETA-i EM1", "NYS CDOS", "NYS NGLS", "NOCTI"] as const;
type Framework = typeof FRAMEWORKS[number];

export default function TeacherStandardsPage() {
  const [filter, setFilter] = useState<Framework | "all">("all");

  const allLessons = ALL_UNITS.flatMap((u) => u.lessons);
  const standards = filter === "all" ? ALL_STANDARDS : ALL_STANDARDS.filter((s) => s.framework === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-redhawks-black dark:text-redhawks-white">Standards Alignment</h1>
        <p className="text-sm text-redhawks-gray-400 mt-1">Lessons × Standards pivot table. Toggle framework to filter.</p>
      </div>

      {/* Framework filter */}
      <div className="flex flex-wrap gap-2">
        {(["all", ...FRAMEWORKS] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as Framework | "all")}
            className={cn(
              "px-3 py-1.5 text-xs font-eng rounded-lg border transition-all",
              filter === f
                ? "border-redhawks-red bg-redhawks-red/10 text-redhawks-red"
                : "border-redhawks-gray-300 dark:border-redhawks-gray-700 hover:border-redhawks-gray-400"
            )}
          >
            {f === "all" ? "All Frameworks" : f}
          </button>
        ))}
      </div>

      {/* Standards list with lessons */}
      <div className="space-y-4">
        {standards.map((std) => {
          const matchingLessons = allLessons.filter((l) => l.standards.includes(std.code));
          const key = `${std.framework}-${std.code}`;
          return (
            <div key={key} className="rounded-xl border border-redhawks-gray-200 dark:border-redhawks-gray-700 overflow-hidden">
              <div className="px-5 py-3 bg-redhawks-gray-50 dark:bg-redhawks-gray-900 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-eng font-bold text-redhawks-red">{std.framework}</span>
                    <span className="text-xs font-eng font-bold text-redhawks-black dark:text-redhawks-white">{std.code}</span>
                  </div>
                  <p className="text-sm text-redhawks-black dark:text-redhawks-white mt-0.5">{std.description}</p>
                </div>
                <span className="text-xs font-eng text-redhawks-gray-400 whitespace-nowrap flex-shrink-0">
                  {matchingLessons.length} lesson{matchingLessons.length !== 1 ? "s" : ""}
                </span>
              </div>
              {matchingLessons.length > 0 && (
                <div className="px-5 py-2 flex flex-wrap gap-1">
                  {matchingLessons.map((l) => (
                    <span key={l.id} className="text-xs font-eng px-2 py-0.5 rounded-full bg-redhawks-gray-100 dark:bg-redhawks-gray-800 text-redhawks-gray-600 dark:text-redhawks-gray-400">
                      {l.number} {l.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pivot print hint */}
      <div className="flex justify-end">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-xs font-eng rounded-lg border border-redhawks-gray-300 dark:border-redhawks-gray-700 hover:border-redhawks-gray-500 transition-colors"
        >
          Print Standards Map
        </button>
      </div>
    </div>
  );
}
