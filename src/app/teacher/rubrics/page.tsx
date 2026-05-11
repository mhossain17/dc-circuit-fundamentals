"use client";

import { ALL_UNITS } from "@/lib/curriculum/units";

const RUBRIC_DIMENSIONS = [
  {
    id: "sim_engagement",
    label: "Simulation Engagement",
    danielson: "3c",
    levels: {
      4: "Student systematically investigates variables, records observations, and articulates cause-effect relationships from simulation data.",
      3: "Student interacts meaningfully with simulation and can describe at least 2 observations linking simulation behavior to circuit theory.",
      2: "Student uses simulation but interactions are superficial; limited connection to underlying concepts.",
      1: "Student does not engage with simulation or interactions do not meet minimum threshold.",
    },
  },
  {
    id: "practice_questions",
    label: "Practice Questions",
    danielson: "3d",
    levels: {
      4: "All questions attempted; numeric answers within tolerance; explanations demonstrate understanding of units and formula application.",
      3: "Most questions attempted with mostly correct answers; minor errors in calculation or unit conversion.",
      2: "Some questions attempted; significant errors suggest partial understanding.",
      1: "Few questions attempted or most answers are incorrect/missing.",
    },
  },
  {
    id: "reflection",
    label: "Reflection Quality",
    danielson: "3b",
    levels: {
      4: "Reflection addresses all prompts with specific references to simulation results or real-world applications. Shows synthesis beyond lesson content.",
      3: "Reflection addresses all prompts with adequate detail and some specific examples from the lesson.",
      2: "Reflection addresses prompts at a surface level; general or vague responses with little specific reference to lesson content.",
      1: "Reflection missing, minimal (< 50 chars), or does not address prompts.",
    },
  },
  {
    id: "prediction",
    label: "Prediction Accuracy & Reasoning",
    danielson: "3b",
    levels: {
      4: "Prediction is scientifically grounded and student explicitly revises prediction after simulation with explanation of why initial prediction was correct/incorrect.",
      3: "Prediction made with some reasoning; post-simulation reflection shows awareness of result.",
      2: "Prediction is a guess without reasoning; or no post-simulation comparison is made.",
      1: "No prediction made or prediction is physically impossible without explanation.",
    },
  },
  {
    id: "lab_procedure",
    label: "Lab / Hands-On Procedure",
    danielson: "2c",
    levels: {
      4: "Student follows safety protocols, works systematically, records neat and accurate data, and cleans up station properly.",
      3: "Student follows most safety protocols and records data with minor omissions.",
      2: "Student needs reminders on safety; data recording is incomplete.",
      1: "Safety violations observed; data not recorded or station left unsecured.",
    },
  },
];

export default function TeacherRubricsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-redhawks-black dark:text-redhawks-white">Assessment Rubrics</h1>
        <p className="text-sm text-redhawks-gray-400 mt-1">4-point holistic rubrics aligned to Danielson Framework domains.</p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-xs font-eng rounded-lg border border-redhawks-gray-300 dark:border-redhawks-gray-700 hover:border-redhawks-gray-500 transition-colors"
        >
          Print Rubrics
        </button>
      </div>

      {/* Rubric tables */}
      <div className="space-y-6">
        {RUBRIC_DIMENSIONS.map((dim) => (
          <div key={dim.id} className="rounded-xl border border-redhawks-gray-200 dark:border-redhawks-gray-700 overflow-hidden">
            <div className="px-5 py-3 bg-redhawks-gray-50 dark:bg-redhawks-gray-900 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-redhawks-black dark:text-redhawks-white">{dim.label}</h3>
                <span className="text-xs font-eng text-redhawks-red">Danielson {dim.danielson}</span>
              </div>
              <span className="text-xs font-eng text-redhawks-gray-400">4-point scale</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-redhawks-gray-100 dark:divide-redhawks-gray-800">
              {([4, 3, 2, 1] as const).map((level) => (
                <div
                  key={level}
                  className={`px-4 py-3 ${level === 4 ? "bg-circuit-lime/5" : level === 1 ? "bg-redhawks-red/5" : ""}`}
                >
                  <div className={`text-lg font-bold mb-1 ${
                    level === 4 ? "text-circuit-lime" :
                    level === 3 ? "text-amber-400" :
                    level === 2 ? "text-amber-600" :
                    "text-redhawks-red"
                  }`}>{level}</div>
                  <p className="text-xs text-redhawks-gray-600 dark:text-redhawks-gray-400 leading-relaxed">{dim.levels[level]}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Scoring guide */}
      <div className="p-5 rounded-xl border border-redhawks-gray-200 dark:border-redhawks-gray-700 space-y-3">
        <h3 className="font-semibold text-redhawks-black dark:text-redhawks-white">Overall Scoring Guide</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          {[
            { range: "18–20", label: "Mastery", color: "text-circuit-lime" },
            { range: "14–17", label: "Proficient", color: "text-amber-400" },
            { range: "10–13", label: "Developing", color: "text-amber-600" },
            { range: "< 10", label: "Beginning", color: "text-redhawks-red" },
          ].map(({ range, label, color }) => (
            <div key={label} className="text-center card-surface p-3 rounded-lg">
              <p className={`font-bold font-eng ${color}`}>{range} pts</p>
              <p className="text-xs text-redhawks-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-redhawks-gray-400">
          Auto-graded questions (MCQ, numeric, matching, drag-drop) score automatically.
          Short response and prediction questions are marked for teacher review (0 pts auto, max restored after review).
        </p>
      </div>

      {/* Lesson-specific question counts */}
      <div className="space-y-2">
        <h3 className="font-semibold text-redhawks-black dark:text-redhawks-white text-sm">Points by Lesson</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {ALL_UNITS.flatMap((u) => u.lessons).map((lesson) => {
            const total = lesson.questions.reduce((s, q) => s + q.pointsValue, 0);
            return (
              <div key={lesson.id} className="flex items-center justify-between px-3 py-2 rounded-lg border border-redhawks-gray-200 dark:border-redhawks-gray-700 text-xs">
                <span className="font-eng text-redhawks-gray-400 mr-2">{lesson.number}</span>
                <span className="flex-1 text-redhawks-black dark:text-redhawks-white truncate">{lesson.title}</span>
                <span className="font-eng font-bold text-redhawks-red ml-2">{total} pts</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
