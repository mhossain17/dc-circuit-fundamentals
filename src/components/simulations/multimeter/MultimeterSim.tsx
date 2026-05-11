"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

type DialMode = "off" | "VAC" | "VDC" | "mA" | "A" | "Ω" | "diode";
type LeadConfig = "correct" | "reversed" | "wrong_port" | "none";

interface CircuitScenario {
  id: string;
  label: string;
  description: string;
  trueVoltage: number;
  trueCurrent: number;  // mA
  trueResistance: number;
}

const SCENARIOS: CircuitScenario[] = [
  { id: "battery", label: "9V Battery", description: "Measure the terminal voltage of a 9V battery.", trueVoltage: 9, trueCurrent: 0, trueResistance: 0 },
  { id: "resistor", label: "330Ω Resistor", description: "Measure a 330Ω resistor out of circuit.", trueVoltage: 0, trueCurrent: 0, trueResistance: 330 },
  { id: "circuit", label: "LED Circuit", description: "9V battery, 330Ω resistor, and LED in series.", trueVoltage: 9, trueCurrent: 27.3, trueResistance: 330 },
];

const DIAL_MODES: { mode: DialMode; label: string; angle: number }[] = [
  { mode: "off", label: "OFF", angle: -90 },
  { mode: "VAC", label: "VAC", angle: -45 },
  { mode: "VDC", label: "VDC", angle: 0 },
  { mode: "mA", label: "mA", angle: 45 },
  { mode: "A", label: "A", angle: 90 },
  { mode: "Ω", label: "Ω", angle: 135 },
  { mode: "diode", label: "⊣|", angle: 180 },
];

function getReading(mode: DialMode, leads: LeadConfig, scenario: CircuitScenario): { value: string; unit: string; warning: string | null } {
  if (mode === "off") return { value: "------", unit: "", warning: null };
  if (leads === "none") return { value: "OL", unit: "", warning: null };

  if (leads === "wrong_port") {
    return { value: "DANGER", unit: "", warning: "⚠ WRONG PORT! Current through voltage/resistance ports can damage the multimeter and cause injury." };
  }

  if (leads === "reversed" && mode === "VDC") {
    return { value: `-${scenario.trueVoltage.toFixed(2)}`, unit: "V DC", warning: "Leads reversed — negative reading. Swap red (+) and black (−)." };
  }

  switch (mode) {
    case "VDC":
      if (scenario.trueVoltage === 0) return { value: "0.000", unit: "V DC", warning: null };
      return { value: scenario.trueVoltage.toFixed(2), unit: "V DC", warning: null };
    case "VAC":
      return { value: "0.00", unit: "V AC", warning: "This is a DC circuit — no AC voltage present." };
    case "mA":
      if (scenario.trueCurrent === 0) return { value: "0.0", unit: "mA", warning: null };
      // For mA mode the leads need to be in series — warn about parallel placement
      return { value: scenario.trueCurrent.toFixed(1), unit: "mA", warning: "Remember: ammeter must be in SERIES with the circuit, not parallel!" };
    case "A":
      return { value: (scenario.trueCurrent / 1000).toFixed(4), unit: "A", warning: null };
    case "Ω":
      if (scenario.trueResistance === 0) return { value: "OL", unit: "Ω", warning: "Cannot measure resistance of a powered circuit — disconnect power first!" };
      return { value: scenario.trueResistance.toFixed(0), unit: "Ω", warning: null };
    case "diode":
      return { value: "0.650", unit: "V", warning: null };
    default:
      return { value: "---", unit: "", warning: null };
  }
}

interface Props {
  onInteraction?: () => void;
}

