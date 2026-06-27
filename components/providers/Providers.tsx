"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { SmoothScroll } from "./SmoothScroll";
import { CustomCursor } from "./CustomCursor";
import { easeOut } from "@/lib/motion";

/**
 * Client-side environment for the whole app:
 *  - MotionConfig with reducedMotion="user" makes every Framer Motion
 *    animation respect the OS setting automatically.
 *  - Lenis smooth scrolling.
 *  - The custom cursor.
 *
 * `children` are passed through untouched, so Server Components rendered by the
 * layout stay on the server.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: easeOut }}>
      <SmoothScroll />
      <CustomCursor />
      {children}
    </MotionConfig>
  );
}
