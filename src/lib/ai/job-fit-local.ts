import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { JobFitResult } from "./job-fit-types";

const STOPWORDS = new Set([
  "the", "and", "for", "with", "you", "our", "are", "will", "have", "has",
  "this", "that", "your", "who", "job", "role", "team", "work", "years",
  "experience", "strong", "ability", "skills", "knowledge", "using", "able",
]);

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .split(/[^a-z0-9+.#]+/i)
      .filter((w) => w.length > 1 && !STOPWORDS.has(w))
  );
}

/**
 * Deterministic, LLM-free job-fit comparison. Used when ANTHROPIC_API_KEY
 * is not configured. Purely does keyword overlap between the job
 * description and the portfolio's own skill/project data, so it can never
 * exaggerate — only report what's literally present in both.
 */
export function localJobFit(jobDescription: string): JobFitResult {
  const jdTokens = tokenize(jobDescription);
  const skillNames = skills.map((s) => s.name);

  const matchingSkills = skillNames.filter((name) => {
    const nameTokens = tokenize(name);
    return [...nameTokens].some((t) => jdTokens.has(t));
  });

  const allTechTokens = new Set<string>();
  projects.forEach((p) => p.technologies.forEach((t) => tokenize(t).forEach((tok) => allTechTokens.add(tok))));
  const matchingTechnologies = [...allTechTokens].filter((t) => jdTokens.has(t));

  const relevantProjects = projects
    .filter((p) => p.technologies.some((t) => [...tokenize(t)].some((tok) => jdTokens.has(tok))))
    .slice(0, 3)
    .map((p) => ({
      name: p.name,
      slug: p.slug,
      reason: `Uses ${p.technologies.filter((t) => [...tokenize(t)].some((tok) => jdTokens.has(tok))).join(", ")}, which appear in the job description.`,
    }));

  const matchCount = matchingSkills.length + matchingTechnologies.length;
  const matchLevel: JobFitResult["matchLevel"] =
    matchCount >= 6 ? "Strong Match" : matchCount >= 2 ? "Partial Match" : "Skill Gap";

  const weakerAreas =
    matchCount === 0
      ? ["Not enough overlap found between the job description and the listed skills/projects."]
      : ["This is a simple keyword match, not a nuanced assessment — treat it as a starting point, not a verdict."];

  return {
    matchLevel,
    summary: `Found ${matchingSkills.length} matching skill(s) and ${matchingTechnologies.length} matching technology mention(s) between the job description and the portfolio data. This is a keyword-based comparison (no AI configured) — for a fuller assessment, set ANTHROPIC_API_KEY.`,
    matchingSkills,
    matchingTechnologies,
    relevantProjects,
    weakerAreas,
    suggestedInterviewTopics: relevantProjects.map((p) => `Walk through the ${p.name} project`),
    mode: "local",
  };
}
