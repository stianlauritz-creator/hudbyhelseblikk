"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  /**
   * Innhold over folden (hero). Rendres synlig fra serveren i stedet for
   * opacity:0 — ellers er LCP-elementet usynlig til JS har hydrert, og
   * innholdet blir borte helt hvis JS feiler.
   */
  eager?: boolean;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  eager = false,
}: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduserBevegelse = useReducedMotion();

  if (eager || reduserBevegelse) {
    return <div className={className}>{children}</div>;
  }

  const initial =
    direction === "up"
      ? { opacity: 0, y: 40 }
      : direction === "left"
      ? { opacity: 0, x: -40 }
      : direction === "right"
      ? { opacity: 0, x: 40 }
      : { opacity: 0 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
