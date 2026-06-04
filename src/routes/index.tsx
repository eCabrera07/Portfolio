import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import heroImage from "@/assets/space-hero.jpg";
import { featuredProjects, profile } from "@/data/projects";
import { useState } from "react";
import { ProjectRow } from "@/components/ProjectRow";
import { useReveal } from "@/hooks/use-reveal";

const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}`;
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  profile.email,
)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} | ${profile.title}` },
      { name: "description", content: profile.bio },
      { property: "og:title", content: `${profile.name} | ${profile.title}` },
      { property: "og:description", content: profile.bio },
    ],
  }),
  component: Portfolio,
});

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


function Portfolio() {
  const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null);
  return (
    <div className="min-h-screen">
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

      <main id="content">
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

        <section className="mx-auto max-w-6xl px-5 py-20 md:px-6">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-stardust">Toolbox</p>
              <h2 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">
                Skills recruiters can scan quickly
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              The portfolio leans into the same stack areas I want hiring teams to remember:
              practical frontend work, API-backed products, database design, and mobile execution.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {profile.skillGroups.map((skill) => (
              <div
                key={skill.label}
                className="rounded-lg border border-border/65 bg-card/40 p-4 backdrop-blur"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {skill.label}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
                  {skill.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-5 py-24 md:px-6">
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-stardust">About</p>
              <h2 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">
                Built for real teams and real users
              </h2>
            </div>
            <div className="space-y-6 text-base leading-8 text-muted-foreground">
              <p>
                I care about the full path from idea to production: shaping the interface, choosing
                practical architecture, designing the data model, and leaving the codebase easier to
                work in than I found it.
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.strengths.map((strength) => (
                  <span
                    key={strength}
                    className="rounded-full border border-border bg-card/45 px-3 py-1 text-sm text-stardust"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-4xl px-5 py-24 text-center md:px-6">
          <p className="text-sm uppercase tracking-[0.28em] text-stardust">Contact</p>
          <h2 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">
            Let&apos;s build something useful
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            {profile.availability}. The fastest way to reach me is email, and you can also review my
            GitHub or LinkedIn.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ResumeLink className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5" />
            <a
              href={mailtoUrl}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background/45 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-stardust hover:text-stardust"
            >
              <Mail className="h-4 w-4" />
              Email me
            </a>
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background/45 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-stardust hover:text-stardust"
            >
              <Mail className="h-4 w-4" />
              Open Gmail
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
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        <p>
          {new Date().getFullYear()} {profile.name}. Built with React, TanStack, and Tailwind.
        </p>
      </footer>
    </div>
  );
}
