import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

const base =
  "group inline-flex select-none items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // High-contrast, calm. The only nod to the green accent is a soft glow on hover.
  primary:
    "bg-foreground text-background hover:bg-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:shadow-[0_10px_44px_-14px_rgba(109,255,114,0.5)]",
  // Quiet, bordered ghost.
  secondary:
    "border border-border bg-surface/40 text-foreground hover:border-white/15 hover:bg-surface",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonProps =
  | (CommonProps &
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
        href?: undefined;
      })
  | (CommonProps &
      Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
        href: string;
      });

/**
 * Polymorphic button. Renders an <a> when `href` is provided (so it works with
 * in-page anchors and Lenis), otherwise a real <button>.
 */
export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if ("href" in rest && rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
