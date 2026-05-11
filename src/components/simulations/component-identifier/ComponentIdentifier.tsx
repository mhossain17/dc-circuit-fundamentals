"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface Component {
  id: string;
  name: string;
  symbol: string;     // SVG path data or description
  category: string;
  description: string;
  schematicSvg: string;
  realWorldNotes: string;
  hint: string;
}

const COMPONENTS: Component[] = [
  {
    id: "resistor", name: "Resistor", category: "Passive",
    symbol: "R", schematicSvg: `<rect x="10" y="15" width="40" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="0" y1="25" x2="10" y2="25" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="25" x2="60" y2="25" stroke="currentColor" strokeWidth="2"/>`,
    description: "Limits current flow in a circuit. Measured in Ohms (Ω).",
    realWorldNotes: "Identified by colored bands. Brown-Black-Red-Gold = 1kΩ ±5%.",
    hint: "Rectangle between two leads on a schematic.",
  },
  {
    id: "capacitor", name: "Capacitor", category: "Passive",
    symbol: "C", schematicSvg: `<line x1="0" y1="25" x2="22" y2="25" stroke="currentColor" strokeWidth="2"/><line x1="22" y1="10" x2="22" y2="40" stroke="currentColor" strokeWidth="2.5"/><line x1="28" y1="10" x2="28" y2="40" stroke="currentColor" strokeWidth="2.5"/><line x1="28" y1="25" x2="60" y2="25" stroke="currentColor" strokeWidth="2"/>`,
    description: "Stores electrical charge. Measured in Farads (F). Blocks DC, passes AC.",
    realWorldNotes: "Electrolytic caps have polarity — watch the stripe (negative side).",
    hint: "Two parallel lines between two leads.",
  },
  {
    id: "inductor", name: "Inductor", category: "Passive",
    symbol: "L", schematicSvg: `<path d="M0 25 C5 10, 15 10, 15 25 C15 10, 25 10, 25 25 C25 10, 35 10, 35 25 C35 10, 45 10, 45 25 L60 25" fill="none" stroke="currentColor" strokeWidth="2"/>`,
    description: "Stores energy in a magnetic field. Measured in Henrys (H). Resists changes in current.",
    realWorldNotes: "Looks like a coil of wire. Common in transformers and RF filters.",
    hint: "Series of bumps/arcs on a schematic.",
  },
  {
    id: "diode", name: "Diode", category: "Semiconductor",
    symbol: "D", schematicSvg: `<line x1="0" y1="25" x2="20" y2="25" stroke="currentColor" strokeWidth="2"/><polygon points="20,10 20,40 44,25" fill="currentColor"/><line x1="44" y1="10" x2="44" y2="40" stroke="currentColor" strokeWidth="2.5"/><line x1="44" y1="25" x2="60" y2="25" stroke="currentColor" strokeWidth="2"/>`,
    description: "Allows current in one direction only. Has anode (+) and cathode (−) terminals.",
    realWorldNotes: "Silver or black stripe on body = cathode (negative terminal).",
    hint: "Triangle pointing toward a vertical bar.",
  },
  {
    id: "led", name: "LED", category: "Semiconductor",
    symbol: "LED", schematicSvg: `<line x1="0" y1="25" x2="20" y2="25" stroke="currentColor" strokeWidth="2"/><polygon points="20,10 20,40 44,25" fill="#39FF14"/><line x1="44" y1="10" x2="44" y2="40" stroke="currentColor" strokeWidth="2.5"/><line x1="44" y1="25" x2="60" y2="25" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="10" x2="58" y2="2" stroke="#39FF14" strokeWidth="1.5" markerEnd="url(#arrow)"/><line x1="56" y1="14" x2="64" y2="6" stroke="#39FF14" strokeWidth="1.5"/>`,
    description: "Light-Emitting Diode — emits light when current flows through it. ~2V forward voltage.",
    realWorldNotes: "Longer leg = anode (+). Flat side of lens = cathode (−). Always use a current-limiting resistor.",
    hint: "Diode symbol with two arrows pointing away (light emission).",
  },
  {
    id: "transistor", name: "Transistor (NPN)", category: "Semiconductor",
    symbol: "Q", schematicSvg: `<line x1="0" y1="25" x2="25" y2="25" stroke="currentColor" strokeWidth="2"/><line x1="25" y1="10" x2="25" y2="40" stroke="currentColor" strokeWidth="2.5"/><line x1="25" y1="20" x2="45" y2="10" stroke="currentColor" strokeWidth="2"/><line x1="25" y1="30" x2="45" y2="40" stroke="currentColor" strokeWidth="2"/><polygon points="38,36 45,40 42,30" fill="currentColor"/>`,
    description: "3-terminal semiconductor: Base, Collector, Emitter. Used for amplification and switching.",
    realWorldNotes: "NPN: current into Base turns ON device. Common: 2N2222, BC547.",
    hint: "Vertical bar (Base) with diagonal arrow lines (Collector, Emitter).",
  },
  {
    id: "battery", name: "Battery / Cell", category: "Source",
    symbol: "B", schematicSvg: `<line x1="0" y1="25" x2="18" y2="25" stroke="currentColor" strokeWidth="2"/><line x1="18" y1="12" x2="18" y2="38" stroke="currentColor" strokeWidth="3"/><line x1="24" y1="18" x2="24" y2="32" stroke="currentColor" strokeWidth="1.5"/><line x1="30" y1="12" x2="30" y2="38" stroke="currentColor" strokeWidth="3"/><line x1="36" y1="18" x2="36" y2="32" stroke="currentColor" strokeWidth="1.5"/><line x1="42" y1="25" x2="60" y2="25" stroke="currentColor" strokeWidth="2"/><text x="16" y="8" fontSize="8" fill="currentColor">+</text><text x="39" y="8" fontSize="8" fill="currentColor">-</text>`,
    description: "Provides EMF (electromotive force) to drive current. Long line = positive, short line = negative.",
    realWorldNotes: "Common: AA (1.5V), 9V block, LiPo (3.7V). Never short the terminals.",
    hint: "Alternating long (positive) and short (negative) parallel lines.",
  },
  {
    id: "switch", name: "Switch", category: "Control",
    symbol: "SW", schematicSvg: `<line x1="0" y1="25" x2="18" y2="25" stroke="currentColor" strokeWidth="2"/><circle cx="18" cy="25" r="2.5" fill="currentColor"/><line x1="20" y1="25" x2="42" y2="12" stroke="currentColor" strokeWidth="2"/><circle cx="42" cy="25" r="2.5" fill="currentColor"/><line x1="42" y1="25" x2="60" y2="25" stroke="currentColor" strokeWidth="2"/>`,
    description: "Opens or closes a circuit path. SPST = Single Pole Single Throw (most basic).",
    realWorldNotes: "Open switch = no current. Closed switch = current flows.",
    hint: "A line (lever) that opens/closes between two contacts.",
  },
];

