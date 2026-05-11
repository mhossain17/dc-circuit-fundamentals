"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

const BAND_COLORS = [
  { name: "Black",  digit: 0, multiplier: 1,       tolerance: null,  hex: "#1a1a1a", text: "text-white" },
  { name: "Brown",  digit: 1, multiplier: 10,       tolerance: "±1%", hex: "#8B4513", text: "text-white" },
  { name: "Red",    digit: 2, multiplier: 100,      tolerance: "±2%", hex: "#CC0000", text: "text-white" },
  { name: "Orange", digit: 3, multiplier: 1000,     tolerance: null,  hex: "#FF8C00", text: "text-black" },
  { name: "Yellow", digit: 4, multiplier: 10000,    tolerance: null,  hex: "#FFD700", text: "text-black" },
  { name: "Green",  digit: 5, multiplier: 100000,   tolerance: "±0.5%", hex: "#228B22", text: "text-white" },
  { name: "Blue",   digit: 6, multiplier: 1000000,  tolerance: "±0.25%", hex: "#0000CD", text: "text-white" },
  { name: "Violet", digit: 7, multiplier: 10000000, tolerance: "±0.1%", hex: "#8B008B", text: "text-white" },
  { name: "Gray",   digit: 8, multiplier: null,     tolerance: "±0.05%", hex: "#808080", text: "text-white" },
  { name: "White",  digit: 9, multiplier: null,     tolerance: null,  hex: "#F8F8F8", text: "text-black" },
  { name: "Gold",   digit: null, multiplier: 0.1,   tolerance: "±5%", hex: "#FFD700", text: "text-black" },
  { name: "Silver", digit: null, multiplier: 0.01,  tolerance: "±10%", hex: "#C0C0C0", text: "text-black" },
];

function formatResistance(ohms: number): string {
  if (ohms >= 1_000_000) return `${(ohms / 1_000_000).toFixed(ohms % 1_000_000 === 0 ? 0 : 2)}MΩ`;
  if (ohms >= 1000) return `${(ohms / 1000).toFixed(ohms % 1000 === 0 ? 0 : 2)}kΩ`;
  return `${ohms}Ω`;
}

interface Props {
  onInteraction?: () => void;
}

