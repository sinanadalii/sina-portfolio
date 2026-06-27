"use client";

import { motion } from "framer-motion";
import {
  Component,
  Layers,
  Monitor,
  MousePointerClick,
  PenTool,
  Route,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { GlowLine } from "@/components/ui/GlowLine";
import { SERVICES, SERVICES_SECTION, type Service } from "@/lib/constants";
import { fadeUp, fadeUpBlur, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Accent = "primary" | "secondary";

// Stable icon keys -> Lucide components (keeps lib/constants component-free).
const ICONS: Record<Service["icon"], LucideIcon> = {
  product: Layers,
  ux: Route,
  ui: PenTool,
  systems: Component,
  web: Monitor,
  mobile: Smartphone,
  prototyping: MousePointerClick,
};

// Quiet brand accents, alternated per card for subtle variety.
const accentHalo: Record<Accent, string> = {
  primary: "bg-glow-primary/[5%]",
  secondary: "bg-glow-secondary/[7%]",
};

export function Services() {
  return (
    <Section id="services" className="scroll-mt-24">
      {/* Section header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-2xl"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <GlowLine className="w-10" />
          <span className="text-xs uppercase tracking-[0.18em] text-muted">
            {SERVICES_SECTION.eyebrow}
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUpBlur}
          className="mt-6 text-[clamp(2rem,4vw+0.5rem,3.25rem)] font-semibold leading-[1.08] text-foreground"
        >
          {SERVICES_SECTION.heading}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-5 text-base leading-relaxed text-muted sm:text-lg"
        >
          {SERVICES_SECTION.intro}
        </motion.p>
      </motion.div>

      {/*
        Flex-wrap (not grid) so the 7th card centers cleanly on its own row
        instead of leaving a lonely gap: 1 col on mobile, 2 on tablet, 3 on
        desktop.
      */}
      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 flex flex-wrap justify-center gap-5 lg:mt-16"
      >
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.title}
            service={service}
            accent={index % 2 === 0 ? "primary" : "secondary"}
          />
        ))}
      </motion.ul>
    </Section>
  );
}

function ServiceCard({ service, accent }: { service: Service; accent: Accent }) {
  const Icon = ICONS[service.icon];

  return (
    <motion.li
      variants={fadeUp}
      className="group relative isolate basis-full sm:basis-[calc(50%_-_0.7rem)] lg:basis-[calc(33.333%_-_0.9rem)]"
    >
      {/* Very soft accent halo on hover. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-3 z-0 rounded-[24px] opacity-0 blur-2xl transition-opacity duration-500 ease-out group-hover:opacity-100",
          accentHalo[accent],
        )}
      />

      <div
        className={cn(
          "relative z-10 flex h-full flex-col rounded-card border border-border bg-surface/40 p-6 sm:p-7",
          "transition-[border-color,background-color,transform] duration-500 ease-out",
          "group-hover:-translate-y-1 group-hover:border-white/15 group-hover:bg-surface/70",
        )}
      >
        <Icon
          aria-hidden
          strokeWidth={1.5}
          className="h-6 w-6 text-muted transition-colors duration-500 ease-out group-hover:text-foreground"
        />

        <h3 className="mt-5 text-lg font-medium text-foreground">
          {service.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted">
          {service.description}
        </p>
      </div>
    </motion.li>
  );
}
