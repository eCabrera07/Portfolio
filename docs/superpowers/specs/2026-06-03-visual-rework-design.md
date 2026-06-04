# Visual Rework Design — Portfolio

**Date:** 2026-06-03  
**Branch:** `visual-rework`  
**Status:** Approved — ready for implementation

## Summary

Full cinematic visual overhaul of the portfolio. The space theme and color palette are preserved exactly. Everything else — layout, typography treatment, component styles, animations, and page structure — is redesigned for a dramatic, immersive feel.

---

## Design Decisions

| Decision        | Choice                                      | Rationale                                   |
| --------------- | ------------------------------------------- | ------------------------------------------- |
| Direction       | Cinematic / Immersive                       | Maximum atmosphere, fits space theme        |
| Hero layout     | Full-viewport centered                      | Deep nebula glow, scroll-through-space feel |
| Projects layout | Numbered horizontal rows + inline accordion | Scans fast, editorial index feel            |
| Nav logo        | `EJCL` monospace initials                   | Personal, technical, compact                |
| Contact CTAs    | 3 (Email, GitHub, LinkedIn)                 | Removed duplicate resume + Gmail buttons    |

---

## 1. Foundations

### Typography

- **Eyebrow labels:** Switch from `uppercase tracking-[0.28em]` to monospace (`font-mono`) with `tracking-[0.4em]`. Applied to all section eyebrows and sub-labels.
- **Heading scale:** Push display headings ~20% larger. `text-4xl` → `text-5xl` on section headings, `text-6xl` → `text-7xl` on the hero h1.
- **Gradient italic treatment:** The final phrase of each major heading gets `font-italic` + aurora gradient (`from-[oklch(0.85_0.12_295)] via-[oklch(0.8_0.15_240)] to-[oklch(0.8_0.18_295)]` applied via `bg-clip-text text-transparent`). Used on: hero headline, section headings (Work, Skills, About, Contact).
- **Body text:** Unchanged stack (Aptos/Segoe). Line-height bumped to `leading-[1.85]`.

### Background & Stars

- **Base color:** Deepen slightly — `oklch(0.11 0.045 270)`.
- **Star field:** Existing CSS radial-gradient stars kept, density increased by adding a second `body::before` layer with 10 additional star positions at varied sizes (1px–2px) and opacity (0.5–0.9).
- **Nebula layers:** Strengthen existing `body::after` nebula — increase opacity from `0.55` to `0.7`, add a third radial gradient blob at `70% 20%` in the aurora color range.
- **Aurora streaks:** Two `::before` pseudo-elements on the `<main>` element — one at the very top, one at the very bottom — thin 1px lines with linear-gradient in purple→blue→purple, `filter: blur(1px)`.

### Section dividers

Replace plain `border-t border-border/60` with a gradient line:

```css
height: 1px;
background: linear-gradient(
  to right,
  transparent,
  oklch(0.72 0.22 295 / 0.3),
  oklch(0.68 0.2 220 / 0.2),
  transparent
);
```

Applied between every major section.

### Scroll animations

All implemented via `IntersectionObserver` + a `data-reveal` attribute pattern:

- **Fade-up on enter:** Each section, each project row, and the skills group gets `opacity-0 translate-y-4` initially, transitions to `opacity-100 translate-y-0` when it enters the viewport. Duration `500ms`, easing `ease-out`.
- **Stagger on grouped items:** Each project row gets a delay of `index * 80ms`. Each skill badge row gets `index * 60ms`.
- **Hero nebula pulse:** The hero's radial-gradient glow behind the headline gets a `@keyframes nebula-pulse` — subtle `scale(1)` → `scale(1.08)` + opacity `0.8` → `1.0`, `4s ease-in-out infinite alternate`.
- **`prefers-reduced-motion`:** All new animations wrapped in the existing `@media (prefers-reduced-motion: reduce)` block that already disables all animation durations.

---

## 2. Navigation

**File:** `src/routes/index.tsx` — `<nav>` block

