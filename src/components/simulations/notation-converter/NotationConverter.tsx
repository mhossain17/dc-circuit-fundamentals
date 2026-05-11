"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";

const PREFIXES = [
  { symbol: "G", name: "Giga",  power: 9,  factor: 1e9  },
  { symbol: "M", name: "Mega",  power: 6,  factor: 1e6  },
  { symbol: "k", name: "Kilo",  power: 3,  factor: 1e3  },
  { symbol: "",  name: "Base",  power: 0,  factor: 1    },
  { symbol: "m", name: "Milli", power: -3, factor: 1e-3 },
  { symbol: "μ", name: "Micro", power: -6, factor: 1e-6 },
  { symbol: "n", name: "Nano",  power: -9, factor: 1e-9 },
  { symbol: "p", name: "Pico",  power: -12, factor: 1e-12 },
];

const UNITS = ["V", "A", "Ω", "W", "F", "H"];

function toSciNotation(value: number): string {
  if (value === 0) return "0";
  const exp = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / Math.pow(10, exp);
  return `${mantissa.toFixed(3).replace(/\.?0+$/, "")} × 10^${exp}`;
}

function toBestPrefix(value: number, unit: string): string {
  if (value === 0) return `0 ${unit}`;
  const abs = Math.abs(value);
  const best = [...PREFIXES].sort((a, b) => {
    const da = Math.abs(Math.log10(abs / a.factor));
    const db = Math.abs(Math.log10(abs / b.factor));
    return da - db;
  })[0];
  const display = value / best.factor;
  const rounded = parseFloat(display.toPrecision(4));
  return `${rounded} ${best.symbol}${unit}`;
}

interface Props {
  onInteraction?: () => void;
}

