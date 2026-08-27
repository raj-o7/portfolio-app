"use client";

import { useRecruiterMode } from "@/components/recruiter-mode-provider";

/** Wraps a server-rendered section and hides it while Recruiter Mode is on,
 * so the condensed view stays to intro / top projects / skills / resume /
 * GitHub / contact without duplicating section markup. */
export function RecruiterHidden({ children }: { children: React.ReactNode }) {
  const { recruiterMode } = useRecruiterMode();
  if (recruiterMode) return null;
  return <>{children}</>;
}
