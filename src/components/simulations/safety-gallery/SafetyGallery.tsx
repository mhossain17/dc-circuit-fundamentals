"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface Scenario {
  id: string;
  title: string;
  severity: "danger" | "warning" | "info";
  svgContent: string;
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
    svgContent: `
      <rect x="10" y="30" width="30" height="20" rx="4" fill="#CC0000" opacity="0.8"/>
      <text x="25" y="44" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">9V</text>
      <line x1="40" y1="35" x2="90" y2="35" stroke="#ff0" strokeWidth="3"/>
      <line x1="40" y1="45" x2="90" y2="45" stroke="#0044ff" strokeWidth="3"/>
      <line x1="90" y1="35" x2="90" y2="45" stroke="#f00" strokeWidth="5"/>
      <circle cx="90" cy="40" r="8" fill="#FF4400" opacity="0.7"/>
      <text x="90" y="44" textAnchor="middle" fontSize="12" fill="white">⚡</text>
      <text x="60" y="70" textAnchor="middle" fontSize="8" fill="#ff4444">DANGER: Direct short!</text>
    `,
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
    svgContent: `
      <rect x="10" y="30" width="30" height="20" rx="4" fill="#CC0000" opacity="0.8"/>
      <text x="25" y="44" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">9V</text>
      <line x1="40" y1="35" x2="70" y2="35" stroke="#0044ff" strokeWidth="2"/>
      <ellipse cx="90" cy="40" rx="15" ry="12" fill="none" stroke="#39FF14" strokeWidth="2"/>
      <line x1="84" y1="40" x2="96" y2="40" stroke="#39FF14" strokeWidth="2"/>
      <line x1="90" y1="34" x2="90" y2="46" stroke="#39FF14" strokeWidth="2"/>
      <line x1="40" y1="45" x2="70" y2="45" stroke="#ff8800" strokeWidth="2"/>
      <text x="75" y="62" textAnchor="middle" fontSize="8" fill="#ff8800">← Wrong direction</text>
      <text x="75" y="73" textAnchor="middle" fontSize="8" fill="#ff4444">LED may be destroyed!</text>
    `,
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
    svgContent: `
      <line x1="10" y1="40" x2="110" y2="40" stroke="#cc0" strokeWidth="6" strokeLinecap="round"/>
      <line x1="50" y1="40" x2="70" y2="40" stroke="#c88" strokeWidth="4"/>
      <ellipse cx="60" cy="40" rx="15" ry="8" fill="#c44" opacity="0.5"/>
      <text x="60" y="58" textAnchor="middle" fontSize="9" fill="#ff8800">Exposed conductor</text>
      <text x="60" y="69" textAnchor="middle" fontSize="9" fill="#ff4444">Shock / short hazard</text>
    `,
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
    svgContent: `
      <rect x="20" y="20" width="80" height="50" rx="8" fill="#444" stroke="#666"/>
      <rect x="25" y="25" width="70" height="40" rx="6" fill="#222"/>
      <ellipse cx="60" cy="45" rx="20" ry="12" fill="#ff4400" opacity="0.6"/>
      <path d="M50 35 L55 50 L58 42 L63 55 L60 35 Z" fill="#FFD700"/>
      <text x="60" y="83" textAnchor="middle" fontSize="9" fill="#ff4444">Overheating / Fire</text>
      <text x="60" y="15" textAnchor="middle" fontSize="9" fill="#ff8800">⚠ Never puncture or burn</text>
    `,
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
    svgContent: `
      <rect x="5" y="30" width="25" height="20" rx="3" fill="#CC0000" opacity="0.8"/>
      <text x="17" y="44" textAnchor="middle" fontSize="8" fill="white">Src</text>
      <line x1="30" y1="35" x2="50" y2="35" stroke="#cc0" strokeWidth="2"/>
      <rect x="50" y="28" width="15" height="14" rx="2" fill="none" stroke="#ccc" strokeWidth="1.5"/>
      <line x1="65" y1="35" x2="75" y2="35" stroke="#cc0" strokeWidth="2"/>
      <rect x="75" y="28" width="15" height="14" rx="2" fill="none" stroke="#ccc" strokeWidth="1.5"/>
      <line x1="90" y1="35" x2="100" y2="35" stroke="#cc0" strokeWidth="2"/>
      <rect x="100" y="28" width="15" height="14" rx="2" fill="none" stroke="#ccc" strokeWidth="1.5"/>
      <line x1="115" y1="35" x2="120" y2="35" stroke="#ff4400" strokeWidth="3"/>
      <ellipse cx="120" cy="35" rx="5" ry="5" fill="#ff4400" opacity="0.7"/>
      <text x="75" y="60" textAnchor="middle" fontSize="8" fill="#ff8800">Too many components</text>
      <text x="75" y="71" textAnchor="middle" fontSize="8" fill="#ff4444">Wire overheats!</text>
    `,
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
    svgContent: `
      <ellipse cx="60" cy="45" rx="45" ry="25" fill="none" stroke="#39FF14" strokeWidth="2"/>
      <ellipse cx="42" cy="45" rx="15" ry="12" fill="#0044AA" opacity="0.4" stroke="#39FF14" strokeWidth="1.5"/>
      <ellipse cx="78" cy="45" rx="15" ry="12" fill="#0044AA" opacity="0.4" stroke="#39FF14" strokeWidth="1.5"/>
      <line x1="57" y1="45" x2="63" y2="45" stroke="#39FF14" strokeWidth="2"/>
      <line x1="15" y1="45" x2="27" y2="45" stroke="#39FF14" strokeWidth="2"/>
      <line x1="93" y1="45" x2="105" y2="45" stroke="#39FF14" strokeWidth="2"/>
      <text x="60" y="82" textAnchor="middle" fontSize="9" fill="#39FF14">Always wear safety glasses</text>
      <text x="60" y="20" textAnchor="middle" fontSize="9" fill="#39FF14">✓ When soldering or cutting leads</text>
    `,
    hazard: "Working without eye protection during soldering, lead cutting, or capacitor discharge.",
    consequence: "Solder splatter, wire fragments, or capacitor explosion can cause permanent eye injury.",
    prevention: "Always wear ANSI Z87.1-rated safety glasses. Keep others back when working. Discharge capacitors before handling.",
    socraticQ: "At what point during a lab activity should you put on safety glasses — before or after picking up the soldering iron?",
    socraticA: "Before — hazards can occur instantly. Best practice: put safety glasses on before handling any components, tools, or powered circuits and only remove them when the lab is completely secured.",
  },
];

