import { CheckCircle2 } from "lucide-react";
import type { Lesson } from "@/types/curriculum";

export function SwbatSection({ lesson }: { lesson: Lesson }) {
  return (
    <div className="section-reveal space-y-5">
      <div>
        <p className="text-xs font-eng font-bold text-circuit-lime uppercase tracking-wider mb-1">Objectives</p>
        <h2 className="text-xl font-bold text-redhawks-black dark:text-redhawks-white">
          Students Will Be Able To (SWBAT)
        </h2>
        <p className="text-sm text-redhawks-gray-500 dark:text-redhawks-gray-400 mt-1">
          By the end of this lesson, you should be able to:
        </p>
      </div>

      <div className="space-y-3">
        {lesson.swbat.map((objective, i) => (
          <div key={i} className="card-surface p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-circuit-lime shrink-0 mt-0.5" />
            <p className="text-redhawks-black dark:text-redhawks-white text-sm leading-relaxed">{objective}</p>
          </div>
        ))}
      </div>

      <div className="card-surface p-4 bg-redhawks-gray-50 dark:bg-redhawks-gray-900">
        <p className="text-xs text-redhawks-gray-500 dark:text-redhawks-gray-400 italic">
          Keep these objectives in mind as you work through the lesson. You&apos;ll revisit them in your reflection.
        </p>
      </div>
    </div>
  );
}
