"use client";

import Link from "next/link";
import { CircuitBackground } from "@/components/design-system/PcbTrace";
import { Badge } from "@/components/design-system/Badge";
import { ProgressBar } from "@/components/design-system/ProgressBar";
import { ALL_UNITS } from "@/lib/curriculum";
import { Zap, ChevronRight, BookOpen, FlaskConical } from "lucide-react";
import { useEffect, useState } from "react";
import type { MarkingPeriod } from "@/types/curriculum";

const MP_LABELS: Record<MarkingPeriod, string> = {
  1: "Marking Period 1",
  2: "Marking Period 2",
  3: "Marking Period 3",
};

const MP_THEMES: Record<MarkingPeriod, { border: string; badge: "mp1" | "mp2" | "mp3"; accent: string }> = {
  1: { border: "border-redhawks-red",      badge: "mp1", accent: "text-redhawks-red" },
  2: { border: "border-redhawks-red-dark", badge: "mp2", accent: "text-redhawks-red-dark dark:text-redhawks-red-light" },
  3: { border: "border-redhawks-black dark:border-redhawks-gray-400", badge: "mp3", accent: "text-redhawks-black dark:text-redhawks-gray-300" },
};

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

  const mpGroups = [1, 2, 3] as MarkingPeriod[];

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
          {mpGroups.map((mp) => {
            const units = ALL_UNITS.filter((u) => u.markingPeriod === mp);
            const lessons = units.flatMap((u) => u.lessons);
            return (
              <div key={mp} className="text-center">
                <p className="text-2xl font-bold font-eng text-circuit-lime">{lessons.length}</p>
                <p className="text-xs text-redhawks-gray-500 dark:text-redhawks-gray-400">MP{mp} Lessons</p>
              </div>
            );
          })}
          <div className="text-center">
            <p className="text-2xl font-bold font-eng text-redhawks-red">{ALL_UNITS.flatMap((u) => u.lessons).length}</p>
            <p className="text-xs text-redhawks-gray-500 dark:text-redhawks-gray-400">Total Lessons</p>
          </div>
        </div>
      </div>

      {/* Units by Marking Period */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16 space-y-10">
        {mpGroups.map((mp) => {
          const mpUnits = ALL_UNITS.filter((u) => u.markingPeriod === mp);
          const theme = MP_THEMES[mp];

          return (
            <section key={mp}>
              {/* MP Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`h-px flex-1 bg-gradient-to-r from-transparent to-redhawks-gray-200 dark:to-redhawks-gray-800`} />
                <Badge variant={theme.badge} className="text-xs px-3 py-1">
                  {MP_LABELS[mp]}
                </Badge>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-redhawks-gray-200 dark:to-redhawks-gray-800" />
              </div>

              {/* Unit Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mpUnits.map((unit) => {
                  const progress = getUnitProgress(unit.id);
                  const firstIncomplete = unit.lessons.find((l) => getLessonProgress(l.id) !== "complete");

                  return (
                    <Link
                      key={unit.id}
                      href={`/units/${unit.id}`}
                      className={`group card-surface p-5 border-l-4 ${theme.border} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}
                    >
                      {/* Unit number + title */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className={`text-xs font-eng font-bold ${theme.accent} mb-0.5`}>
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
            </section>
          );
        })}
      </div>
    </div>
  );
}