interface Props {
  onInteraction?: () => void;
}

export default function SafetyGallery({ onInteraction }: Props) {
  const [selected, setSelected] = useState<Scenario>(SCENARIOS[0]);
  const [showAnswer, setShowAnswer] = useState(false);

  const interact = () => onInteraction?.();

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

  return (
    <div className="space-y-4">
      {/* Scenario grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => { setSelected(s); setShowAnswer(false); interact(); }}
            className={cn(
              "p-2.5 rounded-lg border text-left text-xs transition-all",
              selected.id === s.id ? severityStyle[s.severity] + " border-2" : "border-redhawks-gray-200 dark:border-redhawks-gray-700 hover:border-redhawks-gray-400"
            )}
          >
            <span className={cn("inline-block px-1.5 py-0.5 rounded text-xs font-eng mb-1", severityBadge[s.severity])}>
              {s.severity.toUpperCase()}
            </span>
            <p className="font-semibold text-redhawks-black dark:text-redhawks-white text-xs leading-tight">{s.title}</p>
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

        {/* SVG illustration */}
        <div className="flex justify-center bg-[#111] rounded-xl p-4">
          <svg width={140} height={90} viewBox="0 0 120 90">
            <g dangerouslySetInnerHTML={{ __html: selected.svgContent }} />
          </svg>
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
              onClick={() => { setShowAnswer(true); interact(); }}
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
      </div>
    </div>
  );
}
