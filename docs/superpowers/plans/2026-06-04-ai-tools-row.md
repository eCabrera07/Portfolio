# AI Tools Row Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a concise `AI Tools` row to the portfolio Toolbox section with Codex, Claude Code, and Prompt Engineering.

**Architecture:** The portfolio already renders Toolbox rows from `profile.skillGroups` in `src/data/projects.ts`. Add one new skill group there and rely on the existing `src/routes/index.tsx` rendering and badge styles.

**Tech Stack:** React, TypeScript, TanStack Router, Tailwind CSS, Vite.

---

## File Structure

- Modify: `src/data/projects.ts`
  - Responsibility: central portfolio profile data, including Toolbox skill groups.
- Do not modify: `src/routes/index.tsx`
  - The existing Toolbox mapping already renders each skill group and badge.
- Do not modify: `src/styles.css`
  - The existing badge colors are enough; reuse `blue` for the new AI Tools row to avoid adding palette complexity.

---

### Task 1: Add AI Tools Skill Group

**Files:**
- Modify: `src/data/projects.ts`

- [ ] **Step 1: Run the failing content check**

Run:

```powershell
rg 'AI Tools|Codex|Claude Code|Prompt Engineering' src/data/projects.ts
```

Expected: no matches, showing the approved AI tools row is not present yet.

- [ ] **Step 2: Add the new skill group**

In `src/data/projects.ts`, update `profile.skillGroups` so it contains this additional object after the `Mobile` group:

```ts
    {
      label: "AI Tools",
      color: "blue" as const,
      items: ["Codex", "Claude Code", "Prompt Engineering"],
    },
```

Expected: `profile.skillGroups` now includes Frontend, Backend, Database, Mobile, and AI Tools.

- [ ] **Step 3: Run the passing content check**

Run:

```powershell
rg 'AI Tools|Codex|Claude Code|Prompt Engineering' src/data/projects.ts
```

Expected: matches for `"AI Tools"`, `"Codex"`, `"Claude Code"`, and `"Prompt Engineering"`.

- [ ] **Step 4: Build the app**

Run:

```powershell
npm run build
```

Expected: Vite build exits successfully.

- [ ] **Step 5: Visually verify the Toolbox section**

Start or reuse the local dev server:

```powershell
npm run dev
```

Open the local URL in the in-app browser, scroll to the Toolbox section, and verify:

- The new row label reads `AI Tools`.
- The row contains badges for `Codex`, `Claude Code`, and `Prompt Engineering`.
- The row wraps cleanly on desktop and mobile widths.

- [ ] **Step 6: Commit the implementation**

Run:

```powershell
git add -- src/data/projects.ts docs/superpowers/plans/2026-06-04-ai-tools-row.md
git commit -m "feat: add ai tools to portfolio toolbox"
```

Expected: commit succeeds with only the data file and plan file included.
