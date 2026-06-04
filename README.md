# Eddie Cabrera Portfolio

A personal showcase portfolio for Eddie Cabrera, a Level 2 Software Engineer at AptimaPR focused on full-stack, database-backed applications.

The site presents a polished space-themed landing page with:

- A clear professional headline and contact paths
- Project tracks for upcoming full-stack and database-focused work
- Featured project selection through `featured: true` in the project data
- GitHub, LinkedIn, and Gmail contact links
- Accessible focus states, reduced-motion support, and a skip link
- A dynamic starfield-inspired background with scroll-reactive movement

## Tech Stack

- React 19
- TanStack Start and TanStack Router
- TypeScript
- Tailwind CSS
- Vite
- Lucide React icons

## Project Content

Portfolio copy and project data live in:

```txt
src/data/projects.ts
```

To highlight a project, set:

```ts
featured: true;
```

Projects marked `featured: false` stay in the data file but do not render in the featured project section.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```
