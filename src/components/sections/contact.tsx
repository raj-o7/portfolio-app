"use client";

import * as React from "react";
import { Mail, Phone, Send } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile, phone } from "@/data/profile";

const contactLinks = [
  { label: profile.social.email, href: `mailto:${profile.social.email}`, icon: Mail },
  { label: phone, href: `tel:${phone.replace(/\s+/g, "")}`, icon: Phone },
  { label: "GitHub", href: profile.social.github, icon: GithubIcon },
  { label: "LinkedIn", href: profile.social.linkedin, icon: LinkedinIcon },
];

export function Contact() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ""}`);
    window.location.href = `mailto:${profile.social.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading eyebrow="Contact" title="Let's talk" description="The fastest way to reach me is email." />
      </Reveal>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <Reveal className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <ul className="space-y-4">
            {contactLinks.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors group"
                >
                  <span className="flex items-center justify-center size-9 rounded-lg border border-border group-hover:border-primary/40 transition-colors">
                    <c.icon className="size-4" />
                  </span>
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Textarea
              placeholder="Message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Button type="submit" className="w-full gap-2">
              <Send className="size-4" /> Send Message
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Opens your email client with this message pre-filled.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
