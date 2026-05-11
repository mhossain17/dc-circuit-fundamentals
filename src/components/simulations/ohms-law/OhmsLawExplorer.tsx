"use client";

import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils/cn";

interface Props {
  onInteraction?: () => void;
}

// Logarithmic slider helpers (for resistance)
function logToR(v: number) { return Math.round(Math.exp(v)); }
function rToLog(r: number) { return Math.log(r); }

export default function OhmsLawExplorer({ onInteraction }: Props) {
  const [voltage, setVoltage] = useState(9);       // 0–30V
  const [logR, setLogR] = useState(rToLog(330));   // log scale 1Ω–10kΩ
  const [movedVoltage, setMovedVoltage] = useState(false);
  const [movedR, setMovedR] = useState(false);

  const resistance = logToR(logR);
  const current = voltage / resistance;
  const power = voltage * current;

  const interact = () => onInteraction?.();

  // Generate V-I curve data for this resistance
  const chartData = useMemo(() => {
    return Array.from({ length: 31 }, (_, v) => ({
      V: v,
      I: parseFloat((v / resistance * 1000).toFixed(2)), // mA
    }));
  }, [resistance]);

  const bothMoved = movedVoltage && movedR;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-redhawks-black dark:text-redhawks-white">
                Voltage (V)
              </label>
              <span className="text-lg font-mono font-bold text-redhawks-red">{voltage} V</span>
            </div>
            <input
              type="range" min={0} max={30} step={0.5} value={voltage}
              onChange={(e) => {
                setVoltage(parseFloat(e.target.value));
                setMovedVoltage(true);
                interact();
              }}
              className="w-full accent-redhawks-red"
            />
            <div className="flex justify-between text-xs text-redhawks-gray-400 font-eng mt-1">
              <span>0V</span><span>15V</span><span>30V</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-redhawks-black dark:text-redhawks-white">
                Resistance (R)
              </label>
              <span className="text-lg font-mono font-bold text-amber-500">
                {resistance >= 1000 ? `${(resistance / 1000).toFixed(1)}kΩ` : `${resistance}Ω`}
              </span>
            </div>
            <input
              type="range" min={rToLog(1)} max={rToLog(10000)} step={0.01} value={logR}
              onChange={(e) => {
                setLogR(parseFloat(e.target.value));
                setMovedR(true);
                interact();
              }}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-xs text-redhawks-gray-400 font-eng mt-1">
              <span>1Ω</span><span>100Ω</span><span>1kΩ</span><span>10kΩ</span>
            </div>
          </div>

          {/* Computed values */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Current (I)", value: current >= 1 ? `${current.toFixed(3)} A` : `${(current * 1000).toFixed(2)} mA`, color: "text-circuit-lime" },
              { label: "Power (P)", value: `${(power * 1000).toFixed(1)} mW`, color: "text-amber-400" },
              { label: "I = V/R", value: `${voltage}/${resistance >= 1000 ? `${resistance}` : resistance}`, color: "text-redhawks-gray-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="card-surface p-3 text-center rounded-lg">
                <p className="text-xs text-redhawks-gray-400 mb-1">{label}</p>
                <p className={cn("text-sm font-mono font-bold", color)}>{value}</p>
              </div>
            ))}
          </div>

          {/* Ohm's Law triangle visual */}
          <div className="p-3 rounded-lg border border-redhawks-gray-200 dark:border-redhawks-gray-700 bg-[var(--card-bg)]">
            <p className="text-xs font-eng text-redhawks-gray-400 mb-2 text-center">Ohm's Law Triangle</p>
            <div className="flex items-center justify-center gap-4 text-sm font-mono">
              <div className="text-center">
                <div className="text-redhawks-red font-bold text-lg">V</div>
                <div className="text-redhawks-gray-400 text-xs">{voltage}V</div>
              </div>
              <div className="text-redhawks-gray-500">=</div>
              <div className="text-center">
                <div className="text-circuit-lime font-bold text-lg">I</div>
                <div className="text-redhawks-gray-400 text-xs">{(current * 1000).toFixed(1)}mA</div>
              </div>
              <div className="text-redhawks-gray-500">×</div>
              <div className="text-center">
                <div className="text-amber-500 font-bold text-lg">R</div>
                <div className="text-redhawks-gray-400 text-xs">{resistance}Ω</div>
              </div>
            </div>
          </div>
        </div>

        {/* V-I Graph */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-redhawks-black dark:text-redhawks-white">V-I Characteristic Curve</p>
          <p className="text-xs text-redhawks-gray-400">Slope = 1/R — steeper means less resistance (more current per volt)</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="V" label={{ value: "Voltage (V)", position: "insideBottom", offset: -4, fill: "#666", fontSize: 11 }} tick={{ fill: "#666", fontSize: 10 }} />
                <YAxis label={{ value: "Current (mA)", angle: -90, position: "insideLeft", fill: "#666", fontSize: 11 }} tick={{ fill: "#666", fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: 8 }}
                  labelStyle={{ color: "#aaa", fontSize: 11 }}
                  itemStyle={{ color: "#39FF14", fontSize: 11 }}
                  formatter={(v) => [`${v} mA`, "Current"]}
                  labelFormatter={(v) => `${v}V`}
                />
                <Line type="linear" dataKey="I" stroke="#39FF14" strokeWidth={2} dot={false} />
                {/* Current point marker */}
                <Line data={[{ V: voltage, I: parseFloat((current * 1000).toFixed(2)) }]} type="linear" dataKey="I" stroke="#CC0000" strokeWidth={0} dot={{ r: 6, fill: "#CC0000", strokeWidth: 2, stroke: "#fff" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {!bothMoved && (
            <p className="text-xs text-amber-400 italic text-center">Move both sliders to unlock Concept Reveal</p>
          )}
          {bothMoved && (
            <p className="text-xs text-circuit-lime italic text-center">Both values adjusted — Concept Reveal unlocked!</p>
          )}
        </div>
      </div>
    </div>
  );
}
