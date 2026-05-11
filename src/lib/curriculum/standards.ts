import type { Standard } from "@/types/curriculum";

export const STANDARDS: Standard[] = [
  // ETA-i EM1 Direct Current Standards
  { code: "ETA-EM1-1", framework: "ETA-i EM1", description: "Electrical safety practices and personal protective equipment" },
  { code: "ETA-EM1-2", framework: "ETA-i EM1", description: "Mathematics for electronics: notation, SI units, metric system" },
  { code: "ETA-EM1-3", framework: "ETA-i EM1", description: "Electronic component identification and schematic reading" },
  { code: "ETA-EM1-4", framework: "ETA-i EM1", description: "Atomic structure, energy, and basic electrical theory" },
  { code: "ETA-EM1-5", framework: "ETA-i EM1", description: "Electronic measurement equipment and proper usage" },
  { code: "ETA-EM1-6", framework: "ETA-i EM1", description: "Measurement of resistance, current, voltage, and power" },
  { code: "ETA-EM1-7", framework: "ETA-i EM1", description: "Ohm's Law: calculation of voltage, current, and resistance" },
  { code: "ETA-EM1-8", framework: "ETA-i EM1", description: "Series circuit analysis and Kirchhoff's Voltage Law" },
  { code: "ETA-EM1-9", framework: "ETA-i EM1", description: "Soldering techniques and wire splice connections" },
  { code: "ETA-EM1-10", framework: "ETA-i EM1", description: "Parallel circuit analysis and Kirchhoff's Current Law" },
  { code: "ETA-EM1-11", framework: "ETA-i EM1", description: "Series-parallel combination circuits and Thevenin's Theorem" },

  // NYS CDOS Standards
  { code: "NYS-CDOS-1", framework: "NYS CDOS", description: "Apply academic knowledge and skills to career and technical education" },
  { code: "NYS-CDOS-3a", framework: "NYS CDOS", description: "Universal Foundation Skills — Technology" },

  // NYS NGLS Science & Engineering Practices
  { code: "NYS-NGLS-SEP-1", framework: "NYS NGLS", description: "Asking questions and defining problems" },
  { code: "NYS-NGLS-SEP-2", framework: "NYS NGLS", description: "Developing and using models" },
  { code: "NYS-NGLS-SEP-3", framework: "NYS NGLS", description: "Planning and carrying out investigations" },
  { code: "NYS-NGLS-SEP-4", framework: "NYS NGLS", description: "Analyzing and interpreting data" },
  { code: "NYS-NGLS-SEP-5", framework: "NYS NGLS", description: "Using mathematics and computational thinking" },
  { code: "NYS-NGLS-SEP-6", framework: "NYS NGLS", description: "Constructing explanations and designing solutions" },
  { code: "NYS-NGLS-SEP-8", framework: "NYS NGLS", description: "Obtaining, evaluating, and communicating information" },
  { code: "NYS-NGLS-PS1-1", framework: "NYS NGLS", description: "Structure and Properties of Matter" },
  { code: "NYS-NGLS-PS3-1", framework: "NYS NGLS", description: "Definitions of Energy" },

  // NOCTI Pre-Engineering Standards
  { code: "NOCTI-1", framework: "NOCTI", description: "Safety in the electronics lab and workplace" },
  { code: "NOCTI-2", framework: "NOCTI", description: "Mathematics for electronics technology" },
  { code: "NOCTI-3", framework: "NOCTI", description: "Electronic components, symbols, and schematics" },
  { code: "NOCTI-4", framework: "NOCTI", description: "Circuit construction on a breadboard" },
  { code: "NOCTI-5", framework: "NOCTI", description: "Electronic test and measurement equipment" },
  { code: "NOCTI-6", framework: "NOCTI", description: "Electronic measurements: V, I, R, P" },
  { code: "NOCTI-7", framework: "NOCTI", description: "Ohm's Law applications" },
  { code: "NOCTI-8", framework: "NOCTI", description: "Series circuit analysis" },
  { code: "NOCTI-9", framework: "NOCTI", description: "Soldering and wire connections" },
  { code: "NOCTI-10", framework: "NOCTI", description: "Parallel circuit analysis" },
  { code: "NOCTI-11", framework: "NOCTI", description: "Combination circuit analysis" },
];

export function getStandardsByCode(codes: string[]): Standard[] {
  return STANDARDS.filter((s) => codes.includes(s.code));
}
