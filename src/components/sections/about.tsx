import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { about } from "@/data/about";

const rows: { label: string; value: string }[] = [
  { label: "Background", value: about.background },
  { label: "Currently learning", value: about.currentlyLearning },
  { label: "Enjoys building", value: about.whatIEnjoyBuilding },
  { label: "Philosophy", value: about.philosophy },
  { label: "Looking for", value: about.lookingFor },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading eyebrow="About" title="A bit about how I work" />
      </Reveal>

      <div className="mt-12 grid sm:grid-cols-2 gap-px bg-border rounded-xl overflow-hidden border border-border">
        {rows.map((row, i) => (
          <Reveal key={row.label} delay={i * 0.05} className="bg-card p-6 sm:p-7">
            <p className="label-mono text-muted-foreground mb-2">{row.label}</p>
            <p className="leading-relaxed">{row.value}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
