"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface Resistor {
  id: string;
  value: number;
  label: string;
}

const PRESET_RESISTORS = [100, 220, 330, 470, 1000, 2200, 4700, 10000];

interface Props {
  onInteraction?: () => void;
}

function formatR(r: number) {
  return r >= 1000 ? `${(r / 1000).toFixed(r % 1000 === 0 ? 0 : 1)}kΩ` : `${r}Ω`;
}

export default function SeriesCircuit({ onInteraction }: Props) {
  const [resistors, setResistors] = useState<Resistor[]>([
    { id: "r1", value: 330, label: "R1" },
    { id: "r2", value: 470, label: "R2" },
  ]);
  const [voltage, setVoltage] = useState(9);
  const [selectedPreset, setSelectedPreset] = useState(330);

  const interact = () => onInteraction?.();

  const addResistor = () => {
    if (resistors.length >= 6) return;
    const label = `R${resistors.length + 1}`;
    setResistors((prev) => [...prev, { id: `r-${Date.now()}`, value: selectedPreset, label }]);
    interact();
  };

  const removeResistor = (id: string) => {
    setResistors((prev) => prev.filter((r) => r.id !== id).map((r, i) => ({ ...r, label: `R${i + 1}` })));
    interact();
  };

  const updateValue = (id: string, value: number) => {
    setResistors((prev) => prev.map((r) => r.id === id ? { ...r, value } : r));
    interact();
  };

  const totalR = resistors.reduce((sum, r) => sum + r.value, 0);
  const current = totalR > 0 ? voltage / totalR : 0;
  const currentMa = current * 1000;

  return (
    <div className="space-y-5">
      {/* Voltage control */}
      <div className="flex items-center gap-4 flex-wrap">
        <div>
          <label className="text-xs font-eng text-redhawks-gray-400 block mb-1">Source Voltage</label>
          <div className="flex items-center gap-2">
            {[3, 5, 9, 12].map((v) => (
              <button
                key={v}
                onClick={() => { setVoltage(v); interact(); }}
                className={cn("px-3 py-1 text-xs font-eng rounded border transition-all",
                  voltage === v ? "border-redhawks-red bg-redhawks-red/10 text-redhawks-red" : "border-redhawks-gray-300 dark:border-redhawks-gray-700"
                )}
              >{v}V</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-eng text-redhawks-gray-400 block mb-1">Add Resistor</label>
          <div className="flex items-center gap-2">
            <select
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(parseInt(e.target.value))}
              className="px-2 py-1 text-xs font-eng border border-[var(--card-border)] rounded bg-[var(--card-bg)]"
            >
              {PRESET_RESISTORS.map((r) => <option key={r} value={r}>{formatR(r)}</option>)}
            </select>
            <button
              onClick={addResistor}
              disabled={resistors.length >= 6}
              className="px-3 py-1 text-xs font-eng bg-redhawks-red text-white rounded hover:bg-redhawks-red-dark disabled:opacity-40 transition-colors"
            >+ Add</button>
          </div>
        </div>
      </div>

      {/* Circuit diagram */}
      <div className="overflow-x-auto">
        <svg
          width={Math.max(400, 60 + resistors.length * 100 + 60)}
          height={120}
          viewBox={`0 0 ${Math.max(400, 60 + resistors.length * 100 + 60)} 120`}
          className="block"
        >
          {/* Battery */}
          <rect x={10} y={45} width={40} height={30} rx={4} fill="#CC0000" opacity={0.85} />
          <text x={30} y={62} textAnchor="middle" fontSize={10} fill="white" fontWeight="bold">{voltage}V</text>
          {/* Top wire from battery */}
          <line x1={50} y1={55} x2={70} y2={55} stroke="#cc0" strokeWidth={2.5} />
          {/* Resistors in series */}
          {resistors.map((r, i) => {
            const x = 70 + i * 100;
            const isLast = i === resistors.length - 1;
            return (
              <g key={r.id}>
                <rect x={x} y={42} width={55} height={26} rx={4} fill="none" stroke="#F59E0B" strokeWidth={2} />
                <text x={x + 27} y={57} textAnchor="middle" fontSize={9} fill="#F59E0B" fontWeight="bold">{r.label}</text>
                <text x={x + 27} y={67} textAnchor="middle" fontSize={8} fill="#888">{formatR(r.value)}</text>
                {/* Wire to next resistor or back to battery */}
                <line x1={x + 55} y1={55} x2={isLast ? x + 85 : x + 100} y2={55} stroke="#cc0" strokeWidth={2.5} />
              </g>
            );
          })}
          {/* Return wire to battery */}
          {resistors.length > 0 && (
            <>
              <line x1={70 + resistors.length * 100 - 15} y1={55} x2={70 + resistors.length * 100 - 15} y2={95} stroke="#4488FF" strokeWidth={2.5} />
              <line x1={30} y1={95} x2={70 + resistors.length * 100 - 15} y2={95} stroke="#4488FF" strokeWidth={2.5} />
              <line x1={30} y1={75} x2={30} y2={95} stroke="#4488FF" strokeWidth={2.5} />
            </>
          )}
          {/* Current direction arrows */}
          {current > 0 && (
            <text x={70 + resistors.length * 50} y={48} textAnchor="middle" fontSize={10} fill="#39FF14">→</text>
          )}
        </svg>
      </div>

      {/* Resistor controls */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {resistors.map((r) => (
          <div key={r.id} className="card-surface p-3 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-eng font-bold text-amber-500">{r.label}</span>
              <button onClick={() => removeResistor(r.id)} className="text-xs text-redhawks-gray-400 hover:text-redhawks-red">✕</button>
            </div>
            <select
              value={r.value}
              onChange={(e) => updateValue(r.id, parseInt(e.target.value))}
              className="w-full px-2 py-1 text-xs font-eng border border-[var(--card-border)] rounded bg-[var(--card-bg)]"
            >
              {PRESET_RESISTORS.map((v) => <option key={v} value={v}>{formatR(v)}</option>)}
            </select>
            <div className="text-xs text-redhawks-gray-400">
              V<sub>drop</sub>: <span className="font-eng text-redhawks-black dark:text-redhawks-white">{(current * r.value).toFixed(2)}V</span>
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "R_total", value: formatR(totalR), color: "text-amber-500" },
          { label: "Voltage", value: `${voltage}V`, color: "text-redhawks-red" },
          { label: "Current", value: `${currentMa.toFixed(2)} mA`, color: "text-circuit-lime" },
          { label: "KVL check", value: `ΣV = ${resistors.map(r => (current * r.value).toFixed(1)).join(" + ")} = ${(current * totalR).toFixed(1)}V`, color: "text-redhawks-gray-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="card-surface p-3 rounded-xl text-center">
            <p className="text-xs text-redhawks-gray-400 mb-1">{label}</p>
            <p className={cn("text-sm font-mono font-bold", color)}>{value}</p>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-lg bg-circuit-lime/5 border border-circuit-lime/20 text-xs text-redhawks-gray-500">
        <strong className="text-circuit-lime">KVL Rule:</strong> Sum of all voltage drops = source voltage. Each resistor&apos;s V_drop = I × R.
        Current is the same through all components in a series circuit.
      </div>
    </div>
  );
}