export default function MultimeterSim({ onInteraction }: Props) {
  const [dialMode, setDialMode] = useState<DialMode>("off");
  const [leads, setLeads] = useState<LeadConfig>("none");
  const [scenario, setScenario] = useState<CircuitScenario>(SCENARIOS[0]);

  const interact = () => onInteraction?.();

  const handleDial = (mode: DialMode) => {
    setDialMode(mode);
    interact();
  };

  const handleLeads = (config: LeadConfig) => {
    setLeads(config);
    interact();
  };

  const { value, unit, warning } = getReading(dialMode, leads, scenario);
  const dialAngle = DIAL_MODES.find((d) => d.mode === dialMode)?.angle ?? -90;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Multimeter body */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-56 bg-redhawks-gray-900 rounded-2xl border-2 border-redhawks-gray-700 p-4 space-y-4">
            {/* Brand header */}
            <div className="text-center">
              <p className="text-xs font-eng text-redhawks-gray-500 tracking-widest">DIGITAL MULTIMETER</p>
              <p className="text-xs font-eng text-redhawks-red">RVS82T PRO</p>
            </div>

            {/* LCD Display */}
            <div className="bg-black rounded-lg p-3 border border-redhawks-gray-700 min-h-[60px] flex flex-col items-end justify-center">
              <span className={cn(
                "font-mono text-2xl font-bold tracking-wider",
                warning?.includes("DANGER") ? "text-redhawks-red animate-pulse" :
                dialMode === "off" ? "text-redhawks-gray-700" : "text-circuit-lime"
              )}>
                {value}
              </span>
              {unit && <span className="text-xs font-eng text-redhawks-gray-500 mt-1">{unit}</span>}
            </div>

            {/* Rotary Dial (SVG) */}
            <div className="flex justify-center">
              <svg width={120} height={120} viewBox="-60 -60 120 120">
                {/* Dial background */}
                <circle r={55} fill="#1a1a1a" stroke="#444" strokeWidth={1} />
                {/* Mode labels around dial */}
                {DIAL_MODES.map(({ mode, label, angle }) => {
                  const rad = (angle - 90) * (Math.PI / 180);
                  const lx = Math.cos(rad) * 44;
                  const ly = Math.sin(rad) * 44;
                  return (
                    <g key={mode} onClick={() => handleDial(mode)} className="cursor-pointer">
                      <circle cx={lx} cy={ly} r={10} fill={dialMode === mode ? "#39FF14" : "#333"} />
                      <text x={lx} y={ly + 3} textAnchor="middle" fontSize={7} fill={dialMode === mode ? "#000" : "#aaa"} fontFamily="monospace">
                        {label}
                      </text>
                    </g>
                  );
                })}
                {/* Pointer */}
                <line
                  x1={0} y1={0}
                  x2={Math.cos((dialAngle - 90) * (Math.PI / 180)) * 30}
                  y2={Math.sin((dialAngle - 90) * (Math.PI / 180)) * 30}
                  stroke="#CC0000"
                  strokeWidth={2}
                  strokeLinecap="round"
                  style={{ transition: "all 0.3s ease" }}
                />
                <circle r={4} fill="#CC0000" />
              </svg>
            </div>

            {/* Lead ports */}
            <div className="space-y-2">
              <p className="text-xs text-center font-eng text-redhawks-gray-500">Lead Connections</p>
              <div className="flex justify-between text-xs font-eng">
                <div className="w-10 h-10 rounded-full bg-redhawks-gray-800 border-2 border-redhawks-gray-600 flex items-center justify-center text-redhawks-gray-400">10A</div>
                <div className="w-10 h-10 rounded-full bg-redhawks-gray-800 border-2 border-redhawks-gray-600 flex items-center justify-center text-redhawks-gray-400">mA</div>
                <div className="w-10 h-10 rounded-full bg-redhawks-gray-800 border-2 border-yellow-500 flex items-center justify-center text-yellow-500">COM</div>
                <div className="w-10 h-10 rounded-full bg-redhawks-gray-800 border-2 border-redhawks-red flex items-center justify-center text-redhawks-red">VΩ</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Scenario selector */}
          <div>
            <p className="text-xs font-eng text-redhawks-gray-400 mb-2 uppercase tracking-wider">What to measure</p>
            <div className="space-y-2">
              {SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setScenario(s); interact(); }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg border text-sm transition-all",
                    scenario.id === s.id
                      ? "border-redhawks-red bg-redhawks-red/10 text-redhawks-black dark:text-redhawks-white"
                      : "border-redhawks-gray-200 dark:border-redhawks-gray-700 hover:border-redhawks-gray-400 dark:hover:border-redhawks-gray-500"
                  )}
                >
                  <div className="font-semibold text-xs">{s.label}</div>
                  <div className="text-xs text-redhawks-gray-400 mt-0.5">{s.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Lead configuration */}
          <div>
            <p className="text-xs font-eng text-redhawks-gray-400 mb-2 uppercase tracking-wider">Lead Setup</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { config: "correct" as LeadConfig, label: "Correct Leads", desc: "Red→VΩ, Black→COM" },
                { config: "reversed" as LeadConfig, label: "Reversed Leads", desc: "Red→COM, Black→VΩ" },
                { config: "wrong_port" as LeadConfig, label: "Wrong Port", desc: "Red in mA port" },
                { config: "none" as LeadConfig, label: "No Connection", desc: "Leads not touching" },
              ].map(({ config, label, desc }) => (
                <button
                  key={config}
                  onClick={() => handleLeads(config)}
                  className={cn(
                    "text-left px-2 py-2 rounded-lg border text-xs transition-all",
                    leads === config
                      ? "border-circuit-lime bg-circuit-lime/10"
                      : "border-redhawks-gray-200 dark:border-redhawks-gray-700 hover:border-redhawks-gray-400"
                  )}
                >
                  <div className="font-semibold text-redhawks-black dark:text-redhawks-white">{label}</div>
                  <div className="text-redhawks-gray-400 mt-0.5">{desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Warning display */}
          {warning && (
            <div className={cn(
              "p-3 rounded-lg border text-xs",
              warning.includes("DANGER") || warning.includes("⚠")
                ? "border-redhawks-red/50 bg-redhawks-red/10 text-redhawks-red"
                : "border-amber-400/50 bg-amber-400/10 text-amber-400"
            )}>
              {warning}
            </div>
          )}

          {/* Reading */}
          {!warning && dialMode !== "off" && leads !== "none" && (
            <div className="p-3 rounded-lg border border-circuit-lime/30 bg-circuit-lime/5">
              <p className="text-xs font-eng text-circuit-lime">Reading: <span className="font-bold">{value} {unit}</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
