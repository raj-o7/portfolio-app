import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { JobFitAnalyzer } from "@/components/ai/job-fit-analyzer";

export function JobFit() {
  return (
    <section id="job-fit" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="For Recruiters"
          title="Evaluating me for a specific role?"
          description="Paste the job description and get an honest, data-grounded breakdown — no exaggeration."
        />
      </Reveal>
      <Reveal delay={0.08} className="mt-10">
        <JobFitAnalyzer />
      </Reveal>
    </section>
  );
}
