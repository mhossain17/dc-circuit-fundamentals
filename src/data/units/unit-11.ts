import type { Unit } from "@/types/curriculum";

export const unit11: Unit = {
  id: "unit-11",
  number: 11,
  title: "Series/Parallel Combination Circuits",
  markingPeriod: 3,
  description: "Analyze complex circuits that combine series and parallel sections using systematic simplification strategies.",
  lessons: [
    {
      id: "unit-11-lesson-1",
      unitId: "unit-11",
      number: "11.1",
      title: "Explain Combinational Circuits",
      aim: "How do we identify series and parallel sections within a complex circuit?",
      swbat: [
        "Identify series and parallel sections within a combination circuit",
        "Redraw a complex circuit to reveal its structure",
        "Classify each component group as series or parallel",
      ],
      whyItMatters:
        "Every real circuit is a combination. Power supplies, amplifiers, logic circuits — none are purely series or parallel. The ability to 'see inside' a complex schematic is the core skill of an electronics technician.",
      simulationKey: "parallel-circuit",
      simInteractionThreshold: 4,
      socraticPrompts: [
        "Look at this schematic. Which resistors share the same current path? Which share the same two nodes?",
        "How do you tell if two components are in series vs. in parallel just by looking at the schematic?",
        "If you collapse (simplify) the parallel section to a single equivalent resistor, how does the circuit change?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Trace the current path in the simulation. Mark which components the SAME current flows through (series). Mark which components connect to the SAME two nodes (parallel)." },
        { id: "s2", instruction: "Redraw the circuit, replacing each parallel group with a single R_eq box. What simpler circuit does this reveal?" },
        { id: "s3", instruction: "List your steps for identifying structure: (1) Find parallel groups... (2) Simplify... (3) Identify remaining series connections..." },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Identifying Circuit Structure",
          body: "SERIES: Components that carry the SAME current. They form a single, continuous path.\nPARALLEL: Components that connect to the SAME two nodes. They share the same voltage.\n\nIn combination circuits:\n1. Identify parallel groups (components sharing same two nodes)\n2. Reduce each parallel group to R_eq\n3. The remaining circuit is a series circuit of R_eq values and remaining series components\n4. Solve using series formulas",
        },
      ],
      questions: [
        {
          id: "q11-1-1",
          type: "mcq",
          prompt: "R2 and R3 connect between the same two nodes in a circuit. R1 is between the battery and those same nodes. How are they connected?",
          pointsValue: 3,
          options: [
            { id: "a", text: "R1, R2, and R3 are all in series" },
            { id: "b", text: "R2 and R3 are in parallel; that parallel group is in series with R1" },
            { id: "c", text: "R1 and R2 are in parallel; R3 is in series" },
            { id: "d", text: "All three are in parallel" },
          ],
          correctOptionId: "b",
          explanation: "R2 and R3 share the same two nodes = parallel. R1 carries all current before the parallel section = series with the parallel group.",
        },
      ],
      reflection: {
        prompts: [
          "What is the first thing you look for when examining an unfamiliar schematic?",
          "Redraw a simple household device (lamp + switch + outlet) as a schematic and identify all series and parallel connections.",
        ],
      },
      standards: ["ETA-EM1-11", "NYS-NGLS-SEP-3", "NOCTI-11"],
      danielsonIndicators: ["3b", "3c"],
    },
    {
      id: "unit-11-lesson-2",
      unitId: "unit-11",
      number: "11.2",
      title: "Thevenin's Theorem",
      aim: "How can any complex two-terminal network be simplified to a single voltage source and single resistance?",
      swbat: [
        "State Thevenin's Theorem",
        "Identify the Thevenin equivalent voltage (V_th) and resistance (R_th) for a simple circuit",
        "Apply Thevenin's Theorem to simplify analysis of a load connected to a complex network",
      ],
      whyItMatters:
        "Thevenin's Theorem is why engineers can analyze one part of a circuit without knowing everything else. It's the mathematical foundation behind 'input impedance', 'output resistance', and source modeling — used in every advanced circuit analysis.",
      simulationKey: "parallel-circuit",
      simInteractionThreshold: 4,
      socraticPrompts: [
        "If you can't see inside a black box but can measure its open-circuit voltage and short-circuit current, what can you determine about it?",
        "A complex power supply can be replaced by a simpler equivalent. What properties must the equivalent preserve?",
        "Why would it be useful to replace a complex circuit with a simple V + R model?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Measure the open-circuit voltage across the terminals (V_th). This is the Thevenin voltage." },
        { id: "s2", instruction: "De-energize all independent sources (replace batteries with wires). Measure the resistance seen from the terminals (R_th)." },
        { id: "s3", instruction: "Connect a load resistor R_L. Using the Thevenin equivalent (V_th in series with R_th), calculate the current through R_L. Verify with the full circuit." },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Thevenin's Theorem",
          body: "Any linear two-terminal network can be replaced by:\n• V_th: The open-circuit voltage at the terminals\n• R_th: The equivalent resistance seen from the terminals with all independent sources set to zero (voltage sources → short circuit; current sources → open circuit)\n\nThe Thevenin equivalent circuit behaves identically to the original at the terminals.\n\nApplication: When analyzing a load connected to a complex network, replace the complex network with its Thevenin equivalent. The load analysis becomes a simple series circuit.",
          formula: "I_L = V_th / (R_th + R_L)",
        },
      ],
      questions: [
        {
          id: "q11-2-1",
          type: "mcq",
          prompt: "To find R_th in Thevenin's Theorem, what do you do to voltage sources?",
          pointsValue: 2,
          options: [
            { id: "a", text: "Leave them in place — they contribute to R_th" },
            { id: "b", text: "Replace them with open circuits" },
            { id: "c", text: "Replace them with short circuits (wires)" },
            { id: "d", text: "Reverse their polarity" },
          ],
          correctOptionId: "c",
          explanation: "An ideal voltage source has zero internal resistance. Setting it to zero means replacing it with a wire (short circuit). Current sources become open circuits.",
        },
        {
          id: "q11-2-2",
          type: "short_response",
          prompt: "Explain Thevenin's Theorem in your own words. Why is it useful in circuit analysis? Give one example of when you would apply it.",
          pointsValue: 5,
          placeholder: "Thevenin's Theorem states that... It is useful because... An example would be...",
          danielsonIndicator: "3b",
        },
      ],
      reflection: {
        prompts: [
          "How is Thevenin's Theorem similar to the way you estimate a person's mood — you don't need to know everything about them, just their 'open-circuit' state (when relaxed) and their internal resistance (how they respond to stress)?",
          "What limitations does Thevenin's Theorem have? (Hint: what does 'linear' mean in this context?)",
        ],
      },
      standards: ["ETA-EM1-11", "NYS-NGLS-SEP-5", "NOCTI-11"],
      danielsonIndicators: ["3b", "3c"],
    },
    {
      id: "unit-11-lesson-3",
      unitId: "unit-11",
      number: "11.3",
      title: "Calculate Total Resistance, Voltage, Current & Power",
      aim: "How do we systematically solve all values in a combination circuit?",
      swbat: [
        "Apply the step-by-step simplification method to solve combination circuits",
        "Calculate all voltages, currents, and powers in a combination circuit",
        "Verify results using both KVL and KCL",
      ],
      whyItMatters:
        "This is the culminating skill of the DC circuits curriculum. Mastering combination circuit analysis means you can analyze any DC circuit — period.",
      simulationKey: "parallel-circuit",
      simInteractionThreshold: 5,
      socraticPrompts: [
        "After reducing the parallel section to R_eq, what type of circuit do you have? What tools can you use?",
        "How do you 'expand back out' from the simplified circuit to find individual branch currents?",
        "Why is it important to verify your answer with KVL and KCL after solving?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Given: V=15V, R1=1kΩ (series), R2=3kΩ and R3=6kΩ (parallel with each other). Step 1: Find R_parallel (R2||R3)." },
        { id: "s2", instruction: "Step 2: Find R_total = R1 + R_parallel. Step 3: Find I_total = V/R_total. Step 4: Find V across R1 and V across parallel section." },
        { id: "s3", instruction: "Step 5: Use the parallel section voltage to find I2 and I3 individually. Verify I2 + I3 = I_total." },
        { id: "s4", instruction: "Verify with KVL: V_R1 + V_parallel = 15V?" },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Combination Circuit Solving Method",
          body: "Step 1: Identify and simplify all parallel groups → R_eq\nStep 2: Redraw as a series circuit of R_eq values\nStep 3: Calculate R_total, I_total using series rules\nStep 4: Find voltage across each section\nStep 5: 'Expand back out' — use section voltage to find branch currents in parallel groups\nStep 6: Calculate all powers\nStep 7: Verify: ΣV (KVL) and ΣI at each node (KCL)",
        },
      ],
      questions: [
        {
          id: "q11-3-1",
          type: "numeric",
          prompt: "V=12V, R1=2kΩ (series), R2=6kΩ and R3=3kΩ (parallel). What is R_parallel in ohms?",
          pointsValue: 2,
          correctValue: 2000,
          tolerance: 10,
          toleranceType: "absolute",
          unit: "Ω",
        },
        {
          id: "q11-3-2",
          type: "numeric",
          prompt: "Using the same circuit: R_total = R1 + R_parallel = 2kΩ + 2kΩ = 4kΩ. What is I_total in mA?",
          pointsValue: 2,
          correctValue: 3,
          tolerance: 0.1,
          toleranceType: "absolute",
          unit: "mA",
        },
        {
          id: "q11-3-3",
          type: "short_response",
          prompt: "Walk through ALL 7 steps of the combination circuit solving method for a circuit with V=9V, R1=1kΩ (series), R2=4kΩ and R3=4kΩ (parallel). Show every calculation.",
          pointsValue: 10,
          placeholder: "Step 1: R_parallel = ...\nStep 2: Redraw...\nStep 3: R_total = ..., I_total = ...\nStep 4: V_R1 = ..., V_parallel = ...\nStep 5: I2 = ..., I3 = ...\nStep 6: P_R1 = ..., P_R2 = ..., P_R3 = ...\nStep 7: KVL check: ... KCL check: ...",
          danielsonIndicator: "3d",
        },
      ],
      reflection: {
        prompts: [
          "Looking back at the entire DC circuits curriculum — what concept was hardest to master? How did you get there?",
          "What is ONE situation from daily life where knowing how to analyze a parallel circuit could help you troubleshoot something real?",
        ],
      },
      standards: ["ETA-EM1-11", "NYS-NGLS-SEP-5", "NYS-NGLS-SEP-3", "NOCTI-11"],
      danielsonIndicators: ["3c", "3d"],
    },
    {
      id: "unit-11-lesson-4",
      unitId: "unit-11",
      number: "11.4",
      title: "Calculate Unknown Values in Combination Circuits",
      aim: "How do we find missing values in a combination circuit from partial measurement data?",
      swbat: [
        "Use KVL, KCL, and Ohm's Law together to find unknowns in combination circuits",
        "Apply Thevenin's Theorem to simplify analysis when only terminal behavior is known",
        "Demonstrate a complete troubleshooting analysis given partial circuit data",
      ],
      whyItMatters:
        "This is real-world troubleshooting. You rarely have full data. You measure what you can and infer the rest. This is the skill that separates electronics technicians from parts-changers.",
      simulationKey: "parallel-circuit",
      simInteractionThreshold: 5,
      socraticPrompts: [
        "You measure I_total and V_source. One component value is unknown. What's your strategy for finding it?",
        "You know all resistor values but measure an unexpected I_total. What are the possible causes?",
        "How does Thevenin's Theorem help when you have a complex source and a load, but limited measurement access?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Given: V=12V, R1=2kΩ (series), R2=unknown (parallel with R3=4kΩ). I_total measured = 6mA. Find R2." },
        { id: "s2", instruction: "Apply Thevenin's Theorem: What is V_th at the parallel section terminals? What is R_th?" },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Unknown Value Strategy",
          body: "1. Write all known equations (Ohm's Law, KVL, KCL)\n2. Identify which equation has only ONE unknown\n3. Solve for that unknown\n4. Use result to solve the next unknown\n5. Continue until all values are found\n6. Verify with remaining equations",
        },
      ],
      questions: [
        {
          id: "q11-4-1",
          type: "numeric",
          prompt: "V=9V, R1=1kΩ (series), R2 unknown in parallel with R3=2kΩ. I_total = 6mA. R_total = V/I = 1.5kΩ. R_parallel = R_total - R1 = 0.5kΩ. Using R_parallel = R2||R3, find R2 in kΩ.",
          pointsValue: 5,
          correctValue: 1,
          tolerance: 0.05,
          toleranceType: "absolute",
          unit: "kΩ",
        },
        {
          id: "q11-4-2",
          type: "short_response",
          prompt: "You are a technician troubleshooting a combination circuit. You measure I_total is higher than calculated. List 4 possible causes and describe how you would test each hypothesis.",
          pointsValue: 8,
          placeholder: "Possible cause 1: ... Test: ...\nPossible cause 2: ...\nPossible cause 3: ...\nPossible cause 4: ...",
          danielsonIndicator: "3b",
        },
      ],
      reflection: {
        prompts: [
          "Reflect on your growth from Unit 1 to Unit 11. What is the most complex thing you can now do that you couldn't do at the start of the course?",
          "Write a 'letter to a future student' entering this class. What advice about DC circuits would you give them?",
        ],
      },
      standards: ["ETA-EM1-11", "NYS-NGLS-SEP-5", "NYS-NGLS-SEP-3", "NOCTI-11"],
      danielsonIndicators: ["3b", "3c", "3d"],
    },
  ],
};
