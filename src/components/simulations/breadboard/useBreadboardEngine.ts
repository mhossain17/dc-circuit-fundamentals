import { useState, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type NodeId = string; // e.g. "a1", "b3", "rail-pos-1", "rail-neg-1"
export type ComponentType = "resistor" | "led" | "battery" | "wire";
export type FaultState = "ok" | "open" | "short" | "no_power";

export interface PlacedComponent {
  id: string;
  type: ComponentType;
  nodeA: NodeId;
  nodeB: NodeId;
  // Resistor: resistance in Ohms; LED: ~2V forward voltage (treated as 200Ω); Battery: voltage
  value: number;
  label: string;
}

export interface CurrentPath {
  nodes: NodeId[];
  current: number; // amps
}

export interface BreadboardState {
  components: PlacedComponent[];
  faultState: FaultState;
  voltage: number;      // computed supply voltage (battery)
  current: number;      // amps through main loop
  resistance: number;   // total series resistance
  currentPath: NodeId[];
  ledLit: boolean;
}

// ── Union-Find ────────────────────────────────────────────────────────────────

class UnionFind {
  private parent: Map<string, string> = new Map();

  find(x: string): string {
    if (!this.parent.has(x)) this.parent.set(x, x);
    if (this.parent.get(x) !== x) {
      this.parent.set(x, this.find(this.parent.get(x)!));
    }
    return this.parent.get(x)!;
  }

  union(a: string, b: string) {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra !== rb) this.parent.set(ra, rb);
  }

  connected(a: string, b: string): boolean {
    return this.find(a) === this.find(b);
  }
}

// ── Breadboard topology constants ─────────────────────────────────────────────
// Half-board: columns 1-30, rows a-e (top) and f-j (bottom)
// Rows a-e are internally connected per column; f-j are connected per column
// Top & bottom are NOT connected unless a jumper/component bridges them
// Power rails: rail-pos-top, rail-neg-top, rail-pos-bot, rail-neg-bot

const ROWS_TOP = ["a", "b", "c", "d", "e"];
const ROWS_BOT = ["f", "g", "h", "i", "j"];
const COLS = Array.from({ length: 30 }, (_, i) => i + 1);

function buildBaseUnionFind(): UnionFind {
  const uf = new UnionFind();
  // Within each column, top group (a-e) and bottom group (f-j) are tied
  for (const col of COLS) {
    for (let i = 1; i < ROWS_TOP.length; i++) {
      uf.union(`${ROWS_TOP[0]}${col}`, `${ROWS_TOP[i]}${col}`);
    }
    for (let i = 1; i < ROWS_BOT.length; i++) {
      uf.union(`${ROWS_BOT[0]}${col}`, `${ROWS_BOT[i]}${col}`);
    }
  }
  // Power rails — all holes in each rail share a node
  for (const col of COLS) {
    uf.union("rail-pos-top", `rail-pos-top-${col}`);
    uf.union("rail-neg-top", `rail-neg-top-${col}`);
    uf.union("rail-pos-bot", `rail-pos-bot-${col}`);
    uf.union("rail-neg-bot", `rail-neg-bot-${col}`);
  }
  return uf;
}

// ── Circuit Analysis ──────────────────────────────────────────────────────────

function analyzeCircuit(components: PlacedComponent[]): Omit<BreadboardState, "components"> {
  const uf = buildBaseUnionFind();

  // Add every component as a connection between its two nodes
  // For circuit analysis, this gives us connectivity
  for (const comp of components) {
    uf.union(comp.nodeA, comp.nodeB);
  }

  // Find battery
  const battery = components.find((c) => c.type === "battery");
  if (!battery) {
    return { faultState: "no_power", voltage: 0, current: 0, resistance: 0, currentPath: [], ledLit: false };
  }

  const posNode = battery.nodeA; // positive terminal
  const negNode = battery.nodeB; // negative terminal

  // Check for direct short: pos and neg connected WITHOUT going through any resistive component
  // Simple check: are pos and neg in the same set BEFORE adding non-wire components?
  const ufNoResistors = buildBaseUnionFind();
  for (const comp of components) {
    if (comp.type === "wire" || comp.type === "battery") {
      ufNoResistors.union(comp.nodeA, comp.nodeB);
    }
  }
  if (ufNoResistors.connected(posNode, negNode)) {
    return { faultState: "short", voltage: battery.value, current: Infinity, resistance: 0, currentPath: [posNode, negNode], ledLit: false };
  }

  // Check if there's a complete loop through resistive components
  if (!uf.connected(posNode, negNode)) {
    return { faultState: "open", voltage: battery.value, current: 0, resistance: 0, currentPath: [], ledLit: false };
  }

  // Simple series resistance calculation (MVP: treat everything in series)
  const resistiveComponents = components.filter((c) => c.type === "resistor" || c.type === "led");
  const totalR = resistiveComponents.reduce((sum, c) => sum + c.value, 0);

  if (totalR === 0) {
    return { faultState: "short", voltage: battery.value, current: Infinity, resistance: 0, currentPath: [posNode, negNode], ledLit: false };
  }

  const I = battery.value / totalR;
  const hasLed = components.some((c) => c.type === "led");

  // Build a simple current path for animation
  const path: NodeId[] = [posNode];
  let current: NodeId = posNode;
  const visited = new Set<NodeId>([posNode]);
  // Walk through components from pos to neg
  const compsInOrder = [...components].filter((c) => c.type !== "battery");
  for (const comp of compsInOrder) {
    if (uf.connected(current, comp.nodeA) && !visited.has(comp.nodeB)) {
      path.push(comp.nodeA, comp.nodeB);
      visited.add(comp.nodeA);
      visited.add(comp.nodeB);
      current = comp.nodeB;
    } else if (uf.connected(current, comp.nodeB) && !visited.has(comp.nodeA)) {
      path.push(comp.nodeB, comp.nodeA);
      visited.add(comp.nodeA);
      visited.add(comp.nodeB);
      current = comp.nodeA;
    }
  }
  path.push(negNode);

  return {
    faultState: "ok",
    voltage: battery.value,
    current: I,
    resistance: totalR,
    currentPath: path,
    ledLit: hasLed && I > 0.005,
  };
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useBreadboardEngine(onInteraction?: () => void) {
  const [components, setComponents] = useState<PlacedComponent[]>([]);

  const addComponent = useCallback((comp: Omit<PlacedComponent, "id">) => {
    const id = `comp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setComponents((prev) => {
      // Replace if same nodes already occupied by same type
      const filtered = prev.filter(
        (c) => !(c.nodeA === comp.nodeA && c.nodeB === comp.nodeB && c.type === comp.type)
      );
      return [...filtered, { ...comp, id }];
    });
    onInteraction?.();
  }, [onInteraction]);

  const removeComponent = useCallback((id: string) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
    onInteraction?.();
  }, [onInteraction]);

  const clearAll = useCallback(() => {
    setComponents([]);
  }, []);

  const analysis = analyzeCircuit(components);

  return {
    components,
    addComponent,
    removeComponent,
    clearAll,
    ...analysis,
  };
}
