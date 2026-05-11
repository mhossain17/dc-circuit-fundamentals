import { Lightbulb } from "lucide-react";
import type { Lesson } from "@/types/curriculum";

export function WhyItMattersSection({ lesson }: { lesson: Lesson }) {
  return (
    <div className="section-reveal space-y-5">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-circuit-lime" />
        <h2 className="text-xl font-bold text-redhawks-black dark:text-redhawks-white">Why It Matters</h2>
      </div>

      <div className="card-surface border-l-4 border-l-circuit-lime p-6">
        <p className="text-redhawks-black dark:text-redhawks-white leading-relaxed whitespace-pre-line">
          {lesson.whyItMatters}
        </p>
      </div>

      <div className="card-surface p-4 bg-redhawks-gray-50 dark:bg-redhawks-gray-900">
        <p className="text-xs font-semibold text-redhawks-gray-600 dark:text-redhawks-gray-400 mb-1.5">
          Before you continue, think about:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-redhawks-gray-600 dark:text-redhawks-gray-400">
          <li>Where have you seen this concept in real life?</li>
          <li>What questions does this raise for you?</li>
          <li>What do you already know that connects to this?</li>
        </ul>
      </div>
    </div>
  );
}
