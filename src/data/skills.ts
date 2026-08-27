import { Skill } from "@/types";

// Sourced directly from the "Technical Skills" section of Rajkumar's resume.
export const skills: Skill[] = [
  // Frontend
  { name: "React.js", category: "frontend", note: "primary" },
  { name: "React Hooks", category: "frontend", note: "primary" },
  { name: "Responsive Design", category: "frontend", note: "primary" },
  { name: "REST API Integration", category: "frontend" },
  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },

  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Flask", category: "backend", note: "primary" },
  { name: "JWT Authentication", category: "backend" },
  { name: "SQLAlchemy ORM", category: "backend" },
  { name: "Flask-CORS", category: "backend" },

  // Languages
  { name: "JavaScript (ES6+)", category: "languages", note: "primary" },
  { name: "Python", category: "languages", note: "primary" },
  { name: "Java", category: "languages" },

  // Data
  { name: "Data Structures & Algorithms (Java)", category: "data" },

  // Tools
  { name: "Git", category: "tools" },
  { name: "GitHub", category: "tools" },
  { name: "Render", category: "tools" },
  { name: "Vercel", category: "tools" },
  { name: "VS Code", category: "tools" },
  { name: "Postman", category: "tools" },
];

export const currentlyLearningSkill = "React Native (cross-platform mobile development)";

export const skillCategoryLabels: Record<Skill["category"], string> = {
  frontend: "Frontend",
  backend: "Backend",
  languages: "Languages",
  data: "Data & Algorithms",
  tools: "Tools",
};
