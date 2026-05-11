import { Target } from "lucide-react";
import { Badge } from "@/components/design-system/Badge";
import type { Lesson } from "@/types/curriculum";

export function AimSection({ lesson }: { lesson: Lesson }) {
  return (
    <div className="section-reveal space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-redhawks-red rounded-lg flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <Badge variant="default" className="mb-2 text-xs">Lesson {lesson.number}</Badge>
          <h1 className="text-2xl sm:text-3xl font-bold text-redhawks-black dark:text-redhawks-white leading-tight">
            {lesson.title}
          </h1>
        </div>
      </div>

      <div className="card-surface border-l-4 border-l-redhawks-red p-6">
        <p className="text-xs font-eng font-bold text-redhawks-red uppercase tracking-wider mb-2">
          Aim / Essential Question
        </p>
        <p className="text-lg font-semibold text-redhawks-black dark:text-redhawks-white leading-relaxed">
          {lesson.aim}
        </p>
      </div>

      <div className="card-surface p-5">
        <p className="text-xs font-eng font-bold text-redhawks-gray-500 dark:text-redhawks-gray-400 uppercase tracking-wider mb-3">
          Standards Alignment
        </p>
        <div className="flex flex-wrap gap-2">
          {lesson.standards.map((code) => (
            <span key={code} className="text-xs px-2 py-0.5 rounded bg-redhawks-gray-100 dark:bg-redhawks-gray-800 text-redhawks-gray-600 dark:text-redhawks-gray-300 font-eng">
              {code}
            </span>
          ))}
          {lesson.danielsonIndicators.map((d) => (
            <span key={d} className="text-xs px-2 py-0.5 rounded bg-circuit-lime/10 text-circuit-lime font-eng border border-circuit-lime/30">
              Danielson {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
