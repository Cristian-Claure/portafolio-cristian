import type { Locale, ProjectVariant } from "@/data/projects";

type ProjectMockupProps = Readonly<{
  variant: ProjectVariant;
  locale: Locale;
  title: string;
  compact?: boolean;
}>;

type Copy = {
  eyebrow: string;
  primary: string;
  secondary: string;
  tertiary: string;
  architecture: readonly string[];
};

const content: Record<ProjectVariant, Record<Locale, Copy>> = {
  logistics: {
    es: {
      eyebrow: "Operación logística",
      primary: "Viajes activos",
      secondary: "Capacidad",
      tertiary: "Pedidos",
      architecture: ["React", "Laravel API", "MySQL"],
    },
    en: {
      eyebrow: "Logistics operation",
      primary: "Active trips",
      secondary: "Capacity",
      tertiary: "Orders",
      architecture: ["React", "Laravel API", "MySQL"],
    },
  },
  emergency: {
    es: {
      eyebrow: "Centro de atención",
      primary: "Incidentes",
      secondary: "Prioridad",
      tertiary: "Respuesta",
      architecture: ["Next.js", "FastAPI", "SQLite + IA"],
    },
    en: {
      eyebrow: "Response center",
      primary: "Incidents",
      secondary: "Priority",
      tertiary: "Response",
      architecture: ["Next.js", "FastAPI", "SQLite + AI"],
    },
  },
  agriculture: {
    es: {
      eyebrow: "Monitoreo agropecuario",
      primary: "Parcelas",
      secondary: "Incidencias",
      tertiary: "Tiempo real",
      architecture: ["React", "Flask + Socket.IO", "PostgreSQL"],
    },
    en: {
      eyebrow: "Agricultural monitoring",
      primary: "Plots",
      secondary: "Incidents",
      tertiary: "Real time",
      architecture: ["React", "Flask + Socket.IO", "PostgreSQL"],
    },
  },
  healthcare: {
    es: {
      eyebrow: "Gestión clínica",
      primary: "Pacientes",
      secondary: "Citas",
      tertiary: "Historias",
      architecture: ["React", "Spring Boot", "PostgreSQL"],
    },
    en: {
      eyebrow: "Clinical management",
      primary: "Patients",
      secondary: "Appointments",
      tertiary: "Records",
      architecture: ["React", "Spring Boot", "PostgreSQL"],
    },
  },
  analytics: {
    es: {
      eyebrow: "Analítica académica",
      primary: "Predicción",
      secondary: "Modelo",
      tertiary: "Indicadores",
      architecture: ["Django / Flask", "Machine Learning", "PostgreSQL"],
    },
    en: {
      eyebrow: "Academic analytics",
      primary: "Prediction",
      secondary: "Model",
      tertiary: "Metrics",
      architecture: ["Django / Flask", "Machine Learning", "PostgreSQL"],
    },
  },
  library: {
    es: {
      eyebrow: "Biblioteca digital",
      primary: "Catálogo",
      secondary: "Préstamos",
      tertiary: "Miembros",
      architecture: ["Angular", "Node.js", "PostgreSQL"],
    },
    en: {
      eyebrow: "Digital library",
      primary: "Catalog",
      secondary: "Loans",
      tertiary: "Members",
      architecture: ["Angular", "Node.js", "PostgreSQL"],
    },
  },
};

function Architecture({ items }: Readonly<{ items: readonly string[] }>) {
  return (
    <div className="project-mock-v9-architecture" aria-label="Project architecture">
      {items.map((item, index) => (
        <div className="project-mock-v9-architecture-item" key={item}>
          <span>{item}</span>
          {index < items.length - 1 && <i aria-hidden="true">→</i>}
        </div>
      ))}
    </div>
  );
}

function LogisticsVisual({ copy }: Readonly<{ copy: Copy }>) {
  return (
    <div className="project-mock-v9-scene logistics-scene">
      <div className="logistics-route">
        <span className="route-line" />
        <b className="route-node route-node-a">A</b>
        <b className="route-node route-node-b">B</b>
        <b className="route-node route-node-c">C</b>
      </div>
      <div className="logistics-summary">
        <div><small>{copy.primary}</small><strong>18</strong></div>
        <div><small>{copy.secondary}</small><strong>84%</strong></div>
        <div><small>{copy.tertiary}</small><strong>126</strong></div>
      </div>
      <div className="logistics-table">
        <span><i />TR-2408 <b>SCZ → LPB</b></span>
        <span><i />TR-2411 <b>SCZ → CBB</b></span>
        <span><i />TR-2415 <b>SCZ → TJA</b></span>
      </div>
    </div>
  );
}

