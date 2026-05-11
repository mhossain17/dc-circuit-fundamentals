import { ALL_UNITS } from "@/lib/curriculum/units";
import { MP_COLORS } from "@/lib/curriculum/units";

// Approximate days per unit based on lesson count + complexity
const UNIT_DAYS: Record<string, number> = {
  "unit-0": 2, "unit-1": 8, "unit-2": 10, "unit-3": 6, "unit-4": 8,
  "unit-5": 6, "unit-6": 8, "unit-7": 6, "unit-8": 8, "unit-9": 6,
  "unit-10": 8, "unit-11": 8,
};

const MP_DATES = {
  1: { label: "Marking Period 1", dates: "Sep 8 – Nov 14, 2026", totalDays: 50 },
  2: { label: "Marking Period 2", dates: "Nov 17, 2026 – Feb 5, 2027", totalDays: 50 },
  3: { label: "Marking Period 3", dates: "Feb 9 – Apr 30, 2027", totalDays: 50 },
};

export default function TeacherPacingPage() {
  const mpGroups: Record<number, typeof ALL_UNITS> = { 1: [], 2: [], 3: [] };
  ALL_UNITS.forEach((unit) => {
    mpGroups[unit.markingPeriod].push(unit);
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-redhawks-black dark:text-redhawks-white">Pacing Guide</h1>
        <p className="text-sm text-redhawks-gray-400 mt-1">DC Circuit Fundamentals · Fall 2026 · Mr. Hossain · HCTEA</p>
      </div>

      {([1, 2, 3] as const).map((mp) => {
        const mpInfo = MP_DATES[mp];
        const units = mpGroups[mp];
        const totalDays = units.reduce((s, u) => s + (UNIT_DAYS[u.id] ?? 5), 0);
        const color = mp === 1 ? "border-redhawks-red" : mp === 2 ? "border-redhawks-red-dark" : "border-redhawks-gray-600";

        return (
          <div key={mp} className={`rounded-xl border-2 ${color} overflow-hidden`}>
            <div className="bg-redhawks-gray-50 dark:bg-redhawks-gray-900 px-5 py-3 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-redhawks-black dark:text-redhawks-white">{mpInfo.label}</h2>
                <p className="text-xs text-redhawks-gray-400 font-eng">{mpInfo.dates}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-eng text-redhawks-gray-400">Est. ~{totalDays} class days</p>
                <p className="text-xs font-eng text-redhawks-gray-400">{units.length} units · {units.reduce((s, u) => s + u.lessons.length, 0)} lessons</p>
              </div>
            </div>

            <div className="divide-y divide-redhawks-gray-100 dark:divide-redhawks-gray-800">
              {units.map((unit) => {
                const days = UNIT_DAYS[unit.id] ?? 5;
                return (
                  <div key={unit.id} className="px-5 py-3 grid grid-cols-[auto_1fr_auto_auto] gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-redhawks-red text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {unit.number}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-redhawks-black dark:text-redhawks-white">{unit.title}</p>
                      <p className="text-xs text-redhawks-gray-400 mt-0.5">{unit.description}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {unit.lessons.map((l) => (
                          <span key={l.id} className="text-xs font-eng text-redhawks-gray-500 bg-redhawks-gray-100 dark:bg-redhawks-gray-800 px-1.5 py-0.5 rounded">
                            {l.number} {l.title}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right text-xs font-eng text-redhawks-gray-400 whitespace-nowrap">
                      {unit.lessons.length} lesson{unit.lessons.length !== 1 ? "s" : ""}
                    </div>
                    <div className="text-right text-xs font-eng text-redhawks-gray-400 whitespace-nowrap">
                      ~{days} days
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Danielson alignment note */}
      <div className="p-4 rounded-xl border border-redhawks-gray-200 dark:border-redhawks-gray-700 bg-[var(--card-bg)]">
        <h3 className="text-sm font-semibold text-redhawks-black dark:text-redhawks-white mb-2">Danielson Framework Alignment</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-redhawks-gray-500">
          {[
            { code: "1e", desc: "Designing coherent instruction" },
            { code: "2b", desc: "Establishing a culture for learning" },
            { code: "2c", desc: "Managing classroom procedures" },
            { code: "3b", desc: "Using questioning & discussion techniques" },
            { code: "3c", desc: "Engaging students in learning" },
            { code: "3d", desc: "Using assessment in instruction" },
          ].map(({ code, desc }) => (
            <div key={code} className="flex items-start gap-2">
              <span className="font-eng font-bold text-redhawks-red flex-shrink-0">{code}</span>
              <span>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
