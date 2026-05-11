"use client";

import { useState, useRef } from "react";
import { ProgressBar } from "@/components/design-system/ProgressBar";
import { cn } from "@/lib/utils/cn";

/* ─────────────────────────────────────────────
   CSS keyframe animations injected once
───────────────────────────────────────────── */
const KEYFRAMES = `
@keyframes sparkPulse {
  0%,100% { opacity:0; transform:scale(0.4); }
  50%      { opacity:1; transform:scale(1.6); }
}
@keyframes flicker {
  0%,100% { opacity:0.65; filter:brightness(1); }
  33%     { opacity:1;    filter:brightness(1.4); }
  66%     { opacity:0.8;  filter:brightness(1.1); }
}
@keyframes hotWire {
  0%   { background: #facc15; box-shadow: 0 0 4px #facc15; }
  50%  { background: #f97316; box-shadow: 0 0 8px #f97316; }
  100% { background: #dc2626; box-shadow: 0 0 12px #dc2626; }
}
@keyframes arcFlash {
  0%,100% { opacity:0; }
  40%,60% { opacity:1; }
}
@keyframes ledDead {
  0%   { background:#ef4444; box-shadow:0 0 12px #ef4444; }
  60%  { background:#f97316; box-shadow:0 0 6px #f97316; }
  100% { background:#374151; box-shadow:none; }
}
@keyframes glassesSlide {
  0%   { transform:translateY(-28px); opacity:0; }
  100% { transform:translateY(0);    opacity:1; }
}
`;

/* ─────────────────────────────────────────────
   Scene components — pure CSS 3D workbench views
───────────────────────────────────────────── */

