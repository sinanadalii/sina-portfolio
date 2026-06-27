"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FOOTER, SITE, SOCIAL_LINKS } from "@/lib/constants";
import { GlowLine } from "@/components/ui/GlowLine";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="relative w-full px-6 pb-12 pt-20 sm:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <GlowLine color="neutral" className="opacity-70" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <motion.div variants={fadeUp}>
            <p className="text-lg font-medium text-foreground">{SITE.name}</p>
            <p className="mt-1 text-sm text-muted">{SITE.role}</p>
          </motion.div>

          <motion.nav
            variants={fadeUp}
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-3"
          >
            {SOCIAL_LINKS.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  {...(external
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  className={cn(
                    "group inline-flex items-center gap-1 rounded-md text-sm text-muted transition-colors duration-200 hover:text-foreground",
                  )}
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5 -translate-y-px transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-1" />
                </a>
              );
            })}
          </motion.nav>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 text-xs text-muted/70"
        >
          &copy; {FOOTER.year} {SITE.name}. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
