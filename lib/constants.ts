import content from "@/content/site.json";
import type { Project, Service, SiteContent } from "@/lib/content";

export type { Project, Service };

const SITE_CONTENT = content as SiteContent;

export const SITE = SITE_CONTENT.site;
export const NAV_ITEMS = SITE_CONTENT.navItems;
export const HERO = SITE_CONTENT.hero;
export const PROFILE_LINKS = SITE_CONTENT.profileLinks;
export const FOOTER = SITE_CONTENT.footer;
export const PROJECTS = SITE_CONTENT.projects;
export const PROJECTS_SECTION = SITE_CONTENT.projectsSection;
export const SERVICES = SITE_CONTENT.services;
export const SERVICES_SECTION = SITE_CONTENT.servicesSection;
export const ABOUT_SECTION = SITE_CONTENT.aboutSection;
export const CONTACT_SECTION = {
  ...SITE_CONTENT.contactSection,
  primaryCta: {
    ...SITE_CONTENT.contactSection.primaryCta,
    href: `mailto:${SITE_CONTENT.site.email}`,
  },
  secondaryLinks: [
    { label: "LinkedIn", href: SITE_CONTENT.profileLinks.linkedin },
    { label: "Dribbble", href: SITE_CONTENT.profileLinks.dribbble },
  ],
};
export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: SITE_CONTENT.profileLinks.linkedin },
  { label: "Dribbble", href: SITE_CONTENT.profileLinks.dribbble },
  { label: "Email", href: `mailto:${SITE_CONTENT.site.email}` },
];
