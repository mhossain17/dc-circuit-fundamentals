"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { NodeId, PlacedComponent, ComponentType } from "./useBreadboardEngine";

// Grid layout: 30 columns, 10 rows (a-e top, f-j bottom), plus rails
const COLS = Array.from({ length: 30 }, (_, i) => i + 1);
const ROWS_TOP = ["a", "b", "c", "d", "e"];
const ROWS_BOT = ["f", "g", "h", "i", "j"];

const CELL_SIZE = 18; // px per hole
const RAIL_HEIGHT = 14;
const GAP_HEIGHT = 20; // gap between top and bottom halves
const PADDING = 24;

const TOTAL_WIDTH = PADDING * 2 + COLS.length * CELL_SIZE;
const TOP_RAIL_Y = PADDING;
const TOP_GRID_Y = TOP_RAIL_Y + RAIL_HEIGHT + 8;
const BOT_GRID_Y = TOP_GRID_Y + ROWS_TOP.length * CELL_SIZE + GAP_HEIGHT;
const BOT_RAIL_Y = BOT_GRID_Y + ROWS_BOT.length * CELL_SIZE + 8;
const TOTAL_HEIGHT = BOT_RAIL_Y + RAIL_HEIGHT + PADDING;

function nodePos(nodeId: NodeId): { x: number; y: number } | null {
  // Rail nodes
  if (nodeId.startsWith("rail-pos-top-")) {
    const col = parseInt(nodeId.split("-")[3]);
    return { x: PADDING + (col - 1) * CELL_SIZE + CELL_SIZE / 2, y: TOP_RAIL_Y + RAIL_HEIGHT / 2 };
  }
  if (nodeId.startsWith("rail-neg-top-")) {
    const col = parseInt(nodeId.split("-")[3]);
    return { x: PADDING + (col - 1) * CELL_SIZE + CELL_SIZE / 2, y: TOP_RAIL_Y + RAIL_HEIGHT / 2 + 8 };
  }
  if (nodeId.startsWith("rail-pos-bot-")) {
    const col = parseInt(nodeId.split("-")[3]);
    return { x: PADDING + (col - 1) * CELL_SIZE + CELL_SIZE / 2, y: BOT_RAIL_Y + RAIL_HEIGHT / 2 };
  }
  if (nodeId.startsWith("rail-neg-bot-")) {
    const col = parseInt(nodeId.split("-")[3]);
    return { x: PADDING + (col - 1) * CELL_SIZE + CELL_SIZE / 2, y: BOT_RAIL_Y + RAIL_HEIGHT / 2 + 8 };
  }
  // Grid nodes: row + col (e.g. "a1", "f15")
  const match = nodeId.match(/^([a-j])(\d+)$/);
  if (!match) return null;
  const row = match[1];
  const col = parseInt(match[2]);
  const x = PADDING + (col - 1) * CELL_SIZE + CELL_SIZE / 2;
  const rowIdx = ROWS_TOP.indexOf(row);
  if (rowIdx >= 0) {
    return { x, y: TOP_GRID_Y + rowIdx * CELL_SIZE + CELL_SIZE / 2 };
  }
  const rowIdxB = ROWS_BOT.indexOf(row);
  if (rowIdxB >= 0) {
    return { x, y: BOT_GRID_Y + rowIdxB * CELL_SIZE + CELL_SIZE / 2 };
  }
  return null;
}

const COMPONENT_COLORS: Record<ComponentType, string> = {
  battery: "#CC0000",
  resistor: "#F59E0B",
  led: "#39FF14",
  wire: "#888888",
};

interface Props {
  components: PlacedComponent[];
  selectedType: ComponentType | null;
  selectedValue: number;
  currentPath: NodeId[];
  ledLit: boolean;
  faultState: string;
  onPlaceComponent: (nodeA: NodeId, nodeB: NodeId) => void;
  onRemoveComponent: (id: string) => void;
}

