"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { useBreadboardEngine } from "./useBreadboardEngine";
import { ComponentPalette } from "./ComponentPalette";
import { BreadboardGrid } from "./BreadboardGrid";
import type { ComponentType, NodeId } from "./useBreadboardEngine";

interface Props {
  onInteraction?: () => void;
}

export default function BreadboardSim({ onInteraction }: Props) {
  const [selectedType, setSelectedType] = useState<ComponentType | null>(null);
  const [selectedValue, setSelectedValue] = useState(0);

  const engine = useBreadboardEngine(onInteraction);

  const handleSelect = (type: ComponentType, value: number) => {
    setSelectedType((prev) => (prev === type ? null : type));
    setSelectedValue(value);
  };

  const handlePlace = (nodeA: NodeId, nodeB: NodeId) => {
    if (!selectedType) return;
    const labels: Record<ComponentType, string> = {
      battery: "9V Battery",
      resistor: "330Ω Resistor",
      led: "LED",
      wire: "Wire",
    };
    engine.addComponent({ type: selectedType, nodeA, nodeB, value: selectedValue, label: labels[selectedType] });
  };

  const faultMessages: Record<string, { text: string; color: string }> = {
    ok: { text: `Circuit complete — I = ${(engine.current * 1000).toFixed(1)} mA | R = ${engine.resistance}Ω | V = ${engine.voltage}V`, color: "text-circuit-lime" },
    open: { text: "Open circuit — no complete path from + to −. Check your connections.", color: "text-amber-400" },
    short: { text: "⚠ SHORT CIRCUIT! Battery + and − connected directly. Remove direct connection.", color: "text-redhawks-red" },
    no_power: { text: "No battery placed. Add a battery to the breadboard first.", color: "text-redhawks-gray-400" },
  };

  const fault = faultMessages[engine.faultState];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-redhawks-black dark:text-redhawks-white">Breadboard Simulator</h3>
          <p className="text-xs text-redhawks-gray-400">Select a component, then click two holes to place it. Click the colored dot to remove.</p>
        </div>
        <button
          onClick={engine.clearAll}
          className="text-xs text-redhawks-gray-400 hover:text-redhawks-red transition-colors border border-redhawks-gray-300 dark:border-redhawks-gray-700 rounded px-2 py-1"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4">
        <ComponentPalette selectedType={selectedType} onSelect={handleSelect} />

        <div className="space-y-3">
          <BreadboardGrid
            components={engine.components}
            selectedType={selectedType}
            selectedValue={selectedValue}
            currentPath={engine.currentPath}
            ledLit={engine.ledLit}
            faultState={engine.faultState}
            onPlaceComponent={handlePlace}
            onRemoveComponent={engine.removeComponent}
          />

          {/* Status bar */}
          <div className={cn(
            "p-3 rounded-lg border text-xs font-eng",
            engine.faultState === "ok" ? "border-circuit-lime/30 bg-circuit-lime/5" :
            engine.faultState === "short" ? "border-redhawks-red/30 bg-redhawks-red/5" :
            engine.faultState === "open" ? "border-amber-400/30 bg-amber-400/5" :
            "border-redhawks-gray-300/30 bg-[var(--card-bg)]"
          )}>
            <span className={fault.color}>{fault.text}</span>
          </div>

          {/* Component list */}
          {engine.components.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-redhawks-gray-400 font-eng uppercase tracking-wider">Placed components</p>
              <div className="flex flex-wrap gap-2">
                {engine.components.map((comp) => (
                  <div key={comp.id} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-redhawks-gray-100 dark:bg-redhawks-gray-800 border border-redhawks-gray-200 dark:border-redhawks-gray-700">
                    <span className="text-xs text-redhawks-black dark:text-redhawks-white">{comp.label}</span>
                    <span className="text-xs text-redhawks-gray-400">({comp.nodeA}↔{comp.nodeB})</span>
                    <button onClick={() => engine.removeComponent(comp.id)} className="text-redhawks-gray-400 hover:text-redhawks-red text-xs ml-1">✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-3 rounded-lg bg-redhawks-gray-50 dark:bg-redhawks-gray-900 border border-redhawks-gray-200 dark:border-redhawks-gray-700">
        <p className="text-xs text-redhawks-gray-500">
          <span className="font-semibold text-redhawks-black dark:text-redhawks-white">Try this: </span>
          Place a Battery (e.g., a1 → a5), a Resistor (a5 → a10), and an LED (a10 → a15), then connect a Wire back (a15 → a1). Watch the LED light up!
        </p>
      </div>
    </div>
  );
}