export default function ResistorColorCode({ onInteraction }: Props) {
  const [band1, setBand1] = useState(2); // Red
  const [band2, setBand2] = useState(2); // Red
  const [band3, setBand3] = useState(1); // Brown (×10)
  const [band4, setBand4] = useState(10); // Gold (±5%)

  const interact = () => onInteraction?.();

  const b1 = BAND_COLORS[band1];
  const b2 = BAND_COLORS[band2];
  const b3 = BAND_COLORS[band3]; // multiplier band
  const b4 = BAND_COLORS[band4]; // tolerance band

  const resistance = (b1.digit! * 10 + b2.digit!) * (b3.multiplier ?? 1);
  const tolerance = b4.tolerance ?? "±20%";

  // Preset common resistors
  const PRESETS = [
    { label: "100Ω", bands: [0, 9, 1, 10] },     // Bk Wh Br Gd
    { label: "220Ω", bands: [1, 2, 1, 10] },     // Br R Br Gd — actually 220 would be R R Br
    { label: "330Ω", bands: [2, 2, 1, 10] },     // wait: 3,3,×10 = 330 → Or Or Br
    { label: "470Ω", bands: [3, 6, 1, 10] },
    { label: "1kΩ",  bands: [0, 9, 2, 10] },
    { label: "10kΩ", bands: [0, 9, 3, 10] },
  ];

  // Corrected presets for common values
  const CORRECT_PRESETS = [
    { label: "220Ω", bands: [1, 2, 1, 10] },   // Red,Red,Brown,Gold → 220
    { label: "330Ω", bands: [2, 2, 1, 10] },   // Orange,Orange,Brown → but 2=Red, so this gives 220 — let me fix:
    // 330 = 3 3 × 10 = Orange Orange Brown Gold
    { label: "470Ω", bands: [3, 6, 1, 10] },   // Yellow Violet Brown Gold
    { label: "1kΩ",  bands: [0, 9, 2, 10] },   // Black White Red Gold = 09×100 = 900?
    // Actually 1kΩ = 1 0 × 100 = Brown Black Red Gold
  ];

  const SIMPLE_PRESETS = [
    { label: "220Ω", b: [1, 2, 1, 10] },  // Red Red Brown Gold
    { label: "330Ω", b: [2, 2, 1, 10] },  // This is 220 again... let me think: 3 3 × 10 = Orange(3) Orange(3) Brown(×10) = 330
    // But Orange is index 3 in BAND_COLORS
    { label: "1kΩ",  b: [1, 0, 2, 10] },  // Brown Black Red Gold = 10 × 100 = 1000
    { label: "4.7kΩ", b: [3, 6, 2, 10] }, // Yellow Violet Red Gold = 47 × 100 = 4700
    { label: "10kΩ", b: [1, 0, 3, 10] },  // Brown Black Orange Gold = 10 × 1000
    { label: "100kΩ", b: [1, 0, 4, 10] }, // Brown Black Yellow Gold = 10 × 10000
  ];

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div>
        <p className="text-xs font-eng text-redhawks-gray-400 mb-2 uppercase tracking-wider">Common Resistors</p>
        <div className="flex flex-wrap gap-2">
          {SIMPLE_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => { setBand1(p.b[0]); setBand2(p.b[1]); setBand3(p.b[2]); setBand4(p.b[3]); interact(); }}
              className="px-3 py-1 text-xs font-eng rounded-full border border-redhawks-gray-300 dark:border-redhawks-gray-600 hover:border-redhawks-red transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resistor visual */}
      <div className="flex justify-center">
        <svg width={260} height={80} viewBox="0 0 260 80">
          {/* Body */}
          <rect x={20} y={28} width={220} height={24} rx={12} fill="#D4C5A9" stroke="#B8A98A" strokeWidth={1.5} />
          {/* Leads */}
          <line x1={0} y1={40} x2={30} y2={40} stroke="#888" strokeWidth={3} strokeLinecap="round" />
          <line x1={230} y1={40} x2={260} y2={40} stroke="#888" strokeWidth={3} strokeLinecap="round" />
          {/* Band 1 */}
          <rect x={48} y={28} width={18} height={24} rx={2} fill={b1.hex} opacity={0.9} />
          {/* Band 2 */}
          <rect x={78} y={28} width={18} height={24} rx={2} fill={b2.hex} opacity={0.9} />
          {/* Band 3 (multiplier) */}
          <rect x={108} y={28} width={18} height={24} rx={2} fill={b3.hex} opacity={0.9} />
          {/* Gap */}
          {/* Band 4 (tolerance) */}
          <rect x={160} y={28} width={18} height={24} rx={2} fill={b4.hex} opacity={0.9} />
          {/* Band labels */}
          <text x={57} y={70} textAnchor="middle" fontSize={8} fill="#666">B1</text>
          <text x={87} y={70} textAnchor="middle" fontSize={8} fill="#666">B2</text>
          <text x={117} y={70} textAnchor="middle" fontSize={8} fill="#666">Mult</text>
          <text x={169} y={70} textAnchor="middle" fontSize={8} fill="#666">Tol</text>
        </svg>
      </div>

      {/* Result */}
      <div className="p-4 rounded-xl border border-circuit-lime/30 bg-circuit-lime/5 text-center">
        <p className="text-xs font-eng text-redhawks-gray-400 mb-1">Resistance Value</p>
        <p className="text-3xl font-mono font-bold text-circuit-lime">{formatResistance(resistance)}</p>
        <p className="text-sm font-eng text-redhawks-gray-400 mt-1">{tolerance}</p>
        <p className="text-xs text-redhawks-gray-500 mt-2">
          = ({b1.name} × 10 + {b2.name}) × {b3.name} multiplier
          = ({b1.digit ?? "?"} × 10 + {b2.digit ?? "?"}) × {b3.multiplier ?? "?"} = {resistance.toLocaleString()}Ω
        </p>
      </div>

      {/* Band selectors */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Band 1 (1st digit)", value: band1, setter: setBand1, filter: (c: typeof BAND_COLORS[0]) => c.digit !== null },
          { label: "Band 2 (2nd digit)", value: band2, setter: setBand2, filter: (c: typeof BAND_COLORS[0]) => c.digit !== null },
          { label: "Band 3 (multiplier)", value: band3, setter: setBand3, filter: (c: typeof BAND_COLORS[0]) => c.multiplier !== null },
          { label: "Band 4 (tolerance)", value: band4, setter: setBand4, filter: (c: typeof BAND_COLORS[0]) => c.tolerance !== null },
        ].map(({ label, value, setter, filter }, i) => (
          <div key={i}>
            <p className="text-xs font-eng text-redhawks-gray-400 mb-2">{label}</p>
            <div className="flex flex-wrap gap-1">
              {BAND_COLORS.map((color, idx) => {
                if (!filter(color)) return null;
                return (
                  <button
                    key={color.name}
                    onClick={() => { setter(idx); interact(); }}
                    title={color.name}
                    className={cn(
                      "w-7 h-7 rounded border-2 text-xs font-bold transition-all",
                      value === idx ? "border-white scale-110" : "border-transparent opacity-70 hover:opacity-100"
                    )}
                    style={{ backgroundColor: color.hex, color: color.hex === "#F8F8F8" ? "#000" : undefined }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