| Element         | Current                   | Redesign                                                                                                                       |
| --------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Logo text       | `"Eddie"` (semibold sans) | `"EJCL"` monospace, `tracking-[0.3em]`, `font-bold`                                                                            |
| Nav links       | sans-serif, muted         | `font-mono`, `tracking-[0.12em]`, muted                                                                                        |
| Resume CTA      | Not in nav                | Ghost pill button: `bg-primary/20 border border-primary/40 rounded px-3 py-1 text-xs font-mono text-primary hover:shadow-glow` |
| Background blur | `backdrop-blur-xl`        | `backdrop-blur-2xl`, background darkened to `bg-background/60`                                                                 |
| Border          | `border-border/35`        | `border-primary/12` (slight purple tint)                                                                                       |

Resume link in the nav uses the existing `<ResumeLink>` logic — render the pill variant inline here. Remove the `Download` icon; use text only: "Resume".

---

## 3. Hero

**File:** `src/routes/index.tsx` — `<header>` block

### Layout

- Section height: `min-h-screen` (full viewport). Currently uses `pt-24 pb-16`.
- Content: `flex flex-col items-center justify-center text-center` — centered both axes.
- Remove the stats grid (`profile.stats.map(...)`) entirely. The resume CTA moves to the nav.

### Headline

```jsx
<h1 className="text-6xl md:text-7xl font-bold leading-[1.1] font-display">
  Full-stack engineer focused on
</h1>
<h1 className="text-6xl md:text-7xl font-bold leading-[1.1] font-display italic text-gradient-aurora">
  database-backed applications.
</h1>
```

`text-gradient-aurora` needs to be added to `styles.css`. The existing class is named `text-gradient-cosmic` (which also maps to `--gradient-aurora`) — add a `text-gradient-aurora` alias that does the same thing, or rename the existing class. Use `text-gradient-aurora` throughout for semantic clarity.

### Eyebrow

```jsx
<p className="font-mono text-xs tracking-[0.45em] uppercase text-stardust/60 mb-4">
  Level 2 Software Engineer · AptimaPR
</p>
```

### Bio

Max-width `max-w-xl`, centered, `leading-[1.85]`.

### CTAs

Two buttons (down from three):

1. `"View work ↓"` → primary ghost: `bg-primary/25 border border-primary/50 shadow-glow hover:-translate-y-0.5`
2. `"Email me"` → secondary ghost: `border border-border hover:border-stardust`

Remove the standalone resume button (now in nav). Remove the `Download` icon from the view-work button.

### Nebula pulse element

```jsx
<div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] w-[500px] h-[300px] rounded-full bg-primary/20 blur-[80px] animate-nebula-pulse" />
```

Add `@keyframes nebula-pulse` to `styles.css`.

### Scroll hint

```jsx
<p className="font-mono text-[10px] tracking-[0.25em] text-foreground/15 mt-4">↓ scroll</p>
```

---

## 4. Projects

**File:** `src/routes/index.tsx` — projects `<section>`, and `src/components/ProjectCard.tsx` replaced entirely.

### New component: `ProjectRow`

Replace `<ProjectCard>` with `<ProjectRow>`. The grid becomes a stacked list.

```tsx
// src/components/ProjectRow.tsx
function ProjectRow({ project, index, isOpen, onToggle }) { ... }
```

**Collapsed state:**

```
[01]  [eyebrow · year]        [title]        [tag] [tag]  [+]
```

- Full-width row, `border-t` (gradient divider color)
- Number: `font-mono text-2xl font-black text-primary/[opacity fades with index]`
- Title: `text-base font-bold`
- Tags: pill badges (existing style)
- Toggle icon: `+` / `−`, `text-stardust/30`
- Hover: border brightens to `border-stardust/30`, number brightens

**Expanded state:**

- Background: `bg-gradient-to-br from-primary/10 to-accent/5 rounded-b-lg`
- Top border: brightens to `border-primary/35`
- Content grid: two columns on `md+` — description/role/status left, evidence box + tags + links right
- Evidence box: `bg-background/35 border border-border/60 rounded-md p-4`
- Links: same ghost button style as existing project card links
- Expand/collapse uses controlled `useState` with a `grid-template-rows: 0fr → 1fr` CSS transition for a smooth height animation. The inner content div gets `overflow: hidden` and `min-height: 0`.

