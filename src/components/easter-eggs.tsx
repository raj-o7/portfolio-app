"use client";

import * as React from "react";
import { profile } from "@/data/profile";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** Two quiet, professional easter eggs: a styled console greeting for anyone
 * who opens devtools, and a Konami-code banner for anyone who tries it. */
export function EasterEggs() {
  const [found, setFound] = React.useState(false);
  const progress = React.useRef<string[]>([]);

  React.useEffect(() => {
    console.log(
      "%cLooking under the hood?",
      "font-size:14px;font-weight:600;color:#9a92ff;"
    );
    console.log(
      `%cHi — I'm ${profile.name}. If you're reading this in devtools, you're exactly the kind of curious this site was built for. Source: ${profile.social.github}`,
      "font-size:12px;color:#9298a6;"
    );
  }, []);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      progress.current = [...progress.current, e.key].slice(-KONAMI.length);
      if (progress.current.join(",") === KONAMI.join(",")) {
        setFound(true);
        window.setTimeout(() => setFound(false), 4000);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!found) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] glass border border-border rounded-full px-4 py-2 text-sm label-mono shadow-lg"
    >
      Konami code confirmed. You&apos;d survive a code review here. 🎮
    </div>
  );
}
