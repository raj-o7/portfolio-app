import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildPortfolioContext } from "@/lib/portfolio-context";
import { localJobFit } from "@/lib/ai/job-fit-local";
import { JobFitResult } from "@/lib/ai/job-fit-types";

export const runtime = "nodejs";

const MAX_JD_LENGTH = 6000;

const JOB_FIT_TOOL = {
  name: "report_job_fit",
  description: "Report a structured, honest job-fit analysis based strictly on the portfolio data provided.",
  input_schema: {
    type: "object" as const,
    properties: {
      matchLevel: { type: "string", enum: ["Strong Match", "Partial Match", "Skill Gap"] },
      summary: { type: "string", description: "2-3 sentence honest summary." },
      matchingSkills: { type: "array", items: { type: "string" } },
      matchingTechnologies: { type: "array", items: { type: "string" } },
      relevantProjects: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            slug: { type: "string" },
            reason: { type: "string" },
          },
          required: ["name", "slug", "reason"],
        },
      },
      weakerAreas: {
        type: "array",
        items: { type: "string" },
        description: "Honest gaps between the job description and the portfolio data. Do not soften or omit real gaps.",
      },
      suggestedInterviewTopics: {
        type: "array",
        items: { type: "string" },
        description: "Topics grounded only in his actual projects/skills — nothing hypothetical.",
      },
    },
    required: [
      "matchLevel",
      "summary",
      "matchingSkills",
      "matchingTechnologies",
      "relevantProjects",
      "weakerAreas",
      "suggestedInterviewTopics",
    ],
  },
};

export async function POST(req: NextRequest) {
  let body: { jobDescription?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const jobDescription = body.jobDescription?.trim();
  if (!jobDescription) {
    return NextResponse.json({ error: "Please paste a job description." }, { status: 400 });
  }
  if (jobDescription.length > MAX_JD_LENGTH) {
    return NextResponse.json(
      { error: `Job description is too long (max ${MAX_JD_LENGTH} characters).` },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(localJobFit(jobDescription));
  }

  try {
    const anthropic = new Anthropic({ apiKey });
    const context = buildPortfolioContext();

    const response = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 1200,
      system: `You analyze how well a candidate's portfolio fits a job description. Use ONLY the PORTFOLIO DATA below — never invent skills, experience, or projects that aren't listed. Be honest and specific: if something in the job description isn't covered by the data, say so plainly in weakerAreas rather than glossing over it. Do not exaggerate the match level. Call the report_job_fit tool with your analysis.\n\nPORTFOLIO DATA:\n${context}`,
      tools: [JOB_FIT_TOOL],
      tool_choice: { type: "tool", name: "report_job_fit" },
      messages: [{ role: "user", content: `JOB DESCRIPTION:\n${jobDescription}` }],
    });

    const toolUse = response.content.find((b) => b.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      throw new Error("Model did not return structured output.");
    }

    const result: JobFitResult = { ...(toolUse.input as Omit<JobFitResult, "mode">), mode: "ai" };
    return NextResponse.json(result);
  } catch (err) {
    console.error("Job-fit AI error:", err);
    return NextResponse.json(localJobFit(jobDescription));
  }
}
