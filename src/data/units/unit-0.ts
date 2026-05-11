import type { Unit } from "@/types/curriculum";

export const unit0: Unit = {
  id: "unit-0",
  number: 0,
  title: "Introductions",
  markingPeriod: 1,
  description: "Welcome to DC Circuit Fundamentals! Establish community, norms, and course expectations.",
  lessons: [
    {
      id: "unit-0-lesson-1",
      unitId: "unit-0",
      number: "0.1",
      title: "Introductory Activity & Ice Breaker",
      aim: "Who are we, and what do engineers actually do?",
      swbat: [
        "Introduce yourself to the class community",
        "Explain what engineering thinking means in your own words",
        "Identify one thing you hope to build or create this year",
      ],
      whyItMatters:
        "Engineering is a team sport. Every circuit you'll build this year depends on communication, collaboration, and asking great questions. Getting to know your classmates is step one.",
      simulationKey: null,
      simInteractionThreshold: 0,
      socraticPrompts: [
        "What do you think an engineer does on a typical day?",
        "Have you ever fixed something that was broken? Walk us through how you figured out what was wrong.",
        "What's the difference between following instructions and actually understanding how something works?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Pair up with someone you haven't met. Learn their name and one thing they've built or fixed.", hint: "Think broadly — anything counts, from a bike to a meal." },
        { id: "s2", instruction: "Share with the class: what did your partner build, and what problem did they solve?" },
        { id: "s3", instruction: "As a class, discuss: what patterns do you notice in engineering thinking across all these stories?" },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Engineering Thinking",
          body: "Engineers identify problems, gather evidence, generate solutions, test them, and iterate. This course will train your brain to think this way about electricity — not just to memorize formulas, but to reason from evidence.",
        },
        {
          id: "c2",
          heading: "How This Class Works",
          body: "You will experiment before you learn theories. You will make mistakes on purpose. You will be asked 'why' more than 'what'. The goal is not the right answer — it's the right reasoning.",
        },
      ],
      questions: [
        {
          id: "q0-1-1",
          type: "short_response",
          prompt: "In your own words, what is the difference between memorizing a formula and understanding a concept? Give an example from your life.",
          pointsValue: 5,
          placeholder: "Write your response here...",
          danielsonIndicator: "3b",
        },
        {
          id: "q0-1-2",
          type: "mcq",
          prompt: "Which statement BEST describes what engineers do?",
          pointsValue: 2,
          options: [
            { id: "a", text: "Follow a rulebook to build things exactly as instructed" },
            { id: "b", text: "Identify problems, test solutions, and improve based on evidence" },
            { id: "c", text: "Only work with math and formulas in an office" },
            { id: "d", text: "Memorize as many facts as possible about science" },
          ],
          correctOptionId: "b",
          explanation: "Engineering is fundamentally about problem-solving through iteration — testing, failing, learning, and improving.",
        },
      ],
      reflection: {
        prompts: [
          "What surprised you most about your classmates' experiences today?",
          "What is one question you have about electricity or circuits that you hope this class answers?",
          "Rate your current confidence with electronics (1-5). What would move that number up by 1?",
        ],
      },
      standards: ["NYS-CDOS-3a", "NYS-NGLS-SEP-8"],
      danielsonIndicators: ["2b", "3b"],
    },
    {
      id: "unit-0-lesson-2",
      unitId: "unit-0",
      number: "0.2",
      title: "Syllabus Review",
      aim: "What are the rules, expectations, and opportunities in this course?",
      swbat: [
        "Identify the major units and assessments in this course",
        "Explain the grading policy and PDF submission process",
        "State at least 3 lab safety expectations",
        "Describe what the EE Student Box contains and why each item matters",
      ],
      whyItMatters:
        "Professional engineers always read the spec sheet before touching a tool. The syllabus is the spec sheet for this course. Understanding it means you're already thinking like an engineer.",
      simulationKey: null,
      simInteractionThreshold: 0,
      socraticPrompts: [
        "Why would an engineer read the full manual before starting a project?",
        "What could go wrong if you skipped the safety section of a spec sheet?",
        "If you were designing this course, what would YOU want students to know on Day 1?",
      ],
      guidedDiscoverySteps: [
        { id: "s1", instruction: "Read the syllabus silently for 5 minutes. Highlight or star anything that surprises you or raises a question." },
        { id: "s2", instruction: "In pairs, share your starred items. Generate a list of 3 questions your pair has about the course." },
        { id: "s3", instruction: "Groups share questions — teacher answers or defers to 'let's discover this together'." },
      ],
      conceptReveal: [
        {
          id: "c1",
          heading: "Course Map: 3 Marking Periods",
          body: "MP1: Safety, Math, Components, Theory. MP2: Measurement, Ohm's Law, Series Circuits. MP3: Soldering, Parallel Circuits, Combination Circuits. Each unit builds on the last — you cannot skip ahead safely.",
        },
        {
          id: "c2",
          heading: "The PDF Submission System",
          body: "At the end of every lesson, you generate a PDF with your answers, score, and reflection. You upload it to Google Classroom. This is your permanent record of learning. Take it seriously.",
        },
      ],
      questions: [
        {
          id: "q0-2-1",
          type: "mcq",
          prompt: "When is a PDF lesson submission due after completing a lesson?",
          pointsValue: 2,
          options: [
            { id: "a", text: "At the end of the marking period" },
            { id: "b", text: "The next day by midnight" },
            { id: "c", text: "Uploaded to Google Classroom the same class period" },
            { id: "d", text: "Only when Mr. Hossain asks for it" },
          ],
          correctOptionId: "c",
          explanation: "PDFs are submitted to Google Classroom within the class period or homework deadline as specified by Mr. Hossain.",
        },
        {
          id: "q0-2-2",
          type: "short_response",
          prompt: "List the 3 most important things you learned from reviewing the syllabus today, and explain why each matters to you personally.",
          pointsValue: 6,
          placeholder: "1. ...\n2. ...\n3. ...",
        },
      ],
      reflection: {
        prompts: [
          "What aspect of this course are you most looking forward to? Why?",
          "What part feels most challenging or intimidating right now?",
          "What is ONE commitment you are making to yourself about how you will approach this class?",
        ],
      },
      standards: ["NYS-CDOS-1", "NYS-NGLS-SEP-8"],
      danielsonIndicators: ["2b", "2c"],
    },
  ],
};
