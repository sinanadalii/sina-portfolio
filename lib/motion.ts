import type { Transition, Variants } from "framer-motion";

/*
  Shared motion language: quiet, premium, no bounce.

  Everything uses a smooth ease-out curve (no overshoot) and small distances.
  prefers-reduced-motion is honored globally via <MotionConfig reducedMotion="user">
  in the providers, so individual components don't each have to guard for it.
*/

// Ease-out "expo" style curve - confident deceleration, never springs back.
// Typed as a 4-tuple (not `as const`) so it satisfies Framer Motion's
// mutable bezier `Easing` type.
export const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const baseTransition: Transition = {
  duration: 0.8,
  ease: easeOut,
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

/** Headline-grade reveal: a touch of blur for a soft, focused entrance. */
export const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: baseTransition,
  },
};

/** Parent wrapper that reveals children one after another. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

/** Sensible defaults for scroll-triggered reveals via `whileInView`. */
export const viewportOnce = {
  once: true,
  margin: "0px 0px -120px 0px",
} as const;
