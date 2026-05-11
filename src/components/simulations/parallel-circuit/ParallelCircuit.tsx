"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface Branch {
  id: string;
  value: number;
  label: string;
}

const PRESET_RESISTORS = [100, 220, 330, 470, 1000, 2200, 4700, 10000];

function formatR(r: number) {
  return r >= 1000 ? `${(r / 1000).toFixed(r % 1000 === 0 ? 0 : 1)}kΩ` : `${r}Ω`;
}

function formatCurrent(i: number) {
  const ma = i * 1000;
  return ma >= 1 ? `${ma.toFixed(2)} mA` : `${(ma * 1000).toFixed(1)} µA`;
}

interface Props {
  onInteraction?: () => void;
}

export default function ParallelCircuit({ onInteraction }: Props) {
  const [branches, setBranches] = useState<Branch[]>([
    { id: "b1", value: 330, label: "R1" },
    { id: "b2", value: 470, label: "R2" },
  ]);
  const [voltage, setVoltage] = useState(9);
  const [selectedPreset, setSelectedPreset] = useState(1000);

  const interact = () => onInteraction?.();

  const addBranch = () => {
    if (branches.length >= 5) return;
    const label = `R${branches.length + 1}`;
    setBranches((prev) => [...prev, { id: `b-${Date.now()}`, value: selectedPreset, label }]);
    interact();
  };

  const removeBranch = (id: string) => {
    setBranches((prev) => prev.filter((b) => b.id !== id).map((b, i) => ({ ...b, label: `R${i + 1}` })));
    interact();
  };

  const updateValue = (id: string, value: number) => {
    setBranches((prev) => prev.map((b) => b.id === id ? { ...b, value } : b));
    interact();
  };

  // Parallel equivalent resistance: 1/R_eq = Σ(1/Rn)
  const conductanceSum = branches.reduce((sum, b) => sum + 1 / b.value, 0);
  const equivalentR = conductanceSum > 0 ? 1 / conductanceSum : Infinity;
  const totalCurrent = conductanceSum * voltage; // I = V × ΣG

  const branchCurrents = branches.map((b) => voltage / b.value);

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        <div>
          <label className="text-xs font-eng text-redhawks-gray-400 block mb-1">Source Voltage</label>
          <div className="flex items-center gap-2">
            {[3, 5, 9, 12].map((v) => (
              <button key={v} onClick={() => { setVoltage(v); interact(); }}
                className={cn("px-3 py-1 text-xs font-eng rounded border transition-all",
                  voltage === v ? "border-redhawks-red bg-redhawks-red/10 text-redhawks-red" : "border-redhawks-gray-300 dark:border-redhawks-gray-700"
                )}>{v}V</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-eng text-redhawks-gray-400 block mb-1">Add Branch</label>
          <div className="flex items-center gap-2">
            <select value={selectedPreset} onChange={(e) => setSelectedPreset(parseInt(e.target.value))}
              className="px-2 py-1 text-xs font-eng border border-[var(--card-border)] rounded bg-[var(--card-bg)]">
              {PRESET_RESISTORS.map((r) => <option key={r} value={r}>{formatR(r)}</option>)}
            </select>
            <button onClick={addBranch} disabled={branches.length >= 5}
              className="px-3 py-1 text-xs font-eng bg-redhawks-red text-white rounded hover:bg-redhawks-red-dark disabled:opacity-40 transition-colors">
              + Add
            </button>
          </div>
        </div>
      </div>

      {/* Parallel circuit diagram */}
      <div className="overflow-x-auto rounded-xl border border-redhawks-gray-700 bg-[#0d0d0d] p-4">
        <svg width={Math.max(300, 80 + branches.length * 70)} height={160} viewBox={`0 0 ${Math.max(300, 80 + branches.length * 70)} 160`}>
          {/* Source on left */}
          <rect x={10} y={60} width={35} height={40} rx={4} fill="#CC0000" opacity={0.85} />
          <text x={27} y={84} textAnchor="middle" fontSize={10} fill="white" fontWeight="bold">{voltage}V</text>
          {/* Top and bottom rails */}
          <line x1={45} y1={65} x2={Math.max(280, 60 + branches.length * 70)} y2={65} stroke="#cc0" strokeWidth={2.5} />
          <line x1={45} y1={95} x2={Math.max(280, 60 + branches.length * 70)} y2={95} stroke="#4488FF" strokeWidth={2.5} />
          {/* Branch resistors */}
          {branches.map((b, i) => {
            const x = 65 + i * 70;
            const I = voltage / b.value;
            return (
              <g key={b.id}>
                <line x1={x + 20} y1={65} x2={x + 20} y2={48} stroke="#cc0" strokeWidth={1.5} />
                <rect x={x} y={48} width={40} height={20} rx={4} fill="none" stroke="#F59E0B" strokeWidth={1.5} />
                <text x={x + 20} y={61} textAnchor="middle" fontSize={8} fill="#F59E0B">{b.label}</text>
                <line x1={x + 20} y1={68} x2={x + 20} y2={95} stroke="#4488FF" strokeWidth={1.5} />
                {/* Current label */}
                <text x={x + 20} y={112} textAnchor="middle" fontSize={7} fill="#39FF14">
                  {(I * 1000).toFixed(1)}mA
                </text>
              </g>
            );
          })}
          {/* Total current arrow */}
          <text x={27} y={55} textAnchor="middle" fontSize={8} fill="#39FF14">↑ {formatCurrent(totalCurrent)}</text>
        </svg>
      </div>

      {/* Branch table */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {branches.map((b, i) => (
          <div key={b.id} className="card-surface p-3 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-eng font-bold text-amber-500">{b.label}</span>
              <button onClick={() => removeBranch(b.id)} className="text-xs text-redhawks-gray-400 hover:text-redhawks-red">✕</button>
            </div>
            <select value={b.value} onChange={(e) => updateValue(b.id, parseInt(e.target.value))}
              className="w-full px-2 py-1 text-xs font-eng border border-[var(--card-border)] rounded bg-[var(--card-bg)]">
              {PRESET_RESISTORS.map((v) => <option key={v} value={v}>{formatR(v)}</option>)}
            </select>
            <div className="text-xs text-redhawks-gray-400">
              I<sub>{i + 1}</sub>: <span className="font-eng text-circuit-lime">{formatCurrent(branchCurrents[i])}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: "R_equivalent", value: equivalentR === Infinity ? "∞" : formatR(Math.round(equivalentR)), color: "text-amber-500", note: "1/R_eq = " + branches.map(b => `1/${formatR(b.value)}`).join(" + ") },
          { label: "Total Current (I_T)", value: formatCurrent(totalCurrent), color: "text-circuit-lime", note: "I_T = I₁ + I₂ + … (KCL)" },
          { label: "Voltage (all branches)", value: `${voltage}V`, color: "text-redhawks-red", note: "Same across all parallel branches" },
        ].map(({ label, value, color, note }) => (
          <div key={label} className="card-surface p-3 rounded-xl">
            <p className="text-xs text-redhawks-gray-400 mb-1">{label}</p>
            <p className={cn("text-sm font-mono font-bold", color)}>{value}</p>
            <p className="text-xs text-redhawks-gray-500 mt-1">{note}</p>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-lg bg-circuit-lime/5 border border-circuit-lime/20 text-xs text-redhawks-gray-500">
        <strong className="text-circuit-lime">KCL Rule:</strong> Sum of branch currents = total current from source.
        All branches see the same voltage. Adding branches decreases equivalent resistance and increases total current.
      </div>
    </div>
  );
}
