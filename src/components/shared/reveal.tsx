"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  eager = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
  /** Use for above-the-fold content that's visible immediately on load —
   * animates on mount instead of waiting on a scroll-intersection observer,
   * which can otherwise never fire (e.g. a tab loaded in the background). */
  eager?: boolean;
}) {
  const MotionTag = motion[as];
  const trigger = eager
    ? { initial: "hidden", animate: "visible" }
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" } };
  return (
    <MotionTag
      className={className}
      {...trigger}
      variants={variants}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
