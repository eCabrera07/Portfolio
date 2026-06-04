# Portfolio Visual Rework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cinematic visual redesign of the portfolio — EJCL nav, full-viewport centered hero, numbered accordion project rows, badge skill clusters, denser star field, and aurora-tinted atmosphere throughout.

**Architecture:** Single-page React app (TanStack Start + Tailwind v4). All changes are visual — no routing, no data fetching, no new pages. CSS foundations go in `styles.css`, data shape in `projects.ts`, one new component (`ProjectRow`), and all section markup updated in `index.tsx`.

**Tech Stack:** React 18, TanStack Start, Tailwind v4 (CSS-first config), TypeScript, lucide-react icons

---

## File Map

| File | Status | Responsibility |
|---|---|---|
| `src/data/projects.ts` | Modify | Add `navLogo`, `headlineLine1`, `headlineAccent` to profile; update `skillGroups` shape |
| `src/styles.css` | Modify | Background, stars, nebula, keyframes, badge utilities, divider, reveal animations, aurora streaks |
| `src/hooks/use-reveal.ts` | Create | IntersectionObserver hook for scroll-reveal |
| `src/components/ProjectRow.tsx` | Create | Accordion row component replacing ProjectCard |
| `src/routes/index.tsx` | Modify | All section markup: nav, hero, projects, skills, about, contact, footer |
| `src/components/ProjectCard.tsx` | Delete | Replaced by ProjectRow |

---

## Task 0: Create branch

- [ ] **Create and switch to the visual-rework branch**

```bash
git checkout -b visual-rework
```

Expected: `Switched to a new branch 'visual-rework'`

---

## Task 1: Update data shapes in projects.ts

**Files:**
- Modify: `src/data/projects.ts`

- [ ] **Add SkillGroup interface above the projects array**

In `src/data/projects.ts`, add after the `Project` interface (line 18):

```ts
export interface SkillGroup {
  label: string;
  color: "purple" | "blue" | "green" | "orange";
  items: string[];
}
```

- [ ] **Add navLogo, headlineLine1, headlineAccent to the profile object**

In `src/data/projects.ts`, add these three fields to `profile` after `shortName`:

```ts
shortName: "Eddie",
navLogo: "EJCL",
headlineLine1: "Full-stack engineer focused on",
headlineAccent: "database-backed applications.",
```

- [ ] **Update skillGroups from strings to typed arrays**

Replace the existing `skillGroups` array in `profile`:

```ts
skillGroups: [
  {
    label: "Frontend",
    color: "purple" as const,
    items: ["React", "TypeScript", "TanStack", "Tailwind"],
  },
  {
    label: "Backend",
    color: "blue" as const,
    items: ["FastAPI", "REST APIs", "Service workflows"],
  },
  {
    label: "Database",
    color: "green" as const,
    items: ["PostgreSQL", "Redis", "Room"],
  },
  {
    label: "Mobile",
    color: "orange" as const,
    items: ["Kotlin", "Android", "Jetpack Compose"],
  },
],
```

- [ ] **Verify TypeScript compiles**

```bash
npm run typecheck
```

Expected: no errors. If `typecheck` doesn't exist, run `npx tsc --noEmit`.

- [ ] **Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: update profile data shapes for visual rework"
```

---

## Task 2: CSS — foundations (background, stars, nebula, animations)

**Files:**
- Modify: `src/styles.css`

- [ ] **Deepen the background color**

In `:root`, change:
```css
--background: oklch(0.13 0.04 270);
```
to:
```css
--background: oklch(0.11 0.045 270);
```

Also change it in the `.dark` block at the bottom.

- [ ] **Add 10 more stars to body::before**

The current `body::before` block has 5 `radial-gradient` entries and 5 `background-size` entries. Append 10 more to each list:

```css
/* Add these 10 gradients to the end of body::before background-image: */
radial-gradient(1px 1px at 5% 45%, oklch(0.95 0.04 270 / 0.7), transparent),
radial-gradient(1.5px 1.5px at 22% 90%, oklch(0.92 0.08 295 / 0.75), transparent),
radial-gradient(1px 1px at 48% 55%, oklch(0.98 0.02 250 / 0.6), transparent),
radial-gradient(2px 2px at 63% 10%, oklch(0.90 0.1 220 / 0.8), transparent),
radial-gradient(1px 1px at 78% 62%, oklch(0.95 0.06 295 / 0.65), transparent),
radial-gradient(1px 1px at 92% 78%, oklch(0.88 0.08 250 / 0.7), transparent),
radial-gradient(1.5px 1.5px at 15% 72%, oklch(0.96 0.04 320 / 0.65), transparent),
radial-gradient(1px 1px at 37% 35%, oklch(0.90 0.1 250 / 0.6), transparent),
radial-gradient(1px 1px at 52% 88%, oklch(0.94 0.06 295 / 0.7), transparent),
radial-gradient(2px 2px at 70% 50%, oklch(0.92 0.08 220 / 0.75), transparent);

