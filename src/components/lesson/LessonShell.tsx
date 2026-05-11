"use client";

import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/design-system/Button";
import { ProgressBar } from "@/components/design-system/ProgressBar";
import { AimSection } from "./AimSection";
import { SwbatSection } from "./SwbatSection";
import { WhyItMattersSection } from "./WhyItMattersSection";
import { SocraticPrompts } from "./SocraticPrompts";
import { GuidedDiscovery } from "./GuidedDiscovery";
import { ConceptReveal } from "./ConceptReveal";
import { PracticeQuestions } from "./PracticeQuestions";
import { ReflectionSection } from "./ReflectionSection";
import { PdfExportButton } from "./PdfExportButton";
import { SIMULATION_REGISTRY, ALL_UNITS } from "@/lib/curriculum";
import { CalculatorModal } from "@/components/tools/CalculatorModal";
import type { Unit, Lesson } from "@/types/curriculum";
import type { StudentAnswer } from "@/types/questions";

const STAGES = [
  "aim", "swbat", "why", "explore",
  "reveal", "practice", "reflection", "export",
] as const;

type LessonStage = typeof STAGES[number];

const STAGE_LABELS: Record<LessonStage, string> = {
  aim:        "Lesson Aim",
  swbat:      "Objectives",
  why:        "Why It Matters",
  explore:    "Investigation & Discovery",
  reveal:     "Concept Reveal",
  practice:   "Practice",
  reflection: "Reflection",
  export:     "Generate PDF",
};

interface LessonState {
  currentStage: LessonStage;
  simInteractionCount: number;
  isSimComplete: boolean;
  answers: Record<string, StudentAnswer>;
  reflectionText: string;
  completedAt?: string;
}

function getStagesForLesson(lesson: Lesson): LessonStage[] {
  return [...STAGES];
}

function loadProgress(lessonId: string): LessonState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`rvs82t:progress:${lessonId}`);
    if (raw) return JSON.parse(raw);
  } catch { /* */ }
  return null;
}

function saveProgress(lessonId: string, state: LessonState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`rvs82t:progress:${lessonId}`, JSON.stringify(state));
}

