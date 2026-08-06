import { BriefcaseBusiness, CalendarDays } from "lucide-react";
import type { Locale } from "@/data/projects";

type ExperienceProps = Readonly<{ locale: Locale }>;

const copy = {
  es: {
    eyebrow: "Experiencia profesional",
    title: "Experiencia aplicada a procesos y necesidades reales.",
    description:
      "Una trayectoria inicial que combina desarrollo web, Business Intelligence, automatización y soporte tecnológico.",
    current: "Actualidad",
    jobs: [
      {
        company: "ITALSA S.A.",
        role: "Desarrollador Web · Área de Planificación",
        period: "Febrero 2026 — Actualidad",
        summary:
          "Desarrollo soluciones internas y herramientas de información para apoyar procesos operativos, comerciales y de planificación.",
        achievements: [
          "Desarrollo full stack del sistema profesional Fletes Italsa.",
          "Automatización con Excel avanzado y macros VBA.",
          "Desarrollo de scripts, transformaciones y reportes en Qlik Sense.",
          "Análisis y dashboards en Power BI para apoyar decisiones.",
          "Levantamiento de requerimientos y coordinación con usuarios.",
        ],
        tags: ["Laravel", "React", "Qlik Sense", "Power BI", "Excel/VBA"],
      },
      {
        company: "JipazCorp",
        role: "Pasante de Sistemas",
        period: "Octubre 2025 — Enero 2026",
        summary:
          "Apoyo al área de Sistemas en análisis de información, soporte técnico y mantenimiento de infraestructura de usuario.",
        achievements: [
          "Organización y depuración de información para requerimientos internos.",
          "Mantenimiento preventivo y correctivo de equipos.",
          "Instalación de software y configuración de estaciones de trabajo.",
          "Atención de incidencias y soporte técnico a usuarios.",
        ],
        tags: ["Análisis de datos", "Soporte técnico", "Hardware", "Documentación"],
      },
    ],
  },
  en: {
    eyebrow: "Professional experience",
    title: "Experience applied to real processes and business needs.",
    description:
      "An early career combining web development, Business Intelligence, automation and technical support.",
    current: "Present",
    jobs: [
      {
        company: "ITALSA S.A.",
        role: "Web Developer · Planning Area",
        period: "February 2026 — Present",
        summary:
          "I develop internal solutions and information tools that support operational, commercial and planning processes.",
        achievements: [
          "Full-stack development of the professional Fletes Italsa system.",
          "Automation with advanced Excel and VBA macros.",
          "Scripts, transformations and report development in Qlik Sense.",
          "Power BI analysis and dashboards for decision support.",
          "Requirements gathering and coordination with users.",
        ],
        tags: ["Laravel", "React", "Qlik Sense", "Power BI", "Excel/VBA"],
      },
      {
        company: "JipazCorp",
        role: "Systems Intern",
        period: "October 2025 — January 2026",
        summary:
          "Support for the Systems area through information analysis, technical support and end-user infrastructure maintenance.",
        achievements: [
          "Information organization and cleanup for internal requirements.",
          "Preventive and corrective equipment maintenance.",
          "Software installation and workstation configuration.",
          "Incident handling and user technical support.",
        ],
        tags: ["Data analysis", "Technical support", "Hardware", "Documentation"],
      },
    ],
  },
} as const;

export default function ProfessionalExperience({ locale }: ExperienceProps) {
  const content = copy[locale];

  return (
    <section id="experiencia" className="experience-section">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="experience-intro">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-300">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              {content.title}
            </h2>
            <p className="mt-5 max-w-md leading-7 text-slate-400">
              {content.description}
            </p>
            <div className="experience-symbol" aria-hidden="true">
              <BriefcaseBusiness />
            </div>
          </div>

          <div className="experience-timeline">
            {content.jobs.map((job, index) => (
              <article className="experience-item" key={job.company}>
                <div className="experience-dot" aria-hidden="true">
                  <span />
                </div>
                <div className="glass-panel experience-card">
                  <div className="experience-card-header">
                    <div>
                      <p className="experience-company">{job.company}</p>
                      <h3>{job.role}</h3>
                    </div>
                    <span className="experience-period">
                      <CalendarDays className="h-4 w-4" />
                      {job.period}
                    </span>
                  </div>
                  <p className="experience-summary">{job.summary}</p>
                  <ul className="experience-achievements">
                    {job.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                  <div className="experience-tags">
                    {job.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  {index === 0 && (
                    <span className="experience-current">{content.current}</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
