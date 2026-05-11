"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { DragDropQuestion, DragDropAnswer, StudentAnswer } from "@/types/questions";

interface Props {
  question: DragDropQuestion;
  index: number;
  answer?: DragDropAnswer;
  onAnswer: (a: StudentAnswer) => void;
  readonly?: boolean;
}

export function DragAndDrop({ question, index, answer, onAnswer, readonly }: Props) {
  const [placements, setPlacements] = useState<Record<string, string>>(answer?.placements ?? {});
  const [dragging, setDragging] = useState<string | null>(null);

  const usedItems = Object.values(placements);
  const unusedItems = question.items.filter((item) => !usedItems.includes(item.id));

  const handleDrop = (zoneId: string) => {
    if (!dragging || readonly) return;
    const newPlacements = { ...placements, [zoneId]: dragging };
    setPlacements(newPlacements);
    setDragging(null);
    onAnswer({ type: "drag_drop", placements: newPlacements });
  };

  const removeFromZone = (zoneId: string) => {
    if (readonly) return;
    const newPlacements = { ...placements };
    delete newPlacements[zoneId];
    setPlacements(newPlacements);
    onAnswer({ type: "drag_drop", placements: newPlacements });
  };

  return (
    <div className="card-surface p-5 space-y-4">
      <div className="flex items-start gap-2">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-redhawks-red text-white text-xs font-bold flex items-center justify-center">{index}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-xs font-eng text-redhawks-gray-400">Drag & Drop</span>
            <span className="text-xs font-eng text-redhawks-gray-400">{question.pointsValue} pts</span>
          </div>
          <p className="text-sm font-semibold text-redhawks-black dark:text-redhawks-white leading-relaxed">{question.prompt}</p>
        </div>
      </div>

      <div className="pl-8 space-y-4">
        {/* Source items */}
        <div>
          <p className="text-xs text-redhawks-gray-400 mb-2">Drag items below:</p>
          <div className="flex flex-wrap gap-2">
            {unusedItems.map((item) => (
              <div
                key={item.id}
                draggable={!readonly}
                onDragStart={() => setDragging(item.id)}
                onDragEnd={() => setDragging(null)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm cursor-grab active:cursor-grabbing border-2 select-none",
                  "bg-redhawks-gray-100 dark:bg-redhawks-gray-800 border-redhawks-gray-200 dark:border-redhawks-gray-700",
                  "hover:border-redhawks-red transition-colors",
                  dragging === item.id && "opacity-50",
                  readonly && "cursor-default"
                )}
              >
                {item.label}
              </div>
            ))}
            {unusedItems.length === 0 && (
              <p className="text-xs text-redhawks-gray-400 italic">All items placed</p>
            )}
          </div>
        </div>

        {/* Drop zones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.zones.map((zone) => {
            const placedItemId = placements[zone.id];
            const placedItem = question.items.find((i) => i.id === placedItemId);
            return (
              <div
                key={zone.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(zone.id)}
                className={cn(
                  "min-h-16 rounded-lg border-2 border-dashed p-3 transition-all",
                  dragging && !placedItemId ? "border-circuit-lime bg-circuit-lime/5" : "border-redhawks-gray-300 dark:border-redhawks-gray-600"
                )}
              >
                <p className="text-xs font-semibold text-redhawks-gray-500 dark:text-redhawks-gray-400 mb-2">{zone.label}</p>
                {placedItem ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-redhawks-black dark:text-redhawks-white bg-circuit-lime/10 border border-circuit-lime/30 rounded-md px-2 py-1">
                      {placedItem.label}
                    </span>
                    {!readonly && (
                      <button
                        onClick={() => removeFromZone(zone.id)}
                        className="text-xs text-redhawks-gray-400 hover:text-redhawks-red ml-2"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-redhawks-gray-400 italic">Drop here</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
