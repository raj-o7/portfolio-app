// Central data model. Every section of the site reads from src/data/*.ts,
// which are typed against these interfaces. Edit the data files — never
// hardcode content in components.

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  resumeUrl: string; // path under /public, e.g. "/resume.pdf"
  twitter?: string;
}

export interface Profile {
  name: string;
  title: string; // e.g. "Software Developer"
  positioning: string; // one/two sentence statement for the hero
  location?: string;
  availability?: string; // e.g. "Open to SDE roles, Summer 2027"
  social: SocialLinks;
}

export interface AboutContent {
  background: string;
  currentlyLearning: string;
  whatIEnjoyBuilding: string;
  philosophy: string;
  lookingFor: string;
}

export type SkillCategory = "frontend" | "backend" | "languages" | "data" | "tools";

export interface Skill {
  name: string;
  category: SkillCategory;
  /** Optional short qualifier, e.g. "primary", "learning" — never a fake percentage. */
  note?: "primary" | "learning" | "familiar";
}

// Free-form on purpose: real project tech stacks rarely match a fixed enum,
// and forcing one invites either inaccurate tags or constant type edits.
export type TechTag = string;

// The "Explore by technology" filter chips are derived at render time from
// whatever explorationTags actually appear across the data — see
// getExplorationFilters() in src/data/projects.ts — so this stays a plain
// string and the filter list never drifts out of sync with real projects.
export type ExplorationFilter = string;

export interface ProjectLinks {
  github?: string;
  liveDemo?: string;
  caseStudySlug?: string; // if set, links to /projects/[slug]
}

export interface Project {
  slug: string;
  name: string;
  oneLiner: string;
  problem: string;
  solution: string;
  myRole: string;
  technologies: TechTag[];
  keyFeatures: string[];
  challenges: string;
  whatILearned: string;
  links: ProjectLinks;
  featured: boolean;
  status: "shipped" | "in-progress" | "archived";
  /** Drives the "Explore by technology" filters. */
  explorationTags: ExplorationFilter[];
  /** Populated only for projects with a full case-study/deep-dive page. */
  deepDive?: ProjectDeepDive;
}

export interface ProjectDeepDive {
  goal: string;
  architecture: string;
  architectureDiagram?: string; // description or path to an image under /public
  technologyChoices: { choice: string; reason: string }[];
  implementation: string;
  challengesAndSolutions: { challenge: string; solution: string }[];
  screenshots?: { src: string; alt: string }[];
  results: string;
  lessonsLearned: string;
  futureImprovements: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  detail?: string;
}

export type JourneyStage = "education" | "learning" | "project" | "skill" | "goal";

export interface JourneyEntry {
  stage: JourneyStage;
  title: string;
  description: string;
  period: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  formEnabled: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
}
