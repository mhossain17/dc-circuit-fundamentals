import type { Unit } from "@/types/curriculum";

export const unit3: Unit = {
  id: "unit-3",
  number: 3,
  title: "Electronic Components",
  markingPeriod: 1,
  description: "Learn to identify, read, and interpret electronic components and schematic symbols.",
  lessons: [
    {
      id: "unit-3-lesson-1",
      unitId: "unit-3",
      number: "3.1",
      title: "Identify Electronic Components",
      aim: "How do engineers identify and classify the building blocks of every circuit?",
      swbat: [
        "Identify at least 12 common electronic components by physical appearance",
        "State the primary function of each component",
        "Classify components as active or passive",
        "Predict how a circuit might behave if a specific component fails",
      ],
      whyItMatters:
        "You cannot troubleshoot a circuit you can't read. Identifying components is like learning vocabulary before writing a sentence — every schematic, every lab, every repair depends on this knowledge.",
      simulationKey: "component-identifier",
      simInteractionThreshold: 6,
      socraticPrompts: [
        "Look at this component. What does its shape or color tell you about its function?",
        "Why would an engineer use a variable resistor instead of a fixed one?",
        "What do you think the 'polarity' markings on a capacitor or LED mean? What happens if you ignore them?",
        "Group these components: which ones control the flow of current? Which store energy? Which convert energy?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Sort the component cards into groups based on physical appearance alone. Don't look at labels yet. What groupings make sense?" },
        { id: "s2", instruction: "Reveal the names. Did your groupings align with the actual categories? Where did you classify differently?" },
        { id: "s3", instruction: "For each component, write one sentence: 'This component ______ because ______.' Focus on function." },
        { id: "s4", instruction: "Using the component identifier simulation, practice matching physical components to names until you can identify all 13 without hints." },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "The 13 Core Components",
          body: "Resistor — limits current flow\nVariable Resistor (potentiometer) — adjustable resistance\nCapacitor — stores energy in electric field; blocks DC\nPolarized Capacitor (electrolytic) — must be connected correctly\nDiode — allows current in one direction only\nLED — emits light when forward biased\nSwitch — opens or closes a circuit path\nTransistor — amplifies or switches signals\nIC Chip — integrated circuit; many components in one package\nLamp — converts electrical energy to light and heat\nMotor — converts electrical energy to mechanical energy\nSpeaker — converts electrical signals to sound\nBattery — converts chemical energy to electrical energy",
        },
        {
          id: "c2",
          heading: "Active vs. Passive Components",
          body: "Passive components (resistor, capacitor, inductor) cannot amplify or switch signals. They only dissipate, store, or release energy.\n\nActive components (transistor, IC, diode in some contexts) can control current flow, amplify signals, or switch.",
        },
      ],
      questions: [
        {
          id: "q3-1-1",
          type: "matching",
          prompt: "Match each component to its primary function.",
          pointsValue: 8,
          pairs: [
            { id: "p1", left: "Resistor", right: "Limits current flow" },
            { id: "p2", left: "Capacitor", right: "Stores energy; blocks DC" },
            { id: "p3", left: "Diode", right: "Allows current in one direction only" },
            { id: "p4", left: "Transistor", right: "Amplifies or switches signals" },
            { id: "p5", left: "LED", right: "Emits light when forward biased" },
            { id: "p6", left: "Battery", right: "Converts chemical energy to electrical energy" },
          ],
        },
        {
          id: "q3-1-2",
          type: "mcq",
          prompt: "A polarized capacitor is installed backward in a circuit. What is the MOST likely consequence?",
          pointsValue: 2,
          options: [
            { id: "a", text: "The circuit works normally, just less efficiently" },
            { id: "b", text: "The capacitor fails to charge and is permanently damaged or explodes" },
            { id: "c", text: "The voltage increases across the capacitor" },
            { id: "d", text: "Current flows in both directions through the component" },
          ],
          correctOptionId: "b",
          explanation: "Electrolytic capacitors have a polarity. Reverse voltage breaks down the dielectric layer, causing failure, gas buildup, or rupture. Always check polarity.",
        },
        {
          id: "q3-1-3",
          type: "short_response",
          prompt: "Choose any TWO components. For each, write: (1) its name, (2) its function, and (3) a real-world device that uses it. Explain why that device needs that component.",
          pointsValue: 6,
          placeholder: "Component 1: Name — Function — Real-world use — Why needed...\nComponent 2: ...",
          danielsonIndicator: "3b",
        },
      ],
      reflection: {
        prompts: [
          "Which component was hardest to remember? What trick or association would help you remember it?",
          "Pick a device you use every day (phone, headphones, lamp). List every component from today's lesson you think it contains.",
          "What surprised you about the range of things electricity can be converted INTO?",
        ],
      },
      standards: ["ETA-EM1-3", "NYS-CDOS-3a", "NOCTI-3"],
      danielsonIndicators: ["3b", "3c", "3d"],
    },
    {
      id: "unit-3-lesson-2",
      unitId: "unit-3",
      number: "3.2",
      title: "Schematic Reading",
      aim: "How do engineers communicate circuit designs using a universal visual language?",
      swbat: [
        "Identify schematic symbols for all 13 core components",
        "Read a simple schematic and describe the circuit's function",
        "Trace current flow through a schematic from positive to negative terminal",
        "Translate between a physical circuit and its schematic representation",
      ],
      whyItMatters:
        "Schematics are the blueprint of electronics. Every circuit ever designed, repaired, or manufactured uses them. An engineer who can't read a schematic is like an architect who can't read a floor plan.",
      simulationKey: "component-identifier",
      simInteractionThreshold: 5,
      socraticPrompts: [
        "Why do you think engineers use symbols instead of drawing realistic pictures of components?",
        "Look at this schematic: where does current enter? Where does it leave? How do you know?",
        "If this wire crosses another wire with no dot, are they connected? Why would that matter?",
        "This schematic has two identical sections in parallel. What would happen if one failed?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Match each physical component in the simulation to its schematic symbol. Start with the ones you find most recognizable." },
        { id: "s2", instruction: "On the provided schematic, trace the current path with your finger. Where does it start? Where does it end? Mark any decision points." },
        { id: "s3", instruction: "Identify which components are in series (same current path) and which are in parallel (separate branches)." },
        { id: "s4", instruction: "Given a physical breadboard circuit, draw the schematic. Compare to a partner — where do your diagrams differ?" },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Schematic Symbol Reference",
          body: "The schematic symbol language is standardized by IEEE and IEC:\n• Resistor: zigzag line (IEEE) or rectangle (IEC)\n• Capacitor: two parallel lines (one curved for electrolytic)\n• Diode: triangle pointing to bar\n• LED: diode symbol + arrows (light emitting)\n• Transistor: three-terminal symbol (NPN or PNP)\n• Battery: alternating long/short parallel lines\n• Switch: open gap with hinge point\n• Ground: three horizontal lines decreasing in size",
        },
        {
          id: "c2",
          heading: "Schematic Conventions",
          body: "• Current flows from positive (+) to negative (−) terminal in conventional current\n• A dot at a wire junction means the wires ARE connected\n• No dot at a crossing means the wires pass over/under each other — NOT connected\n• Component values are written next to the symbol\n• Reference designators label each component (R1, C2, Q3, etc.)",
        },
      ],
      questions: [
        {
          id: "q3-2-1",
          type: "drag_drop",
          prompt: "Drag each schematic symbol description to the correct component name.",
          pointsValue: 8,
          items: [
            { id: "i1", label: "Zigzag line" },
            { id: "i2", label: "Triangle pointing to a bar" },
            { id: "i3", label: "Two parallel lines (one curved)" },
            { id: "i4", label: "Open gap with hinge" },
          ],
          zones: [
            { id: "z1", label: "Resistor", correctItemId: "i1" },
            { id: "z2", label: "Diode", correctItemId: "i2" },
            { id: "z3", label: "Polarized Capacitor", correctItemId: "i3" },
            { id: "z4", label: "Switch", correctItemId: "i4" },
          ],
        },
        {
          id: "q3-2-2",
          type: "mcq",
          prompt: "In a schematic, two wires cross without a dot at the intersection. What does this mean?",
          pointsValue: 2,
          options: [
            { id: "a", text: "The wires are connected at that point" },
            { id: "b", text: "The wires pass over each other and are NOT connected" },
            { id: "c", text: "There is an error in the schematic" },
            { id: "d", text: "A junction component should be placed there" },
          ],
          correctOptionId: "b",
          explanation: "No dot = no connection. This is a fundamental schematic reading rule. A dot explicitly marks a junction where wires join.",
        },
      ],
      reflection: {
        prompts: [
          "Look up the schematic of any common household device online. Can you identify at least 3 symbols you learned today?",
          "If you were teaching schematic reading to a younger student, what's the single most important thing you'd emphasize first?",
          "How does being able to read schematics change what you can do as an engineer?",
        ],
      },
      standards: ["ETA-EM1-3", "NYS-CDOS-3a", "NOCTI-3"],
      danielsonIndicators: ["3b", "3c"],
    },
  ],
};
