import type { Unit } from "@/types/curriculum";

export const unit2: Unit = {
  id: "unit-2",
  number: 2,
  title: "Basic Mathematics for Electronics",
  markingPeriod: 1,
  description: "Master the mathematical tools engineers use every day: scientific notation, SI units, and metric conversions.",
  lessons: [
    {
      id: "unit-2-lesson-1",
      unitId: "unit-2",
      number: "2.1",
      title: "Using a Scientific Calculator",
      aim: "How does a scientific calculator become an engineer's most important tool?",
      swbat: [
        "Enter and evaluate expressions using order of operations on a scientific calculator",
        "Use the EE/EXP key to enter numbers in scientific notation",
        "Evaluate common engineering calculations (square roots, powers, fractions)",
      ],
      whyItMatters:
        "Engineers don't memorize calculations — they set them up correctly and let tools do the arithmetic. A calculator is only as smart as the person using it. Understanding its logic prevents costly mistakes.",
      simulationKey: "notation-converter",
      simInteractionThreshold: 3,
      socraticPrompts: [
        "Enter 2 + 3 × 4 into a calculator. What answer do you get? What did you expect? Why might they differ?",
        "How does a calculator 'know' the order of operations? Is it always right?",
        "When would using a calculator give you the WRONG answer even if you press the right buttons?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Without a calculator, predict the answer to: 12 + 6 / 2 − 3 × 4. Write it down." },
        { id: "s2", instruction: "Now enter it exactly as written into the calculator. Compare. Who was right — you or the calculator?" },
        { id: "s3", instruction: "Add parentheses to get a DIFFERENT answer. How many different answers can you create with parentheses?" },
        { id: "s4", instruction: "Find the EE or EXP key. Enter 4.7 × 10³. What does the display show? Is it the same number?" },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Order of Operations (PEMDAS/BODMAS)",
          body: "Calculators follow strict mathematical hierarchy: Parentheses → Exponents → Multiplication/Division (left to right) → Addition/Subtraction (left to right). Engineers use parentheses liberally to eliminate ambiguity.",
        },
        {
          id: "c2",
          heading: "The EE/EXP Key",
          body: "The EE key means '× 10^'. So '4.7 EE 3' means 4.7 × 10³ = 4,700. This is how engineers enter values in scientific notation without separately entering the power of 10. Never type '× 10 ^' — that gives wrong results on many calculators.",
          example: "4.7 EE 3 → 4700\n2.2 EE -6 → 0.0000022",
        },
      ],
      questions: [
        {
          id: "q2-1-1",
          type: "mcq",
          prompt: "What is the correct result of 18 / 2 + 3 × 4 using order of operations?",
          pointsValue: 2,
          options: [
            { id: "a", text: "48" },
            { id: "b", text: "21" },
            { id: "c", text: "24" },
            { id: "d", text: "12" },
          ],
          correctOptionId: "b",
          explanation: "Division and multiplication first: 18/2 = 9, 3×4 = 12. Then addition: 9 + 12 = 21.",
        },
        {
          id: "q2-1-2",
          type: "numeric",
          prompt: "Using your calculator, evaluate: (4.7 × 10³) / (2 × 10²). Enter your numeric answer.",
          pointsValue: 3,
          correctValue: 23.5,
          tolerance: 0.1,
          toleranceType: "absolute",
          unit: "",
        },
        {
          id: "q2-1-3",
          type: "short_response",
          prompt: "Describe a situation where entering a formula incorrectly into a calculator could cause a real engineering problem. Be specific.",
          pointsValue: 3,
          placeholder: "For example, in a circuit design...",
        },
      ],
      reflection: {
        prompts: [
          "What was the most surprising thing you discovered about how your calculator works?",
          "When you made an error, how did you figure out what went wrong?",
          "How confident are you now with scientific notation on the calculator? (1-5) What would move you one level higher?",
        ],
      },
      standards: ["ETA-EM1-2", "NYS-CDOS-1", "NOCTI-2"],
      danielsonIndicators: ["3c", "3d"],
    },
    {
      id: "unit-2-lesson-2",
      unitId: "unit-2",
      number: "2.2",
      title: "Engineering Notation",
      aim: "Why do engineers use a different notation than scientists — and how do we read it?",
      swbat: [
        "Distinguish between scientific notation and engineering notation",
        "Convert numbers between standard form and engineering notation",
        "Recognize common engineering prefixes and their meanings",
      ],
      whyItMatters:
        "When you read a resistor value of '4.7kΩ' or a capacitor of '100μF', you're reading engineering notation. Every component value, every measurement, every data sheet uses this language. Master it and you can read any spec sheet.",
      simulationKey: "notation-converter",
      simInteractionThreshold: 4,
      socraticPrompts: [
        "Scientific notation uses any power of 10. Engineering notation limits you to multiples of 3. Why would engineers choose that restriction?",
        "The prefix 'kilo' means 1,000. What does 'kΩ' mean? What would 'MΩ' mean?",
        "If a component is rated at 0.000047 farads, how would an engineer write that on a data sheet?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Look at the prefix ladder in the simulation. Click each prefix to see its power of 10 and example value. Notice the pattern: they jump by 3s." },
        { id: "s2", instruction: "Convert 47,000 ohms to engineering notation. What prefix applies? Write it with the symbol." },
        { id: "s3", instruction: "Convert 0.000033 farads to engineering notation. What prefix? What symbol?" },
        { id: "s4", instruction: "Find three examples of engineering notation on a real component in the room. Write each value in standard form.", hint: "Look at the resistor color code strip, capacitor labels, or battery specs." },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Engineering vs. Scientific Notation",
          body: "Scientific notation: any power of 10 (e.g., 4.7 × 10⁴)\nEngineering notation: powers of 10 that are multiples of 3 (e.g., 47 × 10³ = 47k)\n\nWhy? Because metric prefixes align to every 3rd power. Using engineering notation means the number always maps to a readable prefix.",
        },
        {
          id: "c2",
          heading: "Common Engineering Prefixes",
          body: "Tera (T) = 10¹²\nGiga (G) = 10⁹\nMega (M) = 10⁶\nKilo (k) = 10³\n[Base] = 10⁰\nMilli (m) = 10⁻³\nMicro (μ) = 10⁻⁶\nNano (n) = 10⁻⁹\nPico (p) = 10⁻¹²",
        },
      ],
      questions: [
        {
          id: "q2-2-1",
          type: "matching",
          prompt: "Match each value to its engineering notation equivalent.",
          pointsValue: 6,
          pairs: [
            { id: "p1", left: "47,000 Ω", right: "47 kΩ" },
            { id: "p2", left: "0.000033 F", right: "33 μF" },
            { id: "p3", left: "2,200,000 Hz", right: "2.2 MHz" },
            { id: "p4", left: "0.0000000047 F", right: "4.7 nF" },
            { id: "p5", left: "1,000,000,000 Ω", right: "1 GΩ" },
          ],
        },
        {
          id: "q2-2-2",
          type: "numeric",
          prompt: "A resistor is labeled 4.7 kΩ. What is its value in ohms?",
          pointsValue: 2,
          correctValue: 4700,
          tolerance: 0,
          toleranceType: "absolute",
          unit: "Ω",
        },
      ],
      reflection: {
        prompts: [
          "Look around the room. Can you now read component values you couldn't read before? List 2 examples.",
          "What was the hardest conversion in today's practice? Walk through your thinking step by step.",
        ],
      },
      standards: ["ETA-EM1-2", "NYS-CDOS-1", "NOCTI-2"],
      danielsonIndicators: ["3c", "3d"],
    },
    {
      id: "unit-2-lesson-3",
      unitId: "unit-2",
      number: "2.3",
      title: "Convert Fixed Numbers to Engineering Notation",
      aim: "How do we systematically convert any number to engineering notation?",
      swbat: [
        "Apply a step-by-step method to convert any number to engineering notation",
        "Identify the correct prefix for any converted value",
        "Verify conversions using a calculator",
      ],
      whyItMatters:
        "Measurement instruments display raw numbers. Engineers instantly translate those to readable values. A voltmeter shows 0.00345 V — an engineer reads that as 3.45 mV without thinking twice.",
      simulationKey: "notation-converter",
      simInteractionThreshold: 5,
      socraticPrompts: [
        "What's your strategy for moving the decimal point in the right direction?",
        "How do you know whether to use milli, micro, or nano for a very small number?",
        "Can a number be written in more than one valid form of engineering notation? Try an example.",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Use the simulation to convert 0.00000047 to engineering notation. Watch the decimal move — count the steps." },
        { id: "s2", instruction: "Write a conversion rule: 'To convert from standard form to engineering notation, I move the decimal ___ places until the coefficient is between ___ and ___.'" },
        { id: "s3", instruction: "Verify: convert your result BACK to standard form. Does it match the original?" },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Conversion Method",
          body: "Step 1: Count how many places you must move the decimal so the coefficient falls between 1 and 999.\nStep 2: That count must be a multiple of 3 (positive or negative).\nStep 3: Assign the matching prefix.\n\nExample: 0.00000047\n→ Move decimal 7 places right → 4.7 (too many; must be multiple of 3)\n→ Move 6 places → 0.47 (not between 1-999)\n→ Move 9 places → 470 (valid! multiple of 3)\n→ 470 × 10⁻⁹ = 470 nF",
        },
      ],
      questions: [
        {
          id: "q2-3-1",
          type: "drag_drop",
          prompt: "Drag each value to its correct engineering notation.",
          pointsValue: 6,
          items: [
            { id: "i1", label: "0.0082 A → 8.2 mA" },
            { id: "i2", label: "5,600,000 Hz → 5.6 MHz" },
            { id: "i3", label: "0.00000022 F → 220 nF" },
            { id: "i4", label: "33,000 Ω → 33 kΩ" },
          ],
          zones: [
            { id: "z1", label: "Correct Engineering Notation", correctItemId: "i1" },
            { id: "z2", label: "Correct Engineering Notation", correctItemId: "i2" },
            { id: "z3", label: "Correct Engineering Notation", correctItemId: "i3" },
            { id: "z4", label: "Correct Engineering Notation", correctItemId: "i4" },
          ],
        },
      ],
      reflection: {
        prompts: [
          "Create your own mnemonic for remembering the prefix order from pico to tera.",
          "Where did you make errors today? What pattern do you notice in your mistakes?",
        ],
      },
      standards: ["ETA-EM1-2", "NYS-CDOS-1"],
      danielsonIndicators: ["3c", "3d"],
    },
    {
      id: "unit-2-lesson-4",
      unitId: "unit-2",
      number: "2.4",
      title: "SI Base Units",
      aim: "What is the International System of Units and why does the whole world agree to use it?",
      swbat: [
        "Name the 7 SI base units and their symbols",
        "Identify which SI units are used in electronics",
        "Explain why a universal measurement system matters for engineering",
      ],
      whyItMatters:
        "In 1999, NASA's Mars Climate Orbiter was lost because one team used metric units and another used imperial. A $327.6 million spacecraft destroyed by a unit mismatch. Engineers use SI because everyone agrees on it.",
      simulationKey: "notation-converter",
      simInteractionThreshold: 3,
      socraticPrompts: [
        "Why can't engineers just use whatever units they're comfortable with?",
        "The ampere is defined by the movement of electrons. Can you estimate how many electrons per second that might be?",
        "If you had to design the measurement system for electricity from scratch, what would you measure, and what units would you invent?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Without looking anything up: list every property of electricity you can think of that could be measured. (Current, voltage, resistance...)" },
        { id: "s2", instruction: "For each property you listed, hypothesize a unit name and symbol. What makes a good unit name?" },
        { id: "s3", instruction: "Now reveal the actual SI units. Compare. Which of your ideas aligned with real SI units?" },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "The 7 SI Base Units",
          body: "Length → meter (m)\nMass → kilogram (kg)\nTime → second (s)\nElectric current → ampere (A)\nTemperature → kelvin (K)\nAmount of substance → mole (mol)\nLuminous intensity → candela (cd)\n\nFor electronics, we primarily use: ampere (A), volt (V), ohm (Ω), watt (W), farad (F), henry (H).",
        },
      ],
      questions: [
        {
          id: "q2-4-1",
          type: "matching",
          prompt: "Match each quantity to its SI unit and symbol.",
          pointsValue: 6,
          pairs: [
            { id: "p1", left: "Electric current", right: "Ampere (A)" },
            { id: "p2", left: "Voltage (potential difference)", right: "Volt (V)" },
            { id: "p3", left: "Resistance", right: "Ohm (Ω)" },
            { id: "p4", left: "Power", right: "Watt (W)" },
            { id: "p5", left: "Capacitance", right: "Farad (F)" },
          ],
        },
      ],
      reflection: {
        prompts: [
          "Why do you think voltage is named after Alessandro Volta? Research one sentence about him.",
          "What would engineering look like if every country still used different measurement systems?",
        ],
      },
      standards: ["ETA-EM1-2", "NYS-NGLS-SEP-5", "NYS-CDOS-1"],
      danielsonIndicators: ["3b", "3c"],
    },
    {
      id: "unit-2-lesson-5",
      unitId: "unit-2",
      number: "2.5",
      title: "Metric Conversions",
      aim: "How do we fluently convert between metric units using the prefix relationship?",
      swbat: [
        "Convert values between metric units using a systematic method",
        "Apply the 'prefix ladder' to move between units",
        "Verify metric conversions using a calculator",
      ],
      whyItMatters:
        "Measurement data comes from instruments in base units. Component values are in engineering notation. Converting between them without error is a core engineering skill used every single day.",
      simulationKey: "notation-converter",
      simInteractionThreshold: 5,
      socraticPrompts: [
        "When you move from milliamps to amps, does the number get bigger or smaller? Why?",
        "What's the relationship between moving up the prefix ladder and moving the decimal point?",
        "A capacitor is rated 0.1 μF. Express that in nanofarads. How do you check your answer?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Use the prefix ladder in the simulation. Drag a value from one rung to another. Observe how the number changes." },
        { id: "s2", instruction: "Write the conversion rule: 'Moving UP one rung on the prefix ladder means ___ the number by ___. Moving DOWN means ___ by ___'." },
        { id: "s3", instruction: "Convert 4.7 kΩ to mΩ. How many rungs did you move? In which direction? What happened to the number?" },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "The Prefix Ladder Conversion Method",
          body: "Each step UP the ladder = multiply by 1000 (move decimal 3 places right, or divide the number by 1000)\nEach step DOWN the ladder = divide by 1000 (move decimal 3 places left, or multiply number by 1000)\n\nExample: 4.7 kΩ → mΩ\nk→base→m = 2 steps down = × 1000 × 1000 = × 10⁶\n4.7 × 10⁶ mΩ = 4,700,000 mΩ",
          formula: "Up one prefix = ÷ 1000 (number gets smaller)\nDown one prefix = × 1000 (number gets larger)",
        },
      ],
      questions: [
        {
          id: "q2-5-1",
          type: "numeric",
          prompt: "Convert 2.2 kΩ to ohms (Ω).",
          pointsValue: 2,
          correctValue: 2200,
          tolerance: 0,
          toleranceType: "absolute",
          unit: "Ω",
        },
        {
          id: "q2-5-2",
          type: "numeric",
          prompt: "Convert 0.047 A to milliamps (mA).",
          pointsValue: 2,
          correctValue: 47,
          tolerance: 0.1,
          toleranceType: "absolute",
          unit: "mA",
        },
        {
          id: "q2-5-3",
          type: "numeric",
          prompt: "Convert 470 nF to microfarads (μF).",
          pointsValue: 2,
          correctValue: 0.47,
          tolerance: 0.01,
          toleranceType: "absolute",
          unit: "μF",
        },
      ],
      reflection: {
        prompts: [
          "Create a visual representation (drawing, diagram, or rhyme) to help you remember the prefix ladder.",
          "Which conversion type (up or down the ladder) do you find harder? Why do you think that is?",
        ],
      },
      standards: ["ETA-EM1-2", "NYS-CDOS-1", "NYS-NGLS-SEP-5", "NOCTI-2"],
      danielsonIndicators: ["3c", "3d"],
    },
  ],
};
