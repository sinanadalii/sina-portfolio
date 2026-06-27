"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { GlowLine } from "@/components/ui/GlowLine";
import { PROJECTS, PROJECTS_SECTION, type Project } from "@/lib/constants";
import { fadeUp, fadeUpBlur, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Accent = Project["accent"];

// Accent-driven classes kept in one place so both visuals stay consistent.
const accentDot: Record<Accent, string> = {
  primary: "bg-glow-primary shadow-[0_0_10px_1px_rgba(109,255,114,0.5)]",
  secondary: "bg-glow-secondary shadow-[0_0_10px_1px_rgba(139,92,246,0.55)]",
};
const accentBlob: Record<Accent, string> = {
  primary: "bg-glow-primary/[12%]",
  secondary: "bg-glow-secondary/[16%]",
};
const accentHalo: Record<Accent, string> = {
  primary: "bg-glow-primary/[6%]",
  secondary: "bg-glow-secondary/[8%]",
};
const accentBar: Record<Accent, string> = {
  primary:
    "bg-gradient-to-t from-glow-primary/15 to-glow-primary/55 shadow-[0_0_18px_-2px_rgba(109,255,114,0.35)]",
  secondary:
    "bg-gradient-to-t from-glow-secondary/15 to-glow-secondary/55 shadow-[0_0_18px_-2px_rgba(139,92,246,0.4)]",
};
const accentCard: Record<Accent, string> = {
  primary: "bg-gradient-to-br from-glow-primary/15 via-transparent to-transparent",
  secondary: "bg-gradient-to-br from-glow-secondary/18 via-transparent to-transparent",
};

export function Projects() {
  return (
    <Section id="projects" className="scroll-mt-24">
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
            {PROJECTS_SECTION.eyebrow}
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUpBlur}
          className="mt-6 text-[clamp(2rem,4vw+0.5rem,3.25rem)] font-semibold leading-[1.08] text-foreground"
        >
          {PROJECTS_SECTION.heading}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-5 text-base leading-relaxed text-muted sm:text-lg"
        >
          {PROJECTS_SECTION.intro}
        </motion.p>
      </motion.div>

      {/* Project cards */}
      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8"
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </motion.ul>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.li variants={fadeUp} className="group relative isolate">
      {/* Very soft accent halo that fades in on hover. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-4 z-0 rounded-[28px] opacity-0 blur-2xl transition-opacity duration-500 ease-out group-hover:opacity-100",
          accentHalo[project.accent],
        )}
      />

      <article
        className={cn(
          "relative z-10 flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface/60",
          "transition-[border-color,transform] duration-500 ease-out",
          "group-hover:-translate-y-1 group-hover:border-white/15",
        )}
      >
        <ProjectVisual visual={project.visual} accent={project.accent} />

        {project.comingSoon && (
          <span className="absolute right-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 text-[11px] font-medium text-muted">
            <span
              aria-hidden
              className={cn("h-1.5 w-1.5 rounded-full", accentDot[project.accent])}
            />
            Coming Soon
          </span>
        )}

        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {project.category}
          </p>

          <h3 className="mt-4 text-2xl font-semibold leading-snug text-foreground">
            {project.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border bg-white/[0.02] px-3 py-1 text-xs text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>

          {/* CTA pinned to the bottom for an even card baseline. */}
          <div className="mt-auto flex items-center pt-8">
            <Button
              variant="secondary"
              disabled={project.comingSoon}
              aria-label={
                project.comingSoon
                  ? `View case study for ${project.title} - coming soon`
                  : `View case study for ${project.title}`
              }
            >
              View Case Study
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </article>
    </motion.li>
  );
}

/** CSS-only abstract preview - no images, just subtle lines and glow. */
function ProjectVisual({ visual, accent }: { visual: Project["visual"]; accent: Accent }) {
  return (
    <div
      aria-hidden
      className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-background"
    >
      {/* Faint grid, masked to fade toward the edges. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 40%, #000 30%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 40%, #000 30%, transparent 78%)",
        }}
      />

      {/* Soft accent glow. */}
      <div
        className={cn(
          "pointer-events-none absolute h-40 w-40 rounded-full opacity-70 blur-3xl transition-opacity duration-500 ease-out group-hover:opacity-100",
          accentBlob[accent],
          visual === "dashboard"
            ? "-right-6 -top-6"
            : "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3",
        )}
      />

      {visual === "dashboard" ? (
        <DashboardSkeleton accent={accent} />
      ) : (
        <MobileSkeleton accent={accent} />
      )}
    </div>
  );
}

const CHART_BARS = [40, 62, 48, 78, 56, 90, 70];
const CHART_PEAK = 5; // index of the tallest bar gets the accent treatment

function DashboardSkeleton({ accent }: { accent: Accent }) {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-5 sm:p-6">
      {/* Header row */}
      <div className="flex items-center gap-2">
        <span className={cn("h-2.5 w-2.5 rounded-full", accentDot[accent])} />
        <span className="h-2 w-20 rounded-full bg-white/10" />
        <span className="ml-auto h-2 w-10 rounded-full bg-white/[0.06]" />
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-border bg-white/[0.02] p-2">
            <div className="h-1.5 w-8 rounded-full bg-white/10" />
            <div className="mt-2 h-2.5 w-12 rounded-full bg-white/[0.08]" />
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="mt-auto flex h-[42%] items-end gap-1.5 sm:gap-2">
        {CHART_BARS.map((height, i) => (
          <div
            key={i}
            style={{ height: `${height}%` }}
            className={cn(
              "w-full rounded-t-[3px]",
              i === CHART_PEAK ? accentBar[accent] : "bg-white/[0.07]",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function MobileSkeleton({ accent }: { accent: Accent }) {
  return (
    <div className="absolute inset-0 flex items-end justify-center">
      {/* Phone frame peeking up from the bottom edge. */}
      <div className="relative h-[88%] w-[46%] min-w-[120px] translate-y-px rounded-t-[20px] border border-b-0 border-border bg-surface/80 p-3">
        <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-white/10" />

        {/* Balance card */}
        <div className={cn("rounded-xl border border-border p-3", accentCard[accent])}>
          <div className="h-1.5 w-10 rounded-full bg-white/15" />
          <div className="mt-2 h-3 w-20 rounded-full bg-white/25" />
        </div>

        {/* Transaction rows */}
        <div className="mt-3 space-y-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-5 w-5 shrink-0 rounded-full bg-white/[0.06]" />
              <span className="h-1.5 flex-1 rounded-full bg-white/[0.08]" />
              <span className="h-1.5 w-6 rounded-full bg-white/[0.05]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
