"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ProjectCard } from "@/components/project/project-card";
import { Button } from "@/components/ui/button";
import { projects, getExplorationFilters } from "@/data/projects";
import { cn } from "@/lib/utils";

const filters = getExplorationFilters();

export function Projects() {
  const [active, setActive] = React.useState("All");

  const visible = active === "All" ? projects : projects.filter((p) => p.explorationTags.includes(active));

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Featured Projects"
          title="What I've actually built"
          description="Two production applications, built and deployed end-to-end — including finding and fixing a real production bug."
        />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Explore projects by technology">
          {filters.map((f) => (
            <Button
              key={f}
              size="sm"
              variant={active === f ? "default" : "outline"}
              onClick={() => setActive(f)}
              className={cn("label-mono", active !== f && "text-muted-foreground")}
            >
              {f}
            </Button>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid sm:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-center text-muted-foreground text-sm">
          No projects tagged &ldquo;{active}&rdquo; yet — check back soon.
        </p>
      ) : null}
    </section>
  );
}
