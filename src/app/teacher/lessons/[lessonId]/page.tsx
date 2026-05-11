"use client";

import Link from "next/link";
import { ALL_UNITS } from "@/lib/curriculum/units";
import { ChevronLeft, Printer, FlaskConical } from "lucide-react";
import { notFound } from "next/navigation";
import type { Question } from "@/types/questions";

const SIM_NAMES: Record<string, string> = {
  "breadboard":          "Breadboard Builder",
  "safety-gallery":      "Safety Hazard Gallery",
  "notation-converter":  "Notation Converter",
  "component-identifier":"Component Identifier",
  "multimeter":          "Multimeter Simulator",
  "resistor-color-code": "Resistor Color Code Reader",
  "ohms-law":            "Ohm's Law Explorer",
  "series-circuit":      "Series Circuit Builder",
  "parallel-circuit":    "Parallel Circuit Builder",
  "soldering":           "Soldering Simulator",
};

const MP_LABELS: Record<number, string> = { 1: "MP1", 2: "MP2", 3: "MP3" };

const Q_TYPE_LABELS: Record<string, string> = {
  mcq:            "Multiple Choice",
  numeric:        "Numeric",
  matching:       "Matching",
  drag_drop:      "Drag & Drop",
  short_response: "Short Response",
  prediction:     "Prediction",
};

function renderAnswer(q: Question): React.ReactNode {
  switch (q.type) {
    case "mcq": {
      const opt = q.options.find((o) => o.id === q.correctOptionId);
      return (
        <span className="text-circuit-lime font-semibold">
          {opt?.text ?? "—"}
          {q.explanation && (
            <span className="block text-xs text-redhawks-gray-400 font-normal mt-0.5 italic">{q.explanation}</span>
          )}
        </span>
      );
    }
    case "numeric":
      return (
        <span className="text-circuit-lime font-eng font-semibold">
          {q.correctValue} {q.unit}
          <span className="text-redhawks-gray-400 font-normal"> ±{q.tolerance}{q.toleranceType === "percent" ? "%" : ` ${q.unit}`}</span>
        </span>
      );
    case "matching":
      return (
        <ul className="space-y-0.5">
          {q.pairs.map((p) => (
            <li key={p.id} className="text-circuit-lime text-xs font-eng">
              {p.left} → {p.right}
            </li>
          ))}
        </ul>
      );
    case "drag_drop":
      return (
        <ul className="space-y-0.5">
          {q.zones.map((z) => {
            const item = q.items.find((i) => i.id === z.correctItemId);
            return (
              <li key={z.id} className="text-circuit-lime text-xs font-eng">
                {z.label}: {item?.label ?? "—"}
              </li>
            );
          })}
        </ul>
      );
    case "short_response":
    case "prediction":
      return <span className="text-amber-400 italic text-xs">Teacher grades — see rubric</span>;
    default:
      return <span className="text-redhawks-gray-400">—</span>;
  }
}

interface Props {
  params: { lessonId: string };
}

