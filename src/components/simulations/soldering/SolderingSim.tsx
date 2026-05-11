"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface JointScenario {
  id: string;
  name: string;
  quality: "good" | "cold" | "bridged" | "insufficient" | "overheated";
  svgContent: string;
  description: string;
  howToFix: string;
  cause: string;
}

const JOINTS: JointScenario[] = [
  {
    id: "good",
    name: "Good Joint",
    quality: "good",
    svgContent: `
      <circle cx="40" cy="50" r="18" fill="#B87333" opacity="0.9"/>
      <circle cx="40" cy="50" r="10" fill="#C8A060" opacity="0.85"/>
      <circle cx="40" cy="50" r="4" fill="#D4B070"/>
      <line x1="40" y1="32" x2="40" y2="10" stroke="#888" strokeWidth="3"/>
      <text x="40" y="80" textAnchor="middle" fontSize="9" fill="#39FF14">Volcano shape ✓</text>
    `,
    description: "Shiny, volcano-shaped cone with the lead in the center. Smooth surface, proper wetting to both pad and lead.",
    howToFix: "No fix needed — this is the target result.",
    cause: "Correct technique: iron applied to both lead and pad, solder fed to the joint (not the iron), removed cleanly.",
  },
  {
    id: "cold",
    name: "Cold Joint",
    quality: "cold",
    svgContent: `
      <ellipse cx="40" cy="52" rx="20" ry="12" fill="#999" opacity="0.7"/>
      <ellipse cx="40" cy="52" rx="12" ry="7" fill="#aaa" opacity="0.6"/>
      <line x1="40" y1="40" x2="40" y2="10" stroke="#888" strokeWidth="3"/>
      <text x="40" y="78" textAnchor="middle" fontSize="9" fill="#ff8800">Dull & grainy ✗</text>
    `,
    description: "Dull, grainy, or frosted surface. Often rounded rather than conical. High electrical resistance and prone to failure.",
    howToFix: "Reheat the joint with the iron until solder flows properly, then allow to cool without moving the component.",
    cause: "Component or board moved while solder was still liquid. Iron not hot enough. Joint removed from heat too early.",
  },
  {
    id: "bridged",
    name: "Solder Bridge",
    quality: "bridged",
    svgContent: `
      <circle cx="25" cy="50" r="12" fill="#B87333" opacity="0.9"/>
      <circle cx="55" cy="50" r="12" fill="#B87333" opacity="0.9"/>
      <ellipse cx="40" cy="50" rx="18" ry="6" fill="#B87333" opacity="0.85"/>
      <line x1="25" y1="38" x2="25" y2="10" stroke="#888" strokeWidth="3"/>
      <line x1="55" y1="38" x2="55" y2="10" stroke="#888" strokeWidth="3"/>
      <text x="40" y="78" textAnchor="middle" fontSize="9" fill="#ff4444">Short circuit! ✗</text>
    `,
    description: "Solder connects two adjacent pads that should be electrically isolated — creates a short circuit.",
    howToFix: "Use solder wick (desoldering braid) or a solder sucker to remove excess solder. Reheat and wick carefully.",
    cause: "Too much solder applied. Iron dragged across adjacent pads. Wrong tip size for pad spacing.",
  },
  {
    id: "insufficient",
    name: "Insufficient Solder",
    quality: "insufficient",
    svgContent: `
      <circle cx="40" cy="50" r="8" fill="#B87333" opacity="0.5"/>
      <line x1="40" y1="42" x2="40" y2="10" stroke="#888" strokeWidth="3"/>
      <circle cx="40" cy="56" r="14" fill="none" stroke="#666" strokeWidth="1" strokeDasharray="3"/>
      <text x="40" y="78" textAnchor="middle" fontSize="9" fill="#ff8800">Too little solder ✗</text>
    `,
    description: "Not enough solder to create a proper connection. Lead may be visible through the joint. Mechanically weak.",
    howToFix: "Reheat the joint and add more solder until a proper volcano shape is formed.",
    cause: "Insufficient solder fed to the joint. Iron removed before adequate solder flowed onto the pad.",
  },
  {
    id: "overheated",
    name: "Overheated Pad",
    quality: "overheated",
    svgContent: `
      <ellipse cx="40" cy="55" rx="22" ry="8" fill="#553300" opacity="0.7"/>
      <circle cx="40" cy="50" r="15" fill="#8B4513" opacity="0.6"/>
      <circle cx="40" cy="50" r="5" fill="#B87333" opacity="0.5"/>
      <line x1="40" y1="35" x2="40" y2="10" stroke="#888" strokeWidth="3"/>
      <text x="40" y="78" textAnchor="middle" fontSize="9" fill="#ff4444">Lifted pad ✗</text>
    `,
    description: "Pad has lifted from the PCB substrate. Dark ring around joint. Board may be permanently damaged.",
    howToFix: "Minor lift: use conductive epoxy or reroute the trace. Severe: PCB may be unrepairable.",
    cause: "Iron applied too long. Temperature too high. Lead-free solder requires higher temp — use proper iron setting.",
  },
];

