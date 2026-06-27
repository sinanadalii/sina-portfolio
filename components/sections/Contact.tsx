"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { GlowLine } from "@/components/ui/GlowLine";
import { Button } from "@/components/ui/Button";
import { CONTACT_SECTION } from "@/lib/constants";
import { fadeUp, fadeUpBlur, staggerContainer, viewportOnce } from "@/lib/motion";

export function Contact() {
  const { eyebrow, heading, intro, primaryCta, secondaryLinks } = CONTACT_SECTION;

  return (
    <Section id="contact" className="relative scroll-mt-24">
      {/* Quiet green + purple ambient glow for a strong, warm closing. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[6%] top-1/4 h-[28rem] w-[28rem] rounded-full bg-glow-primary/[4%] blur-[150px]" />
        <div className="absolute bottom-0 right-[4%] h-[24rem] w-[24rem] rounded-full bg-glow-secondary/[5%] blur-[150px]" />
      </div>

      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
        {/* Left: eyebrow + heading + intro */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:col-span-7"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <GlowLine className="w-10" />
            <span className="text-xs uppercase tracking-[0.18em] text-muted">
              {eyebrow}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUpBlur}
            className="mt-6 text-balance text-[clamp(2.25rem,4.5vw+0.5rem,4rem)] font-semibold leading-[1.06] text-foreground"
          >
            {heading}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {intro}
          </motion.p>
        </motion.div>

        {/* Right: primary email CTA + secondary links */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9 lg:items-start"
        >
          <motion.div variants={fadeUp}>
            <Button href={primaryCta.href} variant="primary">
              <Mail aria-hidden className="h-4 w-4" />
              {primaryCta.label}
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {secondaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-1 rounded-md text-sm text-muted transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
                <ArrowUpRight
                  aria-hidden
                  className="h-3.5 w-3.5 -translate-y-px transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