function EmergencyVisual({ copy }: Readonly<{ copy: Copy }>) {
  return (
    <div className="project-mock-v9-scene emergency-scene">
      <div className="emergency-map">
        <span className="map-grid" />
        <b className="map-pin pin-one" />
        <b className="map-pin pin-two" />
        <b className="map-pin pin-three" />
      </div>
      <div className="emergency-cards">
        <div><small>{copy.primary}</small><strong>07</strong></div>
        <div className="priority-card"><small>{copy.secondary}</small><strong>Alta</strong></div>
        <div><small>{copy.tertiary}</small><strong>08m</strong></div>
      </div>
      <div className="emergency-flow"><span>Reportado</span><i /><span>Asignado</span><i /><span>Atendido</span></div>
    </div>
  );
}

function AgricultureVisual({ copy }: Readonly<{ copy: Copy }>) {
  return (
    <div className="project-mock-v9-scene agriculture-scene">
      <div className="field-grid">
        {[1,2,3,4,5,6].map((item) => <span key={item} className={`field field-${item}`} />)}
      </div>
      <div className="agriculture-panel">
        <div><small>{copy.primary}</small><strong>12</strong></div>
        <div><small>{copy.secondary}</small><strong>03</strong></div>
        <div><small>{copy.tertiary}</small><strong>Live</strong></div>
      </div>
      <div className="realtime-feed"><span><i />Riego sector norte</span><span><i />Incidencia resuelta</span></div>
    </div>
  );
}

function HealthcareVisual({ copy }: Readonly<{ copy: Copy }>) {
  return (
    <div className="project-mock-v9-scene healthcare-scene">
      <div className="clinic-calendar">
        <div className="calendar-head"><span>08:00</span><span>10:00</span><span>12:00</span></div>
        <div className="calendar-grid"><i/><i/><i/><i/><i/><i/></div>
      </div>
      <div className="clinic-summary">
        <div><small>{copy.primary}</small><strong>32</strong></div>
        <div><small>{copy.secondary}</small><strong>11</strong></div>
        <div><small>{copy.tertiary}</small><strong>24</strong></div>
      </div>
      <div className="patient-row"><span>CP</span><b>Paciente programado</b><i>10:30</i></div>
    </div>
  );
}

function AnalyticsVisual({ copy }: Readonly<{ copy: Copy }>) {
  return (
    <div className="project-mock-v9-scene analytics-scene">
      <div className="analytics-top">
        <div className="prediction-ring"><strong>87%</strong><span>{copy.primary}</span></div>
        <div className="model-card"><small>{copy.secondary}</small><strong>Random Forest</strong><span>F1 · 0.91</span></div>
      </div>
      <div className="analytics-chart">
        {[34,48,42,64,61,78,73,89].map((height, index) => <span key={`${height}-${index}`} style={{height:`${height}%`}} />)}
      </div>
      <div className="analytics-footer"><small>{copy.tertiary}</small><b>Asistencia</b><b>Notas</b><b>Participación</b></div>
    </div>
  );
}

function LibraryVisual({ copy }: Readonly<{ copy: Copy }>) {
  return (
    <div className="project-mock-v9-scene library-scene">
      <div className="bookshelf">
        {[18,28,22,34,25,30,19,32,24].map((height, index) => <span key={`${height}-${index}`} style={{height:`${height}px`}} />)}
      </div>
      <div className="library-summary">
        <div><small>{copy.primary}</small><strong>1.248</strong></div>
        <div><small>{copy.secondary}</small><strong>43</strong></div>
        <div><small>{copy.tertiary}</small><strong>318</strong></div>
      </div>
      <div className="loan-list"><span>Clean Code <b>Activo</b></span><span>Design Patterns <b>Devuelto</b></span></div>
    </div>
  );
}

function VariantVisual({ variant, copy }: Readonly<{ variant: ProjectVariant; copy: Copy }>) {
  if (variant === "logistics") return <LogisticsVisual copy={copy} />;
  if (variant === "emergency") return <EmergencyVisual copy={copy} />;
  if (variant === "agriculture") return <AgricultureVisual copy={copy} />;
  if (variant === "healthcare") return <HealthcareVisual copy={copy} />;
  if (variant === "analytics") return <AnalyticsVisual copy={copy} />;
  return <LibraryVisual copy={copy} />;
}

export default function ProjectMockup({ variant, locale, title, compact = false }: ProjectMockupProps) {
  const copy = content[variant][locale];
  return (
    <div className={`project-mockup project-mockup-${variant} project-mock-v9 ${compact ? "project-mockup-compact" : ""}`} role="img" aria-label={`${title} conceptual interface mockup`}>
      <div className="project-mock-v9-browser">
        <div className="project-mock-v9-toolbar">
          <div className="project-mock-v9-dots"><span/><span/><span/></div>
          <strong>{title}</strong>
          <em>{locale === "es" ? "Mock conceptual" : "Concept mock"}</em>
        </div>
        <div className="project-mock-v9-header">
          <div><small>{copy.eyebrow}</small><strong>{title}</strong></div>
          <span>{locale === "es" ? "Vista de sistema" : "System view"}</span>
        </div>
        <VariantVisual variant={variant} copy={copy} />
        <Architecture items={copy.architecture} />
      </div>
    </div>
  );
}
