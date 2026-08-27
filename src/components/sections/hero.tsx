import { ArrowRight, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { TraversalGraph } from "@/components/hero/traversal-graph";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 grid-fade-mask"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          opacity: 0.4,
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24 pb-20 sm:pb-28 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <Reveal eager>
            <p className="label-mono text-primary mb-5">{`// ${profile.title.toLowerCase()}`}</p>
          </Reveal>

          <Reveal eager delay={0.05}>
            <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-balance leading-[1.05]">
              {profile.name}
            </h1>
          </Reveal>

          <Reveal eager delay={0.1}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              {profile.positioning}
            </p>
          </Reveal>

          <Reveal eager delay={0.18}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button render={<a href="#projects" />} nativeButton={false} size="lg" className="gap-2">
                View Projects <ArrowRight className="size-4" />
              </Button>
              <Button render={<a href="#contact" />} nativeButton={false} size="lg" variant="outline" className="gap-2">
                <Mail className="size-4" /> Contact Me
              </Button>
            </div>
          </Reveal>

          <Reveal eager delay={0.24}>
            <div className="mt-8 flex items-center gap-4 text-muted-foreground">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-foreground transition-colors"
              >
                <GithubIcon className="size-5" />
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-foreground transition-colors"
              >
                <LinkedinIcon className="size-5" />
              </a>
              <a
                href={profile.social.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Resume"
                className="hover:text-foreground transition-colors"
              >
                <FileText className="size-5" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal eager delay={0.15} className="hidden md:block">
          <TraversalGraph />
        </Reveal>
      </div>
    </section>
  );
}
