import type { Unit } from "@/types/curriculum";

export const unit10: Unit = {
  id: "unit-10",
  number: 10,
  title: "Parallel Circuits",
  markingPeriod: 3,
  description: "Discover how parallel circuits differ from series in every measurable way — and why most real-world wiring is parallel.",
  lessons: [
    {
      id: "unit-10-lesson-1",
      unitId: "unit-10",
      number: "10.1",
      title: "How a Parallel Circuit Works",
      aim: "What is a parallel circuit, and why does adding more branches increase total current but decrease total resistance?",
      swbat: [
        "Define a parallel circuit and identify parallel connections in a schematic",
        "Explain that voltage is the same across all branches in a parallel circuit",
        "Predict what happens when one branch in a parallel circuit opens",
        "Explain why adding branches decreases total resistance",
      ],
      whyItMatters:
        "Every outlet in your home is wired in parallel. Every independent switch controls one branch. This is how real electrical systems work. Understanding parallel circuits is understanding the wiring of the modern world.",
      simulationKey: "parallel-circuit",
      simInteractionThreshold: 4,
      socraticPrompts: [
        "You have 3 resistors in parallel. One opens (breaks). What happens to the other two? How is this different from series?",
        "Voltage is the same across every branch in parallel. Why does this make sense if they all connect to the same two points?",
        "Adding branches to a parallel circuit decreases total resistance. Does that seem backwards? Why does it happen?",
        "Compare: how does the brightness of bulbs in parallel compare to series when you add a third bulb?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Build a parallel circuit with 3 equal resistors and a 9V battery. Place a virtual voltmeter across each resistor. Record the voltage reading at each position." },
        { id: "s2", instruction: "Now place ammeters in each branch. Record the current in each branch. Add up all branch currents. How does this compare to total current from the battery?" },
        { id: "s3", instruction: "Open one branch (disconnect R2). What happens to V and I in the other branches? Write your observation." },
        { id: "s4", instruction: "State two laws: (1) About voltage in parallel. (2) About current in parallel. These will become KCL." },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Parallel Circuit Characteristics",
          body: "VOLTAGE: Same across every branch — they all connect to the same two nodes.\nV_T = V₁ = V₂ = V₃\n\nCURRENT: Splits among branches. Each branch carries current according to its own resistance (Ohm's Law). Branch currents ADD up to total current.\nI_T = I₁ + I₂ + I₃\n\nFAILURE: If one branch opens, other branches continue to operate normally. This is the key advantage over series.",
        },
        {
          id: "c2",
          heading: "Why Parallel Resistance Decreases",
          body: "Adding branches provides MORE paths for current. More paths = less opposition = lower total resistance. This is counterintuitive but makes physical sense: two lanes of traffic flow more than one.\n\nFormula: 1/R_T = 1/R₁ + 1/R₂ + 1/R₃\n\nFor 2 resistors: R_T = (R₁ × R₂)/(R₁ + R₂)\n\nThe total resistance is ALWAYS less than the smallest branch resistor.",
        },
      ],
      questions: [
        {
          id: "q10-1-1",
          type: "mcq",
          prompt: "Three 300Ω resistors are connected in parallel. What is the total resistance?",
          pointsValue: 3,
          options: [
            { id: "a", text: "900Ω" },
            { id: "b", text: "300Ω" },
            { id: "c", text: "100Ω" },
            { id: "d", text: "150Ω" },
          ],
          correctOptionId: "c",
          explanation: "1/R_T = 1/300 + 1/300 + 1/300 = 3/300 = 1/100. R_T = 100Ω. Equal resistors in parallel: R_T = R/n = 300/3 = 100Ω.",
        },
        {
          id: "q10-1-2",
          type: "mcq",
          prompt: "A 9V parallel circuit has 3 branches. Branch 2 opens (breaks). What is the voltage across branches 1 and 3?",
          pointsValue: 2,
          options: [
            { id: "a", text: "9V / 2 = 4.5V each" },
            { id: "b", text: "9V each — unchanged" },
            { id: "c", text: "0V — the circuit is broken" },
            { id: "d", text: "Higher than 9V due to redistribution" },
          ],
          correctOptionId: "b",
          explanation: "Parallel branches connect directly to the source. As long as the source is intact and those branches are complete, they each see the full source voltage (9V).",
        },
      ],
      reflection: {
        prompts: [
          "Your bedroom has 4 outlets all wired in parallel. What would be the disadvantage if they were wired in series instead?",
          "Total resistance in parallel is always less than the smallest branch. Why does this seem 'backwards'? Explain the physics.",
        ],
      },
      standards: ["ETA-EM1-10", "NYS-NGLS-SEP-3", "NOCTI-10"],
      danielsonIndicators: ["3b", "3c"],
    },
    {
      id: "unit-10-lesson-2",
      unitId: "unit-10",
      number: "10.2",
      title: "Calculate Total Resistance, Voltage, Current & Power",
      aim: "How do we calculate all values in a parallel circuit systematically?",
      swbat: [
        "Apply the parallel resistance formula to calculate total resistance",
        "Calculate branch currents, total current, and power for each branch",
        "Build a complete circuit summary table for a parallel circuit",
      ],
      whyItMatters:
        "Parallel circuits carry more total current than their individual branches suggest. Without calculating correctly, designers undersize wires and fuses — a fire hazard.",
      simulationKey: "parallel-circuit",
      simInteractionThreshold: 5,
      socraticPrompts: [
        "You add a third branch to a parallel circuit. Does the total current increase or decrease? By how much?",
        "After finding total resistance, how do you find total current? Is it the same as branch current?",
        "Calculate power for a branch: which formula works best when you know V and R?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Build: V=12V, R1=1kΩ, R2=2kΩ. Calculate R_T using the formula. Then calculate I_T, I1, I2, and verify I1+I2=I_T." },
        { id: "s2", instruction: "Calculate P for each branch and P_total. Verify P_total = V_source × I_total." },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Parallel Circuit Formulas",
          body: "Total Resistance: 1/R_T = 1/R₁ + 1/R₂ + 1/R₃\nTotal Current: I_T = V_S / R_T = I₁ + I₂ + I₃\nBranch current: Iₙ = V_S / Rₙ (same V across all)\nPower each: Pₙ = V_S² / Rₙ = Vₙ × Iₙ\nTotal Power: P_T = V_S × I_T",
          formula: "1/R_T = 1/R₁ + 1/R₂ + 1/R₃\nIₙ = V_S / Rₙ",
        },
      ],
      questions: [
        {
          id: "q10-2-1",
          type: "numeric",
          prompt: "A parallel circuit: V=12V, R1=600Ω, R2=400Ω. What is R_total (in ohms)?",
          pointsValue: 3,
          correctValue: 240,
          tolerance: 1,
          toleranceType: "absolute",
          unit: "Ω",
        },
        {
          id: "q10-2-2",
          type: "numeric",
          prompt: "Using the same circuit above (V=12V, R_T=240Ω), what is total current I_T in mA?",
          pointsValue: 2,
          correctValue: 50,
          tolerance: 0.5,
          toleranceType: "absolute",
          unit: "mA",
        },
      ],
      reflection: {
        prompts: [
          "Why must the wire connecting the power source to a parallel circuit carry ALL branch currents combined? What does this mean for wire sizing?",
          "You calculated I_T = 200mA for a parallel circuit. You then add a third branch (R3=500Ω, V=12V). What is the new I_T?",
        ],
      },
      standards: ["ETA-EM1-10", "NYS-NGLS-SEP-5", "NOCTI-10"],
      danielsonIndicators: ["3c", "3d"],
    },
    {
      id: "unit-10-lesson-3",
      unitId: "unit-10",
      number: "10.3",
      title: "Calculate Unknown Values",
      aim: "How do we find unknowns in a parallel circuit using known measurements?",
      swbat: [
        "Use KCL and Ohm's Law to find unknown branch currents, resistances, or voltages",
        "Apply systematic problem-solving to identify unknowns from partial data",
      ],
      whyItMatters:
        "Troubleshooting parallel circuits means measuring partial data and inferring the rest. An extra branch drawing unexpected current indicates a fault — you need to find it.",
      simulationKey: "parallel-circuit",
      simInteractionThreshold: 4,
      socraticPrompts: [
        "You know I_T = 100mA and I₁ = 40mA. What must I₂ be if there are only two branches? What law did you use?",
        "You know V=9V and I₂=30mA. What is R₂?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Given: V=9V, R1=300Ω, I_T=60mA. Find R2. Show your approach." },
        { id: "s2", instruction: "Verify: does I1 + I2 = I_T?" },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Finding Unknowns in Parallel",
          body: "Use KCL: I_T = I₁ + I₂ + ... to find missing branch currents.\nUse Ohm's Law: Iₙ = V/Rₙ or Rₙ = V/Iₙ for each branch.\nVoltage is the same across ALL branches — always a known quantity if V_source is known.",
        },
      ],
      questions: [
        {
          id: "q10-3-1",
          type: "numeric",
          prompt: "V=12V, I_T=80mA, I1=30mA. What is R2 if there are only two branches (in ohms)?",
          pointsValue: 4,
          correctValue: 240,
          tolerance: 2,
          toleranceType: "absolute",
          unit: "Ω",
        },
      ],
      reflection: {
        prompts: [
          "In troubleshooting, you measure I_T is higher than expected. What does this tell you about the circuit?",
          "How does knowing V_source simplify parallel circuit analysis compared to series?",
        ],
      },
      standards: ["ETA-EM1-10", "NYS-NGLS-SEP-5", "NOCTI-10"],
      danielsonIndicators: ["3c", "3d"],
    },
    {
      id: "unit-10-lesson-4",
      unitId: "unit-10",
      number: "10.4",
      title: "Kirchhoff's Current Law",
      aim: "How does Kirchhoff's Current Law formalize the conservation of charge at a junction?",
      swbat: [
        "State Kirchhoff's Current Law (KCL)",
        "Apply KCL at any circuit node to find unknown branch currents",
        "Connect KCL to conservation of charge",
      ],
      whyItMatters:
        "KCL and KVL together are the complete set of fundamental circuit laws. Every advanced analysis method (mesh analysis, nodal analysis, Thevenin's theorem) is built on these two laws.",
      simulationKey: "parallel-circuit",
      simInteractionThreshold: 4,
      socraticPrompts: [
        "Current flows into a junction. Where does it all have to go? Can some of it 'disappear'?",
        "You measure currents flowing INTO a node: 50mA, 30mA. One current flows OUT. How much is it?",
        "Connect KCL to conservation of charge. What is charge conservation?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "At the junction where R1 and R2 branches meet, measure current in and out. State the relationship." },
        { id: "s2", instruction: "State KCL in algebraic form: ΣI_in = ΣI_out. Apply to a 3-branch circuit." },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Kirchhoff's Current Law (KCL)",
          body: "The sum of currents entering any node equals the sum of currents leaving that node.\n\nΣI_in = ΣI_out\n\nEquivalently: The algebraic sum of all currents at a node equals zero.\n\nThis is a statement of conservation of charge — charge cannot accumulate at a node. Every electron that enters must leave.",
          formula: "ΣI_in = ΣI_out\nI_T = I₁ + I₂ + I₃",
        },
      ],
      questions: [
        {
          id: "q10-4-1",
          type: "numeric",
          prompt: "Two currents flow INTO a node: 45mA and 20mA. One current flows out. What is the outgoing current (in mA)?",
          pointsValue: 2,
          correctValue: 65,
          tolerance: 0.5,
          toleranceType: "absolute",
          unit: "mA",
        },
        {
          id: "q10-4-2",
          type: "short_response",
          prompt: "Explain KCL in your own words and connect it to the principle of conservation of charge. Why can't current 'disappear' at a junction?",
          pointsValue: 5,
          placeholder: "KCL states that... This is connected to conservation of charge because... Current cannot disappear because...",
          danielsonIndicator: "3b",
        },
      ],
      reflection: {
        prompts: [
          "How are KVL and KCL complementary laws? What does each one 'conserve'?",
          "Give a real-world analogy for KCL (not the water pipe — find your own). Does your analogy hold up under scrutiny?",
        ],
      },
      standards: ["ETA-EM1-10", "NYS-NGLS-PS3-1", "NYS-NGLS-SEP-5", "NOCTI-10"],
      danielsonIndicators: ["3b", "3c", "3d"],
    },
  ],
};
