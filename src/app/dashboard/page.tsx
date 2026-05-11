"use client";

import Link from "next/link";
import { CircuitBackground } from "@/components/design-system/PcbTrace";
import { ProgressBar } from "@/components/design-system/ProgressBar";
import { ALL_UNITS } from "@/lib/curriculum";
import { Zap, ChevronRight, BookOpen, FlaskConical } from "lucide-react";
import { useEffect, useState } from "react";

function getLessonProgress(lessonId: string): "not-started" | "in-progress" | "complete" {
  if (typeof window === "undefined") return "not-started";
  const raw = localStorage.getItem(`rvs82t:progress:${lessonId}`);
  if (!raw) return "not-started";
  try {
    const data = JSON.parse(raw);
    if (data.completedAt) return "complete";
    if (data.stage) return "in-progress";
  } catch { /* */ }
  return "not-started";
}

function getUnitProgress(unitId: string): number {
  const unit = ALL_UNITS.find((u) => u.id === unitId);
  if (!unit || unit.lessons.length === 0) return 0;
  const complete = unit.lessons.filter((l) => getLessonProgress(l.id) === "complete").length;
  return Math.round((complete / unit.lessons.length) * 100);
}

export default function DashboardPage() {
  const [, setTick] = useState(0);

  useEffect(() => {
    setTick(1); // force re-render after mount to read localStorage
  }, []);

  return (
    <div className="relative min-h-screen">
      <CircuitBackground />

      {/* Hero */}
      <div className="relative z-10 pt-12 pb-8 px-4 text-center">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-circuit-lime/10 border border-circuit-lime/30 text-circuit-lime text-xs font-eng font-semibold tracking-wider">
          <Zap className="w-3 h-3" fill="currentColor" />
          RVS82T · FALL 2026
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-redhawks-black dark:text-redhawks-white mb-2">
          DC Circuit Fundamentals
        </h1>
        <p className="text-redhawks-gray-500 dark:text-redhawks-gray-400 text-sm max-w-lg mx-auto">
          Mr. Hossain · High School for Construction Trades, Engineering & Architecture
        </p>

        {/* Stats row */}
        <div className="mt-6 flex items-center justify-center gap-6 flex-wrap">
          <div className="text-center">
            <p className="text-2xl font-bold font-eng text-circuit-lime">{ALL_UNITS.length}</p>
            <p className="text-xs text-redhawks-gray-500 dark:text-redhawks-gray-400">Units</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold font-eng text-redhawks-red">{ALL_UNITS.flatMap((u) => u.lessons).length}</p>
            <p className="text-xs text-redhawks-gray-500 dark:text-redhawks-gray-400">Lessons</p>
          </div>
        </div>
      </div>

      {/* All Units Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_UNITS.map((unit) => {
            const progress = getUnitProgress(unit.id);

            return (
              <Link
                key={unit.id}
                href={`/units/${unit.id}`}
                className="group card-surface p-5 border-l-4 border-redhawks-red hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Unit number + title */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs font-eng font-bold text-redhawks-red mb-0.5">
                      UNIT {unit.number}
                    </p>
                    <h3 className="text-base font-bold text-redhawks-black dark:text-redhawks-white leading-tight">
                      {unit.title}
                    </h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-redhawks-gray-400 group-hover:text-redhawks-red transition-colors mt-0.5 shrink-0" />
                </div>

                {/* Description */}
                <p className="text-xs text-redhawks-gray-500 dark:text-redhawks-gray-400 mb-4 line-clamp-2">
                  {unit.description}
                </p>

                {/* Lesson count + sim indicator */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1 text-xs text-redhawks-gray-500 dark:text-redhawks-gray-400">
                    <BookOpen className="w-3 h-3" />
                    {unit.lessons.length} lesson{unit.lessons.length !== 1 ? "s" : ""}
                  </div>
                  {unit.lessons.some((l) => l.simulationKey) && (
                    <div className="flex items-center gap-1 text-xs text-circuit-lime">
                      <FlaskConical className="w-3 h-3" />
                      Interactive
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                <ProgressBar value={progress} variant="lime" size="sm" />

                {/* CTA */}
                <div className="mt-3">
                  <span className={`text-xs font-semibold ${progress === 0 ? "text-redhawks-red" : progress === 100 ? "text-circuit-lime" : "text-redhawks-gray-500 dark:text-redhawks-gray-400"}`}>
                    {progress === 0 && "Start →"}
                    {progress > 0 && progress < 100 && `Continue (${progress}%)`}
                    {progress === 100 && "✓ Complete"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
