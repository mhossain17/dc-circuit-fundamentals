import type { Unit } from "@/types/curriculum";

export const unit5: Unit = {
  id: "unit-5",
  number: 5,
  title: "Electronic Measurement Equipment",
  markingPeriod: 2,
  description: "Master the digital multimeter — the universal diagnostic tool of every electronics technician.",
  lessons: [
    {
      id: "unit-5-lesson-1",
      unitId: "unit-5",
      number: "5.1",
      title: "Multimeter Construction and Usage",
      aim: "How does a digital multimeter measure voltage, current, and resistance — and when would misusing it damage the meter or the circuit?",
      swbat: [
        "Identify the ports, display, and dial of a digital multimeter",
        "Correctly connect the multimeter for voltage, current, and resistance measurements",
        "Explain why current measurement requires series insertion",
        "Explain why resistance measurement requires the circuit to be de-energized",
        "Identify at least 4 incorrect multimeter uses and their consequences",
      ],
      whyItMatters:
        "A multimeter incorrectly connected in current mode across a voltage source will blow the internal fuse instantly — or worse, arc flash. Understanding WHY the measurement rules exist protects you, your equipment, and your grade.",
      simulationKey: "multimeter",
      simInteractionThreshold: 6,
      socraticPrompts: [
        "The voltmeter goes ACROSS a component. The ammeter goes IN SERIES. Why the difference?",
        "What would happen to the circuit if an ideal ammeter had high resistance? What about an ideal voltmeter with low resistance?",
        "You need to measure the current through a resistor. The circuit is live. What are the exact steps you must take to connect the meter safely?",
        "A student selects 'DCV 2V range' but the circuit is running at 9V. What will the meter display?",
        "Why does the meter say 'OL' (overload) in certain situations?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Examine the multimeter simulation. Identify: the display, the rotary dial, the three ports (COM, VΩmA, 10A). What do you predict each port is for?" },
        { id: "s2", instruction: "Connect the leads in the wrong ports, then set the dial to DCV and touch a 9V battery. What warning appears? Why?" },
        { id: "s3", instruction: "Correctly connect for voltage (VΩmA + COM). Measure across the battery. Read the display. Now measure across the resistor and the LED." },
        { id: "s4", instruction: "Switch to current mode (mA). Connect in SERIES with the circuit (break the circuit and insert the meter). Observe the current reading." },
        { id: "s5", instruction: "De-energize the circuit. Switch to resistance mode (Ω). Measure the resistor with the circuit off. Then turn the circuit back on and try to measure resistance. What warning appears?" },
        { id: "s6", instruction: "Try measuring current in voltage mode. What happens? What does this teach you?" },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Voltmeter Connection: Parallel (Across)",
          body: "Voltage is the potential difference BETWEEN two points. To measure it, the meter must have one probe at each point — connected in PARALLEL with the component. An ideal voltmeter has infinite resistance so it doesn't change the circuit.",
        },
        {
          id: "c2",
          heading: "Ammeter Connection: Series (In the Path)",
          body: "Current is the flow of charge THROUGH a point. To measure it, ALL the current must flow through the meter — so it must be in SERIES. An ideal ammeter has zero resistance so it doesn't impede the circuit.\n\nWARNING: Never connect an ammeter in parallel (across a source). This creates a near-short-circuit through the meter's shunt resistor, blowing the internal fuse.",
        },
        {
          id: "c3",
          heading: "Resistance Measurement: Power OFF",
          body: "The meter uses its own internal battery to apply a known test voltage and measures the resulting current to calculate R = V/I. If the circuit is powered on, the external voltage corrupts the measurement and may damage the meter.\n\nRule: ALWAYS de-energize and discharge capacitors before measuring resistance.",
        },
        {
          id: "c4",
          heading: "Multimeter Dial Ranges",
          body: "Always start on the highest range (or AUTO) and work down. Starting on a low range with high voltage causes immediate overload ('OL' display). Always know approximately what you're measuring before connecting.",
        },
      ],
      questions: [
        {
          id: "q5-1-1",
          type: "mcq",
          prompt: "A student wants to measure current through a resistor in a live 9V circuit. What is the correct procedure?",
          pointsValue: 3,
          options: [
            { id: "a", text: "Connect red lead to + terminal, black to − terminal, in parallel with the resistor" },
            { id: "b", text: "De-energize the circuit, break the wire at one side of the resistor, insert the meter in series with leads in current ports" },
            { id: "c", text: "Set dial to ACV, connect in parallel, energize the circuit" },
            { id: "d", text: "Touch probes briefly to each end of the resistor while circuit is live" },
          ],
          correctOptionId: "b",
          explanation: "Current is measured in series. You must break the circuit to insert the ammeter in the current path. Parallel connection would short-circuit through the ammeter.",
        },
        {
          id: "q5-1-2",
          type: "drag_drop",
          prompt: "Drag each measurement type to its correct connection method.",
          pointsValue: 6,
          items: [
            { id: "i1", label: "Voltage measurement" },
            { id: "i2", label: "Current measurement" },
            { id: "i3", label: "Resistance measurement" },
          ],
          zones: [
            { id: "z1", label: "Connected in PARALLEL, circuit energized", correctItemId: "i1" },
            { id: "z2", label: "Connected in SERIES, circuit energized", correctItemId: "i2" },
            { id: "z3", label: "Connected in PARALLEL, circuit DE-ENERGIZED", correctItemId: "i3" },
          ],
        },
        {
          id: "q5-1-3",
          type: "mcq",
          prompt: "You select the 200mA current range and accidentally connect the meter in PARALLEL across a 9V battery. What MOST LIKELY happens?",
          pointsValue: 3,
          options: [
            { id: "a", text: "The meter displays 200mA accurately" },
            { id: "b", text: "The meter's internal fuse blows due to excessive current" },
            { id: "c", text: "The battery voltage increases to protect the meter" },
            { id: "d", text: "Nothing — the meter has built-in reverse protection" },
          ],
          correctOptionId: "b",
          explanation: "Connecting in parallel creates a near-short-circuit through the meter's very low-resistance shunt resistor. Massive current flows and blows the fuse.",
        },
        {
          id: "q5-1-4",
          type: "short_response",
          prompt: "Explain in your own words WHY a voltmeter is connected in parallel and an ammeter in series. Use the physics of what each device is measuring to justify your answer.",
          pointsValue: 5,
          placeholder: "A voltmeter measures... which requires... An ammeter measures... which requires... The physics reason is...",
          danielsonIndicator: "3b",
        },
      ],
      reflection: {
        prompts: [
          "Describe a situation (real or imagined) where an incorrectly connected multimeter caused a problem. What should have been done differently?",
          "Why do you think students most commonly make mistakes with multimeter connections? What would help them avoid these errors?",
          "Rate your multimeter confidence before vs. after this lesson (1-5). What specific skill moved the number?",
        ],
      },
      standards: ["ETA-EM1-5", "NYS-CDOS-3a", "NYS-NGLS-SEP-3", "NOCTI-5"],
      danielsonIndicators: ["3b", "3c", "3d"],
    },
  ],
};
