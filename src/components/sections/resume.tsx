import { Download, ExternalLink, Award } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";

export function Resume() {
  return (
    <section id="resume" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading eyebrow="Resume" title="One PDF, everything on it" />
      </Reveal>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <Reveal className="rounded-xl border border-border bg-card p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <p className="label-mono text-muted-foreground mb-3">Education</p>
            <ul className="space-y-3">
              {education.map((e) => (
                <li key={e.degree}>
                  <p className="text-sm font-medium">{e.degree}</p>
                  <p className="text-sm text-muted-foreground">
                    {e.institution} · {e.period}
                    {e.detail ? ` · ${e.detail}` : ""}
                  </p>
                </li>
              ))}
            </ul>

            <p className="label-mono text-muted-foreground mb-3 mt-6">Certifications</p>
            <ul className="space-y-2">
              {certifications.map((c) => (
                <li key={c.name} className="flex items-start gap-2 text-sm">
                  <Award className="size-3.5 mt-0.5 text-signal shrink-0" />
                  <span>
                    {c.name} <span className="text-muted-foreground">— {c.issuer}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="rounded-xl border border-dashed border-border p-6 sm:p-8 flex flex-col items-start justify-center gap-4">
          <p className="text-sm text-muted-foreground max-w-sm">
            Get the full picture — experience, skills, and education in one page.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button render={<a href={profile.social.resumeUrl} download />} nativeButton={false} className="gap-2">
              <Download className="size-4" /> Download Resume
            </Button>
            <Button
              render={<a href={profile.social.resumeUrl} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              variant="outline"
              className="gap-2"
            >
              <ExternalLink className="size-4" /> View Resume
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