export default function LessonPlanPage({ params }: Props) {
  const unit = ALL_UNITS.find((u) => u.lessons.some((l) => l.id === params.lessonId));
  const lesson = unit?.lessons.find((l) => l.id === params.lessonId);
  if (!unit || !lesson) notFound();

  const autoTypes = ["mcq", "numeric", "matching", "drag_drop"];
  const autoPts = lesson.questions.filter((q) => autoTypes.includes(q.type)).reduce((s, q) => s + q.pointsValue, 0);
  const teacherPts = lesson.questions.filter((q) => !autoTypes.includes(q.type)).reduce((s, q) => s + q.pointsValue, 0);
  const reflectionPts = lesson.reflection.prompts.length > 0 ? 10 : 0;
  const totalPts = autoPts + teacherPts + reflectionPts;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 no-print">
        <Link
          href="/teacher/lessons"
          className="flex items-center gap-1 text-xs text-redhawks-gray-400 hover:text-redhawks-red transition-colors mt-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          All Lesson Plans
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 text-xs font-eng rounded-lg border border-redhawks-gray-300 dark:border-redhawks-gray-700 hover:border-redhawks-red hover:text-redhawks-red transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          Print Lesson Plan
        </button>
      </div>

      {/* Print-only header */}
      <div className="hidden print-only">
        <p className="text-xs text-redhawks-gray-400">High School for Construction Trades, Engineering &amp; Architecture · DC Circuit Fundamentals · Fall 2026 · Mr. Hossain</p>
      </div>

      {/* Lesson title block */}
      <div className="rounded-xl border border-redhawks-gray-200 dark:border-redhawks-gray-700 overflow-hidden">
        <div className="bg-redhawks-red px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-eng text-red-200 mb-1">Unit {unit.number} — {unit.title}</p>
              <h1 className="text-xl font-bold text-white">
                Lesson {lesson.number}: {lesson.title}
              </h1>
            </div>
            <span className="text-xs font-eng font-bold bg-white/20 text-white px-2.5 py-1 rounded-full shrink-0">
              {MP_LABELS[unit.markingPeriod]}
            </span>
          </div>
        </div>
        <div className="px-6 py-3 bg-redhawks-gray-50 dark:bg-redhawks-gray-900 flex flex-wrap gap-2 items-center">
          {lesson.simulationKey && (
            <span className="flex items-center gap-1 text-xs font-eng text-circuit-lime border border-circuit-lime/30 bg-circuit-lime/10 px-2 py-0.5 rounded-full">
              <FlaskConical className="w-3 h-3" />
              {SIM_NAMES[lesson.simulationKey]}
            </span>
          )}
          {lesson.standards.map((s) => (
            <span key={s} className="text-xs font-eng text-redhawks-gray-500 dark:text-redhawks-gray-400 border border-redhawks-gray-200 dark:border-redhawks-gray-700 px-2 py-0.5 rounded-full">
              {s}
            </span>
          ))}
          {lesson.danielsonIndicators?.map((d) => (
            <span key={d} className="text-xs font-eng text-amber-500 border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded-full">
              Danielson {d}
            </span>
          ))}
        </div>
      </div>

      {/* 1. Lesson Overview */}
      <section className="rounded-xl border border-redhawks-gray-200 dark:border-redhawks-gray-700 overflow-hidden">
        <div className="px-5 py-3 bg-redhawks-gray-50 dark:bg-redhawks-gray-900 border-b border-redhawks-gray-200 dark:border-redhawks-gray-700">
          <h2 className="text-xs font-eng font-bold text-redhawks-red uppercase tracking-wider">Lesson Overview</h2>
        </div>
        <div className="px-5 py-4 space-y-4">
          <div>
            <p className="text-xs font-eng font-bold text-redhawks-gray-400 uppercase tracking-wider mb-1">Essential Question (Aim)</p>
            <p className="text-sm font-semibold text-redhawks-black dark:text-redhawks-white italic">{lesson.aim}</p>
          </div>
          <div>
            <p className="text-xs font-eng font-bold text-redhawks-gray-400 uppercase tracking-wider mb-2">Students Will Be Able To</p>
            <ul className="space-y-1">
              {lesson.swbat.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-redhawks-black dark:text-redhawks-white">
                  <span className="text-redhawks-red font-bold shrink-0 font-eng">{i + 1}.</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-eng font-bold text-redhawks-gray-400 uppercase tracking-wider mb-1">Why It Matters</p>
            <p className="text-sm text-redhawks-gray-600 dark:text-redhawks-gray-300 leading-relaxed">{lesson.whyItMatters}</p>
          </div>
        </div>
      </section>

      {/* 2. Discussion Prompts */}
      {lesson.socraticPrompts.length > 0 && (
        <section className="rounded-xl border border-redhawks-gray-200 dark:border-redhawks-gray-700 overflow-hidden">
          <div className="px-5 py-3 bg-redhawks-gray-50 dark:bg-redhawks-gray-900 border-b border-redhawks-gray-200 dark:border-redhawks-gray-700">
            <h2 className="text-xs font-eng font-bold text-redhawks-red uppercase tracking-wider">Discussion Prompts</h2>
            <p className="text-xs text-redhawks-gray-400 mt-0.5">Socratic questions to ask during the explore stage</p>
          </div>
          <div className="px-5 py-4">
            <ol className="space-y-2">
              {lesson.socraticPrompts.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-redhawks-black dark:text-redhawks-white">
                  <span className="text-redhawks-red font-eng font-bold shrink-0 w-5">{i + 1}.</span>
                  {p}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* 3. Guided Discovery Steps */}
      {lesson.guidedDiscoverySteps.length > 0 && (
        <section className="rounded-xl border border-redhawks-gray-200 dark:border-redhawks-gray-700 overflow-hidden">
          <div className="px-5 py-3 bg-redhawks-gray-50 dark:bg-redhawks-gray-900 border-b border-redhawks-gray-200 dark:border-redhawks-gray-700">
            <h2 className="text-xs font-eng font-bold text-redhawks-red uppercase tracking-wider">Guided Discovery Steps</h2>
            <p className="text-xs text-redhawks-gray-400 mt-0.5">Students must complete all steps before advancing</p>
          </div>
          <div className="px-5 py-4">
            <ol className="space-y-3">
              {lesson.guidedDiscoverySteps.map((step, i) => (
                <li key={step.id} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-redhawks-red text-white text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <p className="text-sm text-redhawks-black dark:text-redhawks-white">{step.instruction}</p>
                    {step.hint && (
                      <p className="text-xs text-redhawks-gray-400 italic mt-0.5">Hint: {step.hint}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* 4. Concept Reveal */}
      {lesson.conceptReveal.length > 0 && (
        <section className="rounded-xl border border-redhawks-gray-200 dark:border-redhawks-gray-700 overflow-hidden">
          <div className="px-5 py-3 bg-redhawks-gray-50 dark:bg-redhawks-gray-900 border-b border-redhawks-gray-200 dark:border-redhawks-gray-700">
            <h2 className="text-xs font-eng font-bold text-redhawks-red uppercase tracking-wider">Key Concepts</h2>
          </div>
          <div className="px-5 py-4 space-y-5">
            {lesson.conceptReveal.map((block) => (
              <div key={block.id}>
                <h3 className="text-sm font-bold text-redhawks-black dark:text-redhawks-white mb-1">{block.heading}</h3>
                <p className="text-sm text-redhawks-gray-600 dark:text-redhawks-gray-300 leading-relaxed">{block.body}</p>
                {block.formula && (
                  <div className="mt-2 inline-block bg-redhawks-gray-100 dark:bg-redhawks-gray-800 border border-redhawks-gray-200 dark:border-redhawks-gray-700 rounded-lg px-4 py-2">
                    <code className="text-sm font-eng text-redhawks-red font-bold">{block.formula}</code>
                  </div>
                )}
                {block.example && (
                  <p className="text-xs text-redhawks-gray-400 italic mt-1.5">{block.example}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Assessment / Answer Key */}
      {lesson.questions.length > 0 && (
        <section className="rounded-xl border border-redhawks-gray-200 dark:border-redhawks-gray-700 overflow-hidden">
          <div className="px-5 py-3 bg-redhawks-gray-50 dark:bg-redhawks-gray-900 border-b border-redhawks-gray-200 dark:border-redhawks-gray-700 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-eng font-bold text-redhawks-red uppercase tracking-wider">Assessment — Answer Key</h2>
              <p className="text-xs text-redhawks-gray-400 mt-0.5">Auto-graded: {autoPts} pts · Teacher-graded: {teacherPts} pts</p>
            </div>
            <span className="text-xs font-eng font-bold text-redhawks-black dark:text-redhawks-white">{autoPts + teacherPts} pts total</span>
          </div>
          <div className="divide-y divide-redhawks-gray-100 dark:divide-redhawks-gray-800">
            {lesson.questions.map((q, i) => (
              <div key={q.id} className="px-5 py-3 grid grid-cols-[2rem_1fr_auto] gap-3 items-start">
                <span className="text-xs font-eng font-bold text-redhawks-red pt-0.5">Q{i + 1}</span>
                <div>
                  <p className="text-xs text-redhawks-gray-500 dark:text-redhawks-gray-400 font-eng mb-0.5">
                    {Q_TYPE_LABELS[q.type]} · {q.pointsValue} pts
                  </p>
                  <p className="text-sm text-redhawks-black dark:text-redhawks-white mb-1.5">{q.prompt}</p>
                  <div className="text-sm">{renderAnswer(q)}</div>
                </div>
              </div>
            ))}
          </div>
          {reflectionPts > 0 && (
            <div className="px-5 py-3 border-t border-redhawks-gray-200 dark:border-redhawks-gray-700 bg-amber-50 dark:bg-amber-950/20">
              <p className="text-xs font-eng text-amber-600 dark:text-amber-400">
                + {reflectionPts} pts for reflection (teacher grades)
              </p>
            </div>
          )}
          <div className="px-5 py-3 border-t border-redhawks-gray-200 dark:border-redhawks-gray-700 flex justify-end">
            <span className="text-sm font-eng font-bold text-redhawks-black dark:text-redhawks-white">
              Grand Total: {totalPts} pts
            </span>
          </div>
        </section>
      )}

      {/* 6. Reflection */}
      {lesson.reflection.prompts.length > 0 && (
        <section className="rounded-xl border border-redhawks-gray-200 dark:border-redhawks-gray-700 overflow-hidden">
          <div className="px-5 py-3 bg-redhawks-gray-50 dark:bg-redhawks-gray-900 border-b border-redhawks-gray-200 dark:border-redhawks-gray-700 flex items-center justify-between">
            <h2 className="text-xs font-eng font-bold text-redhawks-red uppercase tracking-wider">Reflection Prompts</h2>
            <span className="text-xs font-eng text-amber-500">{reflectionPts} pts · Teacher grades</span>
          </div>
          <div className="px-5 py-4">
            <ol className="space-y-2">
              {lesson.reflection.prompts.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-redhawks-black dark:text-redhawks-white">
                  <span className="text-redhawks-red font-eng font-bold shrink-0 w-5">{i + 1}.</span>
                  {p}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Footer spacer for print */}
      <div className="hidden print-only text-xs text-redhawks-gray-400 pt-4 border-t border-redhawks-gray-200">
        Mr. Hossain · DC Circuit Fundamentals · Fall 2026 · Keep Moving Forward
      </div>
    </div>
  );
}
