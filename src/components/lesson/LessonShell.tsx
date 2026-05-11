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
import { SIMULATION_REGISTRY } from "@/lib/curriculum";
import type { Unit, Lesson } from "@/types/curriculum";
import type { StudentAnswer } from "@/types/questions";

const STAGES = [
  "aim", "swbat", "why", "sim", "socratic",
  "guided", "reveal", "practice", "reflection", "export",
] as const;

type LessonStage = typeof STAGES[number];

const STAGE_LABELS: Record<LessonStage, string> = {
  aim:        "Lesson Aim",
  swbat:      "Objectives",
  why:        "Why It Matters",
  sim:        "Investigation",
  socratic:   "Discussion",
  guided:     "Guided Discovery",
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
  const stages = [...STAGES];
  if (!lesson.simulationKey) {
    return stages.filter((s) => s !== "sim");
  }
  return stages;
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
    if (state.currentStage === "sim" && state.simInteractionCount < threshold) return false;
    return true;
  }, [state.currentStage, state.simInteractionCount, threshold]);

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
    <div className="max-w-3xl mx-auto px-4 py-8">
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

        {stage === "sim" && SimComponent && (
          <div className="mb-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-redhawks-black dark:text-redhawks-white mb-1">Investigation</h2>
              <p className="text-sm text-redhawks-gray-500 dark:text-redhawks-gray-400">
                Explore the simulation below. You must interact at least {threshold} times before advancing.
              </p>
              {/* Interaction counter */}
              <div className="mt-2 flex items-center gap-2">
                <ProgressBar
                  value={state.simInteractionCount}
                  max={threshold}
                  variant="lime"
                  size="sm"
                  className="max-w-32"
                />
                <span className="text-xs font-eng text-circuit-lime">
                  {Math.min(state.simInteractionCount, threshold)}/{threshold} interactions
                </span>
              </div>
            </div>
            <Suspense fallback={<div className="h-64 card-surface flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-circuit-lime" /></div>}>
              <SimComponent onInteraction={handleSimInteraction} />
            </Suspense>
          </div>
        )}

        {stage === "socratic"   && <SocraticPrompts lesson={lesson} />}
        {stage === "guided"     && <GuidedDiscovery lesson={lesson} />}

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
