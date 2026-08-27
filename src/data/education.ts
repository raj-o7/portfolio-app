import { EducationEntry, JourneyEntry } from "@/types";

export const education: EducationEntry[] = [
  {
    institution: "Presidency University, Bangalore",
    degree: "Bachelor of Computer Applications (BCA)",
    period: "2025",
    detail: "7.85 CGPA",
  },
  {
    institution: "R K Sita +2 High School, Hariharganj",
    degree: "XII, Science",
    period: "2022",
    detail: "78.2%",
  },
  {
    institution: "Stronnat High School, Tendua Hariharganj",
    degree: "X",
    period: "2020",
    detail: "87.80%",
  },
];

// Powers the "Developer Journey" timeline section.
export const journey: JourneyEntry[] = [
  {
    stage: "education",
    title: "Started BCA at Presidency University",
    description: "Began the Bachelor of Computer Applications program in Bangalore.",
    period: "2022",
  },
  {
    stage: "learning",
    title: "Built Voxscribe",
    description:
      "First deployed project — a fully client-side speech-to-text and translation app using the Web Speech API.",
    period: "Apr 2024 – Jun 2024",
  },
  {
    stage: "skill",
    title: "Certified in Full Stack Web Development & DSA (Java)",
    description: "Completed Apna College's Full Stack Web Development and Data Structures & Algorithms in Java courses.",
    period: "2024",
  },
  {
    stage: "project",
    title: "Built and shipped PromptPal",
    description:
      "A full-stack AI chat app with JWT auth, SQLAlchemy persistence, and Groq API-powered LLM inference — including diagnosing and fixing a live production bug.",
    period: "Mar 2025 – Present",
  },
  {
    stage: "education",
    title: "Graduated with a BCA",
    description: "Completed the Bachelor of Computer Applications with a 7.85 CGPA.",
    period: "2025",
  },
  {
    stage: "goal",
    title: "Seeking an entry-level developer role",
    description: "Looking for a Frontend or Full Stack Developer role, while learning React Native.",
    period: "2025 – Present",
  },
];