export function BreadboardGrid({
  components,
  selectedType,
  selectedValue,
  currentPath,
  ledLit,
  faultState,
  onPlaceComponent,
  onRemoveComponent,
}: Props) {
  const [firstNode, setFirstNode] = useState<NodeId | null>(null);
  const [hoverNode, setHoverNode] = useState<NodeId | null>(null);

  const handleNodeClick = (nodeId: NodeId) => {
    if (!selectedType) return;
    if (!firstNode) {
      setFirstNode(nodeId);
    } else {
      if (firstNode !== nodeId) {
        onPlaceComponent(firstNode, nodeId);
      }
      setFirstNode(null);
    }
  };

  const occupiedNodes = new Set(components.flatMap((c) => [c.nodeA, c.nodeB]));

  const renderHole = (nodeId: NodeId, x: number, y: number) => {
    const isFirst = firstNode === nodeId;
    const isHover = hoverNode === nodeId && selectedType;
    const isOccupied = occupiedNodes.has(nodeId);
    const inPath = currentPath.includes(nodeId);

    return (
      <circle
        key={nodeId}
        cx={x}
        cy={y}
        r={3.5}
        className="cursor-pointer"
        fill={isFirst ? "#39FF14" : inPath && faultState === "ok" ? "#39FF1460" : isHover ? "#39FF1440" : "#1a1a1a"}
        stroke={isFirst ? "#39FF14" : isOccupied ? "#666" : "#444"}
        strokeWidth={isFirst ? 1.5 : 1}
        onClick={() => handleNodeClick(nodeId)}
        onMouseEnter={() => setHoverNode(nodeId)}
        onMouseLeave={() => setHoverNode(null)}
      />
    );
  };

  // Render component line between two nodes
  const renderComponent = (comp: PlacedComponent) => {
    const posA = nodePos(comp.nodeA);
    const posB = nodePos(comp.nodeB);
    if (!posA || !posB) return null;
    const color = COMPONENT_COLORS[comp.type];
    const midX = (posA.x + posB.x) / 2;
    const midY = (posA.y + posB.y) / 2;

    return (
      <g key={comp.id}>
        <line
          x1={posA.x} y1={posA.y}
          x2={posB.x} y2={posB.y}
          stroke={color}
          strokeWidth={comp.type === "wire" ? 2 : 4}
          strokeLinecap="round"
          opacity={comp.type === "led" && ledLit ? 1 : 0.85}
        />
        {comp.type === "led" && ledLit && (
          <circle cx={midX} cy={midY} r={6} fill={color} opacity={0.3} />
        )}
        <circle
          cx={midX} cy={midY} r={5}
          fill={color}
          className="cursor-pointer"
          opacity={0.9}
          onClick={() => onRemoveComponent(comp.id)}
        >
          <title>Click to remove {comp.label}</title>
        </circle>
      </g>
    );
  };

  // Animated current particles
  const renderCurrentAnimation = () => {
    if (faultState !== "ok" || currentPath.length < 2) return null;
    // Draw dashed animated line along path segments
    const segments: React.ReactElement[] = [];
    for (let i = 0; i < currentPath.length - 1; i++) {
      const a = nodePos(currentPath[i]);
      const b = nodePos(currentPath[i + 1]);
      if (!a || !b) continue;
      segments.push(
        <line
          key={`anim-${i}`}
          x1={a.x} y1={a.y}
          x2={b.x} y2={b.y}
          stroke="#39FF14"
          strokeWidth={2}
          strokeDasharray="4 6"
          strokeLinecap="round"
          opacity={0.7}
          style={{ animation: "trace-flow 1s linear infinite" }}
        />
      );
    }
    return segments;
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-redhawks-gray-700 bg-[#111]">
      <svg
        width={TOTAL_WIDTH}
        height={TOTAL_HEIGHT}
        viewBox={`0 0 ${TOTAL_WIDTH} ${TOTAL_HEIGHT}`}
        style={{ display: "block" }}
      >
        {/* PCB green background */}
        <rect width={TOTAL_WIDTH} height={TOTAL_HEIGHT} fill="#0D2B15" rx={8} />

        {/* Top positive rail (red) */}
        <rect x={PADDING - 4} y={TOP_RAIL_Y} width={COLS.length * CELL_SIZE + 8} height={10} rx={2} fill="#CC000030" />
        <text x={PADDING - 14} y={TOP_RAIL_Y + 8} fontSize={8} fill="#CC0000" fontFamily="monospace">+</text>
        {COLS.map((col) => renderHole(`rail-pos-top-${col}`, PADDING + (col - 1) * CELL_SIZE + CELL_SIZE / 2, TOP_RAIL_Y + 5))}

        {/* Top negative rail (blue) */}
        <rect x={PADDING - 4} y={TOP_RAIL_Y + 12} width={COLS.length * CELL_SIZE + 8} height={10} rx={2} fill="#0044AA30" />
        <text x={PADDING - 14} y={TOP_RAIL_Y + 20} fontSize={8} fill="#4488FF" fontFamily="monospace">−</text>
        {COLS.map((col) => renderHole(`rail-neg-top-${col}`, PADDING + (col - 1) * CELL_SIZE + CELL_SIZE / 2, TOP_RAIL_Y + 17))}

        {/* Column number labels */}
        {COLS.filter((c) => c % 5 === 0).map((col) => (
          <text
            key={`col-label-${col}`}
            x={PADDING + (col - 1) * CELL_SIZE + CELL_SIZE / 2}
            y={TOP_GRID_Y - 2}
            fontSize={7}
            fill="#555"
            textAnchor="middle"
            fontFamily="monospace"
          >
            {col}
          </text>
        ))}

        {/* Top grid (rows a-e) */}
        {ROWS_TOP.map((row, rowIdx) => (
          <g key={row}>
            <text x={PADDING - 14} y={TOP_GRID_Y + rowIdx * CELL_SIZE + CELL_SIZE / 2 + 3} fontSize={8} fill="#555" fontFamily="monospace">{row}</text>
            {COLS.map((col) => renderHole(`${row}${col}`, PADDING + (col - 1) * CELL_SIZE + CELL_SIZE / 2, TOP_GRID_Y + rowIdx * CELL_SIZE + CELL_SIZE / 2))}
          </g>
        ))}

        {/* Center divider */}
        <rect x={PADDING - 4} y={TOP_GRID_Y + ROWS_TOP.length * CELL_SIZE + 4} width={COLS.length * CELL_SIZE + 8} height={GAP_HEIGHT - 8} rx={3} fill="#0A0A0A" />

        {/* Bottom grid (rows f-j) */}
        {ROWS_BOT.map((row, rowIdx) => (
          <g key={row}>
            <text x={PADDING - 14} y={BOT_GRID_Y + rowIdx * CELL_SIZE + CELL_SIZE / 2 + 3} fontSize={8} fill="#555" fontFamily="monospace">{row}</text>
            {COLS.map((col) => renderHole(`${row}${col}`, PADDING + (col - 1) * CELL_SIZE + CELL_SIZE / 2, BOT_GRID_Y + rowIdx * CELL_SIZE + CELL_SIZE / 2))}
          </g>
        ))}

        {/* Bottom positive rail */}
        <rect x={PADDING - 4} y={BOT_RAIL_Y} width={COLS.length * CELL_SIZE + 8} height={10} rx={2} fill="#CC000030" />
        <text x={PADDING - 14} y={BOT_RAIL_Y + 8} fontSize={8} fill="#CC0000" fontFamily="monospace">+</text>
        {COLS.map((col) => renderHole(`rail-pos-bot-${col}`, PADDING + (col - 1) * CELL_SIZE + CELL_SIZE / 2, BOT_RAIL_Y + 5))}

        {/* Bottom negative rail */}
        <rect x={PADDING - 4} y={BOT_RAIL_Y + 12} width={COLS.length * CELL_SIZE + 8} height={10} rx={2} fill="#0044AA30" />
        <text x={PADDING - 14} y={BOT_RAIL_Y + 20} fontSize={8} fill="#4488FF" fontFamily="monospace">−</text>
        {COLS.map((col) => renderHole(`rail-neg-bot-${col}`, PADDING + (col - 1) * CELL_SIZE + CELL_SIZE / 2, BOT_RAIL_Y + 17))}

        {/* Components */}
        {components.map(renderComponent)}

        {/* Current animation */}
        {renderCurrentAnimation()}
      </svg>
    </div>
  );
}
