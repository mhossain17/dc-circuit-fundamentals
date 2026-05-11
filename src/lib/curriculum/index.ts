import type { ComponentType } from "react";
import type { SimulationKey } from "@/types/curriculum";

export { ALL_UNITS, getUnit, getLesson, getAllLessons, getLessonById, MP_COLORS } from "./units";
export { STANDARDS, getStandardsByCode } from "./standards";

/* Lazy-load registry — keeps initial bundle small */
export const SIMULATION_REGISTRY: Record<SimulationKey, () => Promise<{ default: ComponentType<{ onInteraction?: () => void; onComplete?: () => void }> }>> = {
  "breadboard":          () => import("@/components/simulations/breadboard/BreadboardSim"),
  "safety-gallery":      () => import("@/components/simulations/safety-gallery/SafetyGallery"),
  "notation-converter":  () => import("@/components/simulations/notation-converter/NotationConverter"),
  "component-identifier":() => import("@/components/simulations/component-identifier/ComponentIdentifier"),
  "multimeter":          () => import("@/components/simulations/multimeter/MultimeterSim"),
  "resistor-color-code": () => import("@/components/simulations/resistor-color-code/ResistorColorCode"),
  "ohms-law":            () => import("@/components/simulations/ohms-law/OhmsLawExplorer"),
  "series-circuit":      () => import("@/components/simulations/series-circuit/SeriesCircuit"),
  "parallel-circuit":    () => import("@/components/simulations/parallel-circuit/ParallelCircuit"),
  "soldering":           () => import("@/components/simulations/soldering/SolderingSim"),
};

export const SIMULATION_LABELS: Record<SimulationKey, string> = {
  "breadboard":           "Interactive Breadboard",
  "safety-gallery":       "Safety Scenario Gallery",
  "notation-converter":   "Engineering Notation Converter",
  "component-identifier": "Component Identifier",
  "multimeter":           "Digital Multimeter",
  "resistor-color-code":  "Resistor Color Code",
  "ohms-law":             "Ohm's Law Explorer",
  "series-circuit":       "Series Circuit Builder",
  "parallel-circuit":     "Parallel Circuit Builder",
  "soldering":            "Soldering Simulator",
};
