import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import heroImage from "@/assets/space-hero.jpg";
import { featuredProjects, profile } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

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

function Portfolio() {
  return (
    <div className="min-h-screen">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/35 bg-background/45 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-6">
          <a href="#top" className="font-semibold tracking-tight text-foreground">
            {profile.shortName}
          </a>
          <div className="flex gap-5 text-sm text-muted-foreground md:gap-7">
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
        </div>
      </nav>

      <main id="content">
        <header id="top" className="relative overflow-hidden">
          <img
            src={heroImage}
            alt=""
            width={1920}
            height={1080}
            className="absolute inset-x-0 top-0 h-[130%] w-full object-cover opacity-30 [mask-image:linear-gradient(to_bottom,black_0%,black_42%,transparent_100%)]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,oklch(0.36_0.14_260_/_0.28),transparent_58%)]" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent via-background/75 to-background" />

          <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-32 md:px-6 md:pb-24 md:pt-40">
            <div className="max-w-4xl">
              <p className="mb-5 text-sm uppercase tracking-[0.28em] text-stardust">
                {profile.title} at {profile.company}
              </p>
              <h1 className="text-5xl font-bold leading-tight text-foreground md:text-7xl">
                {profile.headline}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                {profile.bio} I like the parts of software where product behavior, API contracts,
                and data models all have to line up.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  View work
                  <ArrowDown className="h-4 w-4" />
                </a>
                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-background/45 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-stardust hover:text-stardust"
                >
                  <Mail className="h-4 w-4" />
                  Email me
                </a>
              </div>
            </div>

            <div className="mt-16 grid gap-3 sm:grid-cols-3">
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border/65 bg-card/40 p-4 backdrop-blur"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section id="projects" className="relative mx-auto max-w-6xl px-5 pb-24 pt-8 md:px-6">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-stardust">Selected work</p>
              <h2 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">
                Projects in progress
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              These are the tracks I plan to build and highlight next. Each one is chosen to show
              full-stack delivery, database thinking, and practical engineering judgment.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
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
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
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
          {new Date().getFullYear()} {profile.name}. Built with React and a little stardust.
        </p>
      </footer>
    </div>
  );
}