/* Add these 10 sizes to the end of body::before background-size: */
200px 200px,
260px 260px,
310px 310px,
280px 280px,
240px 240px,
320px 320px,
190px 190px,
270px 270px,
300px 300px,
230px 230px;
```

- [ ] **Strengthen body::after nebula**

In `body::after`:
1. Change `opacity: 0.55` to `opacity: 0.7`
2. Add a fourth radial gradient to `background-image`:
```css
radial-gradient(ellipse at 70% 20%, oklch(0.38 0.18 295 / 0.45), transparent 40%),
```

- [ ] **Add nebula-pulse keyframe and utility class**

In `@layer utilities`, add:

```css
@keyframes nebula-pulse {
  from {
    opacity: 0.8;
    transform: scale(1);
  }
  to {
    opacity: 1;
    transform: scale(1.08);
  }
}
.animate-nebula-pulse {
  animation: nebula-pulse 4s ease-in-out infinite alternate;
}
```

Also add to the `prefers-reduced-motion` block:
```css
.animate-nebula-pulse {
  animation: none !important;
}
```

- [ ] **Add aurora streak pseudo-elements on main#content**

In `@layer base`, add:

```css
main#content {
  position: relative;
}
main#content::before,
main#content::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  pointer-events: none;
  z-index: 2;
  background: linear-gradient(
    to right,
    transparent 5%,
    oklch(0.72 0.22 295 / 0.6) 30%,
    oklch(0.68 0.2 220 / 0.5) 55%,
    oklch(0.55 0.25 320 / 0.4) 75%,
    transparent 95%
  );
  filter: blur(1px);
}
main#content::before {
  top: 0;
}
main#content::after {
  bottom: 0;
}
```

- [ ] **Verify dev server renders correctly**

```bash
npm run dev
```

Open the URL shown in terminal output (typically `http://localhost:3000`). Background should be slightly darker, stars denser, nebula glow stronger.

- [ ] **Commit**

```bash
git add src/styles.css
git commit -m "feat: strengthen space atmosphere — denser stars, nebula, aurora streaks"
```

---

## Task 3: CSS — utilities (badges, divider, gradient text, reveal animations)

**Files:**
- Modify: `src/styles.css`

- [ ] **Add text-gradient-aurora utility**

In `@layer utilities`, add:

