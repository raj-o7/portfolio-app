"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { suggestedQuestions } from "@/lib/ai/system-prompt";
import { profile } from "@/data/profile";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  role: "assistant",
  content: `Hi, I'm Ask My Portfolio — I can answer questions about ${profile.name}'s projects, skills, and background using only what's actually in this portfolio. Try a question below.`,
};

export function PortfolioAssistant() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([WELCOME]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [mode, setMode] = React.useState<"ai" | "local" | null>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function send(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setMode(data.mode === "ai" ? "ai" : "local");
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong answering that. Try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-16 right-0 w-[min(92vw,380px)] h-[min(70vh,560px)] flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border glass">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium leading-none">Ask My Portfolio</p>
                    {mode ? (
                      <p className="label-mono text-muted-foreground mt-1 text-[10px]">
                        {mode === "ai" ? "Claude-powered" : "Local search mode"}
                      </p>
                    ) : null}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="size-7" onClick={() => setOpen(false)} aria-label="Close chat">
                  <X className="size-4" />
                </Button>
              </div>

              <ScrollArea className="flex-1 px-4 py-3">
                <div className="space-y-3">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={cn(
                        "text-sm leading-relaxed rounded-2xl px-3.5 py-2.5 max-w-[85%]",
                        m.role === "user"
                          ? "ml-auto bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-secondary rounded-bl-sm"
                      )}
                    >
                      {m.content}
                    </div>
                  ))}
                  {loading ? (
                    <div className="bg-secondary rounded-2xl rounded-bl-sm px-3.5 py-2.5 w-fit">
                      <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
                    </div>
                  ) : null}
                  <div ref={bottomRef} />
                </div>
              </ScrollArea>

              <div className="border-t border-border p-3 space-y-2.5">
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQuestions.slice(0, 4).map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      disabled={loading}
                      className="text-[11px] leading-tight px-2.5 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about projects, skills, fit..."
                    className="flex-1 h-9 rounded-full border border-border bg-background px-3.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    maxLength={500}
                  />
                  <Button type="submit" size="icon" className="size-9 rounded-full shrink-0" disabled={loading || !input.trim()}>
                    <Send className="size-4" />
                  </Button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          size="lg"
          onClick={() => setOpen((o) => !o)}
          className="rounded-full shadow-lg gap-2 h-12 px-5"
          aria-label="Ask My Portfolio"
        >
          {open ? <X className="size-4" /> : <MessageCircle className="size-4" />}
          <span className="hidden sm:inline">{open ? "Close" : "Ask My Portfolio"}</span>
        </Button>
      </div>
    </>
  );
}
