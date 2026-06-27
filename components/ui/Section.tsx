import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  as?: ElementType;
  children: ReactNode;
  /** Classes for the outer section (padding rhythm, backgrounds). */
  className?: string;
  /** Classes for the inner max-width container. */
  containerClassName?: string;
};

/**
 * Layout primitive that enforces consistent section rhythm: full-bleed outer
 * element with vertical padding, centered container capped at ~1200px. Every
 * future section should use this so spacing stays uniform.
 */
export function Section({
  id,
  as: Tag = "section",
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn("relative w-full px-6 py-24 sm:px-8 lg:py-32", className)}
    >
      <div className={cn("mx-auto w-full max-w-[1200px]", containerClassName)}>
        {children}
      </div>
    </Tag>
  );
}