export function LessonShell({ unit, lesson }: { unit: Unit; lesson: Lesson }) {
  const stages = getStagesForLesson(lesson);
  const threshold = lesson.simInteractionThreshold ?? 3;

  // Compute next lesson / next unit for post-lesson navigation
  const lessonIdx = unit.lessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = unit.lessons[lessonIdx + 1] ?? null;
  const unitIdx = ALL_UNITS.findIndex((u) => u.id === unit.id);
  const nextUnit = ALL_UNITS[unitIdx + 1] ?? null;

  const [showCalculator, setShowCalculator] = useState(false);

  const [state, setState] = useState<LessonState>(() => ({
    currentStage: stages[0],
    simInteractionCount: 0,
    isSimComplete: false,
    answers: {},
    reflectionText: "",
  }));

  // Load saved progress after mount
  useEffect(() => {
    const saved = loadProgress(lesson.id);
    if (saved) {
      setState((prev) => ({
        ...prev,
        ...saved,
        currentStage: stages.includes(saved.currentStage) ? saved.currentStage : stages[0],
      }));
    }
  }, [lesson.id]);

  // Persist progress on state change
  useEffect(() => {
    saveProgress(lesson.id, state);
  }, [lesson.id, state]);

  const currentIdx = stages.indexOf(state.currentStage);
  const progress = Math.round(((currentIdx + 1) / stages.length) * 100);

  const isRevealLocked =
    state.currentStage === "reveal" && state.simInteractionCount < threshold && lesson.simulationKey !== null;

  const canAdvance = useCallback(() => {
    if (state.currentStage === "explore" && lesson.simulationKey && state.simInteractionCount < threshold) return false;
    return true;
  }, [state.currentStage, state.simInteractionCount, threshold, lesson.simulationKey]);

  const advance = () => {
    if (!canAdvance()) return;
    const nextIdx = currentIdx + 1;
    if (nextIdx < stages.length) {
      setState((prev) => ({ ...prev, currentStage: stages[nextIdx] }));
    } else {
      setState((prev) => ({ ...prev, completedAt: new Date().toISOString() }));
    }
  };

  const goBack = () => {
    const prevIdx = currentIdx - 1;
    if (prevIdx >= 0) {
      setState((prev) => ({ ...prev, currentStage: stages[prevIdx] }));
    }
  };

  const handleSimInteraction = useCallback(() => {
    setState((prev) => ({
      ...prev,
      simInteractionCount: prev.simInteractionCount + 1,
      isSimComplete: prev.simInteractionCount + 1 >= threshold,
    }));
  }, [threshold]);

  const handleAnswer = useCallback((questionId: string, answer: StudentAnswer) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
    }));
  }, []);

  const handleReflection = useCallback((text: string) => {
    setState((prev) => ({ ...prev, reflectionText: text }));
  }, []);

  // Lazy-load the simulation
  const SimComponent = lesson.simulationKey
    ? lazy(SIMULATION_REGISTRY[lesson.simulationKey])
    : null;

  const stage = state.currentStage;

  return (
    <div className={`${stage === "explore" ? "max-w-6xl" : "max-w-3xl"} mx-auto px-4 py-8`}>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-redhawks-gray-400 mb-6">
        <Link href="/dashboard" className="hover:text-redhawks-red transition-colors">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/units/${unit.id}`} className="hover:text-redhawks-red transition-colors">{unit.title}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-redhawks-black dark:text-redhawks-white font-semibold">{lesson.number}</span>
      </nav>

      {/* Stage progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-redhawks-gray-400 mb-1.5">
          <span className="font-eng font-semibold text-circuit-lime">{STAGE_LABELS[stage]}</span>
          <span>{currentIdx + 1} / {stages.length}</span>
        </div>
        <ProgressBar value={progress} variant="lime" />
        {/* Stage dots */}
        <div className="flex items-center gap-1 mt-2">
          {stages.map((s, i) => (
            <div
              key={s}
              title={STAGE_LABELS[s]}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i < currentIdx ? "bg-circuit-lime" :
                i === currentIdx ? "bg-circuit-lime animate-pulse-lime" :
                "bg-redhawks-gray-200 dark:bg-redhawks-gray-800"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stage Content */}
      <div className="animate-slide-in-up">
        {stage === "aim"        && <AimSection lesson={lesson} />}
        {stage === "swbat"      && <SwbatSection lesson={lesson} />}
        {stage === "why"        && <WhyItMattersSection lesson={lesson} />}

        {stage === "explore" && (
          <div className="space-y-4">
            <div className={`grid gap-6 ${SimComponent ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
              {/* Left column: simulation */}
              {SimComponent && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h2 className="text-base font-bold text-redhawks-black dark:text-redhawks-white">Investigation</h2>
                    <div className="flex items-center gap-2">
                      <ProgressBar
                        value={state.simInteractionCount}
                        max={threshold}
                        variant="lime"
                        size="sm"
                        className="max-w-24"
                      />
                      <span className="text-xs font-eng text-circuit-lime whitespace-nowrap">
                        {Math.min(state.simInteractionCount, threshold)}/{threshold}
                      </span>
                    </div>
                  </div>
                  <Suspense fallback={<div className="h-64 card-surface flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-circuit-lime" /></div>}>
                    <SimComponent onInteraction={handleSimInteraction} />
                  </Suspense>
                </div>
              )}
              {/* Right column (or full-width when no sim): discussion + guided discovery */}
              <div className="space-y-4 lg:max-h-[75vh] lg:overflow-y-auto lg:pr-1">
                <SocraticPrompts lesson={lesson} />
                <GuidedDiscovery lesson={lesson} />
              </div>
            </div>

            {/* Toolkit bar */}
            <div className="flex items-center gap-2 pt-3 border-t border-redhawks-gray-200 dark:border-redhawks-gray-800">
              <span className="text-xs font-eng text-redhawks-gray-400 mr-1">Tools:</span>
              <button
                onClick={() => setShowCalculator(true)}
                className="px-3 py-1.5 text-xs font-eng rounded-lg border border-redhawks-gray-300 dark:border-redhawks-gray-700 hover:border-circuit-lime hover:text-circuit-lime text-redhawks-gray-500 dark:text-redhawks-gray-400 transition-colors flex items-center gap-1.5"
              >
                📐 TI-30XS Calculator
              </button>
            </div>
            <CalculatorModal isOpen={showCalculator} onClose={() => setShowCalculator(false)} />
          </div>
        )}

        {stage === "reveal" && (
          isRevealLocked ? (
            <div className="card-surface p-8 text-center">
              <Lock className="w-10 h-10 text-redhawks-gray-400 mx-auto mb-3" />
              <p className="font-semibold text-redhawks-black dark:text-redhawks-white mb-1">Concept Reveal Locked</p>
              <p className="text-sm text-redhawks-gray-500 dark:text-redhawks-gray-400">
                Complete the simulation ({state.simInteractionCount}/{threshold} interactions) before the concept is revealed.
                Go back and explore more.
              </p>
              <Button variant="secondary" size="sm" className="mt-4" onClick={goBack}>
                ← Return to Investigation
              </Button>
            </div>
          ) : (
            <ConceptReveal lesson={lesson} />
          )
        )}

        {stage === "practice" && (
          <PracticeQuestions
            lesson={lesson}
            answers={state.answers}
            onAnswer={handleAnswer}
          />
        )}

        {stage === "reflection" && (
          <ReflectionSection
            lesson={lesson}
            reflectionText={state.reflectionText}
            onUpdate={handleReflection}
          />
        )}

        {stage === "export" && (
          <div className="space-y-4">
            <div className="card-surface p-6 border-l-4 border-l-circuit-lime">
              <h2 className="text-xl font-bold text-redhawks-black dark:text-redhawks-white mb-1">
                Lesson Complete!
              </h2>
              <p className="text-redhawks-gray-500 dark:text-redhawks-gray-400 text-sm">
                You&apos;ve worked through all sections. Generate your PDF to submit to Google Classroom.
              </p>
            </div>
            <PdfExportButton lesson={lesson} answers={state.answers} reflectionText={state.reflectionText} />
            {/* Post-lesson navigation */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              {(nextLesson || nextUnit) && (
                <Link href={nextLesson
                  ? `/units/${unit.id}/lessons/${nextLesson.id}`
                  : `/units/${nextUnit!.id}/lessons/${nextUnit!.lessons[0].id}`
                }>
                  <Button variant="primary" size="sm" className="flex items-center gap-1">
                    {nextLesson
                      ? `${nextLesson.number}: ${nextLesson.title}`
                      : `Unit ${nextUnit!.number}: ${nextUnit!.title}`}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={goBack}
          disabled={currentIdx === 0}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>

        {stage !== "export" && (
          <Button
            variant="primary"
            size="md"
            onClick={advance}
            disabled={!canAdvance()}
            className="flex items-center gap-1"
          >
            {stage === "reflection" ? "Finish & Export" : "Continue"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
