# Rajkumar Singh — Developer Portfolio

A Next.js portfolio built to make projects the focus, not the resume. Includes an AI assistant that answers questions from the portfolio's own data only (never invents anything), a job-fit analyzer, live GitHub stats, a recruiter-mode condensed view, and per-project case-study deep dives.

## Tech stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui (Base UI primitives) · Framer Motion · Anthropic API (optional) · GitHub REST API

## Project structure

```
src/
  app/
    page.tsx                 Home page — composes all sections
    layout.tsx                Root layout: fonts, metadata, JSON-LD, providers
    opengraph-image.tsx       Generated OG/social preview image
    sitemap.ts / robots.ts    SEO files
    projects/[slug]/page.tsx  Project deep-dive page (case study)
    api/
      chat/route.ts           "Ask My Portfolio" — Claude or local fallback
      job-fit/route.ts        "Would I be a good fit?" — Claude or local fallback
      github/route.ts         Live GitHub stats proxy

  data/                      ← EDIT THESE FILES to update site content
    profile.ts                Name, title, positioning statement, social links
    about.ts                  About section content
    skills.ts                 Skills, grouped by category
    projects.ts                Projects (the main content — see below)
    education.ts               Education + "Developer Journey" timeline
    certifications.ts          Certifications list

  types/index.ts              TypeScript types for all data above

  lib/
    portfolio-context.ts       Serializes all data/* into one text blob —
                                the ONLY thing the AI assistant is allowed to
                                answer from
    ai/
      system-prompt.ts         AI assistant system prompt + suggested questions
      local-search.ts          Zero-API-key fallback for the chat assistant
      job-fit-local.ts         Zero-API-key fallback for the job-fit analyzer
      job-fit-types.ts         Shared job-fit result type
    github.ts                  GitHub REST API fetch + shaping

  components/
    sections/                  One component per homepage section
    ai/                        Chat widget + job-fit analyzer UI
    project/                   Project card + case-study dialog
    layout/                    Navbar, footer, theme toggle, recruiter toggle
    hero/traversal-graph.tsx   The hero's signature graph-traversal animation
    shared/                    Reveal-on-scroll wrapper, section heading
    recruiter-mode-provider.tsx  Recruiter Mode state (localStorage + ?recruiter=1)
    theme-provider.tsx          Dark/light mode (next-themes)
    easter-eggs.tsx              The two easter eggs (see below)
```

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in what you have — everything is optional
npm run dev
```

Open http://localhost:3000 (or whatever port you choose).

## Environment variables

All optional — the site is fully functional with zero configuration, just with reduced-but-honest AI and no GitHub section.

| Variable | Required? | What it does |
|---|---|---|
| `ANTHROPIC_API_KEY` | No | Powers real Claude responses for the AI assistant and job-fit analyzer. Without it, both features fall back to a local, keyword-based mode that can never hallucinate. Get a key at console.anthropic.com. |
| `GITHUB_USERNAME` | No | Powers the "Live from GitHub" section (repos, stars, languages, recent activity). Without it, that section simply doesn't render — it never shows fake data. Already set to `raj-o7` in this project. |
| `GITHUB_TOKEN` | No | A GitHub personal access token (no scopes needed) to raise the API rate limit from 60/hr to 5,000/hr. Recommended once the site gets real traffic. |
| `NEXT_PUBLIC_SITE_URL` | Recommended for production | Your deployed URL — used for metadata, Open Graph tags, and the sitemap. |

## How to add or edit projects

Open `src/data/projects.ts`. Each project is one object with this shape:

```ts
{
  slug: "my-project",
  name: "Project Name",
  oneLiner: "...",
  problem: "...",
  solution: "...",
  myRole: "...",
  technologies: ["React", "Node.js"],   // free-form strings, shown as badges
  keyFeatures: ["...", "..."],
  challenges: "...",
  whatILearned: "...",
  links: { github: "...", liveDemo: "...", caseStudySlug: "my-project" },
  featured: true,
  status: "shipped",                     // "shipped" | "in-progress" | "archived"
  explorationTags: ["Full Stack", "AI"], // drives the "Explore by technology" filter chips
  deepDive: { ... }                      // optional — adds a full /projects/[slug] page
}
```

The `deepDive` object (goal, architecture, technology choices, implementation, challenges/solutions, results, lessons learned, future improvements) is optional. Add it when you want a full case-study page for that project; omit it and the project still shows fine as a card with a "View Case Study" dialog, just without a dedicated page.

The "Explore by technology" filter chips on the homepage are generated automatically from whatever `explorationTags` exist across your projects — no other file needs to change when you add a new tag.

**Never invent content.** If something is genuinely missing, use a placeholder like `[ADD PROJECT DESCRIPTION]` — the AI assistant is instructed to say "that hasn't been added yet" rather than make something up when it sees a placeholder.

## How to edit everything else

| To change... | Edit... |
|---|---|
| Name, title, hero statement, social links | `src/data/profile.ts` |
| About section | `src/data/about.ts` |
| Skills | `src/data/skills.ts` |
| Education, certifications, journey timeline | `src/data/education.ts`, `src/data/certifications.ts` |
| Resume file | Replace `public/resume.pdf` |
| Colors, fonts, spacing tokens | `src/app/globals.css` (`:root` / `.dark` blocks) and the font setup in `src/app/layout.tsx` |

## How the AI features stay honest

`src/lib/portfolio-context.ts` serializes every data file into one text document. That document — and nothing else — is handed to Claude as the system prompt for both AI features, with explicit instructions to never invent experience, skills, or achievements, and to say "not in the portfolio" rather than guess. When `ANTHROPIC_API_KEY` isn't set, `src/lib/ai/local-search.ts` and `src/lib/ai/job-fit-local.ts` answer the same questions using plain keyword matching against the same data — slower to feel "smart," but structurally incapable of hallucinating.

## Deployment

Works on any Next.js host. For Vercel:

```bash
npx vercel
```

Then set the environment variables above in the project's dashboard (Settings → Environment Variables) and redeploy. Remember to set `NEXT_PUBLIC_SITE_URL` to your real domain so metadata/OG tags and the sitemap are correct.

## Easter eggs

1. Open devtools — there's a styled console greeting.
2. Try the Konami code (↑ ↑ ↓ ↓ ← → ← → b a) anywhere on the site.

## What was implemented

- [x] Hero with name, positioning statement, CTAs, social links, signature graph-traversal animation
- [x] "Ask My Portfolio" AI assistant (Claude, with a zero-hallucination local fallback) + suggested questions
- [x] About, Skills (categorized badges, no fake percentages), Journey timeline
- [x] Featured Projects with expandable case-study dialogs
- [x] "Explore by technology" filtering, generated from real project data
- [x] Project deep-dive pages (`/projects/[slug]`) with a full 12-part case-study structure
- [x] Resume section (download/view) + education + certifications
- [x] Live GitHub integration (repos, stars, languages, recent activity) — omitted, not faked, if unconfigured
- [x] Contact section (email, phone, GitHub, LinkedIn, a form that opens a pre-filled email)
- [x] Recruiter Mode (condensed view + shareable `?recruiter=1` link)
- [x] "Would I be a good fit?" job-description analyzer with Strong/Partial/Gap verdicts
- [x] Dark/light mode, fully responsive (mobile/tablet/desktop), reduced-motion support
- [x] SEO: metadata, Open Graph image (generated), sitemap, robots.txt, JSON-LD Person schema
- [x] Two easter eggs
- [x] Production build verified clean (`npm run build`), zero TypeScript/ESLint errors, zero console errors

## Known placeholders still to fill in

None — LinkedIn URL and development philosophy are both filled in. If you add more projects/skills later and leave a field blank, mark it `[ADD ...]` and search `src/data/` for that pattern before shipping.
