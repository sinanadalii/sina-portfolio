"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlowLine } from "@/components/ui/GlowLine";
import { HERO } from "@/lib/constants";
import { fadeUp, fadeUpBlur, staggerContainer } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden px-6 pt-28 pb-20 sm:px-8">
      {/* Ambient glow accents - restrained, low opacity, never loud. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-glow-primary/5 blur-[140px]" />
        <div className="absolute -bottom-32 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-glow-secondary/[8%] blur-[150px]" />
        <div className="absolute bottom-[-15%] left-[-10%] h-[26rem] w-[26rem] rounded-full bg-glow-primary/[3%] blur-[140px]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-full max-w-[1200px]"
      >
        <motion.div variants={fadeUp}>
          <GlowLine className="w-14" />
        </motion.div>

        <motion.h1
          variants={fadeUpBlur}
          className="mt-8 max-w-[16ch] text-balance text-[clamp(2.5rem,6vw+0.5rem,5.25rem)] font-semibold leading-[1.04] text-foreground"
        >
          {HERO.headline}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {HERO.subtext}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Button href={HERO.primaryCta.href} variant="primary">
            {HERO.primaryCta.label}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
          </Button>
          <Button href={HERO.secondaryCta.href} variant="secondary">
            {HERO.secondaryCta.label}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
