import type { Unit } from "@/types/curriculum";

export const unit8: Unit = {
  id: "unit-8",
  number: 8,
  title: "Series Circuits",
  markingPeriod: 2,
  description: "Analyze and calculate values in series circuits, and discover Kirchhoff's Voltage Law through hands-on exploration.",
  lessons: [
    {
      id: "unit-8-lesson-1",
      unitId: "unit-8",
      number: "8.1",
      title: "How a Series Circuit Works",
      aim: "What is a series circuit, and how does the single-path current flow determine its behavior?",
      swbat: [
        "Define a series circuit and identify series connections in a schematic",
        "Explain that current is the same through all components in a series circuit",
        "Predict what happens to the circuit when one series component fails open",
        "Explain the 'weakest link' characteristic of series circuits",
      ],
      whyItMatters:
        "Old Christmas lights were wired in series — one burned-out bulb killed the whole string. Modern circuits use parallel wiring because engineers understood this problem. Knowing when series is the wrong choice is as important as knowing how series works.",
      simulationKey: "series-circuit",
      simInteractionThreshold: 4,
      socraticPrompts: [
        "If you remove one component from this series circuit, what happens to all the others?",
        "Current is the same through every component in series. Why does this make sense physically?",
        "You have three resistors in series and remove the middle one. What happens to the other two resistors' currents?",
        "Why would a stage lighting designer NOT wire all lights in series?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Build a series circuit with 3 resistors (R1, R2, R3) and a 9V battery in the simulation. Place a virtual ammeter between each resistor." },
        { id: "s2", instruction: "Record the current at each measurement point. What pattern do you observe?" },
        { id: "s3", instruction: "Remove R2 (open the circuit at that point). What happens to all current measurements?" },
        { id: "s4", instruction: "Write a law: 'In a series circuit, current is _____ through all components. If one component opens, _____'." },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Series Circuit Characteristics",
          body: "In a series circuit, there is ONE path for current. All components carry the same current:\n\nI_total = I₁ = I₂ = I₃\n\nIf ANY component fails open, the entire circuit opens and ALL components stop operating. This is the 'weakest link' property.",
        },
        {
          id: "c2",
          heading: "Real-World Applications",
          body: "Series circuits are used for:\n• Simple on/off control (switch in series with load)\n• Current limiting (resistor in series with LED)\n• Fuses (designed to open when current exceeds safe level)\n• Voltage dividers\n\nNOT used for: multiple independent loads (use parallel).",
        },
      ],
      questions: [
        {
          id: "q8-1-1",
          type: "mcq",
          prompt: "In a series circuit with 4 components, the current through component 1 is 15mA. What is the current through component 4?",
          pointsValue: 2,
          options: [
            { id: "a", text: "Depends on component 4's resistance" },
            { id: "b", text: "15mA" },
            { id: "c", text: "15mA divided by 4 = 3.75mA" },
            { id: "d", text: "15mA multiplied by 4 = 60mA" },
          ],
          correctOptionId: "b",
          explanation: "Series circuits have the same current through every component. I₁ = I₂ = I₃ = I₄ = 15mA.",
        },
      ],
      reflection: {
        prompts: [
          "If you were designing a string of holiday lights, would you use series or parallel? Justify your choice.",
          "What happens to the brightness of other bulbs in a series string when you add more bulbs? Why?",
        ],
      },
      standards: ["ETA-EM1-8", "NYS-NGLS-SEP-3", "NOCTI-8"],
      danielsonIndicators: ["3b", "3c"],
    },
    {
      id: "unit-8-lesson-2",
      unitId: "unit-8",
      number: "8.2",
      title: "Calculate Total Resistance, Voltage, Current & Power",
      aim: "How do we calculate all values in a series circuit from Ohm's Law?",
      swbat: [
        "Calculate total resistance in a series circuit",
        "Calculate total current, individual voltage drops, and power for each component",
        "Apply a systematic problem-solving method to series circuits",
        "Build a 'circuit summary table' organizing all calculated values",
      ],
      whyItMatters:
        "Calculating before measuring lets you verify your measurements are correct and catch meter errors. Engineers never measure blind — they predict first.",
      simulationKey: "series-circuit",
      simInteractionThreshold: 5,
      socraticPrompts: [
        "If you add a resistor to a series circuit, does total resistance increase or decrease? Why?",
        "You measure a current of 5mA in a circuit but calculated 6mA. What are all the possible reasons?",
        "After calculating total current, how do you find voltage across each individual resistor?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Set up a circuit: V=12V, R1=1kΩ, R2=2.2kΩ, R3=680Ω. Calculate R_total first." },
        { id: "s2", instruction: "Use R_total to find I_total (Ohm's Law). Then use I_total to find V across each resistor." },
        { id: "s3", instruction: "Verify your work: do all voltage drops add up to 12V? If not, find your error." },
        { id: "s4", instruction: "Calculate power dissipated by each resistor and total power. Does P_total = V × I_total?" },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Series Circuit Formulas",
          body: "Total Resistance: R_T = R₁ + R₂ + R₃ + ...\nTotal Current: I_T = V_S / R_T\nVoltage across each: Vₙ = I_T × Rₙ\nPower each: Pₙ = I_T² × Rₙ\nTotal Power: P_T = V_S × I_T",
          formula: "R_T = R₁ + R₂ + R₃\nI_T = V_S / R_T\nVₙ = I_T × Rₙ",
        },
      ],
      questions: [
        {
          id: "q8-2-1",
          type: "numeric",
          prompt: "A series circuit has V=9V, R1=470Ω, R2=330Ω, R3=200Ω. What is R_total in ohms?",
          pointsValue: 2,
          correctValue: 1000,
          tolerance: 1,
          toleranceType: "absolute",
          unit: "Ω",
        },
        {
          id: "q8-2-2",
          type: "numeric",
          prompt: "Using the same circuit (V=9V, R_T=1000Ω), what is the total current in mA?",
          pointsValue: 2,
          correctValue: 9,
          tolerance: 0.1,
          toleranceType: "absolute",
          unit: "mA",
        },
        {
          id: "q8-2-3",
          type: "numeric",
          prompt: "In the same circuit, what is the voltage drop across R1 (470Ω) in volts?",
          pointsValue: 2,
          correctValue: 4.23,
          tolerance: 0.05,
          toleranceType: "absolute",
          unit: "V",
        },
      ],
      reflection: {
        prompts: [
          "Walk through the full problem-solving process for a 3-resistor series circuit. What are the 5 steps in order?",
          "What would happen to all other resistors' voltage drops if you increased R2 significantly?",
        ],
      },
      standards: ["ETA-EM1-8", "NYS-NGLS-SEP-5", "NOCTI-8"],
      danielsonIndicators: ["3c", "3d"],
    },
    {
      id: "unit-8-lesson-3",
      unitId: "unit-8",
      number: "8.3",
      title: "Calculate Unknown Values",
      aim: "How do we find unknown resistances, voltages, or currents when some values are missing?",
      swbat: [
        "Use Ohm's Law and series circuit rules to find unknown values",
        "Apply a systematic strategy for identifying unknowns from known information",
        "Verify solutions using multiple methods",
      ],
      whyItMatters:
        "Real troubleshooting means working backward from measurements to find what's wrong. 'I measured 3V here, but calculated 5V. What could cause this?' That's the core skill.",
      simulationKey: "series-circuit",
      simInteractionThreshold: 4,
      socraticPrompts: [
        "You know V_source, R1, and R2 but not R3. You can measure total current. How do you find R3?",
        "You measure V1 = 3V, V2 = 5V, V3 = unknown. V_source = 12V. What is V3? What law did you use?",
        "A component fails in a series circuit. How could you use voltage measurements to locate which one failed?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Given: V_source = 15V, R1 = 1kΩ, I_total = 5mA. Find R2 (unknown). Show all steps." },
        { id: "s2", instruction: "Verify by calculating V across each component. Check that voltages sum to V_source." },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Finding Unknowns — Strategy",
          body: "Step 1: List all known values (label as V, I, R, P for each component + totals)\nStep 2: Identify what you need to find\nStep 3: Look for any row or column where you have 2 of 3 values (apply Ohm's Law)\nStep 4: Use series rules (I_T = all I; V_drops sum to V_source; R_T = sum of all R)\nStep 5: Fill in unknowns systematically\nStep 6: Verify: voltage sum = source voltage",
        },
      ],
      questions: [
        {
          id: "q8-3-1",
          type: "numeric",
          prompt: "V_source=12V, R1=1kΩ, I_total=6mA. What is R2 (the only other resistor) in ohms?",
          pointsValue: 4,
          correctValue: 1000,
          tolerance: 10,
          toleranceType: "absolute",
          unit: "Ω",
        },
        {
          id: "q8-3-2",
          type: "short_response",
          prompt: "V_source=9V, V1=3.3V, V2=2.2V. What is V3? What law did you use? Write the equation.",
          pointsValue: 4,
          placeholder: "V3 = V_source − V1 − V2 = ...\nLaw used: ...",
          danielsonIndicator: "3d",
        },
      ],
      reflection: {
        prompts: [
          "Describe a real troubleshooting scenario where finding an 'unknown' value would help you locate a faulty component.",
          "What is the systematic strategy that keeps you from getting lost in a complex problem?",
        ],
      },
      standards: ["ETA-EM1-8", "NYS-NGLS-SEP-5", "NOCTI-8"],
      danielsonIndicators: ["3c", "3d"],
    },
    {
      id: "unit-8-lesson-4",
      unitId: "unit-8",
      number: "8.4",
      title: "Kirchhoff's Voltage Law",
      aim: "How does Kirchhoff's Voltage Law formalize the conservation of energy in a circuit?",
      swbat: [
        "State Kirchhoff's Voltage Law (KVL)",
        "Apply KVL to verify circuit calculations",
        "Use KVL to find unknown voltage drops",
        "Connect KVL to the conservation of energy principle",
      ],
      whyItMatters:
        "KVL is a direct consequence of conservation of energy. It is one of two master laws of circuit analysis (KCL is the other). Every circuit analysis method — including the ones used in computer-aided design tools — is built on these laws.",
      simulationKey: "series-circuit",
      simInteractionThreshold: 4,
      socraticPrompts: [
        "You've already used KVL in Unit 4 (energy conservation). Can you state it before I tell you?",
        "If voltage drops around a loop don't sum to the source voltage, what must be wrong?",
        "Apply KVL: V_source = 9V, V1 = 3V, V2 = 2V. Is there a V3? What must it be?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Measure voltage drops across each component in a 3-resistor series circuit. Add them up. Compare to V_source." },
        { id: "s2", instruction: "State KVL in your own words based on your measurement data." },
        { id: "s3", instruction: "Apply KVL algebraically: V_source − V1 − V2 − V3 = 0. Use this to find an unknown V3." },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Kirchhoff's Voltage Law (KVL)",
          body: "The sum of all voltage rises and drops around any closed loop equals zero.\n\nEquivalently: The sum of voltage drops across all loads equals the source voltage.\n\nV_source = V₁ + V₂ + V₃ + ...\n\nThis is a direct statement of conservation of energy: every joule of energy provided by the source is consumed by the loads.",
          formula: "ΣV = 0   (around any closed loop)\nV_S = V₁ + V₂ + ... + Vₙ",
        },
      ],
      questions: [
        {
          id: "q8-4-1",
          type: "numeric",
          prompt: "In a series circuit: V_source=15V, V1=5.4V, V2=3.6V. What is V3 (in volts)?",
          pointsValue: 3,
          correctValue: 6,
          tolerance: 0.1,
          toleranceType: "absolute",
          unit: "V",
        },
        {
          id: "q8-4-2",
          type: "short_response",
          prompt: "Explain Kirchhoff's Voltage Law in your own words, and connect it to the principle of conservation of energy. Why do the voltage drops have to add up to the source voltage?",
          pointsValue: 5,
          placeholder: "KVL states that... This is connected to conservation of energy because...",
          danielsonIndicator: "3b",
        },
      ],
      reflection: {
        prompts: [
          "You calculated that V1+V2+V3 = 8.9V but V_source = 9V. List 3 possible reasons for the discrepancy.",
          "KVL is a 'fundamental law' — it was derived from conservation of energy. What other physics conservation laws might apply to circuits?",
        ],
      },
      standards: ["ETA-EM1-8", "NYS-NGLS-PS3-1", "NYS-NGLS-SEP-5", "NOCTI-8"],
      danielsonIndicators: ["3b", "3c", "3d"],
    },
  ],
};