function ShortCircuitScene() {
  return (
    <div style={{ perspective: "600px" }} className="flex justify-center">
      <div style={{ transform: "rotateX(14deg)", transformOrigin: "center bottom" }}
           className="relative w-72 h-36 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border border-gray-600 shadow-2xl p-4 flex items-center justify-center gap-6">
        {/* 9V Battery */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-20 rounded-lg bg-gradient-to-b from-red-700 to-red-900 border-2 border-red-500 shadow-lg flex flex-col items-center justify-between py-2">
            <div className="w-4 h-2 bg-gray-300 rounded-sm" />
            <span className="text-white text-[9px] font-bold">9V</span>
            <div className="w-4 h-2 bg-gray-300 rounded-sm" />
          </div>
          <span className="text-gray-400 text-[8px] mt-1">Battery</span>
        </div>
        {/* Wires going to short */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-20 h-2 bg-red-400 rounded-full" />
          <div className="relative flex items-center">
            {/* Spark at short point */}
            <div style={{ animation: "sparkPulse 0.6s ease-in-out infinite", boxShadow: "0 0 16px #f97316" }}
                 className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-xs">⚡</span>
            </div>
          </div>
          <div className="w-20 h-2 bg-blue-400 rounded-full" />
        </div>
        {/* Danger label */}
        <div className="absolute bottom-2 right-3 text-[9px] text-red-400 font-bold font-mono">NO LOAD!</div>
      </div>
    </div>
  );
}

function ReversedPolarityScene() {
  return (
    <div style={{ perspective: "600px" }} className="flex justify-center">
      <div style={{ transform: "rotateX(14deg)", transformOrigin: "center bottom" }}
           className="relative w-72 h-36 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border border-gray-600 shadow-2xl p-4 flex items-center justify-center gap-5">
        {/* Battery */}
        <div className="w-10 h-16 rounded-lg bg-gradient-to-b from-red-700 to-red-900 border-2 border-red-500 flex items-center justify-center">
          <span className="text-white text-[9px] font-bold">9V</span>
        </div>
        {/* Arrow showing reversed direction */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-orange-400 text-xs font-bold">← REVERSED</span>
          <div className="w-16 h-1.5 bg-orange-400 rounded" />
        </div>
        {/* LED — dying animation */}
        <div className="flex flex-col items-center gap-1">
          {/* LED body */}
          <div style={{ animation: "ledDead 2s ease-in-out infinite" }}
               className="w-8 h-12 rounded-t-full rounded-b border-2 border-gray-400 flex items-end justify-center pb-1">
          </div>
          {/* Leads */}
          <div className="flex gap-2">
            <div className="w-0.5 h-4 bg-gray-400" />
            <div className="w-0.5 h-6 bg-gray-400" />
          </div>
          <span className="text-gray-400 text-[8px]">LED</span>
        </div>
        <div className="absolute bottom-2 right-3 text-[9px] text-red-400 font-bold font-mono">DESTROYED!</div>
      </div>
    </div>
  );
}

function DamagedWireScene() {
  return (
    <div style={{ perspective: "600px" }} className="flex justify-center">
      <div style={{ transform: "rotateX(14deg)", transformOrigin: "center bottom" }}
           className="relative w-72 h-36 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border border-gray-600 shadow-2xl p-4 flex items-center justify-center">
        {/* Wire with damaged section */}
        <div className="flex items-center w-full gap-0">
          {/* Good insulation left */}
          <div className="flex-1 h-5 bg-yellow-500 rounded-l-full shadow" />
          {/* Damaged gap */}
          <div className="relative mx-1">
            <div className="w-10 h-5 rounded" style={{ background: "linear-gradient(to right, #b45309, #b87333, #b45309)" }} />
            {/* Arc flash */}
            <div style={{ animation: "arcFlash 0.7s ease-in-out infinite" }}
                 className="absolute -top-3 left-1/2 -translate-x-1/2 text-yellow-300 text-base">⚡</div>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] text-orange-400 whitespace-nowrap">Exposed!</span>
          </div>
          {/* Good insulation right */}
          <div className="flex-1 h-5 bg-yellow-500 rounded-r-full shadow" />
        </div>
        <div className="absolute bottom-2 right-3 text-[9px] text-orange-400 font-bold font-mono">SHOCK RISK</div>
      </div>
    </div>
  );
}

function MisuseBatteryScene() {
  return (
    <div style={{ perspective: "600px" }} className="flex justify-center">
      <div style={{ transform: "rotateX(14deg)", transformOrigin: "center bottom" }}
           className="relative w-72 h-36 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border border-gray-600 shadow-2xl p-4 flex items-center justify-center gap-4">
        {/* 18650-style cylindrical battery */}
        <div className="relative flex flex-col items-center">
          <div className="w-10 h-4 rounded-t-full bg-gray-300" />
          <div className="w-14 h-20 rounded-lg bg-gradient-to-b from-gray-600 to-gray-800 border border-gray-500 flex items-center justify-center overflow-hidden">
            {/* Heat shimmer / fire */}
            <div style={{ animation: "flicker 0.9s ease-in-out infinite", clipPath: "polygon(50% 0%,0% 100%,100% 100%)" }}
                 className="w-8 h-10 bg-gradient-to-t from-orange-600 via-orange-400 to-yellow-300" />
          </div>
          <div className="w-14 h-3 rounded-b-full bg-gray-600 border-t border-gray-500" />
        </div>
        <div className="space-y-1 text-[9px]">
          <p className="text-red-400 font-bold">⚠ Thermal Runaway</p>
          <p className="text-gray-400">Never puncture,</p>
          <p className="text-gray-400">crush, or overcharge</p>
          <p className="text-gray-400">Li-ion batteries.</p>
        </div>
        <div className="absolute bottom-2 right-3 text-[9px] text-red-400 font-bold font-mono">FIRE RISK!</div>
      </div>
    </div>
  );
}

function OverloadedCircuitScene() {
  return (
    <div style={{ perspective: "600px" }} className="flex justify-center">
      <div style={{ transform: "rotateX(14deg)", transformOrigin: "center bottom" }}
           className="relative w-72 h-36 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border border-gray-600 shadow-2xl p-4 flex items-center justify-center gap-2">
        {/* Power source */}
        <div className="w-8 h-12 rounded bg-red-800 border border-red-600 flex items-center justify-center">
          <span className="text-white text-[8px] font-bold rotate-90">SRC</span>
        </div>
        <div className="w-4 h-1.5 bg-yellow-400 rounded" />
        {/* Three resistors in series */}
        {[1,2,3].map((n) => (
          <div key={n} className="flex items-center gap-1">
            <div className="w-8 h-6 rounded border-2 border-gray-400 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-300 text-[8px]">R{n}</span>
            </div>
            {n < 3 && <div className="w-3 h-1.5 bg-yellow-400 rounded" />}
          </div>
        ))}
        {/* Last wire segment — overheating */}
        <div className="w-6 h-2 rounded" style={{ animation: "hotWire 1.2s ease-in-out infinite alternate" }} />
        <div className="absolute bottom-2 right-3 text-[9px] text-orange-400 font-bold font-mono">OVERLOAD!</div>
      </div>
    </div>
  );
}

function SafetyGlassesScene() {
  return (
    <div style={{ perspective: "600px" }} className="flex justify-center">
      <div style={{ transform: "rotateX(14deg)", transformOrigin: "center bottom" }}
           className="relative w-72 h-36 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border border-gray-600 shadow-2xl p-4 flex items-center justify-center gap-6">
        {/* Face silhouette */}
        <div className="relative flex flex-col items-center">
          {/* Head */}
          <div className="w-16 h-20 rounded-t-full rounded-b-xl bg-gray-600 border border-gray-500 flex flex-col items-center justify-start pt-4 gap-1 overflow-hidden">
            {/* Safety glasses — slide in */}
            <div style={{ animation: "glassesSlide 1.2s ease-out forwards" }}
                 className="flex items-center gap-1">
              <div className="w-5 h-3.5 rounded border-2 border-green-400 bg-green-900/50" />
              <div className="w-2 h-0.5 bg-green-400" />
              <div className="w-5 h-3.5 rounded border-2 border-green-400 bg-green-900/50" />
            </div>
            {/* Nose/mouth suggestion */}
            <div className="w-1 h-2 bg-gray-500 rounded mt-1" />
            <div className="w-6 h-1 bg-gray-500 rounded mt-1" />
          </div>
        </div>
        <div className="space-y-1 text-[9px]">
          <p className="text-green-400 font-bold">✓ Eye Protection</p>
          <p className="text-gray-400">ANSI Z87.1 rated</p>
          <p className="text-gray-400">Wear before ANY</p>
          <p className="text-gray-400">lab activity.</p>
        </div>
        <div className="absolute bottom-2 right-3 text-[9px] text-green-400 font-bold font-mono">REQUIRED!</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Scenario data
───────────────────────────────────────────── */
interface Scenario {
  id: string;
  title: string;
  severity: "danger" | "warning" | "info";
  Scene: React.FC;
  hazard: string;
  consequence: string;
  prevention: string;
  socraticQ: string;
  socraticA: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "short_circuit",
    title: "Direct Short Circuit",
    severity: "danger",
    Scene: ShortCircuitScene,
    hazard: "Connecting battery + directly to battery − without any load.",
    consequence: "Massive current surge, rapid battery heating, possible fire, explosion, or toxic gas release.",
    prevention: "ALWAYS include a load (resistor, LED) in the circuit. Never connect + and − terminals with just a wire.",
    socraticQ: "If V = 9V and R = 0Ω, what does Ohm's Law tell us about the current? Why is this dangerous?",
    socraticA: "I = V/R = 9/0 = undefined (infinite). In practice, the only resistance is the battery's internal resistance, allowing enormous current that causes rapid heating.",
  },
  {
    id: "reversed_polarity",
    title: "Reversed Polarity",
    severity: "danger",
    Scene: ReversedPolarityScene,
    hazard: "Connecting polarized components (LED, electrolytic capacitor) backwards.",
    consequence: "LEDs stop working or burn out permanently. Electrolytic capacitors can explode if reversed.",
    prevention: "Check polarity before powering on. LED: long leg = anode (+). Cap: stripe = cathode (−). Use a multimeter in diode mode to verify.",
    socraticQ: "An LED's forward voltage is 2V. If connected backwards to 9V, what happens to it? How would a diode symbol help you identify the correct direction?",
    socraticA: "The LED acts as a reverse-biased diode — no current flows initially, but at high voltage it can break down and be permanently destroyed. The triangle in the schematic symbol points in the direction of conventional current flow.",
  },
  {
    id: "damaged_wire",
    title: "Damaged Insulation",
    severity: "warning",
    Scene: DamagedWireScene,
    hazard: "Using wires with cracked, frayed, or missing insulation.",
    consequence: "Accidental shock if you touch exposed conductor. Short circuit if wire touches another conductor.",
    prevention: "Inspect all wires before use. Replace damaged wires immediately. Never repair with regular tape — use electrical tape rated for the voltage.",
    socraticQ: "A wire carries 12V. Its insulation is cracked exposing the conductor. A student brushes their hand against it. What happens? How much current is dangerous to humans?",
    socraticA: "Current takes the path through the student to ground. As little as 10mA through the heart can cause fibrillation. At 12V with skin resistance ~10kΩ, current ≈ 1.2mA — less deadly but painful and startling, causing secondary injuries from falling.",
  },
  {
    id: "misuse_battery",
    title: "Battery Misuse",
    severity: "danger",
    Scene: MisuseBatteryScene,
    hazard: "Puncturing, overcharging, crushing, or short-circuiting lithium batteries.",
    consequence: "Thermal runaway: rapid uncontrolled heating, toxic gas venting, fire, or violent explosion.",
    prevention: "Use the correct charger. Never puncture or crush batteries. Store at room temperature. Recycle — never trash — lithium batteries.",
    socraticQ: "Why are lithium batteries more dangerous than alkaline batteries when shorted or damaged?",
    socraticA: "Lithium batteries have much higher energy density and contain flammable electrolyte. Damage can trigger thermal runaway — a self-sustaining exothermic reaction that releases stored energy as heat and toxic gases far faster than any protection circuit can respond.",
  },
  {
    id: "overloaded_circuit",
    title: "Overloaded Circuit",
    severity: "warning",
    Scene: OverloadedCircuitScene,
    hazard: "Connecting too many components to a power source, exceeding its current rating.",
    consequence: "Wires and components overheat. Wire insulation melts. Fire hazard. Power supply damage.",
    prevention: "Calculate total current draw before building. Check power supply and component ratings. Use a fuse rated slightly above expected current.",
    socraticQ: "A 9V power supply is rated at 500mA. You add three LEDs (each 20mA) and two 100Ω resistors in parallel. What is the total current? Is this safe?",
    socraticA: "3 LEDs × 20mA = 60mA. Two 100Ω resistors in parallel = 50Ω. I = 9/50 = 180mA. Total = 240mA < 500mA — safe in this case, but always calculate before assuming.",
  },
  {
    id: "safety_glasses",
    title: "Eye Protection",
    severity: "info",
    Scene: SafetyGlassesScene,
    hazard: "Working without eye protection during soldering, lead cutting, or capacitor discharge.",
    consequence: "Solder splatter, wire fragments, or capacitor explosion can cause permanent eye injury.",
    prevention: "Always wear ANSI Z87.1-rated safety glasses. Keep others back when working. Discharge capacitors before handling.",
    socraticQ: "At what point during a lab activity should you put on safety glasses — before or after picking up the soldering iron?",
    socraticA: "Before — hazards can occur instantly. Best practice: put safety glasses on before handling any components, tools, or powered circuits and only remove them when the lab is completely secured.",
  },
];

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
interface Props {
  onInteraction?: () => void;
  onComplete?: () => void;
}

const severityStyle = {
  danger: "border-redhawks-red/50 bg-redhawks-red/5",
  warning: "border-amber-400/50 bg-amber-400/5",
  info: "border-circuit-lime/30 bg-circuit-lime/5",
};

const severityBadge = {
  danger: "bg-redhawks-red text-white",
  warning: "bg-amber-400 text-black",
  info: "bg-circuit-lime text-black",
};

export default function SafetyGallery({ onInteraction, onComplete }: Props) {
  const [selected, setSelected] = useState<Scenario>(SCENARIOS[0]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [acknowledged, setAcknowledged] = useState<Set<string>>(new Set());
  const completeFired = useRef(false);

  const acknowledge = (id: string) => {
    setAcknowledged((prev) => {
      const next = new Set(prev);
      next.add(id);
      if (!completeFired.current && next.size === SCENARIOS.length) {
        completeFired.current = true;
        onComplete?.();
      }
      return next;
    });
    onInteraction?.();
  };

  const allDone = acknowledged.size === SCENARIOS.length;

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div className="space-y-4">
        {/* Progress */}
        <div className="flex items-center gap-3">
          <ProgressBar value={acknowledged.size} max={SCENARIOS.length} variant="lime" size="sm" className="flex-1" />
          <span className="text-xs font-eng text-circuit-lime whitespace-nowrap">
            {acknowledged.size} / {SCENARIOS.length} reviewed
          </span>
        </div>

        {allDone && (
          <div className="rounded-lg border border-circuit-lime/40 bg-circuit-lime/10 px-4 py-2.5 text-sm font-eng text-circuit-lime">
            ✓ All safety hazards reviewed — you may continue.
          </div>
        )}

        {/* Scenario grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => { setSelected(s); setShowAnswer(false); onInteraction?.(); }}
              className={cn(
                "p-2.5 rounded-lg border text-left text-xs transition-all relative",
                selected.id === s.id ? severityStyle[s.severity] + " border-2" : "border-redhawks-gray-200 dark:border-redhawks-gray-700 hover:border-redhawks-gray-400"
              )}
            >
              {acknowledged.has(s.id) && (
                <span className="absolute top-1.5 right-1.5 text-circuit-lime text-xs font-bold">✓</span>
              )}
              <span className={cn("inline-block px-1.5 py-0.5 rounded text-xs font-eng mb-1", severityBadge[s.severity])}>
                {s.severity.toUpperCase()}
              </span>
              <p className="font-semibold text-redhawks-black dark:text-redhawks-white text-xs leading-tight pr-4">{s.title}</p>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className={cn("rounded-xl border-2 p-5 space-y-4", severityStyle[selected.severity])}>
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-redhawks-black dark:text-redhawks-white">{selected.title}</h3>
            <span className={cn("px-2 py-0.5 rounded text-xs font-eng font-bold", severityBadge[selected.severity])}>
              {selected.severity.toUpperCase()}
            </span>
          </div>

          {/* 3D CSS scene */}
          <div className="bg-[#111] rounded-xl p-4">
            <selected.Scene />
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs font-eng text-redhawks-gray-400 uppercase mb-1">Hazard</p>
              <p className="text-redhawks-black dark:text-redhawks-white">{selected.hazard}</p>
            </div>
            <div>
              <p className="text-xs font-eng text-redhawks-red uppercase mb-1">Consequence</p>
              <p className="text-redhawks-black dark:text-redhawks-white">{selected.consequence}</p>
            </div>
            <div>
              <p className="text-xs font-eng text-circuit-lime uppercase mb-1">Prevention</p>
              <p className="text-redhawks-black dark:text-redhawks-white">{selected.prevention}</p>
            </div>
          </div>

          {/* Socratic prompt */}
          <div className="border border-redhawks-gray-200 dark:border-redhawks-gray-700 rounded-xl p-4 space-y-3">
            <p className="text-xs font-eng text-redhawks-gray-400 uppercase tracking-wider">Think About It</p>
            <p className="text-sm font-semibold text-redhawks-black dark:text-redhawks-white">{selected.socraticQ}</p>
            {!showAnswer ? (
              <button
                onClick={() => { setShowAnswer(true); onInteraction?.(); }}
                className="text-xs font-eng text-circuit-lime hover:underline"
              >
                Reveal explanation →
              </button>
            ) : (
              <div className="p-3 rounded-lg bg-circuit-lime/5 border border-circuit-lime/20">
                <p className="text-xs text-redhawks-gray-600 dark:text-redhawks-gray-400">{selected.socraticA}</p>
              </div>
            )}
          </div>

          {/* Acknowledge button */}
          {!acknowledged.has(selected.id) ? (
            <button
              onClick={() => acknowledge(selected.id)}
              className="w-full py-2.5 text-sm font-semibold rounded-lg bg-redhawks-gray-800 hover:bg-redhawks-gray-700 dark:bg-redhawks-gray-700 dark:hover:bg-redhawks-gray-600 text-white border border-redhawks-gray-600 transition-colors"
            >
              I understand — mark as reviewed ✓
            </button>
          ) : (
            <div className="w-full py-2.5 text-sm font-semibold rounded-lg bg-circuit-lime/10 border border-circuit-lime/40 text-circuit-lime text-center">
              ✓ Reviewed
            </div>
          )}
        </div>
      </div>
    </>
  );
}