```css
.text-gradient-aurora {
  background: var(--gradient-aurora);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

- [ ] **Add divider-cosmic utility**

In `@layer utilities`, add:

```css
.divider-cosmic {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    oklch(0.72 0.22 295 / 0.3),
    oklch(0.68 0.2 220 / 0.2),
    transparent
  );
}
```

- [ ] **Add badge utilities**

In `@layer utilities`, add:

```css
.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 0.375rem;
  padding: 0.25rem 0.625rem;
  font-size: 0.8125rem;
  line-height: 1;
  border-width: 1px;
  border-style: solid;
  font-weight: 500;
}
.badge-purple {
  background-color: oklch(0.72 0.22 295 / 0.15);
  border-color: oklch(0.72 0.22 295 / 0.30);
  color: oklch(0.92 0.05 295);
}
.badge-blue {
  background-color: oklch(0.68 0.2 220 / 0.15);
  border-color: oklch(0.68 0.2 220 / 0.30);
  color: oklch(0.90 0.05 220);
}
.badge-green {
  background-color: oklch(0.65 0.18 160 / 0.15);
  border-color: oklch(0.65 0.18 160 / 0.30);
  color: oklch(0.85 0.12 160);
}
.badge-orange {
  background-color: oklch(0.72 0.2 55 / 0.15);
  border-color: oklch(0.72 0.2 55 / 0.30);
  color: oklch(0.88 0.14 55);
}
```

- [ ] **Add reveal-on-scroll animation utility**

In `@layer utilities`, add:

```css
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(1rem);
  transition: opacity 500ms ease-out, transform 500ms ease-out;
}
.reveal-on-scroll.is-revealed {
  opacity: 1;
  transform: translateY(0);
}
```

Also add to the `prefers-reduced-motion` block:
```css
.reveal-on-scroll {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}
```

- [ ] **Commit**

```bash
git add src/styles.css
git commit -m "feat: add badge, divider-cosmic, text-gradient-aurora, reveal utilities"
```

---

## Task 4: Create useReveal hook

**Files:**
- Create: `src/hooks/use-reveal.ts`

- [ ] **Create the hook**

```ts
// src/hooks/use-reveal.ts
import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
```

- [ ] **Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Commit**

```bash
git add src/hooks/use-reveal.ts
git commit -m "feat: add useReveal hook for scroll-triggered fade-up"
```

---

## Task 5: Create ProjectRow component

**Files:**
- Create: `src/components/ProjectRow.tsx`

- [ ] **Create the component**

```tsx
// src/components/ProjectRow.tsx
import { ArrowUpRight, CirclePlay, Github, Minus, Plus } from "lucide-react";
import type { Project } from "@/data/projects";

const NUMBER_OPACITIES = [0.3, 0.18, 0.12, 0.06];