**State management:**
Single `useState<number | null>` in the parent section tracks open index. Only one row open at a time.

### Section heading

```jsx
<h2>
  Selected Engineering <em className="italic text-gradient-aurora">Work</em>
</h2>
```

---

## 5. Skills

**File:** `src/routes/index.tsx` — skills `<section>`

Replace the 4-column card grid with inline badge rows:

```jsx
{
  profile.skillGroups.map((group) => (
    <div key={group.label} className="flex items-baseline gap-3 flex-wrap">
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
  ));
}
```

**Data change:** `profile.skillGroups` values change from comma-separated strings to arrays. Add a `color` field per group:

| Group    | Color class    | Tint                                                                                           |
| -------- | -------------- | ---------------------------------------------------------------------------------------------- |
| Frontend | `badge-purple` | `bg-primary/15 border-primary/30 text-primary-foreground/85`                                   |
| Backend  | `badge-blue`   | `bg-accent/15 border-accent/30 text-accent-foreground/85`                                      |
| Database | `badge-green`  | `bg-[oklch(0.65_0.18_160)]/15 border-[oklch(0.65_0.18_160)]/30 text-[oklch(0.85_0.12_160)]/85` |
| Mobile   | `badge-orange` | `bg-[oklch(0.72_0.2_55)]/15 border-[oklch(0.72_0.2_55)]/30 text-[oklch(0.88_0.14_55)]/85`      |

Add `.badge`, `.badge-purple`, `.badge-blue`, `.badge-green`, `.badge-orange` utility classes to `styles.css`.

### Section heading

```jsx
<h2>
  Skills recruiters can <em className="italic text-gradient-aurora">scan quickly</em>
</h2>
```

---

## 6. About

**File:** `src/routes/index.tsx` — about `<section>`

No structural changes. Styling updates:

- Heading: gradient italic on `"real users"`
- Right column: add `border-l border-primary/25 pl-6 relative`
- Glowing top segment on the left border:
  ```jsx
  <div className="absolute -left-px top-0 w-px h-10 bg-gradient-to-b from-stardust/70 to-transparent" />
  ```
- Tags: update to use `border-primary/35 text-stardust/80` (slightly brighter than current)

---

## 7. Contact

**File:** `src/routes/index.tsx` — contact `<section>`

### CTA reduction

Remove: "Open Gmail", duplicate "Download resume" button.  
Keep: Email me, GitHub, LinkedIn.

### Atmosphere

Add a radial glow behind the section (same pattern as hero nebula pulse, smaller):

```jsx
<div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-primary/20 blur-[60px]" />
```

### Heading

```jsx
<h2>
  Let&apos;s build something <em className="italic text-gradient-aurora">useful.</em>
</h2>
```

### Shooting star

```jsx
<div className="pointer-events-none absolute top-[20%] left-[5%] w-20 h-px bg-gradient-to-r from-transparent via-stardust/50 to-transparent -rotate-[15deg] blur-[0.5px]" />
```

---

## 8. Footer

Update font to monospace, reduce opacity:

```jsx
<footer className="border-t border-primary/10 py-8 text-center">
  <p className="font-mono text-xs text-foreground/20">
    {new Date().getFullYear()} Eddie Cabrera · Built with React, TanStack, Tailwind
  </p>
</footer>
```

---

## Files Changed

| File                             | Change                                                                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/styles.css`                 | Star density, nebula strength, aurora streaks, divider styles, badge utilities, `nebula-pulse` keyframe, `text-gradient-aurora` (already exists) |
| `src/routes/index.tsx`           | Nav, hero, projects (new row layout), skills (badge rows), about, contact, footer                                                                |
| `src/components/ProjectRow.tsx`  | New component replacing `ProjectCard`                                                                                                            |
| `src/components/ProjectCard.tsx` | Deleted (replaced by `ProjectRow`)                                                                                                               |
| `src/data/projects.ts`           | `skillGroups.value` string → `items` array, add `color` field                                                                                    |

---

## Out of Scope

- No changes to routing, data fetching, or SEO meta
- No new pages or sections
- No font imports (existing stack kept)
- No changes to `src/components/ui/*`
