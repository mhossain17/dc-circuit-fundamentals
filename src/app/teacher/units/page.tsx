import { ALL_UNITS } from "@/lib/curriculum/units";
import { SIMULATION_LABELS } from "@/lib/curriculum/index";

export default function TeacherUnitsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-redhawks-black dark:text-redhawks-white">Unit Map</h1>
        <p className="text-sm text-redhawks-gray-400 mt-1">Full curriculum structure with lesson details, simulations, and standards.</p>
      </div>

      <div className="space-y-4">
        {ALL_UNITS.map((unit) => (
          <details key={unit.id} className="group rounded-xl border border-redhawks-gray-200 dark:border-redhawks-gray-700 overflow-hidden">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer bg-redhawks-gray-50 dark:bg-redhawks-gray-900 hover:bg-redhawks-gray-100 dark:hover:bg-redhawks-gray-800 transition-colors list-none">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-redhawks-red text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {unit.number}
                </span>
                <div>
                  <p className="font-semibold text-redhawks-black dark:text-redhawks-white">Unit {unit.number}: {unit.title}</p>
                  <p className="text-xs text-redhawks-gray-400">MP{unit.markingPeriod} · {unit.lessons.length} lessons</p>
                </div>
              </div>
              <span className="text-redhawks-gray-400 group-open:rotate-180 transition-transform text-xs">▼</span>
            </summary>

            <div className="divide-y divide-redhawks-gray-100 dark:divide-redhawks-gray-800">
              {unit.lessons.map((lesson) => (
                <div key={lesson.id} className="px-5 py-4 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-eng text-redhawks-gray-400">{lesson.number}</span>
                        <h3 className="text-sm font-semibold text-redhawks-black dark:text-redhawks-white">{lesson.title}</h3>
                        {lesson.simulationKey && (
                          <span className="text-xs font-eng px-2 py-0.5 rounded-full bg-circuit-lime/10 text-circuit-lime border border-circuit-lime/30">
                            {SIMULATION_LABELS[lesson.simulationKey]}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-redhawks-gray-500 mt-1 italic">{lesson.aim}</p>
                    </div>
                    <div className="text-right text-xs font-eng text-redhawks-gray-400 whitespace-nowrap">
                      {lesson.questions.length} questions
                    </div>
                  </div>

                  {/* SWBAT */}
                  <div>
                    <p className="text-xs font-eng text-redhawks-gray-400 mb-1 uppercase tracking-wider">SWBAT</p>
                    <ul className="space-y-0.5">
                      {lesson.swbat.map((s, i) => (
                        <li key={i} className="text-xs text-redhawks-gray-600 dark:text-redhawks-gray-400 flex items-start gap-1.5">
                          <span className="text-circuit-lime mt-0.5">·</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Standards + Danielson */}
                  <div className="flex flex-wrap gap-1">
                    {lesson.standards.map((s) => (
                      <span key={s} className="text-xs font-eng px-1.5 py-0.5 rounded bg-redhawks-gray-100 dark:bg-redhawks-gray-800 text-redhawks-gray-500">{s}</span>
                    ))}
                    {lesson.danielsonIndicators?.map((d) => (
                      <span key={d} className="text-xs font-eng px-1.5 py-0.5 rounded bg-redhawks-red/10 text-redhawks-red">Danielson {d}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
