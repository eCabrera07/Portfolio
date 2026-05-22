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
  liveUrl?: string;
  sourceUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Full-Stack Application",
    eyebrow: "Project track",
    description:
      "A database-backed web application that will show how I structure frontend workflows, backend APIs, and persistent data around a real user problem.",
    impact:
      "Planned as the main case study for demonstrating end-to-end product thinking and production-minded engineering.",
    role: "Full-stack implementation, API design, database modeling",
    year: "TBD",
    status: "Planned",
    featured: true,
    tags: ["React", "API Design", "Database", "Full-Stack"],
  },
  {
    title: "Database Reporting System",
    eyebrow: "Project track",
    description:
      "A reporting-focused project for turning stored data into useful views, filters, and summaries that support decisions instead of just displaying records.",
    impact:
      "Planned to highlight database querying, data modeling, and practical UI for exploring information.",
    role: "Schema design, query logic, dashboard UI",
    year: "TBD",
    status: "Planned",
    featured: true,
    tags: ["SQL", "Reporting", "Data Modeling", "Dashboards"],
  },
  {
    title: "API and Data Workflow",
    eyebrow: "Project track",
    description:
      "A backend-centered project for moving data through reliable API endpoints, validation, persistence, and operational workflows.",
    impact:
      "Planned to show backend fundamentals: clean contracts, predictable data flow, and maintainable service boundaries.",
    role: "Backend engineering, validation, data flow",
    year: "TBD",
    status: "Planned",
    featured: true,
    tags: ["Backend", "REST APIs", "Validation", "Persistence"],
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
  },
  {
    title: "Date Utility Library",
    eyebrow: "Earlier work",
    description:
      "A compact C++ date class for parsing, validating, and manipulating calendar values with a focus on core programming fundamentals.",
    impact: "Practiced API design, edge-case handling, and low-level implementation details.",
    role: "C++ implementation, validation logic",
    year: "2017",
    status: "Archived",
    featured: false,
    tags: ["C++", "OOP", "Algorithms"],
    sourceUrl: "https://github.com/eCabrera07/Date-Class",
  },
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
