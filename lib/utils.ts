/**
 * Minimal class name joiner. Keeps the dependency surface small - no clsx /
 * tailwind-merge needed for a foundation of this size.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
