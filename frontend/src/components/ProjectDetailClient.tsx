"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";
import ProjectMockup from "@/components/ProjectMockup";
import SystemXRay from "@/components/SystemXRay";
import type { Locale, Project } from "@/data/projects";

type Theme = "dark" | "light";
type ProjectView = "overview" | "engineering";

type ProjectDetailClientProps = Readonly<{ project: Project }>;

const labels = {
  es: {
    back: "Volver al portafolio",
    challenge: "El desafío",
    solution: "La solución",
    role: "Mi participación",
    result: "Resultado",
    highlights: "Funciones principales",
    technologies: "Tecnologías",
    year: "Año",
    project: "Proyecto",
    viewPortfolio: "Regresar a proyectos",
    overview: "Vista del proyecto",
    engineering: "Modo Ingeniería",
    engineeringHint: "Explora arquitectura, flujo de datos y mi participación por capa.",
  },
  en: {
    back: "Back to portfolio",
    challenge: "The challenge",
    solution: "The solution",
    role: "My contribution",
    result: "Outcome",
    highlights: "Key features",
    technologies: "Technologies",
    year: "Year",
    project: "Project",
    viewPortfolio: "Return to projects",
    overview: "Project view",
    engineering: "Engineering Mode",
    engineeringHint: "Explore architecture, data flow and my contribution by layer.",
  },
} as const;

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [locale, setLocale] = useState<Locale>("es");
  const [theme, setTheme] = useState<Theme>("dark");
  const [preferencesReady, setPreferencesReady] = useState(false);
  const [projectView, setProjectView] = useState<ProjectView>("overview");

  useEffect(() => {
    const restore = window.setTimeout(() => {
      const storedLocale = localStorage.getItem("portfolio-locale");
      const storedTheme = localStorage.getItem("portfolio-theme");

      if (storedLocale === "es" || storedLocale === "en") {
        setLocale(storedLocale);
      }
      if (storedTheme === "dark" || storedTheme === "light") {
        setTheme(storedTheme);
      }
      setPreferencesReady(true);
    }, 0);

    return () => window.clearTimeout(restore);
  }, []);

  useEffect(() => {
    if (!preferencesReady) return;

    document.documentElement.lang = locale;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-locale", locale);
    localStorage.setItem("portfolio-theme", theme);
  }, [locale, preferencesReady, theme]);

  const copy = project[locale];
  const ui = labels[locale];

  return (
    <main className="project-detail-page">
      <header className="project-detail-header">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <Link href="/#proyectos" className="project-back-link">
            <ArrowLeft className="h-4 w-4" />
            {ui.back}
          </Link>

          <div className="flex items-center gap-2">
            <div className="language-switch" aria-label="Language">
              <button
                type="button"
                className={`language-switch-button ${
                  locale === "es" ? "language-switch-button-active" : ""
                }`}
                onClick={() => setLocale("es")}
                aria-pressed={locale === "es"}
              >
                ESP
              </button>
              <button
                type="button"
                className={`language-switch-button ${
                  locale === "en" ? "language-switch-button-active" : ""
                }`}
                onClick={() => setLocale("en")}
                aria-pressed={locale === "en"}
              >
                ENG
              </button>
            </div>

            <button
              type="button"
              className="theme-toggle"
              onClick={() =>
                setTheme((current) => (current === "dark" ? "light" : "dark"))
              }
              aria-label={theme === "dark" ? "Light theme" : "Dark theme"}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      <section className="project-detail-hero">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
          <div>
            <div className="project-detail-badges">
              <span>{copy.category}</span>
              <span>{project.year}</span>
            </div>
            <h1>{copy.title}</h1>
            <p>{copy.summary}</p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div
                className="inline-flex self-start rounded-full border border-white/10 bg-white/[0.035] p-1"
                aria-label={locale === "es" ? "Vista del proyecto" : "Project view"}
              >
                <button
                  type="button"
                  onClick={() => setProjectView("overview")}
                  aria-pressed={projectView === "overview"}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition ${
                    projectView === "overview"
                      ? "bg-sky-400/15 text-sky-200 shadow-[0_0_0_1px_rgba(56,189,248,0.18)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Monitor className="h-4 w-4" />
                  {ui.overview}
                </button>
                <button
                  type="button"
                  onClick={() => setProjectView("engineering")}
                  aria-pressed={projectView === "engineering"}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition ${
                    projectView === "engineering"
                      ? "bg-indigo-400/15 text-indigo-200 shadow-[0_0_0_1px_rgba(129,140,248,0.2)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Cpu className="h-4 w-4" />
                  {ui.engineering}
                </button>
              </div>

              {projectView === "engineering" && (
                <p className="max-w-xs text-xs leading-5 text-slate-500">
                  {ui.engineeringHint}
                </p>
              )}
            </div>

            {projectView === "overview" ? (
              <ProjectMockup
                variant={project.variant}
                locale={locale}
                title={copy.title}
              />
            ) : (
              <SystemXRay project={project} locale={locale} />
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1fr_20rem] lg:px-8">
        <div className="project-detail-sections">
          {[
            [ui.challenge, copy.challenge],
            [ui.solution, copy.solution],
            [ui.role, copy.role],
            [ui.result, copy.result],
          ].map(([title, text]) => (
            <article className="glass-panel project-detail-section" key={title}>
              <span />
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}

          <article className="glass-panel project-detail-section">
            <span />
            <h2>{ui.highlights}</h2>
            <ul className="project-detail-highlights">
              {copy.highlights.map((item) => (
                <li key={item}>
                  <CheckCircle2 className="h-5 w-5" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <aside className="project-detail-aside">
          <div className="glass-panel project-detail-summary-card">
            <p>{ui.project}</p>
            <strong>{copy.title}</strong>
            <div>
              <span>{ui.year}</span>
              <b>{project.year}</b>
            </div>
            <div className="project-detail-tech">
              <span>{ui.technologies}</span>
              {project.stack.map((technology) => (
                <b key={technology}>{technology}</b>
              ))}
            </div>
          </div>
          <Link href="/#proyectos" className="project-return-button">
            <ArrowLeft className="h-4 w-4" />
            {ui.viewPortfolio}
          </Link>
        </aside>
      </section>
    </main>
  );
}