interface ProjectRowProps {
  project: Project;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export function ProjectRow({ project, index, isOpen, onToggle }: ProjectRowProps) {
  const projectNumber = String(index + 1).padStart(2, "0");
  const numberOpacity = NUMBER_OPACITIES[index] ?? 0.06;

  return (
    <div
      className={`border-t transition-colors duration-300 ${
        isOpen
          ? "border-primary/35 bg-gradient-to-br from-primary/10 to-accent/5 rounded-b-lg"
          : "border-white/[0.08] hover:border-stardust/20"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 py-4 text-left group"
        aria-expanded={isOpen}
        aria-controls={`project-detail-${index}`}
      >
        <span
          className="font-mono text-2xl font-black leading-none shrink-0 transition-all duration-300"
          style={{ color: `oklch(0.72 0.22 295 / ${isOpen ? 0.45 : numberOpacity})` }}
        >
          {projectNumber}
        </span>

        <div className="flex-1 min-w-0">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-stardust/55 mb-1">
            {project.eyebrow} · {project.year}
          </p>
          <p
            className={`text-base font-bold leading-tight transition-colors duration-200 ${
              isOpen ? "text-stardust" : "text-foreground group-hover:text-stardust"
            }`}
          >
            {project.title}
          </p>
        </div>

        <div className="hidden sm:flex flex-wrap gap-2 shrink-0">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/70 bg-background/45 px-2.5 py-0.5 text-xs text-stardust"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="text-stardust/40 shrink-0 ml-1">
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>

      {/* Smooth height expand via grid-template-rows transition */}
      <div
        id={`project-detail-${index}`}
        className="grid transition-all duration-500 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden min-h-0">
          <div
            className={`pb-6 pl-[52px] grid gap-6 md:grid-cols-2 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "150ms" : "0ms" }}
          >
            {/* Left: description, role, status */}
            <div>
              <p className="text-sm leading-[1.85] text-muted-foreground mb-4">
                {project.description}
              </p>
              <p className="text-sm text-muted-foreground mb-1">
                <span className="text-foreground/90 font-medium">Role:</span>{" "}
                {project.role}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground/90 font-medium">Status:</span>{" "}
                {project.status}
              </p>
            </div>

            {/* Right: evidence box, tags, links */}
            <div>
              <div className="rounded-md border border-border/60 bg-background/35 p-4 mb-4">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2">
                  Evidence
                </p>
                <p className="text-sm leading-[1.75] text-foreground/85">{project.impact}</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/70 bg-background/45 px-3 py-1 text-xs text-stardust"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {project.demoVideoUrl && (
                  <a
                    href={project.demoVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch demo for ${project.title}`}
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background/50 px-3 text-sm font-semibold text-foreground transition-colors hover:border-stardust hover:text-stardust"
                  >
                    <CirclePlay className="h-4 w-4" />
                    {project.demoVideoLabel ?? "Demo"}
                  </a>
                )}
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View source for ${project.title}`}
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background/50 px-3 text-sm font-semibold text-foreground transition-colors hover:border-stardust hover:text-stardust"
                  >
                    <Github className="h-4 w-4" />
                    {project.sourceLabel ?? "Source"}
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background/50 px-3 text-sm font-semibold text-foreground transition-colors hover:border-stardust hover:text-stardust"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                    {project.liveLabel ?? "Live"}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Commit**

```bash
git add src/components/ProjectRow.tsx
git commit -m "feat: add ProjectRow accordion component"
```

---

## Task 6: Redesign navigation

**Files:**
- Modify: `src/routes/index.tsx`

- [ ] **Update imports at the top of index.tsx**

Add to the import list (keep all existing imports, add the new ones):
```tsx
import { useState } from "react";
import { ProjectRow } from "@/components/ProjectRow";
import { useReveal } from "@/hooks/use-reveal";
```

Remove `ProjectCard` import (line ~5) and `ArrowDown` from the lucide imports.

- [ ] **Update ResumeLink to support a pill variant**

Replace the entire `ResumeLink` function:

```tsx
function ResumeLink({ className, variant = "default" }: { className: string; variant?: "default" | "pill" }) {
  const hasResumeUrl = Boolean(profile.resume.url);
  return (
    <a
      href={profile.resume.url || mailtoUrl}
      target={hasResumeUrl ? "_blank" : undefined}
      rel={hasResumeUrl ? "noopener noreferrer" : undefined}
      aria-label={hasResumeUrl ? profile.resume.label : "Request resume by email"}
      className={className}
    >
      {variant === "default" && <Download className="h-4 w-4" />}
      {variant === "pill"
        ? "Resume"
        : hasResumeUrl
          ? profile.resume.label
          : profile.resume.fallbackLabel}
    </a>
  );
}
```

- [ ] **Replace the nav block**

Replace the entire `<nav>` element (currently starts at `<nav className="fixed inset-x-0 top-0 z-50...`):

```tsx
<nav className="fixed inset-x-0 top-0 z-50 border-b border-primary/12 bg-background/60 backdrop-blur-2xl">
  <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-6">
    <a href="#top" className="font-mono text-sm font-bold tracking-[0.3em] text-foreground">
      {profile.navLogo}
    </a>
    <div className="flex items-center gap-5 md:gap-6">
      <div className="flex gap-5 font-mono text-xs tracking-[0.12em] text-muted-foreground md:gap-7">
        <a href="#projects" className="transition-colors hover:text-foreground">
          Work
        </a>
        <a href="#about" className="transition-colors hover:text-foreground">
          About
        </a>
        <a href="#contact" className="transition-colors hover:text-foreground">
          Contact
        </a>
      </div>
      <ResumeLink
        variant="pill"
        className="inline-flex items-center gap-1.5 rounded border border-primary/40 bg-primary/20 px-3 py-1.5 font-mono text-xs font-semibold text-primary transition-shadow hover:shadow-glow"
      />
    </div>
  </div>
</nav>
```

- [ ] **Verify in browser**

```bash
npm run dev
```

Open the URL shown in terminal output (typically `http://localhost:3000`). Nav should show "EJCL" in monospace on the left, monospace links in the middle, Resume pill on the right.

- [ ] **Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: redesign nav — EJCL monospace logo, resume pill, increased blur"
```

---

## Task 7: Redesign hero section

**Files:**
- Modify: `src/routes/index.tsx`

- [ ] **Add useState for open project index at the top of Portfolio()**

Inside the `Portfolio` function, add:

```tsx
const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null);
```

- [ ] **Replace the entire <header> block**

Replace the `<header id="top" ...>` element through its closing `</header>`:

```tsx
<header id="top" className="relative min-h-screen overflow-hidden">
  <img
    src={heroImage}
    alt=""
    width={1920}
    height={1080}
    className="absolute inset-x-0 top-0 h-[130%] w-full object-cover opacity-20 [mask-image:linear-gradient(to_bottom,black_0%,black_42%,transparent_100%)]"
  />
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,oklch(0.36_0.14_260_/_0.35),transparent_58%)]" />
  <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent via-background/75 to-background" />

  {/* Animated nebula pulse blob */}
  <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-[60%] rounded-full bg-primary/20 blur-[80px] animate-nebula-pulse" />

  <div className="relative flex min-h-screen flex-col items-center justify-center px-5 pb-10 pt-20 text-center md:px-6">
    <p className="font-mono text-xs tracking-[0.45em] uppercase text-stardust/60 mb-5">
      {profile.title} at {profile.company}
    </p>
    <h1 className="max-w-4xl text-5xl font-bold leading-[1.1] text-foreground sm:text-6xl md:text-7xl">
      {profile.headlineLine1}
    </h1>
    <h1 className="max-w-4xl text-5xl font-bold leading-[1.1] italic text-gradient-aurora sm:text-6xl md:text-7xl mb-6">
      {profile.headlineAccent}
    </h1>
    <p className="max-w-xl text-base leading-[1.85] text-muted-foreground mb-8 md:text-lg">
      {profile.bio}
    </p>
    <div className="flex flex-wrap justify-center gap-3">
      <a
        href="#projects"
        className="inline-flex items-center gap-2 rounded-md border border-primary/50 bg-primary/25 px-5 py-3 text-sm font-semibold text-foreground shadow-glow transition-transform hover:-translate-y-0.5"
      >
        View work ↓
      </a>
      <a
        href={mailtoUrl}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-background/45 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-stardust hover:text-stardust"
      >
        <Mail className="h-4 w-4" />
        Email me
      </a>
    </div>
    <p className="font-mono text-[10px] tracking-[0.25em] text-foreground/15 mt-6">
      ↓ scroll
    </p>
  </div>
