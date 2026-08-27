import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildPortfolioContext } from "@/lib/portfolio-context";
import { buildAssistantSystemPrompt } from "@/lib/ai/system-prompt";
import { localAnswer } from "@/lib/ai/local-search";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 8;

export async function POST(req: NextRequest) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages.slice(-MAX_HISTORY) : [];
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");

  if (!lastUserMessage || !lastUserMessage.content?.trim()) {
    return NextResponse.json({ error: "No question provided." }, { status: 400 });
  }
  if (lastUserMessage.content.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Please keep questions under ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    // Zero-config fallback: local keyword retrieval, no LLM call, no hallucination risk.
    const reply = localAnswer(lastUserMessage.content);
    return NextResponse.json({ reply, mode: "local" });
  }

  try {
    const anthropic = new Anthropic({ apiKey });
    const context = buildPortfolioContext();
    const system = buildAssistantSystemPrompt(context);

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const reply = textBlock && "text" in textBlock ? textBlock.text : "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply, mode: "ai" });
  } catch (err) {
    console.error("AI assistant error:", err);
    // Degrade gracefully instead of surfacing a raw 500 to the visitor.
    const reply = localAnswer(lastUserMessage.content);
    return NextResponse.json({ reply, mode: "local-fallback" });
  }
}
