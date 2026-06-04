export interface Project {
  title: string;
  eyebrow: string;
  description: string;
  impact: string;
  role: string;
  year: string;
  status: string;
  featured: boolean;
  tags: string[];
  demoVideoUrl?: string;
  demoVideoLabel?: string;
  liveUrl?: string;
  liveLabel?: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

export interface SkillGroup {
  label: string;
  color: "purple" | "blue" | "green" | "orange";
  items: string[];
}

const defaultResumeUrl =
  "https://drive.google.com/file/d/1fMWTyblPtpo0pe_5GV8_WzJI-T-zmMk7/view?usp=sharing";
const configuredResumeUrl = import.meta.env.VITE_RESUME_URL?.trim();

export const projects: Project[] = [
  {
    title: "Grouphug",
    eyebrow: "Featured build",
    description:
      "A Magic: The Gathering card scanner and collection manager that identifies physical cards, saves them to a searchable collection, and organizes them into nested storage boxes.",
    impact:
      "Demonstrates full-stack product work across React, FastAPI, PostgreSQL, Redis, OCR, OpenCV card detection, Scryfall catalog imports, and bulk collection workflows.",
    role: "Full-stack implementation, OCR pipeline, database design, product workflow",
    year: "2026",
    status: "Active build",
    featured: true,
    tags: ["React", "FastAPI", "PostgreSQL", "Redis", "OCR", "Collab"],
    sourceUrl: "https://github.com/ERA120/Grouphug",
    sourceLabel: "Source",
  },
  {
    title: "Halfsies",
    eyebrow: "Product track",
    description:
      "A full-stack app for splitting shared expenses and tracking who owes what, centered on clear workflows, reliable persistence, and simple user decisions.",
    impact:
      "Frames practical database-backed product work around users, shared records, balances, and clear state changes.",
    role: "Full-stack implementation, database design, product workflow",
    year: "2026",
    status: "Roadmap",
    featured: false,
    tags: ["Full-Stack", "Database", "Product UI", "Expense Tracking", "OCR"],
    sourceUrl: "https://github.com/eCabrera07/Halfsies",
    sourceLabel: "Source",
  },
  {
    title: "QueM",
    eyebrow: "Featured build",
    description:
      "A native Android queue manager for capturing projects, tasks, and follow-ups, then moving them through a clear local-first workflow.",
    impact:
      "Demonstrates mobile product engineering with persisted Room data, Jetpack Compose screens, queue lifecycle states, attachments, and planned Google Drive sync.",
    role: "Android implementation, local persistence, sync architecture",
    year: "2026",
    status: "Demo available",
    featured: true,
    tags: ["Kotlin", "Android", "Jetpack Compose", "Room", "Google Drive"],
    demoVideoUrl: "/videos/quem-portfolio-demo-human-voiceover.mp4",
    demoVideoLabel: "Demo",
    sourceUrl: "https://github.com/eCabrera07/QueM",
    sourceLabel: "Source",
  },
  {
    title: "Global Game Jam",
    eyebrow: "Earlier work",
    description:
      "A time-boxed JavaScript game created during Global Game Jam, focused on quick iteration, gameplay feedback, and playable delivery.",
    impact: "Turned an idea into a working interactive project under event constraints.",
    role: "Gameplay programming, UI, collaboration",
    year: "2018",
    status: "Archived",
    featured: true,
    tags: ["JavaScript", "Game Jam", "Prototyping"],
    sourceUrl: "https://github.com/eCabrera07/GGJ",
    sourceLabel: "Source",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const profile = {
  name: "Eddie Cabrera",
  shortName: "Eddie",
  navLogo: "EJCL",
  headlineLine1: "Full-stack engineer focused on",
  headlineAccent: "database-backed applications.",
  title: "Level 2 Software Engineer",
  company: "AptimaPR",
  headline: "Full-stack software engineer focused on database-backed applications.",
  bio: "Level 2 Software Engineer at AptimaPR with a passion for building practical full-stack systems across frontend, backend, and database layers.",
  location: "United States",
  availability:
    "Open to full-stack engineering conversations, especially database-heavy product work",
  email: "eddie.joel.7@gmail.com",
  emailSubject: "Portfolio inquiry",
  resume: {
    url: configuredResumeUrl || defaultResumeUrl,
    label: "Download resume",
    fallbackLabel: "Request resume",
  },
  github: "https://github.com/ecabrera07",
  linkedin: "https://www.linkedin.com/in/ecabreracs/",
  strengths: ["Database-backed apps", "Full-stack delivery", "API design", "Maintainable systems"],
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
  stats: [
    { label: "Frontend", value: "React + TypeScript" },
    { label: "Backend", value: "APIs + workflows" },
    { label: "Database", value: "PostgreSQL + Redis" },
  ],
};