</header>
```

- [ ] **Verify in browser**

Hero should be full-viewport height, text centered, gradient italic on second headline line, two CTAs, animated nebula glow behind the text.

- [ ] **Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: redesign hero — full viewport, gradient headline, nebula pulse, scroll hint"
```

---

## Task 8: Redesign projects section

**Files:**
- Modify: `src/routes/index.tsx`

- [ ] **Replace the projects section**

Replace the `<section id="projects" ...>` block:

```tsx
<section id="projects" className="relative mx-auto max-w-6xl px-5 pb-24 pt-8 md:px-6">
  <div className="divider-cosmic mb-10" />
  <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
    <div>
      <p className="font-mono text-xs tracking-[0.4em] uppercase text-stardust/55 mb-3">
        Selected work
      </p>
      <h2 className="text-4xl font-bold text-foreground md:text-5xl">
        Selected Engineering{" "}
        <em className="italic text-gradient-aurora">Work</em>
      </h2>
    </div>
    <p className="max-w-xl text-sm leading-6 text-muted-foreground">
      A focused set of projects that show full-stack delivery, database thinking, mobile
      implementation, and practical engineering judgment through code or demos.
    </p>
  </div>

  <div className="flex flex-col">
    {featuredProjects.map((project, index) => (
      <ProjectRow
        key={project.title}
        project={project}
        index={index}
        isOpen={openProjectIndex === index}
        onToggle={() =>
          setOpenProjectIndex(openProjectIndex === index ? null : index)
        }
      />
    ))}
    <div className="divider-cosmic" />
  </div>
</section>
```

- [ ] **Verify in browser**

Project rows should collapse/expand smoothly. Clicking a row opens it; clicking again closes it. Only one open at a time.