export default function NotationConverter({ onInteraction }: Props) {
  const [inputStr, setInputStr] = useState("4700");
  const [inputPrefix, setInputPrefix] = useState(3); // index into PREFIXES
  const [unit, setUnit] = useState("Ω");
  const [error, setError] = useState("");

  const interact = () => onInteraction?.();

  const numericValue = parseFloat(inputStr);
  const baseValue = isNaN(numericValue) ? null : numericValue * PREFIXES[inputPrefix].factor;

  const handleInput = (v: string) => {
    setInputStr(v);
    setError(isNaN(parseFloat(v)) && v !== "" && v !== "-" ? "Invalid number" : "");
    interact();
  };

  const EXAMPLE_VALUES = [
    { label: "4.7kΩ", value: "4.7", prefix: 2, unit: "Ω" },
    { label: "9V", value: "9", prefix: 3, unit: "V" },
    { label: "27mA", value: "27", prefix: 4, unit: "A" },
    { label: "100μF", value: "100", prefix: 5, unit: "F" },
    { label: "470Ω", value: "470", prefix: 3, unit: "Ω" },
    { label: "1.5GHz", value: "1.5", prefix: 0, unit: "Hz" },
  ];

  return (
    <div className="space-y-6">
      {/* Quick examples */}
      <div>
        <p className="text-xs font-eng text-redhawks-gray-400 mb-2 uppercase tracking-wider">Try these values</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_VALUES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => {
                setInputStr(ex.value);
                setInputPrefix(ex.prefix);
                setUnit(ex.unit as typeof unit);
                interact();
              }}
              className="px-3 py-1 text-xs font-eng rounded-full border border-redhawks-gray-300 dark:border-redhawks-gray-600 hover:border-redhawks-red transition-colors"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input row */}
      <div className="flex items-center gap-3 flex-wrap">
        <input
          type="text"
          value={inputStr}
          onChange={(e) => handleInput(e.target.value)}
          className="w-32 px-3 py-2 text-sm font-eng border border-[var(--card-border)] rounded-lg bg-[var(--card-bg)] focus:outline-none focus:ring-2 focus:ring-circuit-lime"
          placeholder="e.g. 4.7"
        />
        <select
          value={inputPrefix}
          onChange={(e) => { setInputPrefix(parseInt(e.target.value)); interact(); }}
          className="px-3 py-2 text-sm font-eng border border-[var(--card-border)] rounded-lg bg-[var(--card-bg)] focus:outline-none focus:ring-2 focus:ring-circuit-lime"
        >
          {PREFIXES.map((p, i) => (
            <option key={p.symbol} value={i}>{p.symbol || "(base)"} — {p.name} (10^{p.power})</option>
          ))}
        </select>
        <select
          value={unit}
          onChange={(e) => { setUnit(e.target.value); interact(); }}
          className="px-3 py-2 text-sm font-eng border border-[var(--card-border)] rounded-lg bg-[var(--card-bg)] focus:outline-none focus:ring-2 focus:ring-circuit-lime"
        >
          {[...UNITS, "Hz"].map((u) => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>

      {error && <p className="text-xs text-redhawks-red">{error}</p>}

      {/* Prefix ladder visual */}
      <div>
        <p className="text-xs font-eng text-redhawks-gray-400 mb-3 uppercase tracking-wider">Metric Prefix Ladder</p>
        <div className="flex gap-1 items-end flex-wrap">
          {PREFIXES.map((p, i) => {
            const isSelected = i === inputPrefix;
            const height = 24 + (7 - i) * 8; // visual height varies
            return (
              <button
                key={p.symbol}
                onClick={() => { setInputPrefix(i); interact(); }}
                className={cn(
                  "flex flex-col items-center justify-end px-2 rounded-t-md transition-all border-b-2",
                  isSelected ? "border-circuit-lime bg-circuit-lime/20" : "border-redhawks-gray-600 bg-redhawks-gray-100 dark:bg-redhawks-gray-800 hover:border-redhawks-gray-400"
                )}
                style={{ height: `${height}px`, minWidth: "48px" }}
              >
                <span className={cn("text-xs font-eng font-bold", isSelected ? "text-circuit-lime" : "text-redhawks-gray-500")}>
                  {p.symbol || "—"}
                </span>
                <span className={cn("text-xs font-eng", isSelected ? "text-circuit-lime" : "text-redhawks-gray-400")}>
                  10^{p.power}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-2 flex gap-1 flex-wrap">
          {PREFIXES.map((p) => (
            <div key={p.name} className="text-xs text-redhawks-gray-400 w-[48px] text-center truncate">{p.name}</div>
          ))}
        </div>
      </div>

      {/* Conversions */}
      {baseValue !== null && !isNaN(baseValue) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="card-surface p-4 rounded-xl">
            <p className="text-xs font-eng text-redhawks-gray-400 mb-1">Base Units</p>
            <p className="text-lg font-mono font-bold text-redhawks-black dark:text-redhawks-white">
              {baseValue.toLocaleString(undefined, { maximumSignificantDigits: 6 })} {unit}
            </p>
          </div>
          <div className="card-surface p-4 rounded-xl">
            <p className="text-xs font-eng text-redhawks-gray-400 mb-1">Scientific Notation</p>
            <p className="text-lg font-mono font-bold text-redhawks-black dark:text-redhawks-white">
              {toSciNotation(baseValue)} {unit}
            </p>
          </div>
          <div className="card-surface p-4 rounded-xl">
            <p className="text-xs font-eng text-redhawks-gray-400 mb-1">Best Prefix</p>
            <p className="text-lg font-mono font-bold text-circuit-lime">
              {toBestPrefix(baseValue, unit)}
            </p>
          </div>
          <div className="card-surface p-4 rounded-xl space-y-1">
            <p className="text-xs font-eng text-redhawks-gray-400 mb-1">All Prefixes</p>
            {PREFIXES.filter((p) => p.factor).map((p) => (
              <p key={p.symbol} className="text-xs font-eng text-redhawks-gray-500">
                {(baseValue / p.factor).toPrecision(4)} {p.symbol}{unit}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