const STEPS = [
  { step: 1, title: "Tin the Iron", description: "Apply a small amount of solder to the iron tip — this improves heat transfer. Wipe excess on damp sponge." },
  { step: 2, title: "Position Component", description: "Insert the lead through the hole. Bend slightly to hold in place. Component body flat against board." },
  { step: 3, title: "Heat Joint (2 sec)", description: "Touch iron tip to BOTH the pad AND the lead simultaneously. Heat for 1-3 seconds." },
  { step: 4, title: "Feed Solder", description: "Touch solder to the joint (not the iron) on the opposite side from the iron. Let heat pull it in." },
  { step: 5, title: "Remove Solder, Then Iron", description: "Once joint is filled, remove solder wire first, then iron. Do not move component for 5 seconds." },
  { step: 6, title: "Inspect", description: "Check for shiny volcano shape, proper wetting, no bridges, no cold joints. Trim excess lead." },
];

interface Props {
  onInteraction?: () => void;
}

export default function SolderingSim({ onInteraction }: Props) {
  const [selected, setSelected] = useState<JointScenario>(JOINTS[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [quizJoint] = useState(() => JOINTS[Math.floor(Math.random() * JOINTS.length)]);
  const [quizGuess, setQuizGuess] = useState<string | null>(null);

  const interact = () => onInteraction?.();

  const qualityColor = {
    good: "border-circuit-lime bg-circuit-lime/10",
    cold: "border-amber-400 bg-amber-400/10",
    bridged: "border-redhawks-red bg-redhawks-red/10",
    insufficient: "border-amber-400 bg-amber-400/10",
    overheated: "border-redhawks-red bg-redhawks-red/10",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => { setQuizMode(false); interact(); }}
          className={cn("px-3 py-1.5 text-xs font-eng rounded-lg border transition-all",
            !quizMode ? "border-redhawks-red bg-redhawks-red/10" : "border-redhawks-gray-300 dark:border-redhawks-gray-700"
          )}>Joint Gallery</button>
        <button onClick={() => { setQuizMode(true); interact(); }}
          className={cn("px-3 py-1.5 text-xs font-eng rounded-lg border transition-all",
            quizMode ? "border-circuit-lime bg-circuit-lime/10 text-circuit-lime" : "border-redhawks-gray-300 dark:border-redhawks-gray-700"
          )}>ID Quiz</button>
      </div>

      {!quizMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left: joint selector + technique steps */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-eng text-redhawks-gray-400 mb-2 uppercase tracking-wider">Joint Types</p>
              <div className="grid grid-cols-1 gap-1">
                {JOINTS.map((j) => (
                  <button key={j.id} onClick={() => { setSelected(j); interact(); }}
                    className={cn("text-left px-3 py-2 rounded-lg border text-xs transition-all",
                      selected.id === j.id ? qualityColor[j.quality] : "border-redhawks-gray-200 dark:border-redhawks-gray-700 hover:border-redhawks-gray-400"
                    )}>
                    <span className="font-semibold text-redhawks-black dark:text-redhawks-white">{j.name}</span>
                    <span className={cn("ml-2 px-1 py-0.5 rounded text-xs",
                      j.quality === "good" ? "text-circuit-lime" : j.quality === "bridged" || j.quality === "overheated" ? "text-redhawks-red" : "text-amber-400"
                    )}>
                      {j.quality === "good" ? "✓ Acceptable" : "✗ Defect"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-eng text-redhawks-gray-400 mb-2 uppercase tracking-wider">Soldering Technique</p>
              <div className="space-y-2">
                {STEPS.map((s, i) => (
                  <button key={s.step} onClick={() => { setCurrentStep(i); interact(); }}
                    className={cn("w-full text-left px-3 py-2 rounded-lg border text-xs transition-all",
                      currentStep === i ? "border-circuit-lime bg-circuit-lime/5" : "border-redhawks-gray-200 dark:border-redhawks-gray-700 hover:border-redhawks-gray-400"
                    )}>
                    <span className={cn("font-eng font-bold mr-2", currentStep === i ? "text-circuit-lime" : "text-redhawks-gray-400")}>Step {s.step}</span>
                    <span className="font-semibold">{s.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: detail view */}
          <div className="space-y-4">
            <div className={cn("rounded-xl border-2 p-5 space-y-3", qualityColor[selected.quality])}>
              <h3 className="font-bold text-redhawks-black dark:text-redhawks-white">{selected.name}</h3>
              <div className="flex justify-center bg-[#0d0d0d] rounded-xl py-6">
                <svg width={100} height={90} viewBox="0 0 80 90">
                  <g dangerouslySetInnerHTML={{ __html: selected.svgContent }} />
                </svg>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-redhawks-black dark:text-redhawks-white">{selected.description}</p>
                <div className="p-2 rounded bg-redhawks-gray-50 dark:bg-redhawks-gray-900">
                  <p className="text-xs font-eng text-redhawks-gray-400 mb-1">Cause</p>
                  <p className="text-xs">{selected.cause}</p>
                </div>
                <div className="p-2 rounded bg-circuit-lime/5 border border-circuit-lime/20">
                  <p className="text-xs font-eng text-circuit-lime mb-1">Fix</p>
                  <p className="text-xs">{selected.howToFix}</p>
                </div>
              </div>
            </div>

            {/* Technique step detail */}
            <div className="card-surface p-4 rounded-xl">
              <p className="text-xs font-eng text-circuit-lime mb-1">Step {STEPS[currentStep].step}: {STEPS[currentStep].title}</p>
              <p className="text-sm text-redhawks-black dark:text-redhawks-white">{STEPS[currentStep].description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="card-surface p-6 rounded-xl text-center space-y-4">
            <p className="text-xs font-eng text-redhawks-gray-400">Identify this solder joint:</p>
            <div className="flex justify-center bg-[#0d0d0d] rounded-xl py-6">
              <svg width={120} height={100} viewBox="0 0 80 90" className="scale-125">
                <g dangerouslySetInnerHTML={{ __html: quizJoint.svgContent }} />
              </svg>
            </div>
            {quizGuess && (
              <div className={cn("p-3 rounded-lg text-sm font-semibold", quizGuess === quizJoint.id ? "bg-circuit-lime/10 text-circuit-lime border border-circuit-lime/30" : "bg-redhawks-red/10 text-redhawks-red border border-redhawks-red/30")}>
                {quizGuess === quizJoint.id ? "Correct!" : `Not quite — this is a ${quizJoint.name}`}
                <p className="text-xs font-normal mt-1 text-redhawks-gray-500">{quizJoint.description}</p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {JOINTS.map((j) => (
              <button key={j.id} disabled={!!quizGuess} onClick={() => { setQuizGuess(j.id); interact(); }}
                className={cn("px-3 py-2 text-sm rounded-lg border transition-all",
                  quizGuess && j.id === quizJoint.id ? "border-circuit-lime bg-circuit-lime/20 text-circuit-lime" :
                  quizGuess && j.id === quizGuess && quizGuess !== quizJoint.id ? "border-redhawks-red bg-redhawks-red/10 text-redhawks-red" :
                  "border-redhawks-gray-200 dark:border-redhawks-gray-700 hover:border-redhawks-gray-400 disabled:opacity-50"
                )}>{j.name}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
