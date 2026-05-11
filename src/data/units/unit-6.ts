import type { Unit } from "@/types/curriculum";

export const unit6: Unit = {
  id: "unit-6",
  number: 6,
  title: "Electronic Measurements",
  markingPeriod: 2,
  description: "Learn to measure and calculate resistance, current, voltage, and power — and understand why measured values differ from calculated ones.",
  lessons: [
    {
      id: "unit-6-lesson-1",
      unitId: "unit-6",
      number: "6.1",
      title: "Resistance & Resistor Color Code",
      aim: "How do engineers read a resistor value using a color-coded band system?",
      swbat: [
        "Decode a 4-band resistor color code to determine nominal resistance",
        "Identify the tolerance band and calculate the acceptable range of resistance",
        "Measure a physical resistor and compare to the nominal value",
        "Explain why manufactured resistors have tolerance ranges",
      ],
      whyItMatters:
        "Resistors come without labels. The color code is their language. Every electronics technician must read it fluently — and every resistor in your EE box has a color code waiting to be decoded.",
      simulationKey: "resistor-color-code",
      simInteractionThreshold: 5,
      socraticPrompts: [
        "Why are resistors color-coded instead of labeled with numbers? What manufacturing advantage does this create?",
        "A resistor is labeled 1kΩ ±5%. What is the MINIMUM acceptable resistance? The MAXIMUM?",
        "You measure a 10kΩ ±10% resistor and get 10,850Ω. Is it in-spec? How do you know?",
        "What happens to a circuit if a resistor is at the extreme of its tolerance? Will it still work?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Look at the color band table in the simulation. Notice each color maps to a digit (0-9). Notice some colors map to multipliers. Spot the pattern for the tolerance band." },
        { id: "s2", instruction: "Decode this resistor: Brown-Black-Red-Gold. What is the nominal value? What is the tolerance? Calculate the min and max values." },
        { id: "s3", instruction: "Set up the simulation to generate a random resistor. Read all 4 bands. Calculate the value before the simulation reveals it. Check your answer." },
        { id: "s4", instruction: "Practice until you can correctly decode 5 consecutive resistors without errors." },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "4-Band Color Code",
          body: "Band 1: First significant digit\nBand 2: Second significant digit\nBand 3: Multiplier (power of 10)\nBand 4: Tolerance\n\nColor → Digit:\nBlack=0, Brown=1, Red=2, Orange=3, Yellow=4,\nGreen=5, Blue=6, Violet=7, Gray=8, White=9\n\nMultiplier colors: Black=×1, Brown=×10, Red=×100, Orange=×1k, Yellow=×10k, Green=×100k, Gold=×0.1, Silver=×0.01\n\nTolerance: Gold=±5%, Silver=±10%, None=±20%",
          example: "Brown-Black-Red-Gold:\n→ 1-0-×100-±5%\n→ 10 × 100 = 1,000Ω = 1kΩ ±5%\n→ Range: 950Ω to 1,050Ω",
        },
        {
          id: "c2",
          heading: "Why Tolerances Exist",
          body: "Manufacturing resistors to an exact value is expensive. Tolerance means the component is guaranteed to fall within a range. Standard tolerances: ±20% (general use), ±10% (good), ±5% (better), ±1% (precision). Most electronics works fine with ±5% — only precision instrumentation needs ±1%.",
        },
      ],
      questions: [
        {
          id: "q6-1-1",
          type: "mcq",
          prompt: "A resistor has bands: Yellow-Violet-Orange-Gold. What is its nominal value?",
          pointsValue: 3,
          options: [
            { id: "a", text: "4,700 Ω (4.7 kΩ)" },
            { id: "b", text: "470 Ω" },
            { id: "c", text: "47,000 Ω (47 kΩ)" },
            { id: "d", text: "4.7 Ω" },
          ],
          correctOptionId: "c",
          explanation: "Yellow=4, Violet=7, Orange=×1,000. 47 × 1000 = 47,000Ω = 47kΩ. Gold = ±5%.",
        },
        {
          id: "q6-1-2",
          type: "numeric",
          prompt: "A 10kΩ ±5% resistor is measured. What is the MAXIMUM acceptable resistance in ohms?",
          pointsValue: 3,
          correctValue: 10500,
          tolerance: 10,
          toleranceType: "absolute",
          unit: "Ω",
        },
        {
          id: "q6-1-3",
          type: "short_response",
          prompt: "You measure a resistor labeled 4.7kΩ ±10% and get 5,200Ω. Is this resistor in-spec or out-of-spec? Show all your work and justify your answer.",
          pointsValue: 5,
          placeholder: "Nominal value: ...\n10% of nominal: ...\nMax acceptable: ...\nMeasured value: ...\nConclusion: ...",
          danielsonIndicator: "3d",
        },
      ],
      reflection: {
        prompts: [
          "Use the memory mnemonic 'BB ROY Great Britain Very Good Wife' (or one you invent) to list all 10 color digits. Write it and test yourself.",
          "Why do you think circuit designers sometimes use precision (±1%) resistors in some places but general-purpose (±5%) in others? Give an example of each.",
        ],
      },
      standards: ["ETA-EM1-6", "NYS-CDOS-3a", "NYS-NGLS-SEP-3", "NOCTI-6"],
      danielsonIndicators: ["3c", "3d"],
    },
    {
      id: "unit-6-lesson-2",
      unitId: "unit-6",
      number: "6.2",
      title: "Current",
      aim: "What is electric current, how is it measured, and what factors determine how much flows?",
      swbat: [
        "Define current as the rate of charge flow",
        "Calculate current given charge and time",
        "Measure current correctly using an ammeter in series",
        "Explain the relationship between current and the number of free electrons",
      ],
      whyItMatters:
        "Current is the 'flow rate' of electricity. Too much current destroys components. Too little means nothing works. Every circuit is a balance between enough current to operate loads without exceeding component ratings.",
      simulationKey: "ohms-law",
      simInteractionThreshold: 3,
      socraticPrompts: [
        "If charge is water and the wire is a pipe, what is current? What would a larger pipe represent?",
        "A battery has 9V and a circuit draws 0.1A. If I increase the voltage to 18V (same resistance), what happens to the current?",
        "Why do we specify current in milliamps (mA) for LEDs instead of amps? What does this tell you about the scale of LED circuits?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "In the Ohm's Law simulation, set R=1000Ω and vary the voltage. Record the current at each voltage. What pattern do you observe?" },
        { id: "s2", instruction: "Plot your data (V on x-axis, I on y-axis). What shape is the graph? What does the slope represent?" },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Current (I)",
          body: "Current is the rate of flow of electric charge past a point in a circuit.\n\nI = Q / t\nI = current in amperes (A)\nQ = charge in coulombs (C)\nt = time in seconds (s)\n\nOne ampere = one coulomb of charge passing per second = 6.24 × 10¹⁸ electrons per second.",
          formula: "I = Q / t",
        },
        {
          id: "c2",
          heading: "Measuring Current",
          body: "Ammeter connected in SERIES — all current must pass through it. Modern multimeter in A or mA mode. Always start on highest range.\n\nTypical values in electronics:\n• LED circuits: 5–30 mA\n• Logic circuits: μA to mA range\n• Motor circuits: 100mA to several amps\n• Power systems: tens to thousands of amps",
        },
      ],
      questions: [
        {
          id: "q6-2-1",
          type: "numeric",
          prompt: "A charge of 0.5 coulombs passes a point in 10 seconds. What is the current in mA?",
          pointsValue: 3,
          correctValue: 50,
          tolerance: 0.5,
          toleranceType: "absolute",
          unit: "mA",
        },
        {
          id: "q6-2-2",
          type: "mcq",
          prompt: "You double the voltage across a fixed resistor. What happens to the current?",
          pointsValue: 2,
          options: [
            { id: "a", text: "Current stays the same" },
            { id: "b", text: "Current doubles" },
            { id: "c", text: "Current halves" },
            { id: "d", text: "Current quadruples" },
          ],
          correctOptionId: "b",
          explanation: "From Ohm's Law: I = V/R. If V doubles and R stays constant, I doubles. This is a direct proportional relationship.",
        },
      ],
      reflection: {
        prompts: [
          "If a component is rated for maximum 20mA and you accidentally send 100mA through it, what do you predict happens?",
          "How does the water-pipe analogy help (or not help) you understand current? What does the analogy get wrong?",
        ],
      },
      standards: ["ETA-EM1-6", "NYS-NGLS-SEP-3", "NOCTI-6"],
      danielsonIndicators: ["3c", "3d"],
    },
    {
      id: "unit-6-lesson-3",
      unitId: "unit-6",
      number: "6.3",
      title: "Voltage",
      aim: "What is voltage and why is it the 'pressure' that drives current through a circuit?",
      swbat: [
        "Define voltage as electrical potential difference",
        "Measure voltage correctly using a voltmeter in parallel",
        "Explain the relationship between voltage, current, and resistance",
        "Calculate voltage given current and resistance",
      ],
      whyItMatters:
        "Voltage is the force that pushes current through resistance. Without voltage, there is no current — and no circuit. Understanding voltage as 'electrical pressure difference' rather than a mysterious number unlocks Ohm's Law.",
      simulationKey: "ohms-law",
      simInteractionThreshold: 3,
      socraticPrompts: [
        "If current is water flow and resistance is the pipe's narrowness, what is voltage?",
        "A 9V battery connected to a 1kΩ resistor. If you replace the battery with an 18V source, what happens to the voltage ACROSS the resistor? What happens to the current THROUGH it?",
        "Can voltage exist without current? Give an example where voltage is present but no current flows.",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Set current to 10mA in the Ohm's Law simulation. Vary resistance from 100Ω to 10kΩ. Record the resulting voltage. What is the relationship?" },
        { id: "s2", instruction: "Write a formula for voltage based on your data. Then compare to Ohm's Law: V = I × R." },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Voltage (V)",
          body: "Voltage is the difference in electrical potential energy between two points. It is the 'pressure' that drives current through a circuit.\n\nV = I × R (Ohm's Law)\nV = voltage in volts (V)\nI = current in amperes (A)\nR = resistance in ohms (Ω)\n\nMeasurement: Voltmeter in PARALLEL. High input resistance ensures minimal current drawn by meter.",
          formula: "V = I × R",
        },
        {
          id: "c2",
          heading: "Voltage Without Current",
          body: "A battery sitting on a shelf has a voltage (electrical potential difference between terminals) even though no current flows. Voltage is a property of the source — current only flows when a complete circuit path exists. This is why it's safe to handle a battery without touching both terminals simultaneously.",
        },
      ],
      questions: [
        {
          id: "q6-3-1",
          type: "numeric",
          prompt: "A current of 25mA flows through a 220Ω resistor. What is the voltage across the resistor (in volts)?",
          pointsValue: 3,
          correctValue: 5.5,
          tolerance: 0.1,
          toleranceType: "absolute",
          unit: "V",
        },
      ],
      reflection: {
        prompts: [
          "Explain voltage using a non-electricity analogy. Then explain the limitation of your analogy.",
          "Why is it safe to touch only ONE terminal of a 9V battery but dangerous to touch BOTH simultaneously?",
        ],
      },
      standards: ["ETA-EM1-6", "NYS-NGLS-SEP-3", "NOCTI-6"],
      danielsonIndicators: ["3c", "3d"],
    },
    {
      id: "unit-6-lesson-4",
      unitId: "unit-6",
      number: "6.4",
      title: "Power",
      aim: "What is electrical power and how does it connect voltage, current, and energy consumption?",
      swbat: [
        "Define power as the rate of energy use",
        "Calculate power using P=IV, P=I²R, and P=V²/R",
        "Explain the meaning of a component's power rating",
        "Calculate the power dissipated by a resistor and determine if it is within rating",
      ],
      whyItMatters:
        "Every component has a power rating. Exceed it, and the component overheats, fails, or catches fire. Engineers calculate power before building so they know if their design is safe. This is a life-safety skill.",
      simulationKey: "ohms-law",
      simInteractionThreshold: 3,
      socraticPrompts: [
        "A 100Ω resistor is rated 0.25W. A current of 50mA flows through it. Is it within rating?",
        "Why do higher-resistance resistors sometimes need higher power ratings, even though they pass less current?",
        "Your LED is rated 20mA at 2V. What power does it dissipate? What would a 1/4W resistor in series dissipate?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Using the Ohm's Law explorer: set V=9V, R=1kΩ. The simulation shows I. Calculate P = I × V. Now calculate P = I²R. Do you get the same answer?" },
        { id: "s2", instruction: "Increase the current by reducing resistance. At what current does a 0.25W resistor start to be at risk? Find the threshold." },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Electrical Power",
          body: "Power is the rate of energy consumption or dissipation.\n\nP = I × V\nP = I² × R\nP = V² / R\n\nAll three are equivalent — use whichever two quantities you know.\n\nUnit: Watts (W) = Joules per second",
          formula: "P = IV = I²R = V²/R",
        },
        {
          id: "c2",
          heading: "Power Ratings",
          body: "Every component has a maximum power it can safely dissipate as heat. Exceed this and it fails.\n\nCommon resistor ratings: 1/8W, 1/4W, 1/2W, 1W, 2W\n\nRule of thumb: Operate at no more than 50% of rated power in continuous applications. Choose the next higher rating if your calculation is close.",
        },
      ],
      questions: [
        {
          id: "q6-4-1",
          type: "numeric",
          prompt: "A 470Ω resistor has 12V across it. What is the power dissipated in watts?",
          pointsValue: 3,
          correctValue: 0.306,
          tolerance: 0.01,
          toleranceType: "absolute",
          unit: "W",
        },
        {
          id: "q6-4-2",
          type: "mcq",
          prompt: "A circuit requires a 220Ω resistor. Your calculation shows it will dissipate 0.2W. Which rating should you use?",
          pointsValue: 2,
          options: [
            { id: "a", text: "1/8W (0.125W) — it's cheaper" },
            { id: "b", text: "1/4W (0.25W) — it matches the requirement exactly" },
            { id: "c", text: "1/2W (0.5W) — gives safety margin" },
            { id: "d", text: "2W — the more headroom the better" },
          ],
          correctOptionId: "c",
          explanation: "0.2W exceeds 1/8W (fails). 1/4W is at the limit — no safety margin. 1/2W provides a 2.5× safety margin. 2W works but wastes money and space.",
        },
        {
          id: "q6-4-3",
          type: "short_response",
          prompt: "Calculate the power dissipated by a 100Ω resistor carrying 30mA. Is a 1/4W resistor adequate? Show your work and justify your answer.",
          pointsValue: 5,
          placeholder: "P = I² × R = ... × ... = ... W\nA 1/4W resistor is... because...",
          danielsonIndicator: "3d",
        },
      ],
      reflection: {
        prompts: [
          "Why is operating a component at 50% of its power rating safer than at 100%, even though both are 'within spec'?",
          "What happens physically inside a resistor when it exceeds its power rating? What do you think you would see?",
        ],
      },
      standards: ["ETA-EM1-6", "NYS-NGLS-PS3-1", "NYS-CDOS-3a", "NOCTI-6"],
      danielsonIndicators: ["3c", "3d"],
    },
  ],
};
