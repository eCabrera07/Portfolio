# AI Tools Row Design

## Goal

Add Codex and Claude Code experience to the portfolio in a concise, recruiter-readable way without changing the portfolio's main positioning. The portfolio should continue to lead with full-stack, database-backed engineering work.

## Approved Approach

Add a dedicated `AI Tools` row to the existing Toolbox section.

Items:

- Codex
- Claude Code
- Prompt Engineering

This keeps AI-assisted development visible enough to scan while avoiding a larger hero, About, or project-level rewrite.

## Content Placement

The new row belongs in `profile.skillGroups` in `src/data/projects.ts`, alongside the existing Frontend, Backend, Database, and Mobile groups.

The row should use the existing badge presentation in `src/routes/index.tsx`; no new component is needed.

## Visual Behavior

The row should match the current Toolbox layout:

- Same label width and uppercase label style
- Same badge spacing and wrapping behavior
- Same responsive behavior on mobile and desktop
- Same reveal-on-scroll behavior inherited from the section

Use the existing badge color system. If no new color is needed, reuse an existing color that keeps the palette balanced.

## Resume Handling

The pasted resume excerpt is the source content for this change. Do not request or depend on the full resume for this implementation.

The highlighted content should be represented only through the concise `AI Tools` row for now. Broader top-of-portfolio copy changes are out of scope unless requested separately.

## Testing

Verify that:

- `npm run build` succeeds.
- The Toolbox section renders the new `AI Tools` row.
- The row remains readable and wraps cleanly on a mobile viewport.
