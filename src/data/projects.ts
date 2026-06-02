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
  sourceUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Grouphug",
    eyebrow: "Featured build",
    description:
      "A Magic: The Gathering card scanner and collection manager that identifies physical cards, saves them to a searchable collection, and organizes them into nested storage boxes.",
    impact:
      "Shows full-stack product work across React, FastAPI, PostgreSQL, Redis, OCR, OpenCV card detection, Scryfall catalog imports, and bulk collection workflows.",
    role: "Full-stack implementation, OCR pipeline, database design, product workflow",
    year: "2026",
    status: "In Progress",
    featured: true,
    tags: ["React", "FastAPI", "PostgreSQL", "Redis", "OCR", "Collab"],
    sourceUrl: "https://github.com/ERA120/Grouphug",
  },
  {
    title: "Halfsies",
    eyebrow: "Featured build",
    description:
      "A full-stack app for splitting shared expenses and tracking who owes what, planned around clean workflows, reliable persistence, and a simple user experience.",
    impact:
      "Planned to show practical database-backed product work: users, shared records, balances, and clear state changes.",
    role: "Full-stack implementation, database design, product workflow",
    year: "TBD",
    status: "In Progress",
    featured: true,
    tags: ["Full-Stack", "Database", "Product UI", "Expense Tracking", "OCR"],
    sourceUrl: "https://github.com/eCabrera07/Halfsies",
  },
  {
    title: "QueM",
    eyebrow: "Featured build",
    description:
      "A native Android queue manager for capturing projects, tasks, and follow-ups, then moving them through a clear local-first workflow.",
    impact:
      "Shows mobile product engineering with persisted Room data, Jetpack Compose screens, queue lifecycle states, attachments, and planned Google Drive sync.",
    role: "Android implementation, local persistence, sync architecture",
    year: "2026",
    status: "In Progress",
    featured: true,
    tags: ["Kotlin", "Android", "Jetpack Compose", "Room", "Google Drive"],
    demoVideoUrl: "/videos/quem-portfolio-demo-human-voiceover.mp4",
    demoVideoLabel: "Watch QueM walkthrough",
    sourceUrl: "https://github.com/eCabrera07/QueM",
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
    featured: false,
    tags: ["JavaScript", "Game Jam", "Prototyping"],
    sourceUrl: "https://github.com/eCabrera07/GGJ",
  }
];

export const featuredProjects = projects.filter((project) => project.featured);

export const profile = {
  name: "Eddie Cabrera",
  shortName: "Eddie",
  title: "Level 2 Software Engineer",
  company: "AptimaPR",
  headline: "Full-stack software engineer focused on database-backed applications.",
  bio: "Level 2 Software Engineer at AptimaPR with a passion for building practical full-stack systems across frontend, backend, and database layers.",
  location: "United States",
  availability:
    "Open to full-stack engineering conversations, especially database-heavy product work",
  email: "eddie.joel.7@gmail.com",
  github: "https://github.com/ecabrera07",
  linkedin: "https://www.linkedin.com/in/ecabreracs/",
  strengths: ["Database-backed apps", "Full-stack delivery", "API design", "Maintainable systems"],
  stats: [
    { label: "Role", value: "Level 2 SWE" },
    { label: "Company", value: "AptimaPR" },
    { label: "Focus", value: "Databases" },
  ],
};
