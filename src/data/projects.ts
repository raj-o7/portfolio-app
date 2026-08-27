import { Project } from "@/types";

// Both projects below are real, sourced from Rajkumar's resume. Every fact
// (dates, APIs, bug fix, deployment targets) traces back to a resume bullet —
// nothing here is invented. Add a new object to this array, following the
// same shape, to add a project; add `deepDive` to give it a full
// /projects/[slug] case-study page.
export const projects: Project[] = [
  {
    slug: "promptpal",
    name: "PromptPal — AI Chat Web Application",
    oneLiner:
      "A ChatGPT-style full-stack chat app with JWT auth and real LLM inference, built and deployed end-to-end.",
    problem:
      "Wanted to understand how a ChatGPT-like product actually works end-to-end — authentication, persistence, and real LLM inference — by building one from scratch instead of just calling an API in a script.",
    solution:
      "Built and deployed a full-stack AI chat application using a Flask backend (application factory pattern) with JWT-based authentication and SQLAlchemy-backed persistence, a responsive HTML/CSS/JavaScript frontend replicating the core ChatGPT experience, and the Groq API for low-latency LLM inference.",
    myRole: "Sole developer — designed, built, and deployed the entire application independently.",
    technologies: [
      "JavaScript",
      "HTML5",
      "CSS3",
      "Flask",
      "Python",
      "JWT Authentication",
      "SQLAlchemy",
      "Flask-CORS",
      "Groq API",
    ],
    keyFeatures: [
      "JWT-based authentication with hashed password storage (Flask-JWT-Extended)",
      "Persistent user data via SQLAlchemy ORM models",
      "Real-time, context-aware AI responses via Groq API integration",
      "Cross-origin API access via Flask-CORS",
      "UX polish: auto-scroll, loading animations, copy-to-clipboard",
    ],
    challenges:
      "A deprecated third-party model dependency was silently breaking every chat response in production. Diagnosed the root cause, fixed it, and hardened the app's database initialization and dependency configuration for reliable cloud deployment.",
    whatILearned:
      "How silently a deprecated third-party dependency can break a live production app, and why hardening initialization and dependency configuration matters for reliable cloud deployments.",
    links: {
      github: "https://github.com/raj-o7/PromptPal",
      liveDemo: "https://promptpal-wv2f.onrender.com",
      caseStudySlug: "promptpal",
    },
    featured: true,
    status: "shipped",
    explorationTags: ["Full Stack", "AI", "JavaScript", "Python"],
    deepDive: {
      goal: "Replicate the core ChatGPT experience end-to-end — not just call an LLM API, but own the auth, persistence, and deployment layers too.",
      architecture:
        "A Flask backend built with the application factory pattern exposes REST endpoints for auth and chat. JWT tokens (Flask-JWT-Extended) protect the chat routes, and SQLAlchemy models persist user data. Flask-CORS allows the static HTML/CSS/JS frontend to call the API cross-origin. The backend calls the Groq API for LLM inference and returns responses to the client.",
      technologyChoices: [
        {
          choice: "Flask with the application factory pattern",
          reason: "Keeps the app configurable and reliable to initialize on redeploys — directly relevant after the production dependency bug.",
        },
        {
          choice: "Groq API for LLM inference",
          reason: "Chosen for low-latency responses to keep the chat experience responsive.",
        },
        {
          choice: "JWT via Flask-JWT-Extended",
          reason: "Stateless session auth that's straightforward to secure and deploy.",
        },
      ],
      implementation:
        "Passwords are hashed before storage; JWT tokens are issued on login and required on chat endpoints. Chat requests are forwarded to the Groq API, and responses are returned to a vanilla JS frontend that handles auto-scroll, loading states, and copy-to-clipboard.",
      challengesAndSolutions: [
        {
          challenge: "A deprecated third-party model dependency silently broke every chat response in production.",
          solution:
            "Diagnosed the root cause, fixed the dependency issue, and hardened the app's database initialization and dependency configuration to prevent recurrence on future redeploys.",
        },
      ],
      results: "Live and deployed at promptpal-wv2f.onrender.com; recovered fully from a production outage caused by the dependency issue.",
      lessonsLearned:
        "The importance of hardening configuration and initialization for cloud deployments, and how to debug a production incident down to a specific dependency.",
      futureImprovements: [
        "Stream responses token-by-token instead of returning them all at once",
        "Support multiple saved conversation threads per user",
        "Migrate the frontend to React for more maintainable state management",
      ],
    },
  },
  {
    slug: "voxscribe",
    name: "Voxscribe — Real-Time Speech-to-Text & Translation App",
    oneLiner:
      "A fully client-side app for live speech transcription and translation across 16 languages, no backend required.",
    problem:
      "Wanted a fast, free way to transcribe and translate speech in real time across multiple languages — including Hindi, Kannada, and Tamil — without needing a backend.",
    solution:
      "Built a fully client-side web app using the Web Speech API for live transcription and the MyMemory Translation API for real-time translation to English, supporting 16 languages with start/stop voice controls.",
    myRole: "Sole developer — designed, built, and deployed the entire application independently.",
    technologies: ["JavaScript", "HTML5", "CSS3", "Web Speech API", "MyMemory Translation API"],
    keyFeatures: [
      "Continuous live transcription with interim and finalized result handling",
      "Support for 16 languages, including Hindi, Kannada, and Tamil",
      "Real-time translation to English via the MyMemory Translation API",
      "Start/stop voice controls and copy-to-clipboard",
      "Runs entirely client-side — no backend or build step",
    ],
    challenges:
      "The Web Speech API's behavior and language support are inconsistent across browsers, and interim vs. finalized results need careful handling to avoid flickering or duplicated text.",
    whatILearned:
      "How to work directly with a browser-native API (Web Speech API) and design a responsive UI that behaves consistently across mobile and desktop with no backend to fall back on.",
    links: {
      github: "https://github.com/raj-o7/voxscribe",
      liveDemo: "https://voxscribe-07-fb5a.vercel.app",
      caseStudySlug: "voxscribe",
    },
    featured: true,
    status: "shipped",
    explorationTags: ["Full Stack", "JavaScript"],
    deepDive: {
      goal: "Build a genuinely useful, zero-backend multilingual speech-to-text and translation tool.",
      architecture:
        "Runs entirely in the browser with no server and no build step. The Web Speech API handles continuous speech recognition (interim + final results) for the selected language; recognized text is sent to the MyMemory Translation API for translation to English.",
      technologyChoices: [
        {
          choice: "Web Speech API",
          reason: "Native browser speech recognition avoids any backend or paid transcription service.",
        },
        {
          choice: "MyMemory Translation API",
          reason: "A free translation API that was sufficient for real-time text translation needs.",
        },
        {
          choice: "No build step",
          reason: "Kept the project deployable as plain static files with zero tooling overhead.",
        },
      ],
      implementation:
        "Speech recognition runs continuously, distinguishing interim (in-progress) from finalized results so the transcript updates live without flicker. Start/stop controls manage the recognition session, and recognized text can be translated on demand and copied to the clipboard.",
      challengesAndSolutions: [
        {
          challenge: "Web Speech API support and behavior vary across browsers, and interim/final result handling is easy to get wrong.",
          solution: "Implemented explicit interim vs. final result handling, plus error handling for browsers that don't support the API.",
        },
      ],
      results: "Live and deployed at voxscribe-07-fb5a.vercel.app, supporting real-time transcription and translation across 16 languages.",
      lessonsLearned:
        "How to build a complete, deployable product on browser-native APIs alone, and how to design responsively for both mobile and desktop without a backend.",
      futureImprovements: [
        "Support translation into languages other than English",
        "Add downloadable transcripts",
        "Add an offline fallback mode",
      ],
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug || p.links.caseStudySlug === slug);
}

/** Derives the "Explore by technology" filter chips from the data itself, so
 * adding a project with a new tag automatically shows up as a filter. */
export function getExplorationFilters(): string[] {
  const tags = new Set<string>();
  projects.forEach((p) => p.explorationTags.forEach((t) => tags.add(t)));
  return ["All", ...Array.from(tags).sort()];
}
