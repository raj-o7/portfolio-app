"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { RecruiterModeToggle } from "@/components/layout/recruiter-mode-toggle";
import { useRecruiterMode } from "@/components/recruiter-mode-provider";
import { profile } from "@/data/profile";

const navLinks = [
  { href: "#about", label: "About", hideInRecruiterMode: true },
  { href: "#skills", label: "Skills", hideInRecruiterMode: false },
  { href: "#projects", label: "Projects", hideInRecruiterMode: false },
  { href: "#journey", label: "Journey", hideInRecruiterMode: true },
  { href: "#job-fit", label: "Job Fit", hideInRecruiterMode: true },
  { href: "#resume", label: "Resume", hideInRecruiterMode: false },
  { href: "#contact", label: "Contact", hideInRecruiterMode: false },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { recruiterMode } = useRecruiterMode();
  const visibleLinks = navLinks.filter((l) => !(recruiterMode && l.hideInRecruiterMode));

  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="#top" className="font-code text-sm font-medium tracking-tight">
          <span className="text-muted-foreground">{"{ "}</span>
          {profile.name.split(" ")[0].toLowerCase()}
          <span className="text-muted-foreground">{" }"}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {visibleLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <RecruiterModeToggle />
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" />}>
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="font-code text-left px-4 pt-4">Menu</SheetTitle>
              <nav className="flex flex-col gap-1 px-4 pb-4 pt-2">
                {visibleLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-2 py-2.5 text-base rounded-md hover:bg-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-3">
                  <RecruiterModeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
