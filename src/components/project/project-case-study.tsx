"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="label-mono text-muted-foreground mb-1.5">{label}</p>
      <p className="text-sm leading-relaxed">{value}</p>
    </div>
  );
}

export function ProjectCaseStudy({
  project,
  open,
  onOpenChange,
}: {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="font-display text-xl">{project.name}</DialogTitle>
          <DialogDescription>{project.oneLiner}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(85vh-9rem)]">
          <div className="p-6 space-y-6">
            <Field label="Problem" value={project.problem} />
            <Field label="Solution" value={project.solution} />
            <Field label="My role" value={project.myRole} />

            <div>
              <p className="label-mono text-muted-foreground mb-2">Technologies</p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <Badge key={t} variant="outline" className="font-code font-normal text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="label-mono text-muted-foreground mb-2">Key features</p>
              <ul className="space-y-1.5">
                {project.keyFeatures.map((f) => (
                  <li key={f} className="text-sm leading-relaxed flex gap-2">
                    <span className="text-primary mt-1.5 size-1 rounded-full bg-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <Field label="Challenges" value={project.challenges} />
            <Field label="What I learned" value={project.whatILearned} />
          </div>
        </ScrollArea>

        <div className="flex flex-wrap items-center gap-3 p-6 pt-4 border-t border-border">
          {project.links.github ? (
            <Button
              render={<a href={project.links.github} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              variant="outline"
              size="sm"
              className="gap-1.5"
            >
              <GithubIcon className="size-3.5" /> Code
            </Button>
          ) : null}
          {project.links.liveDemo ? (
            <Button
              render={<a href={project.links.liveDemo} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              variant="outline"
              size="sm"
              className="gap-1.5"
            >
              <ExternalLink className="size-3.5" /> Live Demo
            </Button>
          ) : null}
          {project.deepDive ? (
            <Button render={<Link href={`/projects/${project.slug}`} />} nativeButton={false} size="sm" className="gap-1.5 ml-auto">
              Full deep dive <ArrowRight className="size-3.5" />
            </Button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
