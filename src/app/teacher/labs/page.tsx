"use client";

import { ALL_UNITS } from "@/lib/curriculum/units";
import type { LabMaterial } from "@/types/curriculum";

// Lab materials data by lesson
const LAB_DATA: Record<string, { title: string; materials: LabMaterial[] }[]> = {
  "unit-1-lesson-1": [{
    title: "Electrical Safety Lab",
    materials: [
      { name: "Safety glasses", quantity: "1 pair/student", source: "communal", notes: "ANSI Z87.1 rated" },
      { name: "9V battery", quantity: "1", source: "student_ee_box" },
      { name: "Wire samples (good and damaged)", quantity: "3 each", source: "communal", notes: "Pre-stripped insulation examples" },
      { name: "Fuse samples", quantity: "5", source: "communal", notes: "Various ratings: 100mA, 500mA, 1A, 2A, 5A" },
    ],
  }],
  "unit-4-lesson-4": [{
    title: "Breadboard Circuit Build",
    materials: [
      { name: "Half-size breadboard", quantity: "1", source: "student_ee_box" },
      { name: "9V battery + snap connector", quantity: "1", source: "student_ee_box" },
      { name: "Red LED", quantity: "2", source: "student_ee_box" },
      { name: "330Ω resistor (Orange-Orange-Brown-Gold)", quantity: "3", source: "student_ee_box" },
      { name: "Jumper wires (assorted)", quantity: "10", source: "student_ee_box" },
      { name: "Multimeter", quantity: "1/pair", source: "communal" },
    ],
  }],
  "unit-5-lesson-1": [{
    title: "Multimeter Measurement Lab",
    materials: [
      { name: "Digital multimeter (DMM)", quantity: "1/pair", source: "communal", notes: "Klein MM300 or equivalent" },
      { name: "9V battery", quantity: "1", source: "student_ee_box" },
      { name: "Resistor assortment", quantity: "10 resistors", source: "student_ee_box", notes: "100Ω, 220Ω, 330Ω, 470Ω, 1kΩ (2 each)" },
      { name: "Breadboard", quantity: "1", source: "student_ee_box" },
      { name: "LED", quantity: "2", source: "student_ee_box" },
      { name: "Banana-to-alligator leads", quantity: "2", source: "communal" },
    ],
  }],
  "unit-6-lesson-2": [{
    title: "Current Measurement Lab",
    materials: [
      { name: "Digital multimeter", quantity: "1/pair", source: "communal" },
      { name: "9V battery + connector", quantity: "1", source: "student_ee_box" },
      { name: "330Ω, 470Ω resistors", quantity: "2 each", source: "student_ee_box" },
      { name: "LED (red)", quantity: "2", source: "student_ee_box" },
      { name: "Breadboard + jumpers", quantity: "1", source: "student_ee_box" },
    ],
  }],
  "unit-7-lesson-1": [{
    title: "Ohm's Law Verification Lab",
    materials: [
      { name: "Variable power supply (0-12V DC)", quantity: "1/pair", source: "communal", notes: "Or use 1.5V, 3V, 6V, 9V batteries" },
      { name: "Resistors: 100Ω, 220Ω, 470Ω, 1kΩ", quantity: "2 each", source: "student_ee_box" },
      { name: "Multimeter", quantity: "1/pair", source: "communal" },
      { name: "Breadboard + jumpers", quantity: "1", source: "student_ee_box" },
      { name: "Graph paper", quantity: "2 sheets", source: "communal" },
    ],
  }],
  "unit-8-lesson-1": [{
    title: "Series Circuit KVL Lab",
    materials: [
      { name: "9V battery + connector", quantity: "1", source: "student_ee_box" },
      { name: "Resistors: 330Ω, 470Ω, 680Ω", quantity: "2 each", source: "student_ee_box" },
      { name: "Multimeter", quantity: "1/pair", source: "communal" },
      { name: "Breadboard + jumpers", quantity: "1", source: "student_ee_box" },
      { name: "Lab worksheet (printed)", quantity: "1", source: "communal" },
    ],
  }],
  "unit-9-lesson-1": [{
    title: "Soldering Fundamentals",
    materials: [
      { name: "Soldering station (25-40W, adjustable)", quantity: "1/pair", source: "communal", notes: "Weller WE1010NA or equivalent" },
      { name: "60/40 rosin-core solder (0.031\")", quantity: "1 roll/class", source: "communal" },
      { name: "Solder wick / desoldering braid", quantity: "1 spool", source: "communal" },
      { name: "Wet sponge or brass tip cleaner", quantity: "1/station", source: "communal" },
      { name: "PCB practice board (through-hole)", quantity: "1", source: "student_ee_box" },
      { name: "Resistor assortment (for practice joints)", quantity: "10", source: "student_ee_box" },
      { name: "Safety glasses", quantity: "1/student", source: "communal", notes: "Required throughout soldering activities" },
      { name: "Lead-free flux pen", quantity: "1/pair", source: "communal" },
    ],
  }],
  "unit-10-lesson-1": [{
    title: "Parallel Circuit KCL Lab",
    materials: [
      { name: "9V battery + connector", quantity: "1", source: "student_ee_box" },
      { name: "Resistors: 330Ω, 470Ω, 1kΩ", quantity: "2 each", source: "student_ee_box" },
      { name: "Multimeter", quantity: "1/pair", source: "communal" },
      { name: "Breadboard + jumpers", quantity: "1", source: "student_ee_box" },
    ],
  }],
};

