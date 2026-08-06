"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Moon,
  Sun,
} from "lucide-react";
import ProjectMockup from "@/components/ProjectMockup";
import type { Locale, Project } from "@/data/projects";

type Theme = "dark" | "light";

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
  },
} as const;

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [locale, setLocale] = useState<Locale>("es");
  const [theme, setTheme] = useState<Theme>("dark");

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
    }, 0);

    return () => window.clearTimeout(restore);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-locale", locale);
    localStorage.setItem("portfolio-theme", theme);
  }, [locale, theme]);

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
          <ProjectMockup
            variant={project.variant}
            locale={locale}
            title={copy.title}
          />
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
