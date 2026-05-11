import Link from "next/link";
import { ALL_UNITS } from "@/lib/curriculum/units";
import { FlaskConical, FileText, ChevronRight } from "lucide-react";

export default function TeacherLessonsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-redhawks-black dark:text-redhawks-white">Lesson Plans</h1>
        <p className="text-sm text-redhawks-gray-400 mt-1">
          Full lesson plans with answer keys, discussion prompts, and standards alignment. Print individually from each lesson.
        </p>
      </div>

      <div className="space-y-8">
        {ALL_UNITS.map((unit) => (
          <section key={unit.id}>
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-xs font-eng font-bold text-redhawks-red uppercase tracking-wider">
                Unit {unit.number} — {unit.title}
              </h2>
              <div className="h-px flex-1 bg-redhawks-gray-200 dark:bg-redhawks-gray-800" />
            </div>

            <div className="space-y-1">
              {unit.lessons.map((lesson) => {
                const totalPts = lesson.questions.reduce((s, q) => s + q.pointsValue, 0);
                const autoTypes = ["mcq", "numeric", "matching", "drag_drop"] as const;
                const autoPts = lesson.questions
                  .filter((q) => autoTypes.includes(q.type as typeof autoTypes[number]))
                  .reduce((s, q) => s + q.pointsValue, 0);

                return (
                  <Link
                    key={lesson.id}
                    href={`/teacher/lessons/${lesson.id}`}
                    className="group flex items-center gap-4 px-4 py-3 rounded-xl border border-redhawks-gray-200 dark:border-redhawks-gray-700 hover:border-redhawks-red hover:bg-redhawks-red/5 transition-all"
                  >
                    <span className="text-xs font-eng font-bold text-redhawks-red w-10 shrink-0">
                      {lesson.number}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-redhawks-black dark:text-redhawks-white truncate">
                        {lesson.title}
                      </p>
                      <p className="text-xs text-redhawks-gray-400 mt-0.5 truncate">{lesson.aim}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {lesson.simulationKey && (
                        <span className="flex items-center gap-1 text-xs text-circuit-lime font-eng">
                          <FlaskConical className="w-3 h-3" />
                          Sim
                        </span>
                      )}
                      <span className="text-xs font-eng text-redhawks-gray-400">
                        {autoPts}/{totalPts} pts auto
                      </span>
                      <span className="text-xs text-redhawks-gray-400">
                        {lesson.standards.length} std
                      </span>
                      <ChevronRight className="w-4 h-4 text-redhawks-gray-400 group-hover:text-redhawks-red transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
