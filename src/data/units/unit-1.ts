import type { Unit } from "@/types/curriculum";

export const unit1: Unit = {
  id: "unit-1",
  number: 1,
  title: "Basic Electrical Safety",
  markingPeriod: 1,
  description: "Students derive electrical safety rules from investigation of dangerous scenarios — not memorization.",
  lessons: [
    {
      id: "unit-1-lesson-1",
      unitId: "unit-1",
      number: "1.1",
      title: "General Room & School Safety Rules",
      aim: "What rules keep everyone safe in a lab environment — and why do they exist?",
      swbat: [
        "Identify at least 10 general safety rules for a laboratory setting",
        "Explain the reason behind each safety rule using cause-and-effect reasoning",
        "Demonstrate safe behavior during a lab setup scenario",
      ],
      whyItMatters:
        "In 2019, approximately 2,000 workers were treated for serious electrical injuries. Most accidents happen not from ignorance of electricity, but from ignoring basic safety habits. Rules without understanding are forgotten under pressure.",
      simulationKey: "safety-gallery",
      simInteractionThreshold: 5,
      socraticPrompts: [
        "Look at this scenario. What do you notice that could cause harm?",
        "Why would someone choose to behave this way? What were they probably thinking?",
        "If we could add one rule to prevent this exact situation, what would it say?",
        "What's the difference between a rule that says 'don't do X' and one that explains WHY not to do X?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Examine each safety scenario in the gallery. For each one, identify: What went wrong? Who is at risk? What could happen next?", hint: "Don't just look for obvious danger — find the chain of events." },
        { id: "s2", instruction: "Write a rule for each scenario that would prevent the incident. Make it specific — not just 'be careful'." },
        { id: "s3", instruction: "Group your rules into categories. What themes emerge? Food/drink? Equipment? Clothing? Behavior?" },
        { id: "s4", instruction: "Compare your rules to OSHA general industry standards. Which of yours match? Which did OSHA include that you missed?" },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "General Lab Safety Rules (Derived by Class)",
          body: "The rules you derived from evidence are the same rules professionals follow:\n• No food or drink near equipment\n• Tie back long hair; no loose clothing near moving parts\n• Report all injuries immediately, no matter how small\n• Know where the emergency shutoff, first aid kit, and exit are\n• Walk, never run\n• Keep work areas clear and organized\n• Never work alone on electrical equipment\n• Follow all posted signs",
        },
        {
          id: "c2",
          heading: "Why Rules Exist: Causal Reasoning",
          body: "Every safety rule was written because someone was hurt or almost hurt. Understanding the 'why' behind a rule means you'll follow it even when no one is watching — and you'll recognize when a rule doesn't cover a new situation, so you can reason through it.",
        },
      ],
      questions: [
        {
          id: "q1-1-1",
          type: "mcq",
          prompt: "A student sees a chemical spill in the hallway outside the lab. What is the MOST appropriate first action?",
          pointsValue: 2,
          options: [
            { id: "a", text: "Clean it up immediately with paper towels" },
            { id: "b", text: "Walk around it and continue to class" },
            { id: "c", text: "Report it immediately to a teacher or staff member" },
            { id: "d", text: "Tell another student about it later" },
          ],
          correctOptionId: "c",
          explanation: "Unknown substances should never be handled without proper training. Report immediately so trained staff can assess and clean safely.",
        },
        {
          id: "q1-1-2",
          type: "matching",
          prompt: "Match each hazard to its correct safety response.",
          pointsValue: 4,
          pairs: [
            { id: "p1", left: "Long hair near bench equipment", right: "Tie it back or use a hair tie" },
            { id: "p2", left: "Loose wires on the floor", right: "Report and secure before entering the area" },
            { id: "p3", left: "Unfamiliar equipment", right: "Ask the instructor before touching" },
            { id: "p4", left: "Minor cut from stripped wire", right: "Report immediately and use first aid kit" },
          ],
        },
        {
          id: "q1-1-3",
          type: "short_response",
          prompt: "Choose ONE safety rule you derived today. Explain the real-world scenario it prevents, using cause-and-effect language.",
          pointsValue: 4,
          placeholder: "The rule states... This prevents... because...",
          danielsonIndicator: "3b",
        },
      ],
      reflection: {
        prompts: [
          "Which safety scenario in the gallery surprised you most? Why?",
          "Before today, did you follow all these rules? Be honest — which one had you overlooked?",
          "How does understanding the 'why' behind a rule change how you'll follow it?",
        ],
      },
      standards: ["ETA-EM1-1", "NYS-CDOS-3a", "NOCTI-1"],
      danielsonIndicators: ["3b", "3c", "3d"],
    },
    {
      id: "unit-1-lesson-2",
      unitId: "unit-1",
      number: "1.2",
      title: "Electronics Safety Rules",
      aim: "What makes electrical work uniquely dangerous, and what specific rules protect us?",
      swbat: [
        "Identify the specific hazards of working with electricity (shock, arc flash, fire)",
        "Explain why even low voltages can be lethal under certain conditions",
        "Apply electronics safety rules to evaluate a given work scenario",
        "Describe proper first aid response to electrical shock",
      ],
      whyItMatters:
        "Household voltage (120V AC) can kill you. So can a 9V battery — if conditions are right. Understanding electricity-specific hazards is the first step to working confidently and safely.",
      simulationKey: "safety-gallery",
      simInteractionThreshold: 5,
      socraticPrompts: [
        "This person is using a 9V battery. Can they be harmed? What would have to be true for that to happen?",
        "Look at this circuit with a short. What is generating the heat? Where does that energy come from?",
        "Why do electricians test a wire before touching it, even if they believe the power is off?",
        "What would you do first if you saw someone being shocked? Why that order?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Examine the 'short circuit' scenario. Trace where the current flows. Where does energy go when no load is present?", hint: "Energy must go somewhere. Where does it dissipate?" },
        { id: "s2", instruction: "Look at the 'reversed polarity' scenario with an LED. What damage does this cause? Why is direction important for some components?", hint: "Think about what LEDs are — they only allow current in one direction." },
        { id: "s3", instruction: "Examine the 'wet hands near electronics' scenario. Why does water change the danger level?", hint: "Think about what water does to resistance." },
        { id: "s4", instruction: "Write the electronics safety rule you'd create from each scenario." },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "The Voltage-Current-Resistance Relationship and Safety",
          body: "Even low voltage can cause harm if resistance is low (wet skin, internal body path). I = V / R. Dry skin resistance: 100,000Ω. Wet skin: ~1,000Ω. At 120V, dry current = 1.2mA (barely felt). Wet current = 120mA (FATAL). This is why 'it's just a 9V battery' reasoning is incomplete.",
          formula: "I = V / R",
        },
        {
          id: "c2",
          heading: "Electronics Safety Rules",
          body: "• Always de-energize before touching components\n• Test with meter before assuming power is off\n• Never work with wet hands\n• Use one hand when probing live circuits (other hand in pocket)\n• Fuse your circuits appropriately\n• Never bypass safety devices\n• Know the electrical shock response: Do NOT touch the victim — break the circuit first. Call 911.",
        },
        {
          id: "c3",
          heading: "Electrical Shock First Aid",
          body: "1. DO NOT touch the victim if they are still in contact with the source\n2. Turn off the power or use a non-conductive object to break contact\n3. Call 911 immediately\n4. Begin CPR if trained and the person is unresponsive\n5. Treat for shock while waiting for help",
        },
      ],
      questions: [
        {
          id: "q1-2-1",
          type: "mcq",
          prompt: "A classmate touches a live wire and is being shocked. What is your FIRST action?",
          pointsValue: 3,
          options: [
            { id: "a", text: "Grab their arm and pull them away immediately" },
            { id: "b", text: "Turn off the power source or use a non-conductive object to break the circuit" },
            { id: "c", text: "Throw water on the wire to cool it down" },
            { id: "d", text: "Call for help and wait for a teacher" },
          ],
          correctOptionId: "b",
          explanation: "Grabbing someone being shocked makes YOU part of the circuit. ALWAYS break the circuit first. Never touch a shock victim while contact exists.",
        },
        {
          id: "q1-2-2",
          type: "numeric",
          prompt: "A person's wet skin has a resistance of 1,000Ω. If they contact a 120V source, how much current passes through them (in mA)?",
          pointsValue: 3,
          correctValue: 120,
          tolerance: 2,
          toleranceType: "absolute",
          unit: "mA",
        },
        {
          id: "q1-2-3",
          type: "drag_drop",
          prompt: "Drag each action to the correct category: SAFE or UNSAFE for electronics work.",
          pointsValue: 4,
          items: [
            { id: "i1", label: "Test circuit with meter before touching" },
            { id: "i2", label: "Work with wet hands to save time" },
            { id: "i3", label: "Keep one hand in pocket while probing live circuit" },
            { id: "i4", label: "Skip the fuse because it trips too often" },
          ],
          zones: [
            { id: "z1", label: "SAFE ✓", correctItemId: "i1" },
            { id: "z2", label: "UNSAFE ✗", correctItemId: "i2" },
            { id: "z3", label: "SAFE ✓", correctItemId: "i3" },
            { id: "z4", label: "UNSAFE ✗", correctItemId: "i4" },
          ],
        },
        {
          id: "q1-2-4",
          type: "short_response",
          prompt: "Using the formula I = V/R, explain in your own words why wet hands increase the danger of electrical work.",
          pointsValue: 4,
          placeholder: "When hands are wet, resistance decreases because... Therefore, current increases because... This means...",
          danielsonIndicator: "3b",
        },
      ],
      reflection: {
        prompts: [
          "What is the most dangerous electrical mistake you have seen (or could imagine) in a home or school setting?",
          "Has your understanding of household electricity changed after today? How?",
          "Which rule do you think students are MOST likely to forget or skip? How would you design a reminder system?",
        ],
      },
      standards: ["ETA-EM1-1", "NYS-CDOS-3a", "NYS-NGLS-SEP-3", "NOCTI-1"],
      danielsonIndicators: ["3b", "3c", "3d"],
    },
  ],
};
