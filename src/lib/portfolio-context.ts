import { profile, phone } from "@/data/profile";
import { about } from "@/data/about";
import { skills, skillCategoryLabels, currentlyLearningSkill } from "@/data/skills";
import { projects } from "@/data/projects";
import { education, journey } from "@/data/education";
import { certifications } from "@/data/certifications";

/**
 * Serializes every piece of structured portfolio data into one grounded
 * text document. This is the ONLY source of truth handed to the AI
 * assistant and the job-fit analyzer — both are instructed to answer
 * exclusively from this text, so update the data/*.ts files and this
 * context updates automatically. Nothing here is invented at request time.
 */
export function buildPortfolioContext(): string {
  const skillsByCategory = Object.entries(skillCategoryLabels)
    .map(([key, label]) => {
      const inCategory = skills.filter((s) => s.category === key);
      if (inCategory.length === 0) return null;
      const list = inCategory
        .map((s) => (s.note ? `${s.name} (${s.note})` : s.name))
        .join(", ");
      return `${label}: ${list}`;
    })
    .filter(Boolean)
    .join("\n");

  const projectsText = projects
    .map((p, i) => {
      return [
        `Project ${i + 1}: ${p.name} [slug: ${p.slug}]`,
        `One-liner: ${p.oneLiner}`,
        `Status: ${p.status}${p.featured ? " (featured)" : ""}`,
        `Problem: ${p.problem}`,
        `Solution: ${p.solution}`,
        `My role: ${p.myRole}`,
        `Technologies: ${p.technologies.join(", ")}`,
        `Key features: ${p.keyFeatures.join("; ")}`,
        `Challenges: ${p.challenges}`,
        `What I learned: ${p.whatILearned}`,
        p.links.github ? `GitHub: ${p.links.github}` : "",
        p.links.liveDemo ? `Live demo: ${p.links.liveDemo}` : "",
        p.deepDive
          ? [
              `Deep dive - Goal: ${p.deepDive.goal}`,
              `Deep dive - Architecture: ${p.deepDive.architecture}`,
              `Deep dive - Implementation: ${p.deepDive.implementation}`,
              `Deep dive - Results: ${p.deepDive.results}`,
              `Deep dive - Lessons learned: ${p.deepDive.lessonsLearned}`,
            ].join("\n")
          : "",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  const educationText = education
    .map((e) => `${e.degree} — ${e.institution} (${e.period})${e.detail ? `. ${e.detail}` : ""}`)
    .join("\n");

  const journeyText = journey
    .map((j) => `[${j.period}] (${j.stage}) ${j.title}: ${j.description}`)
    .join("\n");

  const certificationsText = certifications.map((c) => `${c.name} — ${c.issuer}`).join("\n");

  return `
=== PROFILE ===
Name: ${profile.name}
Title: ${profile.title}
Positioning statement: ${profile.positioning}
Location: ${profile.location ?? "Not specified"}
Availability: ${profile.availability ?? "Not specified"}
GitHub: ${profile.social.github}
LinkedIn: ${profile.social.linkedin}
Email: ${profile.social.email}
Phone: ${phone}

=== ABOUT ===
Background: ${about.background}
Currently learning: ${about.currentlyLearning} (also: ${currentlyLearningSkill})
What he enjoys building: ${about.whatIEnjoyBuilding}
Development philosophy: ${about.philosophy}
Looking for: ${about.lookingFor}

=== SKILLS ===
${skillsByCategory}

=== PROJECTS ===
${projectsText}

=== EDUCATION ===
${educationText}

=== CERTIFICATIONS ===
${certificationsText}

=== DEVELOPER JOURNEY ===
${journeyText}
`.trim();
}
