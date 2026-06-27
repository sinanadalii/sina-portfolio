"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { GlowLine } from "@/components/ui/GlowLine";
import { ABOUT_SECTION } from "@/lib/constants";
import { fadeUp, fadeUpBlur, staggerContainer, viewportOnce } from "@/lib/motion";

// Quiet, alternating brand accent for the principle indices.
const indexAccent = (i: number) =>
  i % 2 === 0 ? "text-glow-primary/70" : "text-glow-secondary/70";

export function About() {
  return (
    <Section id="about" className="relative scroll-mt-24">
      {/* Single, very soft ambient glow - calmer than the hero. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[8%] top-1/3 h-[26rem] w-[26rem] rounded-full bg-glow-secondary/[4%] blur-[150px]" />
      </div>

      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: heading + intro */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:col-span-5"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <GlowLine className="w-10" />
            <span className="text-xs uppercase tracking-[0.18em] text-muted">
              {ABOUT_SECTION.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUpBlur}
            className="mt-6 text-balance text-[clamp(2rem,4vw+0.5rem,3.25rem)] font-semibold leading-[1.08] text-foreground"
          >
            {ABOUT_SECTION.heading}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {ABOUT_SECTION.intro}
          </motion.p>
        </motion.div>

        {/* Right: principle blocks (border-separated, not cards) */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:col-span-6 lg:col-start-7"
        >
          {ABOUT_SECTION.principles.map((principle, i) => (
            <motion.li
              key={principle.title}
              variants={fadeUp}
              className="border-t border-border py-7 first:border-t-0 first:pt-0 lg:py-8 lg:first:pt-0"
            >
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden
                  className={`text-xs font-medium tabular-nums ${indexAccent(i)}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {principle.description}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}