interface Props {
  onInteraction?: () => void;
}

export default function ComponentIdentifier({ onInteraction }: Props) {
  const [selected, setSelected] = useState<Component>(COMPONENTS[0]);
  const [quizMode, setQuizMode] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [guessed, setGuessed] = useState<string | null>(null);

  const interact = () => onInteraction?.();

  // Shuffle for quiz
  const [quizOrder] = useState(() => [...COMPONENTS].sort(() => Math.random() - 0.5));
  const quizComp = quizOrder[quizIdx % quizOrder.length];

  const handleGuess = (id: string) => {
    if (showAnswer) return;
    setGuessed(id);
    setShowAnswer(true);
    setScore((s) => ({ correct: s.correct + (id === quizComp.id ? 1 : 0), total: s.total + 1 }));
    interact();
  };

  const nextQuiz = () => {
    setQuizIdx((i) => i + 1);
    setShowAnswer(false);
    setGuessed(null);
  };

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => { setQuizMode(false); interact(); }}
          className={cn("px-3 py-1.5 text-xs font-eng rounded-lg border transition-all",
            !quizMode ? "border-redhawks-red bg-redhawks-red/10 text-redhawks-red" : "border-redhawks-gray-300 dark:border-redhawks-gray-700"
          )}
        >Reference</button>
        <button
          onClick={() => { setQuizMode(true); interact(); }}
          className={cn("px-3 py-1.5 text-xs font-eng rounded-lg border transition-all",
            quizMode ? "border-circuit-lime bg-circuit-lime/10 text-circuit-lime" : "border-redhawks-gray-300 dark:border-redhawks-gray-700"
          )}
        >Quiz Mode</button>
        {quizMode && <span className="text-xs font-eng text-redhawks-gray-400">{score.correct}/{score.total} correct</span>}
      </div>

      {!quizMode ? (
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
          {/* Component list */}
          <div className="space-y-1">
            {COMPONENTS.map((c) => (
              <button
                key={c.id}
                onClick={() => { setSelected(c); interact(); }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm border transition-all",
                  selected.id === c.id
                    ? "border-redhawks-red bg-redhawks-red/10 font-semibold"
                    : "border-transparent hover:border-redhawks-gray-300 dark:hover:border-redhawks-gray-600"
                )}
              >
                <span className="text-xs font-eng text-redhawks-gray-400 mr-2">{c.symbol}</span>
                {c.name}
              </button>
            ))}
          </div>

          {/* Detail view */}
          <div className="card-surface p-5 rounded-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-redhawks-black dark:text-redhawks-white">{selected.name}</h3>
                <span className="text-xs font-eng text-redhawks-gray-400">{selected.category} Component · Symbol: {selected.symbol}</span>
              </div>
            </div>
            {/* Schematic symbol */}
            <div className="flex justify-center py-4 bg-redhawks-gray-50 dark:bg-redhawks-gray-900 rounded-lg">
              <svg width={60} height={50} viewBox="0 0 60 50" className="text-redhawks-black dark:text-redhawks-white">
                <g dangerouslySetInnerHTML={{ __html: selected.schematicSvg }} />
              </svg>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-redhawks-black dark:text-redhawks-white">{selected.description}</p>
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <p className="text-xs font-eng text-amber-700 dark:text-amber-400 mb-1">Real-World Notes</p>
                <p className="text-xs text-amber-800 dark:text-amber-300">{selected.realWorldNotes}</p>
              </div>
              <div className="p-3 rounded-lg bg-circuit-lime/5 border border-circuit-lime/20">
                <p className="text-xs font-eng text-circuit-lime mb-1">Schematic Hint</p>
                <p className="text-xs text-redhawks-gray-600 dark:text-redhawks-gray-400">{selected.hint}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="card-surface p-6 rounded-xl text-center space-y-4">
            <p className="text-xs font-eng text-redhawks-gray-400">What component is this?</p>
            <div className="flex justify-center py-6 bg-redhawks-gray-50 dark:bg-redhawks-gray-900 rounded-xl">
              <svg width={80} height={60} viewBox="0 0 60 50" className="text-redhawks-black dark:text-redhawks-white scale-125">
                <g dangerouslySetInnerHTML={{ __html: quizComp.schematicSvg }} />
              </svg>
            </div>
            {showAnswer && (
              <div className={cn("p-3 rounded-lg text-sm font-semibold", guessed === quizComp.id ? "bg-circuit-lime/10 text-circuit-lime border border-circuit-lime/30" : "bg-redhawks-red/10 text-redhawks-red border border-redhawks-red/30")}>
                {guessed === quizComp.id ? "Correct!" : `Incorrect — it was ${quizComp.name}`}
                <p className="text-xs font-normal mt-1 text-redhawks-gray-500">{quizComp.description}</p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {COMPONENTS.slice(0, 8).map((c) => (
              <button
                key={c.id}
                disabled={showAnswer}
                onClick={() => handleGuess(c.id)}
                className={cn(
                  "px-3 py-2 text-sm rounded-lg border transition-all",
                  showAnswer && c.id === quizComp.id ? "border-circuit-lime bg-circuit-lime/20 text-circuit-lime" :
                  showAnswer && c.id === guessed && guessed !== quizComp.id ? "border-redhawks-red bg-redhawks-red/10 text-redhawks-red" :
                  "border-redhawks-gray-200 dark:border-redhawks-gray-700 hover:border-redhawks-gray-400 disabled:opacity-50"
                )}
              >{c.name}</button>
            ))}
          </div>
          {showAnswer && (
            <div className="flex justify-center">
              <button onClick={nextQuiz} className="px-6 py-2 text-sm font-semibold rounded-lg bg-redhawks-red text-white hover:bg-redhawks-red-dark transition-colors">
                Next →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