- [ ] **Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: replace project grid with numbered accordion rows"
```

---

## Task 9: Redesign skills section

**Files:**
- Modify: `src/routes/index.tsx`

- [ ] **Replace the skills section**

Replace the `<section className="mx-auto max-w-6xl px-5 py-20 ...">` skills block:

```tsx
<section className="mx-auto max-w-6xl px-5 py-20 md:px-6">
  <div className="divider-cosmic mb-10" />
  <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
    <div>
      <p className="font-mono text-xs tracking-[0.4em] uppercase text-stardust/55 mb-3">
        Toolbox
      </p>
      <h2 className="text-4xl font-bold text-foreground md:text-5xl">
        Skills recruiters can{" "}
        <em className="italic text-gradient-aurora">scan quickly</em>
      </h2>
    </div>
    <p className="max-w-xl text-sm leading-6 text-muted-foreground">
      The portfolio leans into the same stack areas I want hiring teams to remember:
      practical frontend work, API-backed products, database design, and mobile execution.
    </p>
  </div>

  <div className="flex flex-col gap-4">
    {profile.skillGroups.map((group, i) => (
      <div
        key={group.label}
        className="flex items-baseline gap-4 flex-wrap reveal-on-scroll"
        style={{ transitionDelay: `${i * 60}ms` }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-stardust/55 min-w-[72px]">
          {group.label}
        </span>
        <div className="flex gap-2 flex-wrap">
          {group.items.map((item) => (
            <span key={item} className={`badge badge-${group.color}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Verify in browser**

Skills section shows inline badge rows: purple for Frontend, blue for Backend, green for Database, orange for Mobile.

- [ ] **Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: redesign skills section — badge clusters with category tints"
```

---

## Task 10: Redesign about, contact, and footer

**Files:**
- Modify: `src/routes/index.tsx`

- [ ] **Replace the about section**

Replace the `<section id="about" ...>` block:

```tsx
<section id="about" className="mx-auto max-w-6xl px-5 py-24 md:px-6">
  <div className="divider-cosmic mb-10" />
  <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-start">
    <div>
      <p className="font-mono text-xs tracking-[0.4em] uppercase text-stardust/55 mb-3">
        About
      </p>
      <h2 className="text-4xl font-bold text-foreground md:text-5xl">
        Built for real teams and{" "}
        <em className="italic text-gradient-aurora">real users</em>
      </h2>
    </div>
    <div className="relative border-l border-primary/25 pl-6">
      <div className="absolute -left-px top-0 h-10 w-px bg-gradient-to-b from-stardust/70 to-transparent" />
      <div className="space-y-6 text-base leading-[1.85] text-muted-foreground">
        <p>
          I care about the full path from idea to production: shaping the interface,
          choosing practical architecture, designing the data model, and leaving the
          codebase easier to work in than I found it.
        </p>
        <div className="flex flex-wrap gap-2">
          {profile.strengths.map((strength) => (
            <span
              key={strength}
              className="rounded-full border border-primary/35 bg-card/45 px-3 py-1 text-sm text-stardust/80"
            >
              {strength}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Replace the contact section**

Replace the `<section id="contact" ...>` block:

```tsx
<section id="contact" className="relative mx-auto max-w-4xl overflow-hidden px-5 py-24 text-center md:px-6">
  <div className="pointer-events-none absolute bottom-0 left-1/2 h-[200px] w-[400px] -translate-x-1/2 rounded-full bg-primary/20 blur-[60px]" />
  <div className="pointer-events-none absolute left-[5%] top-[20%] h-px w-20 -rotate-[15deg] bg-gradient-to-r from-transparent via-stardust/50 to-transparent blur-[0.5px]" />

  <p className="font-mono text-xs tracking-[0.45em] uppercase text-stardust/55 mb-3">
    Contact
  </p>
  <h2 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">
    Let&apos;s build something{" "}
    <em className="italic text-gradient-aurora">useful.</em>
  </h2>
  <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
    {profile.availability}. The fastest way to reach me is email.
  </p>

  <div className="relative mt-9 flex flex-wrap justify-center gap-3">
    <a
      href={mailtoUrl}
      className="inline-flex items-center gap-2 rounded-md border border-primary/50 bg-primary/25 px-5 py-3 text-sm font-semibold text-foreground shadow-glow transition-transform hover:-translate-y-0.5"
    >
      <Mail className="h-4 w-4" />
      Email me
    </a>
    <a
      href={profile.github}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-border bg-background/45 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-stardust hover:text-stardust"
    >
      <Github className="h-4 w-4" />
      GitHub
    </a>
    <a
      href={profile.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-border bg-background/45 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-stardust hover:text-stardust"
    >
      <Linkedin className="h-4 w-4" />
      LinkedIn
      <ArrowUpRight className="h-4 w-4" />
    </a>
  </div>
</section>
```

- [ ] **Remove unused gmailComposeUrl variable**

In `src/routes/index.tsx`, delete the line (near the top of the file, after `mailtoUrl`):

```ts
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  profile.email,
)}`;
```

- [ ] **Replace the footer**

Replace the `<footer ...>` block:

```tsx
<footer className="border-t border-primary/10 py-8 text-center">
  <p className="font-mono text-xs text-foreground/20">
    {new Date().getFullYear()} {profile.name}. Built with React, TanStack, and Tailwind.
  </p>
</footer>
```

- [ ] **Verify in browser**

About section: glowing left border with bright top segment, gradient italic heading, brighter tags. Contact: 3 CTAs only, nebula glow, shooting star streak visible.

- [ ] **Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: redesign about, contact, footer — gradient headings, glow treatments"
```

---

## Task 11: Wire up scroll-reveal animations

**Files:**
- Modify: `src/routes/index.tsx`

- [ ] **Add reveal refs to Portfolio function**

Inside `Portfolio()`, after the `openProjectIndex` state:

```tsx
const projectsRef = useReveal<HTMLElement>();
const skillsRef = useReveal<HTMLElement>();
const aboutRef = useReveal<HTMLElement>();
const contactRef = useReveal<HTMLElement>();
```

- [ ] **Apply refs and class to sections**

Add `ref={projectsRef}` and `className="reveal-on-scroll ..."` (prepend to existing className) on the four sections:

```tsx
{/* projects section */}
<section
  ref={projectsRef}
  id="projects"
  className="reveal-on-scroll relative mx-auto max-w-6xl px-5 pb-24 pt-8 md:px-6"
>

{/* skills section */}
<section
  ref={skillsRef}
  className="reveal-on-scroll mx-auto max-w-6xl px-5 py-20 md:px-6"
>

{/* about section */}
<section
  ref={aboutRef}
  id="about"
  className="reveal-on-scroll mx-auto max-w-6xl px-5 py-24 md:px-6"
>

{/* contact section */}
<section
  ref={contactRef}
  id="contact"
  className="reveal-on-scroll relative mx-auto max-w-4xl overflow-hidden px-5 py-24 text-center md:px-6"
>
```

- [ ] **Verify in browser**

Scroll down slowly — each section should fade up as it enters the viewport. Sections already in view on load should appear immediately (since `threshold: 0.1` fires quickly).

- [ ] **Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: add scroll-reveal fade-up animations to all sections"
```

---

## Task 12: Cleanup — delete ProjectCard

**Files:**
- Delete: `src/components/ProjectCard.tsx`

- [ ] **Remove the ProjectCard file**

```bash
git rm src/components/ProjectCard.tsx
```

- [ ] **Verify no remaining imports**

```bash
grep -r "ProjectCard" src/
```

Expected: no output (zero matches).

- [ ] **Verify TypeScript and dev server**

```bash
npx tsc --noEmit
npm run dev
```

Expected: no TypeScript errors, site loads correctly.

- [ ] **Final commit**

```bash
git add -A
git commit -m "chore: remove ProjectCard, replaced by ProjectRow"
```

---

## Final verification checklist

- [ ] `npm run dev` — full page renders without errors
- [ ] Nav shows `EJCL` monospace, Resume pill in top-right
- [ ] Hero is full-viewport, text centered, second headline line has aurora gradient
- [ ] Nebula pulse animates behind hero headline
- [ ] Scrolling down shows fade-up reveal on each section
- [ ] Project rows expand/collapse smoothly on click; only one open at a time
- [ ] Skills show badge rows with purple/blue/green/orange tints
- [ ] About has glowing left border, gradient italic on "real users"
- [ ] Contact has 3 CTAs (Email, GitHub, LinkedIn), no Gmail button
- [ ] Footer is monospace, very dim
- [ ] Star field is denser than before
- [ ] Section dividers are gradient purple/blue lines
- [ ] `prefers-reduced-motion` disables all animations (test in browser devtools)
