# Sina Nadali - Portfolio Foundation

A premium, minimal, dark portfolio foundation for **Sina Nadali**, Digital Product Designer.
Built to be expanded section by section - this first pass ships the global shell, navigation,
hero, footer, and the shared design + motion system.

## Tech stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (CSS-first config via `@theme` in `app/globals.css`)
- **Framer Motion** for restrained, reduced-motion-aware animation
- **Lenis** smooth scrolling
- **Lucide React** icons

## Getting started

```bash
cd sina-portfolio

# install dependencies
npm install

# run the dev server
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build   # production build
npm run start   # serve the production build
```

> Requires Node.js 18.18+ (Node 20+ recommended).

## Project structure

```
app/
  layout.tsx        # html shell, fonts, metadata, skip link, providers
  page.tsx          # composes sections (Hero today; more later)
  globals.css       # Tailwind import + design tokens (@theme) + base styles
components/
  layout/
    Navbar.tsx       # fixed nav, scroll surface, accessible mobile menu
    Footer.tsx       # name, links, copyright
  sections/
    Hero.tsx         # headline, subtext, CTAs, ambient glows
  ui/
    Button.tsx       # polymorphic primary/secondary button
    GlowLine.tsx     # decorative glowing divider/accent
    Section.tsx      # shared section rhythm + container
  providers/
    Providers.tsx    # MotionConfig + smooth scroll + cursor
    SmoothScroll.tsx # Lenis init (disabled for reduced motion)
    CustomCursor.tsx # fine-pointer-only custom cursor
lib/
  constants.ts       # all copy + links in one place
  motion.ts          # shared animation variants / easing
  utils.ts           # cn() class helper
```

## Design system

Defined as tokens in [`app/globals.css`](app/globals.css) (`@theme`) and consumed as Tailwind
utilities - `bg-background`, `bg-surface`, `text-foreground`, `text-muted`, `border-border`,
`bg-glow-primary`, `bg-glow-secondary`, `rounded-card`.

| Token            | Value                   |
| ---------------- | ----------------------- |
| Background       | `#050505`               |
| Surface          | `#0F0F10`               |
| Primary text     | `#FFFFFF`               |
| Secondary text   | `#9CA3AF`               |
| Border           | `rgba(255,255,255,.08)` |
| Primary glow     | `#6DFF72`               |
| Secondary glow   | `#8B5CF6`               |
| Card radius      | `16px`                  |

Type is **Inter** via `next/font` (no negative letter-spacing), with a controlled, responsive
scale using `clamp()` for the hero headline.

## Principles baked in

- **Accessibility** - semantic landmarks (`header`/`main`/`footer`/`nav`), a skip link,
  visible `:focus-visible` rings, keyboard-operable mobile menu (Esc to close, `aria-expanded`),
  and a custom cursor that disables on touch and respects reduced motion.
- **Motion** - fade / small `y` / blur / subtle scale only. No bounce. Every animation honors
  `prefers-reduced-motion` via a single `<MotionConfig reducedMotion="user">` plus a CSS fallback.
- **Performance** - no canvas/WebGL, minimal dependencies, server components by default, glows
  are cheap CSS blur layers.

## Assumptions

- **New, isolated project.** Created under `sina-portfolio/` so it doesn't touch the existing
  Whitex files in the parent folder.
- **Tailwind v4** was chosen (the current default for new Next.js apps). Config lives in
  `globals.css`; there is intentionally no `tailwind.config.js`.
- **Profile links.** LinkedIn, Dribbble, and email are configured in
  [`lib/constants.ts`](lib/constants.ts).
- **Nav/CTA anchors** (`#projects`, `#services`, `#about`, `#contact`) point to sections that
  don't exist yet. They resolve once those sections are added.
- **No ESLint config** was added to keep the dependency surface minimal; add `eslint` +
  `eslint-config-next` later if desired.
- The trailing **Contact** nav item is rendered as a button on desktop for hierarchy; it still
  uses the exact label from the brief.

## Next steps

Add sections to `app/page.tsx` using the `<Section>` primitive and the existing motion variants -
e.g. `components/sections/Projects.tsx`, `Services.tsx`, `About.tsx`, `Contact.tsx`.
