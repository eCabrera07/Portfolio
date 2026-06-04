import { ArrowUpRight, CirclePlay, Github } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border/70 bg-card/55 p-6 shadow-card-cosmic backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-stardust/50 hover:bg-card/75 hover:shadow-glow">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-stardust/70 to-transparent opacity-60" />

      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-stardust">{project.eyebrow}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {project.status} / {project.year}
          </p>
        </div>
        <span className="font-mono text-4xl leading-none text-foreground/10 transition-colors group-hover:text-stardust/25">
          {projectNumber}
        </span>
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="text-2xl font-semibold leading-tight text-foreground transition-colors group-hover:text-stardust">
          {project.title}
        </h3>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{project.description}</p>

        <div className="mt-6 rounded-md border border-border/60 bg-background/35 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Evidence</p>
          <p className="mt-2 text-sm leading-6 text-foreground/90">{project.impact}</p>
        </div>

        <p className="mt-5 text-sm text-muted-foreground">
          <span className="text-foreground/90">Role:</span> {project.role}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/70 bg-background/45 px-3 py-1 text-xs text-stardust"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.demoVideoUrl && (
            <a
              href={project.demoVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch demo for ${project.title}`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-background/50 px-3 text-sm font-semibold text-foreground transition-colors hover:border-stardust hover:text-stardust"
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
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-background/50 px-3 text-sm font-semibold text-foreground transition-colors hover:border-stardust hover:text-stardust"
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
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-background/50 px-3 text-sm font-semibold text-foreground transition-colors hover:border-stardust hover:text-stardust"
            >
              <ArrowUpRight className="h-4 w-4" />
              {project.liveLabel ?? "Live"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
