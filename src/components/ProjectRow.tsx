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
                <span className="text-foreground/90 font-medium">Role:</span> {project.role}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground/90 font-medium">Status:</span> {project.status}
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
