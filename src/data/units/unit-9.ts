import type { Unit } from "@/types/curriculum";

export const unit9: Unit = {
  id: "unit-9",
  number: 9,
  title: "Soldering",
  markingPeriod: 3,
  description: "Learn the craft of professional soldering — from safety to splice technique to quality inspection.",
  lessons: [
    {
      id: "unit-9-lesson-1",
      unitId: "unit-9",
      number: "9.1",
      title: "Soldering Safety Rules",
      aim: "What specific hazards does soldering introduce, and what rules protect us from them?",
      swbat: [
        "Identify at least 8 soldering-specific safety hazards",
        "Explain the proper temperature management for a soldering iron",
        "Describe correct fume management practices",
        "Demonstrate proper soldering iron storage and handling",
      ],
      whyItMatters:
        "A soldering iron tip operates at 300-450°C — hot enough to cause instant third-degree burns and start fires. Solder flux fumes are hazardous if inhaled repeatedly. Professional solderers work safely for decades because they internalized these habits from day one.",
      simulationKey: "soldering",
      simInteractionThreshold: 4,
      socraticPrompts: [
        "A soldering iron at 370°C — how does that compare to boiling water (100°C)? What does that mean for contact time?",
        "You finish soldering and want to set down the iron quickly. What's the rule? Why does the stand/holder matter?",
        "Solder contains flux that creates fumes. What does 'ventilation' mean in this context? Is a fan blowing at you adequate?",
        "Someone reaches across the bench near where you're soldering. What should you do?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Examine the soldering safety scenarios in the simulation. For each unsafe behavior, identify: What is the hazard? What injury could occur? What's the correct procedure?" },
        { id: "s2", instruction: "Write your own 'Soldering Safety Top 8' list — before I reveal the official list. Compare afterward." },
        { id: "s3", instruction: "Practice the sequence: pick up iron → hold correctly → set down → return to holder. What's the one-handed rule?" },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Soldering Safety Rules",
          body: "1. Always return the iron to its holder immediately when not in use\n2. Never set the iron on the bench — even for a moment\n3. Work in a ventilated area or use a fume extractor. Never breathe flux smoke directly\n4. Wear safety glasses — solder can spit\n5. Keep the tip clean with a damp sponge or brass wool\n6. Announce 'soldering!' when reaching near someone else's work\n7. Wash hands after handling solder (lead-containing or lead-free)\n8. Allow joints to cool 10-15 seconds before touching\n9. Do not overheat components — use heat sink clips on sensitive parts\n10. Never use a soldering iron on live circuits",
        },
        {
          id: "c2",
          heading: "Temperature Management",
          body: "Typical soldering temperature: 315-370°C (600-700°F) for standard electronics solder.\nToo cold: cold joints, poor adhesion, solder balls up\nToo hot: component damage, lifted pads, burnt flux residue, tip oxidation\n\nIron tip care: Tin (coat with solder) the tip regularly to prevent oxidation. A well-tinned tip transfers heat efficiently and extends tip life.",
        },
      ],
      questions: [
        {
          id: "q9-1-1",
          type: "drag_drop",
          prompt: "Drag each action to SAFE or UNSAFE soldering practice.",
          pointsValue: 6,
          items: [
            { id: "i1", label: "Return iron to holder immediately after use" },
            { id: "i2", label: "Set iron on bench briefly while repositioning work" },
            { id: "i3", label: "Use a fume extractor or work near open window" },
            { id: "i4", label: "Solder with face directly over the work to see better" },
          ],
          zones: [
            { id: "z1", label: "SAFE ✓", correctItemId: "i1" },
            { id: "z2", label: "UNSAFE ✗", correctItemId: "i2" },
            { id: "z3", label: "SAFE ✓", correctItemId: "i3" },
            { id: "z4", label: "UNSAFE ✗", correctItemId: "i4" },
          ],
        },
        {
          id: "q9-1-2",
          type: "mcq",
          prompt: "You finish a solder joint and want to test if the connection is solid. How long should you wait before touching the joint?",
          pointsValue: 2,
          options: [
            { id: "a", text: "Touch immediately — it cools in about a second" },
            { id: "b", text: "Wait 2-3 seconds" },
            { id: "c", text: "Wait 10-15 seconds for the joint to fully cool" },
            { id: "d", text: "Blow on it to cool quickly" },
          ],
          correctOptionId: "c",
          explanation: "Joints remain hot for 10-15 seconds and can cause burns. Blowing on them can cause cold joints from sudden cooling. Wait and let the joint cool naturally.",
        },
      ],
      reflection: {
        prompts: [
          "Which of the 10 safety rules do you think is most commonly violated by beginners? Why?",
          "Describe the difference between a safety rule you would follow even alone, and one you might skip when no one is watching. What does that tell you about your safety habits?",
        ],
      },
      standards: ["ETA-EM1-9", "NYS-CDOS-3a", "NOCTI-9"],
      danielsonIndicators: ["3b", "3c"],
    },
    {
      id: "unit-9-lesson-2",
      unitId: "unit-9",
      number: "9.2",
      title: "Splice Connections",
      aim: "How do professional technicians join wires permanently, and what makes a splice high-quality?",
      swbat: [
        "Demonstrate the preparation steps for wire splicing",
        "Distinguish between pigtail, Western Union, and Y-tap splice types",
        "Identify characteristics of a good solder joint vs. cold or bridged joints",
        "Evaluate splice quality using a grading rubric",
      ],
      whyItMatters:
        "A poor wire splice in a car, aircraft, or building can cause intermittent faults, shorts, or fires years after installation. Professional splice technique is not just a skill — it's a safety requirement in industry.",
      simulationKey: "soldering",
      simInteractionThreshold: 5,
      socraticPrompts: [
        "What makes a 'cold' joint different from a properly flowed joint? What do you see differently?",
        "If a solder bridge forms between two adjacent pins, what has gone wrong? How do you fix it?",
        "Why do we mechanically connect wires before soldering, rather than relying on solder alone for the joint strength?",
        "Compare a pigtail splice to a Western Union splice. When would you use each?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Examine the joint quality images in the simulation. Sort them: excellent, acceptable, cold joint, bridge. Explain your reasoning for each." },
        { id: "s2", instruction: "Practice the pigtail splice sequence: strip → twist → solder. Identify: what does a good joint look like after cooling?" },
        { id: "s3", instruction: "Compare Western Union and Y-tap splices. What structural difference makes them more mechanically secure than pigtail?" },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Three Splice Types",
          body: "PIGTAIL SPLICE: Both wires stripped, twisted together, soldered. Simple, fast. Used for low-stress applications. Minimum twist: 3 turns each direction.\n\nWESTERN UNION SPLICE: Both wires stripped, individual strands wrapped around each other. Much stronger mechanically. Used where joint will be pulled or stressed.\n\nY-TAP SPLICE: Branch wire tapped perpendicular to main wire without breaking the main run. Used to add a branch circuit without cutting the main conductor.",
        },
        {
          id: "c2",
          heading: "Solder Joint Quality",
          body: "GOOD JOINT: Shiny, smooth, concave shape. Solder flowed into wire strands. Joint is mechanically secure before solder is applied.\n\nCOLD JOINT: Dull, grainy, lumpy surface. Occurred because joint moved during cooling or insufficient heat. High resistance. Failure point.\n\nBRIDGE: Solder connecting two points that should not be connected. Potential short circuit. Must be removed with solder wick.",
        },
      ],
      questions: [
        {
          id: "q9-2-1",
          type: "matching",
          prompt: "Match each splice type to its primary use case.",
          pointsValue: 4,
          pairs: [
            { id: "p1", left: "Pigtail splice", right: "Simple low-stress wire joint" },
            { id: "p2", left: "Western Union splice", right: "High-strength mechanical wire joint" },
            { id: "p3", left: "Y-tap splice", right: "Adding a branch without cutting main wire" },
            { id: "p4", left: "Cold solder joint", right: "DEFECT — must be redone" },
          ],
        },
        {
          id: "q9-2-2",
          type: "mcq",
          prompt: "A solder joint looks dull and lumpy rather than shiny and smooth. What is the MOST LIKELY cause?",
          pointsValue: 2,
          options: [
            { id: "a", text: "Too much solder was applied" },
            { id: "b", text: "The joint moved while the solder was cooling — creating a cold joint" },
            { id: "c", text: "The wrong type of solder was used" },
            { id: "d", text: "The tip temperature was too high" },
          ],
          correctOptionId: "b",
          explanation: "A cold joint occurs when the workpiece moves during solder solidification or when insufficient heat was applied. The crystalline structure is disturbed, creating high resistance and a dull appearance.",
        },
        {
          id: "q9-2-3",
          type: "short_response",
          prompt: "Describe the 5-step process for making a quality pigtail splice. Include: preparation, mechanical connection, soldering, inspection, and finishing.",
          pointsValue: 8,
          placeholder: "Step 1: Strip ... inches of insulation...\nStep 2: Twist ...\nStep 3: Apply solder...\nStep 4: Inspect for...\nStep 5: Cover with...",
          danielsonIndicator: "3c",
        },
      ],
      reflection: {
        prompts: [
          "How many deductions would your first practice joint earn on the grading rubric? Be honest. What specific technique needs improvement?",
          "Why do professionals say 'the joint should be mechanically secure before soldering'? What would happen if you relied on solder for mechanical strength?",
          "In what industry or application would a cold solder joint be most dangerous? Explain.",
        ],
      },
      standards: ["ETA-EM1-9", "NYS-CDOS-3a", "NOCTI-9"],
      danielsonIndicators: ["3c", "3d"],
    },
  ],
};