function MaterialTable({ materials, source }: { materials: LabMaterial[]; source: "student_ee_box" | "communal" }) {
  const filtered = materials.filter((m) => m.source === source);
  if (filtered.length === 0) return null;

  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="text-left text-redhawks-gray-400">
          <th className="pb-1 font-eng">Material</th>
          <th className="pb-1 font-eng">Qty</th>
          <th className="pb-1 font-eng">Notes</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-redhawks-gray-100 dark:divide-redhawks-gray-800">
        {filtered.map((m, i) => (
          <tr key={i}>
            <td className="py-1.5 text-redhawks-black dark:text-redhawks-white">{m.name}</td>
            <td className="py-1.5 text-redhawks-gray-500 font-eng">{m.quantity}</td>
            <td className="py-1.5 text-redhawks-gray-400 italic">{m.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function TeacherLabsPage() {
  const allLessons = ALL_UNITS.flatMap((u) => u.lessons);
  const labLessons = allLessons.filter((l) => LAB_DATA[l.id]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-redhawks-black dark:text-redhawks-white">Lab Materials</h1>
          <p className="text-sm text-redhawks-gray-400 mt-1">Per-lab breakdown: student EE box vs communal supplies.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-xs font-eng rounded-lg border border-redhawks-gray-300 dark:border-redhawks-gray-700 hover:border-redhawks-gray-500 transition-colors"
        >
          Print Materials List
        </button>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs font-eng">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-redhawks-red" />
          <span className="text-redhawks-gray-500">Student EE Box</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="text-redhawks-gray-500">Communal Supplies</span>
        </div>
      </div>

      <div className="space-y-6">
        {labLessons.map((lesson) => {
          const labs = LAB_DATA[lesson.id] ?? [];
          return (
            <div key={lesson.id} className="rounded-xl border border-redhawks-gray-200 dark:border-redhawks-gray-700 overflow-hidden">
              <div className="px-5 py-3 bg-redhawks-gray-50 dark:bg-redhawks-gray-900">
                <p className="text-xs font-eng text-redhawks-gray-400">{lesson.number}</p>
                <p className="font-semibold text-redhawks-black dark:text-redhawks-white">{lesson.title}</p>
              </div>
              {labs.map((lab, i) => (
                <div key={i} className="px-5 py-4 space-y-4">
                  <p className="text-sm font-semibold text-redhawks-black dark:text-redhawks-white">{lab.title}</p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-redhawks-red" />
                        <p className="text-xs font-eng font-bold text-redhawks-gray-500 uppercase tracking-wider">Student EE Box</p>
                      </div>
                      <MaterialTable materials={lab.materials} source="student_ee_box" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <p className="text-xs font-eng font-bold text-redhawks-gray-500 uppercase tracking-wider">Communal Supplies</p>
                      </div>
                      <MaterialTable materials={lab.materials} source="communal" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
