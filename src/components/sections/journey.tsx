import { GraduationCap, BookOpen, Hammer, Sparkles, Target } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { journey } from "@/data/education";
import type { JourneyStage } from "@/types";

const stageIcon: Record<JourneyStage, React.ComponentType<{ className?: string }>> = {
  education: GraduationCap,
  learning: BookOpen,
  project: Hammer,
  skill: Sparkles,
  goal: Target,
};

export function Journey() {
  return (
    <section id="journey" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading eyebrow="Developer Journey" title="Education → learning → projects → goals" />
      </Reveal>

      <ol className="mt-12 relative border-l border-border ml-3 space-y-10">
        {journey.map((entry, i) => {
          const Icon = stageIcon[entry.stage];
          return (
            <Reveal as="li" key={`${entry.title}-${i}`} delay={i * 0.06} className="relative pl-8">
              <span className="absolute -left-[calc(0.75rem+1px)] top-0 flex items-center justify-center size-6 rounded-full bg-card border border-border">
                <Icon className="size-3.5 text-primary" />
              </span>
              <p className="label-mono text-muted-foreground mb-1">{entry.period}</p>
              <h3 className="font-medium">{entry.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-xl">{entry.description}</p>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
