/**
 * Single source of truth for site copy and links. Keeping content here makes
 * the components purely presentational and the site easy to extend section by
 * section without hunting through JSX.
 */

export const SITE = {
  name: "Sina Nadali",
  role: "Digital Product Designer",
  email: "sinanadali1379@gmail.com",
  description:
    "Digital Product Designer focused on crafting intuitive, high-performing experiences for startups and ambitious brands.",
} as const;

export const NAV_ITEMS = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  headline: "Designing digital products that people love to use.",
  subtext:
    "Digital Product Designer focused on crafting intuitive, high-performing experiences for startups and ambitious brands.",
  primaryCta: { label: "View Projects", href: "#projects" },
  secondaryCta: { label: "Contact Me", href: "#contact" },
} as const;

export const PROFILE_LINKS = {
  linkedin: "https://www.linkedin.com/in/sina-nadali-60b2b4204/",
  dribbble: "https://dribbble.com/sinanadalii",
} as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: PROFILE_LINKS.linkedin },
  { label: "Dribbble", href: PROFILE_LINKS.dribbble },
  { label: "Email", href: `mailto:${SITE.email}` },
] as const;

export const FOOTER = {
  year: 2026,
} as const;

/**
 * Project previews. These are early project entries - full case
 * studies are not written yet, so each is marked `comingSoon` and renders a
 * disabled CTA. `accent` selects the card's glow color and `visual` selects
 * which CSS-only preview composition to draw (no images are used).
 */
export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: readonly string[];
  accent: "primary" | "secondary";
  visual: "dashboard" | "mobile";
  comingSoon: boolean;
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "youtube-analytics-redesign",
    title: "YouTube Analytics Redesign",
    category: "Product Design / Dashboard",
    description:
      "A focused redesign exploration for improving creator analytics clarity, hierarchy, and decision-making.",
    tags: ["UX", "UI", "Dashboard", "Analytics"],
    accent: "primary",
    visual: "dashboard",
    comingSoon: true,
  },
  {
    slug: "mobile-banking-experience",
    title: "Mobile Banking Experience",
    category: "Mobile App / UX Design",
    description:
      "A clean mobile banking concept focused on trust, speed, and everyday financial actions.",
    tags: ["UX", "UI", "Mobile", "Fintech"],
    accent: "secondary",
    visual: "mobile",
    comingSoon: true,
  },
];

export const PROJECTS_SECTION = {
  eyebrow: "Selected Work",
  heading: "Recent projects",
  intro:
    "A focused selection of product design explorations - full case studies are on the way.",
} as const;

/**
 * Services offered. `icon` is a stable key mapped to a Lucide icon inside the
 * Services component, so this data module stays free of component imports.
 */
export type Service = {
  title: string;
  description: string;
  icon: "product" | "ux" | "ui" | "systems" | "web" | "mobile" | "prototyping";
};

export const SERVICES: readonly Service[] = [
  {
    title: "Product Design",
    icon: "product",
    description:
      "End-to-end design from first concept to a considered, shippable product.",
  },
  {
    title: "UX Design",
    icon: "ux",
    description:
      "Research-informed flows and structure that make complex tasks feel effortless.",
  },
  {
    title: "UI Design",
    icon: "ui",
    description:
      "Precise, accessible interfaces with clear hierarchy and intentional detail.",
  },
  {
    title: "Design Systems",
    icon: "systems",
    description:
      "Scalable component libraries and tokens that keep teams consistent and fast.",
  },
  {
    title: "Web Design",
    icon: "web",
    description:
      "Responsive marketing and product sites built for clarity and performance.",
  },
  {
    title: "Mobile Apps",
    icon: "mobile",
    description:
      "Native-feeling iOS and Android experiences designed for everyday use.",
  },
  {
    title: "Prototyping",
    icon: "prototyping",
    description:
      "Interactive prototypes that test and validate ideas before engineering invests.",
  },
];

export const SERVICES_SECTION = {
  eyebrow: "Services",
  heading: "What I do",
  intro:
    "Design support across the full product lifecycle - from early structure to polished, shippable interfaces.",
} as const;

/**
 * About content. Principles describe how Sina approaches product design -
 * no biography or invented history, just the working philosophy.
 */
export const ABOUT_SECTION = {
  eyebrow: "About",
  heading: "Designing with clarity, purpose, and precision.",
  intro:
    "I design digital products with a focus on clarity, usability, and polished execution. My work sits between product thinking, user experience, and visual craft - helping ideas become interfaces that feel simple, useful, and considered.",
  principles: [
    {
      title: "Think in systems",
      description: "I create scalable structures, not isolated screens.",
    },
    {
      title: "Design for decisions",
      description:
        "Every layout, flow, and interaction should help users move with confidence.",
    },
    {
      title: "Polish with restraint",
      description:
        "Details should make the experience feel better, not louder.",
    },
  ],
} as const;

/**
 * Contact / closing section. Primary action is a mailto; secondary links reuse
 * the same profile URLs as SOCIAL_LINKS.
 */
export const CONTACT_SECTION = {
  eyebrow: "Contact",
  heading: "Let's build something thoughtful.",
  intro:
    "Have a product idea, redesign, or digital experience in mind? I'm open to collaborations with startups, founders, and ambitious teams.",
  primaryCta: { label: "Email Me", href: `mailto:${SITE.email}` },
  secondaryLinks: [
    { label: "LinkedIn", href: PROFILE_LINKS.linkedin },
    { label: "Dribbble", href: PROFILE_LINKS.dribbble },
  ],
} as const;
