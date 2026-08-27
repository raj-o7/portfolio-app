"use client";

import * as React from "react";
import Image from "next/image";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons";
import type { GithubStats as GithubStatsData } from "@/lib/github";

type ApiResponse = { configured: boolean; stats: GithubStatsData | null };

export function GithubStats() {
  const [data, setData] = React.useState<ApiResponse | null>(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/github")
      .then((r) => r.json())
      .then((json) => !cancelled && setData(json))
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  if (data && !data.configured) return null; // No GITHUB_USERNAME set — omit rather than fake it.

  return (
    <section id="github" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="GitHub"
          title="Live from GitHub"
          description="Pulled directly from the public GitHub API — nothing here is hand-typed."
        />
      </Reveal>

      <div className="mt-10">
        {error || (data && !data.stats) ? (
          <p className="text-sm text-muted-foreground">GitHub data is temporarily unavailable.</p>
        ) : !data ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            <Reveal className="rounded-xl border border-border bg-card p-6 flex flex-col items-start gap-3">
              {data.stats!.avatarUrl ? (
                <Image
                  src={data.stats!.avatarUrl}
                  alt={data.stats!.username}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              ) : null}
              <div>
                <p className="font-medium">@{data.stats!.username}</p>
                {data.stats!.bio ? (
                  <p className="text-sm text-muted-foreground mt-1">{data.stats!.bio}</p>
                ) : null}
              </div>
              <div className="flex gap-4 text-sm">
                <div>
                  <p className="font-display text-lg">{data.stats!.publicRepos}</p>
                  <p className="label-mono text-muted-foreground">Repos</p>
                </div>
                <div>
                  <p className="font-display text-lg">{data.stats!.followers}</p>
                  <p className="label-mono text-muted-foreground">Followers</p>
                </div>
              </div>
              <Button
                render={<a href={data.stats!.profileUrl} target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
                variant="outline"
                size="sm"
                className="gap-1.5 mt-1"
              >
                <GithubIcon className="size-3.5" /> View Profile
              </Button>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4">
              {data.stats!.topRepos.map((repo, i) => (
                <Reveal
                  key={repo.name}
                  delay={i * 0.05}
                  className="rounded-xl border border-border bg-card p-5 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-2">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-sm hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      {repo.name}
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                  {repo.description ? (
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {repo.description}
                    </p>
                  ) : null}
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    {repo.language ? (
                      <Badge variant="outline" className="font-code font-normal text-[11px]">
                        {repo.language}
                      </Badge>
                    ) : null}
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-3" /> {repo.stars}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {data?.stats?.languageBreakdown.length ? (
          <Reveal delay={0.1} className="mt-6 flex flex-wrap items-center gap-2">
            <span className="label-mono text-muted-foreground mr-1">Languages across repos:</span>
            {data.stats.languageBreakdown.map((l) => (
              <Badge key={l.language} variant="outline" className="font-code font-normal text-[11px] gap-1">
                <GitFork className="size-3" /> {l.language} · {l.count}
              </Badge>
            ))}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
