import { cn } from "@/lib/utils";

type GlowColor = "primary" | "secondary" | "neutral";

const stops: Record<GlowColor, string> = {
  primary: "rgba(109, 255, 114, 0.55)",
  secondary: "rgba(139, 92, 246, 0.55)",
  neutral: "rgba(255, 255, 255, 0.16)",
};

type GlowLineProps = {
  className?: string;
  color?: GlowColor;
};

/**
 * A 1px horizontal rule that fades from transparent to accent to transparent,
 * with a soft blurred copy behind it for a subtle glow. Decorative only.
 */
export function GlowLine({ className, color = "primary" }: GlowLineProps) {
  const gradient = `linear-gradient(to right, transparent, ${stops[color]}, transparent)`;

  return (
    <div aria-hidden className={cn("relative h-px w-full", className)}>
      <div className="absolute inset-0" style={{ background: gradient }} />
      <div
        className="absolute inset-0 opacity-70 blur-[3px]"
        style={{ background: gradient }}
      />
    </div>
  );
}
