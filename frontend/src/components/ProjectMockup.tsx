import type { Locale, ProjectVariant } from "@/data/projects";

type ProjectMockupProps = Readonly<{
  variant: ProjectVariant;
  locale: Locale;
  title: string;
  compact?: boolean;
}>;

const mockContent = {
  logistics: {
    es: ["Operación", "Viajes", "Eficiencia", "Despachos"],
    en: ["Operations", "Trips", "Efficiency", "Dispatches"],
  },
  emergency: {
    es: ["Emergencias", "Solicitudes", "Estado", "Atención"],
    en: ["Emergencies", "Requests", "Status", "Response"],
  },
  agriculture: {
    es: ["AgroEnlace", "Incidencias", "Activos", "Seguimiento"],
    en: ["AgroEnlace", "Incidents", "Assets", "Tracking"],
  },
  healthcare: {
    es: ["Clínica", "Pacientes", "Citas", "Historiales"],
    en: ["Clinic", "Patients", "Appointments", "Records"],
  },
  analytics: {
    es: ["Analítica", "Indicadores", "Predicción", "Resultados"],
    en: ["Analytics", "Metrics", "Prediction", "Results"],
  },
  library: {
    es: ["Biblioteca", "Catálogo", "Miembros", "Préstamos"],
    en: ["Library", "Catalog", "Members", "Loans"],
  },
} as const;

export default function ProjectMockup({
  variant,
  locale,
  title,
  compact = false,
}: ProjectMockupProps) {
  const labels = mockContent[variant][locale];

  return (
    <div
      className={`project-mockup project-mockup-${variant} ${
        compact ? "project-mockup-compact" : ""
      }`}
      aria-label={`${title} visual mockup`}
      role="img"
    >
      <div className="project-mockup-browser">
        <div className="project-mockup-toolbar">
          <span />
          <span />
          <span />
          <div>{title}</div>
        </div>
        <div className="project-mockup-body">
          <aside className="project-mockup-sidebar">
            <strong>{labels[0]}</strong>
            <i />
            <i />
            <i />
            <i />
          </aside>
          <div className="project-mockup-main">
            <div className="project-mockup-heading">
              <div>
                <small>{labels[1]}</small>
                <strong>{labels[0]}</strong>
              </div>
              <span>{labels[3]}</span>
            </div>
            <div className="project-mockup-metrics">
              <div>
                <small>{labels[1]}</small>
                <strong>24</strong>
              </div>
              <div>
                <small>{labels[2]}</small>
                <strong>92%</strong>
              </div>
              <div>
                <small>{labels[3]}</small>
                <strong>08</strong>
              </div>
            </div>
            <div className="project-mockup-chart">
              {[44, 68, 54, 82, 64, 92, 76, 88].map((height, index) => (
                <span key={`${height}-${index}`} style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="project-mockup-list">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
