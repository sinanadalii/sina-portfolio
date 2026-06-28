export type ProjectAccent = "primary" | "secondary";
export type ProjectVisual = "dashboard" | "mobile";
export type ServiceIcon =
  | "product"
  | "ux"
  | "ui"
  | "systems"
  | "web"
  | "mobile"
  | "prototyping";

export type Cta = {
  label: string;
  href: string;
};

export type LinkItem = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  accent: ProjectAccent;
  visual: ProjectVisual;
  comingSoon: boolean;
};

export type Service = {
  title: string;
  description: string;
  icon: ServiceIcon;
};

export type AboutPrinciple = {
  title: string;
  description: string;
};

export type SiteContent = {
  site: {
    name: string;
    role: string;
    email: string;
    description: string;
  };
  navItems: LinkItem[];
  hero: {
    headline: string;
    subtext: string;
    primaryCta: Cta;
    secondaryCta: Cta;
  };
  profileLinks: {
    linkedin: string;
    dribbble: string;
  };
  footer: {
    year: number;
  };
  projectsSection: {
    eyebrow: string;
    heading: string;
    intro: string;
  };
  projects: Project[];
  servicesSection: {
    eyebrow: string;
    heading: string;
    intro: string;
  };
  services: Service[];
  aboutSection: {
    eyebrow: string;
    heading: string;
    intro: string;
    principles: AboutPrinciple[];
  };
  contactSection: {
    eyebrow: string;
    heading: string;
    intro: string;
    primaryCta: Cta;
    secondaryLinks: LinkItem[];
  };
};
