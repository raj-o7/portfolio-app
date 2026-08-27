"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCaseStudy } from "@/components/project/project-case-study";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="group relative flex flex-col rounded-xl border border-border bg-card p-6 sm:p-7 transition-all hover:border-primary/30 hover:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.15)]">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-medium tracking-tight">{project.name}</h3>
          <span className="label-mono shrink-0 text-muted-foreground">{project.status}</span>
        </div>

        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{project.oneLiner}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((t) => (
            <Badge key={t} variant="outline" className="font-code font-normal text-[11px] py-0.5 px-2">
              {t}
            </Badge>
          ))}
          {project.technologies.length > 5 ? (
            <Badge variant="outline" className="font-code font-normal text-[11px] py-0.5 px-2">
              +{project.technologies.length - 5}
            </Badge>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-border">
          <Button size="sm" onClick={() => setOpen(true)}>
            View Case Study
          </Button>
          {project.links.github ? (
            <Button
              render={<a href={project.links.github} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              variant="ghost"
              size="icon"
              aria-label={`${project.name} on GitHub`}
            >
              <GithubIcon className="size-4" />
            </Button>
          ) : null}
          {project.links.liveDemo ? (
            <Button
              render={<a href={project.links.liveDemo} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              variant="ghost"
              size="icon"
              aria-label={`${project.name} live demo`}
            >
              <ExternalLink className="size-4" />
            </Button>
          ) : null}
        </div>
      </div>

      <ProjectCaseStudy project={project} open={open} onOpenChange={setOpen} />
    </>
  );
}
