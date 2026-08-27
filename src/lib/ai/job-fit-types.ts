export type MatchLevel = "Strong Match" | "Partial Match" | "Skill Gap";

export interface JobFitResult {
  matchLevel: MatchLevel;
  summary: string;
  matchingSkills: string[];
  matchingTechnologies: string[];
  relevantProjects: { name: string; slug: string; reason: string }[];
  weakerAreas: string[];
  suggestedInterviewTopics: string[];
  mode: "ai" | "local";
}
