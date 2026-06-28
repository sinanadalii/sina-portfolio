"use client";

import { useMemo, useState } from "react";
import {
  Eye,
  Github,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Trash2,
} from "lucide-react";
import initialContent from "@/content/site.json";
import type {
  AboutPrinciple,
  Project,
  ProjectAccent,
  ProjectVisual,
  Service,
  ServiceIcon,
  SiteContent,
} from "@/lib/content";
import { cn } from "@/lib/utils";

const OWNER = "sinanadalii";
const REPO = "sina-portfolio";
const BRANCH = "main";
const CONTENT_PATH = "content/site.json";
const CONTENT_API = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${CONTENT_PATH}`;
const SITE_URL = "https://sinanadalii.github.io/sina-portfolio/";

const SERVICE_ICONS: ServiceIcon[] = [
  "product",
  "ux",
  "ui",
  "systems",
  "web",
  "mobile",
  "prototyping",
];
const PROJECT_ACCENTS: ProjectAccent[] = ["primary", "secondary"];
const PROJECT_VISUALS: ProjectVisual[] = ["dashboard", "mobile"];

type GitHubFile = {
  content: string;
  sha: string;
};

type Status = {
  type: "idle" | "success" | "error" | "loading";
  message: string;
};

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent>(
    initialContent as SiteContent,
  );
  const [token, setToken] = useState("");
  const [sha, setSha] = useState("");
  const [status, setStatus] = useState<Status>({
    type: "idle",
    message: "Loaded bundled content. Load from GitHub before saving.",
  });

  const formattedJson = useMemo(() => JSON.stringify(content, null, 2), [content]);

  const update = (recipe: (draft: SiteContent) => void) => {
    setContent((current) => {
      const draft = structuredClone(current);
      recipe(draft);
      return draft;
    });
  };

  const loadFromGitHub = async () => {
    setStatus({ type: "loading", message: "Loading latest content from GitHub..." });

    try {
      const response = await fetch(`${CONTENT_API}?ref=${BRANCH}`, {
        headers: githubHeaders(token),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const file = (await response.json()) as GitHubFile;
      const parsed = JSON.parse(decodeBase64(file.content)) as SiteContent;
      setContent(parsed);
      setSha(file.sha);
      setStatus({
        type: "success",
        message: "Latest GitHub content loaded. You can edit and save now.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: readableError(error),
      });
    }
  };

  const saveToGitHub = async () => {
    if (!token.trim()) {
      setStatus({
        type: "error",
        message: "Add a GitHub token with Contents read/write access first.",
      });
      return;
    }

    setStatus({ type: "loading", message: "Saving content to GitHub..." });

    try {
      const currentSha = sha || (await fetchCurrentSha(token));
      const response = await fetch(CONTENT_API, {
        method: "PUT",
        headers: githubHeaders(token),
        body: JSON.stringify({
          branch: BRANCH,
          message: "Update site content from dashboard",
          content: encodeBase64(formattedJson + "\n"),
          sha: currentSha,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      setSha(result.content.sha);
      setStatus({
        type: "success",
        message:
          "Saved. GitHub Pages will redeploy automatically in about a minute.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: readableError(error),
      });
    }
  };

  return (
    <div className="min-h-screen bg-background px-5 pb-16 pt-24 text-foreground sm:px-8">
      <div className="mx-auto grid w-full max-w-[1200px] gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-card border border-border bg-surface/50 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background">
                <Github className="h-4 w-4" />
              </span>
              <div>
                <h1 className="text-lg font-semibold">Content Dashboard</h1>
                <p className="text-xs text-muted">GitHub powered CMS</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <label className="block">
                <span className="text-xs font-medium text-muted">
                  GitHub token
                </span>
                <input
                  value={token}
                  onChange={(event) => setToken(event.target.value)}
                  type="password"
                  autoComplete="off"
                  placeholder="github_pat_..."
                  className={inputClass}
                />
              </label>

              <button
                type="button"
                onClick={loadFromGitHub}
                className={secondaryButtonClass}
              >
                <RefreshCw className="h-4 w-4" />
                Load from GitHub
              </button>

              <button
                type="button"
                onClick={saveToGitHub}
                className={primaryButtonClass}
              >
                {status.type === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save and deploy
              </button>

              <a
                href={SITE_URL}
                target="_blank"
                rel="noreferrer noopener"
                className={secondaryButtonClass}
              >
                <Eye className="h-4 w-4" />
                View live site
              </a>
            </div>

            <p
              className={cn(
                "mt-5 rounded-xl border px-3 py-2 text-xs leading-relaxed",
                status.type === "error"
                  ? "border-red-500/30 bg-red-500/10 text-red-200"
                  : status.type === "success"
                    ? "border-glow-primary/25 bg-glow-primary/10 text-glow-primary"
                    : "border-border bg-background/60 text-muted",
              )}
            >
              {status.message}
            </p>

            <p className="mt-4 text-xs leading-relaxed text-muted">
              The token is only kept in this browser tab. Use a fine-grained
              GitHub token limited to this repo and Contents read/write.
            </p>
          </div>
        </aside>

        <div className="space-y-6">
          <Panel title="Site">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Name"
                value={content.site.name}
                onChange={(value) => update((draft) => void (draft.site.name = value))}
              />
              <TextField
                label="Role"
                value={content.site.role}
                onChange={(value) => update((draft) => void (draft.site.role = value))}
              />
              <TextField
                label="Email"
                value={content.site.email}
                onChange={(value) => update((draft) => void (draft.site.email = value))}
              />
              <NumberField
                label="Footer year"
                value={content.footer.year}
                onChange={(value) => update((draft) => void (draft.footer.year = value))}
              />
              <TextArea
                label="SEO description"
                value={content.site.description}
                onChange={(value) =>
                  update((draft) => void (draft.site.description = value))
                }
                className="md:col-span-2"
              />
            </div>
          </Panel>

          <Panel title="Hero">
            <TextArea
              label="Headline"
              value={content.hero.headline}
              onChange={(value) => update((draft) => void (draft.hero.headline = value))}
            />
            <TextArea
              label="Subtext"
              value={content.hero.subtext}
              onChange={(value) => update((draft) => void (draft.hero.subtext = value))}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Primary CTA label"
                value={content.hero.primaryCta.label}
                onChange={(value) =>
                  update((draft) => void (draft.hero.primaryCta.label = value))
                }
              />
              <TextField
                label="Secondary CTA label"
                value={content.hero.secondaryCta.label}
                onChange={(value) =>
                  update((draft) => void (draft.hero.secondaryCta.label = value))
                }
              />
            </div>
          </Panel>

          <Panel title="Profile Links">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="LinkedIn"
                value={content.profileLinks.linkedin}
                onChange={(value) =>
                  update((draft) => void (draft.profileLinks.linkedin = value))
                }
              />
              <TextField
                label="Dribbble"
                value={content.profileLinks.dribbble}
                onChange={(value) =>
                  update((draft) => void (draft.profileLinks.dribbble = value))
                }
              />
            </div>
          </Panel>

          <Panel
            title="Projects"
            action={
              <button
                type="button"
                onClick={() => update((draft) => draft.projects.push(newProject()))}
                className={miniButtonClass}
              >
                <Plus className="h-4 w-4" />
                Add project
              </button>
            }
          >
            <SectionCopy
              eyebrow={content.projectsSection.eyebrow}
              heading={content.projectsSection.heading}
              intro={content.projectsSection.intro}
              onChange={(field, value) =>
                update((draft) => void (draft.projectsSection[field] = value))
              }
            />
            <div className="space-y-4">
              {content.projects.map((project, index) => (
                <ProjectEditor
                  key={`${project.slug}-${index}`}
                  project={project}
                  onChange={(next) =>
                    update((draft) => void (draft.projects[index] = next))
                  }
                  onRemove={() =>
                    update((draft) => void draft.projects.splice(index, 1))
                  }
                />
              ))}
            </div>
          </Panel>

          <Panel
            title="Services"
            action={
              <button
                type="button"
                onClick={() => update((draft) => draft.services.push(newService()))}
                className={miniButtonClass}
              >
                <Plus className="h-4 w-4" />
                Add service
              </button>
            }
          >
            <SectionCopy
              eyebrow={content.servicesSection.eyebrow}
              heading={content.servicesSection.heading}
              intro={content.servicesSection.intro}
              onChange={(field, value) =>
                update((draft) => void (draft.servicesSection[field] = value))
              }
            />
            <div className="grid gap-4 md:grid-cols-2">
              {content.services.map((service, index) => (
                <ServiceEditor
                  key={`${service.title}-${index}`}
                  service={service}
                  onChange={(next) =>
                    update((draft) => void (draft.services[index] = next))
                  }
                  onRemove={() =>
                    update((draft) => void draft.services.splice(index, 1))
                  }
                />
              ))}
            </div>
          </Panel>

          <Panel
            title="About"
            action={
              <button
                type="button"
                onClick={() =>
                  update((draft) => draft.aboutSection.principles.push(newPrinciple()))
                }
                className={miniButtonClass}
              >
                <Plus className="h-4 w-4" />
                Add principle
              </button>
            }
          >
            <SectionCopy
              eyebrow={content.aboutSection.eyebrow}
              heading={content.aboutSection.heading}
              intro={content.aboutSection.intro}
              onChange={(field, value) =>
                update((draft) => void (draft.aboutSection[field] = value))
              }
            />
            <div className="space-y-4">
              {content.aboutSection.principles.map((principle, index) => (
                <PrincipleEditor
                  key={`${principle.title}-${index}`}
                  principle={principle}
                  onChange={(next) =>
                    update(
                      (draft) => void (draft.aboutSection.principles[index] = next),
                    )
                  }
                  onRemove={() =>
                    update(
                      (draft) =>
                        void draft.aboutSection.principles.splice(index, 1),
                    )
                  }
                />
              ))}
            </div>
          </Panel>

          <Panel title="Contact">
            <SectionCopy
              eyebrow={content.contactSection.eyebrow}
              heading={content.contactSection.heading}
              intro={content.contactSection.intro}
              onChange={(field, value) =>
                update((draft) => void (draft.contactSection[field] = value))
              }
            />
            <TextField
              label="Primary CTA label"
              value={content.contactSection.primaryCta.label}
              onChange={(value) =>
                update((draft) => void (draft.contactSection.primaryCta.label = value))
              }
            />
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-card border border-border bg-surface/35 p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function SectionCopy({
  eyebrow,
  heading,
  intro,
  onChange,
}: {
  eyebrow: string;
  heading: string;
  intro: string;
  onChange: (field: "eyebrow" | "heading" | "intro", value: string) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <TextField label="Eyebrow" value={eyebrow} onChange={(value) => onChange("eyebrow", value)} />
      <TextField label="Heading" value={heading} onChange={(value) => onChange("heading", value)} />
      <TextArea
        label="Intro"
        value={intro}
        onChange={(value) => onChange("intro", value)}
        className="md:col-span-2"
      />
    </div>
  );
}

function ProjectEditor({
  project,
  onChange,
  onRemove,
}: {
  project: Project;
  onChange: (project: Project) => void;
  onRemove: () => void;
}) {
  const set = <K extends keyof Project>(key: K, value: Project[K]) =>
    onChange({ ...project, [key]: value });

  return (
    <div className="rounded-xl border border-border bg-background/45 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-medium">{project.title || "Untitled project"}</p>
        <button type="button" onClick={onRemove} className={dangerButtonClass}>
          <Trash2 className="h-4 w-4" />
          Remove
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <TextField label="Title" value={project.title} onChange={(value) => set("title", value)} />
        <TextField label="Slug" value={project.slug} onChange={(value) => set("slug", value)} />
        <TextField
          label="Category"
          value={project.category}
          onChange={(value) => set("category", value)}
        />
        <TextField
          label="Tags"
          value={project.tags.join(", ")}
          onChange={(value) =>
            set(
              "tags",
              value
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            )
          }
        />
        <SelectField
          label="Accent"
          value={project.accent}
          options={PROJECT_ACCENTS}
          onChange={(value) => set("accent", value as ProjectAccent)}
        />
        <SelectField
          label="Visual"
          value={project.visual}
          options={PROJECT_VISUALS}
          onChange={(value) => set("visual", value as ProjectVisual)}
        />
        <TextArea
          label="Description"
          value={project.description}
          onChange={(value) => set("description", value)}
          className="md:col-span-2"
        />
        <label className="inline-flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={project.comingSoon}
            onChange={(event) => set("comingSoon", event.target.checked)}
            className="h-4 w-4 accent-glow-primary"
          />
          Coming soon
        </label>
      </div>
    </div>
  );
}

function ServiceEditor({
  service,
  onChange,
  onRemove,
}: {
  service: Service;
  onChange: (service: Service) => void;
  onRemove: () => void;
}) {
  const set = <K extends keyof Service>(key: K, value: Service[K]) =>
    onChange({ ...service, [key]: value });

  return (
    <div className="rounded-xl border border-border bg-background/45 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-medium">{service.title || "Untitled service"}</p>
        <button type="button" onClick={onRemove} className={dangerButtonClass}>
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-4">
        <TextField label="Title" value={service.title} onChange={(value) => set("title", value)} />
        <SelectField
          label="Icon"
          value={service.icon}
          options={SERVICE_ICONS}
          onChange={(value) => set("icon", value as ServiceIcon)}
        />
        <TextArea
          label="Description"
          value={service.description}
          onChange={(value) => set("description", value)}
        />
      </div>
    </div>
  );
}

function PrincipleEditor({
  principle,
  onChange,
  onRemove,
}: {
  principle: AboutPrinciple;
  onChange: (principle: AboutPrinciple) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/45 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-medium">{principle.title || "Untitled principle"}</p>
        <button type="button" onClick={onRemove} className={dangerButtonClass}>
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="Title"
          value={principle.title}
          onChange={(value) => onChange({ ...principle, title: value })}
        />
        <TextArea
          label="Description"
          value={principle.description}
          onChange={(value) => onChange({ ...principle, description: value })}
        />
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted">{label}</span>
      <input
        value={value}
        type="number"
        onChange={(event) => onChange(Number(event.target.value))}
        className={inputClass}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="text-xs font-medium text-muted">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        className={cn(inputClass, "min-h-24 resize-y")}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

async function fetchCurrentSha(token: string) {
  const response = await fetch(`${CONTENT_API}?ref=${BRANCH}`, {
    headers: githubHeaders(token),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const file = (await response.json()) as GitHubFile;
  return file.sha;
}

function githubHeaders(token: string) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token.trim()) {
    headers.Authorization = `Bearer ${token.trim()}`;
  }

  return headers;
}

function decodeBase64(value: string) {
  const binary = atob(value.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function encodeBase64(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function readableError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return "Something went wrong.";
}

function newProject(): Project {
  return {
    slug: "new-project",
    title: "New Project",
    category: "Product Design",
    description: "Short project description.",
    tags: ["UX", "UI"],
    accent: "primary",
    visual: "dashboard",
    comingSoon: true,
  };
}

function newService(): Service {
  return {
    title: "New Service",
    icon: "product",
    description: "Short service description.",
  };
}

function newPrinciple(): AboutPrinciple {
  return {
    title: "New principle",
    description: "Short principle description.",
  };
}

const inputClass =
  "mt-2 w-full rounded-xl border border-border bg-background/70 px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-glow-primary/50 focus:ring-2 focus:ring-glow-primary/20";

const primaryButtonClass =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-white/90";

const secondaryButtonClass =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface";

const miniButtonClass =
  "inline-flex items-center gap-2 rounded-lg border border-border bg-background/50 px-3 py-2 text-sm text-foreground transition-colors hover:bg-surface";

const dangerButtonClass =
  "inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-200 transition-colors hover:bg-red-500/15";
