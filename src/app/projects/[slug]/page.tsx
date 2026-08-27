import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/icons";
import { projects, getProjectBySlug } from "@/data/projects";

export function generateStaticParams() {
  return projects.filter((p) => p.deepDive).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.oneLiner,
    openGraph: { title: project.name, description: project.oneLiner },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-8 border-b border-border last:border-b-0">
      <p className="label-mono text-primary mb-3">{title}</p>
      {children}
    </div>
  );
}

export default async function ProjectDeepDivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !project.deepDive) notFound();
  const { deepDive } = project;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" /> Back to projects
        </Link>

        <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight mt-6">{project.name}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{project.oneLiner}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <Badge key={t} variant="outline" className="font-code font-normal text-xs">
              {t}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.github ? (
            <Button render={<a href={project.links.github} target="_blank" rel="noopener noreferrer" />} nativeButton={false} variant="outline" size="sm" className="gap-1.5">
              <GithubIcon className="size-3.5" /> GitHub
            </Button>
          ) : null}
          {project.links.liveDemo ? (
            <Button render={<a href={project.links.liveDemo} target="_blank" rel="noopener noreferrer" />} nativeButton={false} size="sm" className="gap-1.5">
              <ExternalLink className="size-3.5" /> Live Demo
            </Button>
          ) : null}
        </div>

        <div className="mt-10">
          <Block title="1. Problem">
            <p className="leading-relaxed">{project.problem}</p>
          </Block>

          <Block title="2. Goal">
            <p className="leading-relaxed">{deepDive.goal}</p>
          </Block>

          <Block title="3. Architecture">
            <p className="leading-relaxed">{deepDive.architecture}</p>
          </Block>

          <Block title="4. Technology Choices">
            <ul className="space-y-3">
              {deepDive.technologyChoices.map((tc) => (
                <li key={tc.choice}>
                  <p className="font-medium text-sm">{tc.choice}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{tc.reason}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="5. Implementation">
            <p className="leading-relaxed">{deepDive.implementation}</p>
          </Block>

          <Block title="6 & 7. Challenges and Solutions">
            <ul className="space-y-4">
              {deepDive.challengesAndSolutions.map((cs, i) => (
                <li key={i}>
                  <p className="text-sm">
                    <span className="label-mono text-match-gap mr-2">Challenge</span>
                    {cs.challenge}
                  </p>
                  <p className="text-sm mt-1.5">
                    <span className="label-mono text-match-strong mr-2">Solution</span>
                    {cs.solution}
                  </p>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="8. Key Features">
            <ul className="space-y-1.5">
              {project.keyFeatures.map((f) => (
                <li key={f} className="text-sm leading-relaxed flex gap-2">
                  <span className="mt-1.5 size-1 rounded-full bg-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </Block>

          {deepDive.screenshots?.length ? (
            <Block title="9. Screenshots">
              <div className="grid sm:grid-cols-2 gap-4">
                {deepDive.screenshots.map((s) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={s.src} src={s.src} alt={s.alt} className="rounded-lg border border-border" />
                ))}
              </div>
            </Block>
          ) : null}

          <Block title="10. Results">
            <p className="leading-relaxed">{deepDive.results}</p>
          </Block>

          <Block title="11. Lessons Learned">
            <p className="leading-relaxed">{deepDive.lessonsLearned}</p>
          </Block>

          <Block title="12. Future Improvements">
            <ul className="space-y-1.5">
              {deepDive.futureImprovements.map((f) => (
                <li key={f} className="text-sm leading-relaxed flex gap-2">
                  <span className="mt-1.5 size-1 rounded-full bg-signal shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </main>
      <Footer />
    </>
  );
}
