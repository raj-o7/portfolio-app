import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { skills, skillCategoryLabels, currentlyLearningSkill } from "@/data/skills";
import { cn } from "@/lib/utils";
import type { Skill } from "@/types";

const categoryOrder: Skill["category"][] = ["frontend", "backend", "languages", "data", "tools"];

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I work with"
          description="Grouped by how I actually use them — no invented percentages, just what's true."
        />
      </Reveal>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryOrder.map((category, i) => {
          const items = skills.filter((s) => s.category === category);
          if (items.length === 0) return null;
          return (
            <Reveal key={category} delay={i * 0.06} className="rounded-xl border border-border bg-card p-6">
              <p className="label-mono text-muted-foreground mb-4">{skillCategoryLabels[category]}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="outline"
                    className={cn(
                      "font-code font-normal text-xs py-1 px-2.5 rounded-md",
                      skill.note === "primary" && "border-primary/40 bg-primary/8 text-primary"
                    )}
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </Reveal>
          );
        })}

        <Reveal delay={categoryOrder.length * 0.06} className="rounded-xl border border-dashed border-border p-6 flex flex-col justify-center">
          <p className="label-mono text-signal mb-2">Currently learning</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{currentlyLearningSkill}</p>
        </Reveal>
      </div>
    </section>
  );
}
