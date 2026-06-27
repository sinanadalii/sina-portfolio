"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A subtle two-part cursor: a precise instant dot plus a softly-trailing ring
 * that grows over interactive elements.
 *
 * Usability guards:
 *  - Only activates on fine pointers (mouse), never on touch.
 *  - Disabled when prefers-reduced-motion is set.
 *  - The native cursor is hidden only after JS confirms activation, so the
 *    site is never left cursor-less.
 */
const INTERACTIVE = "a, button, [role='button'], input, textarea, select, [data-cursor='hover']";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.45 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || prefersReduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      setHovering(Boolean(target?.closest(INTERACTIVE)));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[100]"
      >
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[100]"
      >
        <div
          className={cn(
            "-translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,background-color,border-color] duration-200 ease-out",
            hovering
              ? "h-12 w-12 border-glow-primary/60 bg-glow-primary/5"
              : "h-8 w-8 border-white/25",
          )}
        />
      </motion.div>
    </>
  );
}
