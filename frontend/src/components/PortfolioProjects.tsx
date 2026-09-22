import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectMockup from "@/components/ProjectMockup";
import { projectCatalog, type Locale } from "@/data/projects";

type PortfolioProjectsProps = Readonly<{ locale: Locale }>;

const sectionCopy = {
  es: {
    eyebrow: "Proyectos",
    title: "Soluciones construidas alrededor de problemas reales.",
    description:
      "Cada proyecto cuenta con una presentación individual de su contexto, mi participación, la solución propuesta y las tecnologías aplicadas.",
    professional: "Experiencia profesional",
    detail: "Ver caso de estudio",
  },
  en: {
    eyebrow: "Projects",
    title: "Solutions built around real problems.",
    description:
      "Each project has an individual presentation covering its context, my contribution, the proposed solution and the technologies applied.",
    professional: "Professional experience",
    detail: "View case study",
  },
} as const;

export default function PortfolioProjects({ locale }: PortfolioProjectsProps) {
  const copy = sectionCopy[locale];

  return (
    <section id="proyectos" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-300">
            {copy.eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            {copy.title}
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-500">
          {copy.description}
        </p>
      </div>

      <div className="project-showcase-grid">
        {projectCatalog.map((project, index) => {
          const content = project[locale];
          return (
            <article
              key={project.slug}
              className={`glass-panel project-showcase-card ${
                project.featured ? "project-showcase-featured" : ""
              } ${index === 0 || project.wide ? "project-showcase-primary" : ""}`}
            >
              <ProjectMockup
                variant={project.variant}
                locale={locale}
                title={content.title}
                compact={!project.featured}
              />
              <div className="project-showcase-content">
                <div className="project-showcase-meta">
                  <span>{project.year}</span>
                  <span>{content.category}</span>
                </div>
                <h3>{content.title}</h3>
                <p>{content.summary}</p>
                <div className="project-showcase-stack">
                  {project.stack.slice(0, project.featured ? 5 : 4).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <Link
                  href={`/proyectos/${project.slug}`}
                  className="project-detail-link"
                  aria-label={`${copy.detail}: ${content.title}`}
                >
                  {copy.detail}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
