"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlowLine } from "@/components/ui/GlowLine";
import { HERO } from "@/lib/constants";
import { fadeUp, fadeUpBlur, staggerContainer } from "@/lib/motion";

const portraitSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/sina-nadali-portrait.webp`;

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
        className="relative mx-auto grid w-full max-w-[1200px] items-center gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)] lg:gap-16"
      >
        <div className="order-2 lg:order-1">
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
        </div>

        <HeroPortrait />
      </motion.div>
    </section>
  );
}

function HeroPortrait() {
  return (
    <motion.div
      variants={fadeUpBlur}
      className="group relative order-1 mx-auto w-full max-w-[34rem] lg:order-2 lg:mx-0 lg:justify-self-end"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-5 rounded-[28px] bg-glow-secondary/[7%] opacity-80 blur-3xl transition-opacity duration-500 ease-out group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-6 top-1/4 h-28 w-px bg-gradient-to-b from-transparent via-glow-primary/50 to-transparent blur-[0.5px]"
      />

      <div className="relative overflow-hidden rounded-card border border-border bg-surface/50 shadow-[0_24px_80px_-48px_rgba(139,92,246,0.55)]">
        <img
          src={portraitSrc}
          alt="Sina Nadali in a dark digital design workspace"
          width={1200}
          height={948}
          loading="eager"
          fetchPriority="high"
          className="aspect-[16/11] h-full w-full object-cover object-[38%_center] opacity-95 transition-transform duration-700 ease-out group-hover:scale-[1.015] lg:aspect-[4/5]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-background/30 via-transparent to-glow-secondary/[6%]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/45 to-transparent"
        />
      </div>
    </motion.div>
  );
}
