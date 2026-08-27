"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { JobFitResult, MatchLevel } from "@/lib/ai/job-fit-types";

const matchStyles: Record<MatchLevel, string> = {
  "Strong Match": "bg-match-strong/10 text-match-strong border-match-strong/30",
  "Partial Match": "bg-match-partial/10 text-match-partial border-match-partial/30",
  "Skill Gap": "bg-match-gap/10 text-match-gap border-match-gap/30",
};

export function JobFitAnalyzer() {
  const [jobDescription, setJobDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<JobFitResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function analyze() {
    if (!jobDescription.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/job-fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="size-4 text-primary" />
        <p className="label-mono text-primary">AI Feature</p>
      </div>
      <h3 className="font-display text-2xl font-medium tracking-tight">Would I be a good fit?</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-xl">
        Paste a job description. This compares it against my actual skills and projects only —
        it will tell you honestly where I&apos;m a strong match, a partial match, or have a real skill gap.
      </p>

      <div className="mt-6 space-y-3">
        <Textarea
          rows={6}
          placeholder="Paste the job description here…"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          maxLength={6000}
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{jobDescription.length}/6000</p>
          <Button onClick={analyze} disabled={loading || !jobDescription.trim()} className="gap-2">
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            Analyze Fit
          </Button>
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </div>

      <AnimatePresence>
        {result ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-8 pt-6 border-t border-border space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className={cn("label-mono px-3 py-1.5 rounded-full border", matchStyles[result.matchLevel])}>
                  {result.matchLevel}
                </span>
                {result.mode === "local" ? (
                  <span className="label-mono text-muted-foreground">keyword-based (no AI configured)</span>
                ) : null}
              </div>

              <p className="text-sm leading-relaxed">{result.summary}</p>

              {result.matchingSkills.length ? (
                <div>
                  <p className="label-mono text-muted-foreground mb-2">Matching skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchingSkills.map((s) => (
                      <Badge key={s} variant="outline" className="font-code font-normal text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {result.matchingTechnologies.length ? (
                <div>
                  <p className="label-mono text-muted-foreground mb-2">Matching technologies</p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchingTechnologies.map((t) => (
                      <Badge key={t} variant="outline" className="font-code font-normal text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {result.relevantProjects.length ? (
                <div>
                  <p className="label-mono text-muted-foreground mb-2">Projects to look at</p>
                  <ul className="space-y-2">
                    {result.relevantProjects.map((p) => (
                      <li key={p.slug} className="text-sm">
                        <Link href={`/projects/${p.slug}`} className="font-medium hover:text-primary inline-flex items-center gap-1">
                          {p.name} <ArrowRight className="size-3" />
                        </Link>
                        <p className="text-muted-foreground text-xs mt-0.5">{p.reason}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {result.weakerAreas.length ? (
                <div>
                  <p className="label-mono text-match-gap mb-2">Where I&apos;m weaker</p>
                  <ul className="space-y-1">
                    {result.weakerAreas.map((w, i) => (
                      <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {result.suggestedInterviewTopics.length ? (
                <div>
                  <p className="label-mono text-muted-foreground mb-2">Suggested interview topics</p>
                  <ul className="space-y-1">
                    {result.suggestedInterviewTopics.map((t, i) => (
                      <li key={i} className="text-sm leading-relaxed flex gap-2">
                        <span className="mt-1.5 size-1 rounded-full bg-primary shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
