"use client";

import { cn } from "@/lib/utils/cn";
import type { ComponentType } from "./useBreadboardEngine";

interface PaletteItem {
  type: ComponentType;
  label: string;
  color: string;
  description: string;
  defaultValue: number;
  valueLabel: string;
}

const PALETTE_ITEMS: PaletteItem[] = [
  {
    type: "battery",
    label: "Battery",
    color: "bg-redhawks-red",
    description: "9V DC power source",
    defaultValue: 9,
    valueLabel: "9V",
  },
  {
    type: "resistor",
    label: "Resistor",
    color: "bg-amber-500",
    description: "330Ω current-limiting resistor",
    defaultValue: 330,
    valueLabel: "330Ω",
  },
  {
    type: "led",
    label: "LED",
    color: "bg-circuit-lime",
    description: "Light-emitting diode (~2V Vf)",
    defaultValue: 200,
    valueLabel: "200Ω equiv.",
  },
  {
    type: "wire",
    label: "Wire",
    color: "bg-redhawks-gray-400",
    description: "Jumper wire",
    defaultValue: 0,
    valueLabel: "0Ω",
  },
];

interface Props {
  selectedType: ComponentType | null;
  onSelect: (type: ComponentType, value: number) => void;
}

export function ComponentPalette({ selectedType, onSelect }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-eng text-redhawks-gray-400 uppercase tracking-wider">Components</p>
      <div className="grid grid-cols-2 gap-2">
        {PALETTE_ITEMS.map((item) => (
          <button
            key={item.type}
            onClick={() => onSelect(item.type, item.defaultValue)}
            className={cn(
              "flex flex-col items-start p-2.5 rounded-lg border-2 text-left transition-all",
              selectedType === item.type
                ? "border-circuit-lime bg-circuit-lime/10"
                : "border-redhawks-gray-200 dark:border-redhawks-gray-700 hover:border-redhawks-gray-400 dark:hover:border-redhawks-gray-500 bg-[var(--card-bg)]"
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={cn("w-3 h-3 rounded-sm flex-shrink-0", item.color)} />
              <span className="text-xs font-semibold text-redhawks-black dark:text-redhawks-white">{item.label}</span>
            </div>
            <span className="text-xs font-eng text-redhawks-gray-400">{item.valueLabel}</span>
          </button>
        ))}
      </div>
      {selectedType && (
        <p className="text-xs text-circuit-lime italic mt-1">
          Click two breadboard holes to place a {selectedType}.
        </p>
      )}
    </div>
  );
}
