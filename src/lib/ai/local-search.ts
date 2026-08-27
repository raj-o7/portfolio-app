import { profile, phone } from "@/data/profile";
import { about } from "@/data/about";
import { skills, skillCategoryLabels } from "@/data/skills";
import { projects } from "@/data/projects";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";

/**
 * Zero-cost, zero-API-key fallback for the AI assistant. Used automatically
 * when ANTHROPIC_API_KEY is not configured (see /api/chat). It never calls
 * an LLM, so it can never hallucinate — it only ever echoes back structured
 * portfolio data that matches the visitor's question.
 */
export function localAnswer(question: string): string {
  const q = question.toLowerCase();

  const mentionsAny = (words: string[]) => words.some((w) => q.includes(w));

  if (mentionsAny(["contact", "email", "reach", "hire", "linkedin", "phone", "call"])) {
    return `You can reach ${profile.name} at ${profile.social.email} or ${phone}, on GitHub (${profile.social.github}), or LinkedIn (${profile.social.linkedin}).`;
  }

  if (mentionsAny(["education", "degree", "college", "university", "school"])) {
    return education
      .map((e) => `${e.degree} at ${e.institution} (${e.period}).`)
      .join(" ");
  }

  if (mentionsAny(["certification", "certificate", "certified", "course"])) {
    return certifications.map((c) => `${c.name} (${c.issuer})`).join(", ") || "No certifications listed yet.";
  }

  if (mentionsAny(["skill", "technology", "tech stack", "know", "language", "framework"])) {
    const grouped = Object.entries(skillCategoryLabels)
      .map(([key, label]) => {
        const names = skills.filter((s) => s.category === key).map((s) => s.name);
        return names.length ? `${label}: ${names.join(", ")}` : null;
      })
      .filter(Boolean);
    return grouped.join(" | ");
  }

  if (mentionsAny(["project", "built", "build", "portfolio", "work"])) {
    // rank projects by keyword overlap with the question
    const scored = projects
      .map((p) => {
        const haystack = `${p.name} ${p.oneLiner} ${p.technologies.join(" ")} ${p.explorationTags.join(" ")}`.toLowerCase();
        const score = haystack.split(/\W+/).filter((w) => w && q.includes(w)).length;
        return { p, score };
      })
      .sort((a, b) => b.score - a.score);

    const top = scored[0]?.score ? scored.filter((s) => s.score > 0) : scored.filter((s) => s.p.featured);

    return top
      .slice(0, 3)
      .map(({ p }) => `${p.name}: ${p.oneLiner} (Built with ${p.technologies.join(", ")}.)`)
      .join(" ");
  }

  if (mentionsAny(["fit", "suitable", "why hire", "interview", "role"])) {
    return `${profile.positioning} He's currently ${about.lookingFor}`;
  }

  // generic fallback: return the positioning statement + featured project names
  const featuredNames = projects.filter((p) => p.featured).map((p) => p.name).join(", ");
  return `${profile.positioning} Featured projects: ${featuredNames}. Ask about his skills, projects, education, or how to contact him for more specific answers.`;
}
