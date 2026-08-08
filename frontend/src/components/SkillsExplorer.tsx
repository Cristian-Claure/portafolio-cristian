"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  Braces,
  CheckCircle2,
  Code2,
  Database,
  ServerCog,
  Sparkles,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type Locale = "es" | "en";

type SkillLevel =
  | "Uso frecuente"
  | "Aplicado en proyectos"
  | "En consolidación"
  | "Formación académica";

type Skill = {
  name: string;
  level: SkillLevel;
  projects: string[];
};

type SkillCategory = {
  id: string;
  titleEs: string;
  titleEn: string;
  shortEs: string;
  shortEn: string;
  descriptionEs: string;
  descriptionEn: string;
  focusEs: string;
  focusEn: string;
  icon: LucideIcon;
  accent: string;
  skills: Skill[];
};

const levelStrength: Record<SkillLevel, number> = {
  "Uso frecuente": 4,
  "Aplicado en proyectos": 3,
  "En consolidación": 2,
  "Formación académica": 1,
};

const skillTranslations: Record<string, string> = {
  "Diseño responsive": "Responsive design",
  "Modelado relacional": "Relational modeling",
  "Migraciones": "Migrations",
  "Excel avanzado": "Advanced Excel",
  "Diseño de KPI": "KPI design",
  "Historias de usuario": "User stories",
  "Casos de uso": "Use cases",
  "Levantamiento de requisitos": "Requirements gathering",
  "Modelado de procesos": "Process modeling",
  "Documentación técnica": "Technical documentation",
};

const projectTranslations: Record<string, string> = {
  "Aula Inteligente": "Smart Classroom",
  "Biblioteca Alejandría": "Alexandria Library",
  "ITALSA S.A.": "ITALSA S.A.",
  "Aplicaciones web": "Web applications",
  "Dashboards": "Dashboards",
  "Sistemas web": "Web systems",
  "Proyectos web": "Web projects",
  "Análisis de datos": "Data analytics",
  "Frontend web": "Web frontend",
  "Sistemas académicos": "Academic systems",
  "Business Intelligence": "Business Intelligence",
  "Data Warehouse": "Data Warehouse",
  "Prácticas académicas": "Academic practice",
  "Sistemas empresariales": "Business systems",
  "Carga y transformación de datos": "Data loading and transformation",
  "Análisis y visualización": "Analytics and visualization",
  "Medidas e indicadores": "Measures and indicators",
  "Análisis": "Analytics",
  "Automatización": "Automation",
  "Proyecciones": "Forecasting",
  "Integración de datos": "Data integration",
  "Proyectos académicos": "Academic projects",
  "Proyectos universitarios": "University projects",
  "Repositorios y colaboración": "Repositories and collaboration",
  "Pruebas de APIs": "API testing",
  "Desarrollo diario": "Daily development",
  "Automatización y entornos locales": "Automation and local environments",
  "Contenedores y despliegue": "Containers and deployment",
  "Planificación funcional": "Functional planning",
  "Análisis de sistemas": "Systems analysis",
  "Modelado de software": "Software modeling",
  "Modelado de procesos": "Process modeling",
  "Análisis funcional": "Functional analysis",
  "Todos los proyectos": "All projects",
};

const categories: SkillCategory[] = [
  {
    id: "frontend",
    titleEs: "Desarrollo frontend",
    titleEn: "Frontend development",
    shortEs: "Frontend",
    shortEn: "Frontend",
    descriptionEs:
      "Interfaces web modernas, adaptables y orientadas a una experiencia de usuario clara.",
    descriptionEn:
      "Modern, responsive web interfaces focused on a clear user experience.",
    focusEs: "Interfaces, componentes y experiencia de usuario",
    focusEn: "Interfaces, components and user experience",
    icon: Code2,
    accent: "from-sky-400/20 via-cyan-400/10 to-transparent",
    skills: [
      {
        name: "React",
        level: "Uso frecuente",
        projects: ["Portafolio","Fletes Italsa","AgroEnlace","Horus"],
      },
      {
        name: "Next.js",
        level: "Aplicado en proyectos",
        projects: ["Auxilio.AI", "Portafolio"],
      },
      {
        name: "TypeScript",
        level: "Uso frecuente",
        projects: ["Portafolio","Auxilio.AI","Fletes Italsa","Horus"],
      },
      {
        name: "JavaScript",
        level: "Uso frecuente",
        projects: ["Aplicaciones web", "Dashboards"],
      },
      {
        name: "Tailwind CSS",
        level: "Aplicado en proyectos",
        projects: ["Portafolio", "Auxilio.AI"],
      },
      {
        name: "Material UI",
        level: "Aplicado en proyectos",
        projects: ["Fletes Italsa"],
      },
      {
        name: "Angular",
        level: "Formación académica",
        projects: ["Biblioteca Alejandría"],
      },
      {
        name: "Diseño responsive",
        level: "Uso frecuente",
        projects: ["Portafolio", "Sistemas web"],
      },
    ],
  },
  {
    id: "backend",
    titleEs: "Desarrollo backend",
    titleEn: "Backend development",
    shortEs: "Backend",
    shortEn: "Backend",
    descriptionEs:
      "APIs, reglas de negocio, autenticación e integración entre aplicaciones y bases de datos.",
    descriptionEn:
      "APIs, business rules, authentication and integration between applications and databases.",
    focusEs: "APIs, servicios y lógica de negocio",
    focusEn: "APIs, services and business logic",
    icon: ServerCog,
    accent: "from-indigo-400/20 via-violet-400/10 to-transparent",
    skills: [
      {
        name: "Laravel",
        level: "Aplicado en proyectos",
        projects: ["Portafolio","Fletes Italsa"],
      },
      {
        name: "PHP",
        level: "En consolidación",
        projects: ["Portafolio","Fletes Italsa"],
      },
      {
        name: "Python",
        level: "Uso frecuente",
        projects: ["Auxilio.AI","AgroEnlace","Aula Inteligente"],
      },
      {
        name: "Flask",
        level: "Aplicado en proyectos",
        projects: ["AgroEnlace","Aula Inteligente"],
      },
      {
        name: "FastAPI",
        level: "Aplicado en proyectos",
        projects: ["Auxilio.AI"],
      },
      {
        name: "Socket.IO",
        level: "Aplicado en proyectos",
        projects: ["AgroEnlace"],
      },
      {
        name: "Django",
        level: "Uso frecuente",
        projects: ["Aula Inteligente","Proyectos universitarios"],
      },
      {
        name: "Node.js",
        level: "Aplicado en proyectos",
        projects: ["Biblioteca Alejandría"],
      },
      {
        name: "Spring Boot",
        level: "Formación académica",
        projects: ["Horus"],
      },
      {
        name: "API REST",
        level: "Uso frecuente",
        projects: ["Portafolio","Fletes Italsa","Auxilio.AI","AgroEnlace"],
      },
    ],
  },
  {
    id: "languages",
    titleEs: "Lenguajes de programación",
    titleEn: "Programming languages",
    shortEs: "Lenguajes",
    shortEn: "Languages",
    descriptionEs:
      "Lenguajes utilizados para construir aplicaciones, automatizar procesos y consultar información.",
    descriptionEn:
      "Languages used to build applications, automate processes and query information.",
    focusEs: "Programación, automatización y consultas",
    focusEn: "Programming, automation and querying",
    icon: Braces,
    accent: "from-fuchsia-400/20 via-purple-400/10 to-transparent",
    skills: [
      {
        name: "TypeScript",
        level: "Uso frecuente",
        projects: ["Portafolio","Auxilio.AI","Fletes Italsa","Horus"],
      },
      {
        name: "JavaScript",
        level: "Uso frecuente",
        projects: ["Frontend web", "Node.js"],
      },
      {
        name: "Python",
        level: "Uso frecuente",
        projects: ["Auxilio.AI","AgroEnlace","Aula Inteligente"],
      },
      {
        name: "PHP",
        level: "En consolidación",
        projects: ["Portafolio","Fletes Italsa"],
      },
      {
        name: "Java",
        level: "Formación académica",
        projects: ["Horus"],
      },
      {
        name: "SQL",
        level: "Uso frecuente",
        projects: ["PostgreSQL", "SQL Server", "BI"],
      },
    ],
  },
  {
    id: "databases",
    titleEs: "Bases de datos",
    titleEn: "Databases",
    shortEs: "Bases de datos",
    shortEn: "Databases",
    descriptionEs:
      "Diseño, consultas, relaciones, migraciones y persistencia de datos en distintos motores.",
    descriptionEn:
      "Design, querying, relationships, migrations and data persistence across different engines.",
    focusEs: "Modelado, integridad y explotación de datos",
    focusEn: "Modeling, integrity and data usage",
    icon: Database,
    accent: "from-emerald-400/20 via-teal-400/10 to-transparent",
    skills: [
      {
        name: "PostgreSQL",
        level: "Uso frecuente",
        projects: ["Portafolio","AgroEnlace","Horus","Aula Inteligente","Biblioteca Alejandría"],
      },
      {
        name: "SQL Server",
        level: "Aplicado en proyectos",
        projects: ["Business Intelligence", "Data Warehouse"],
      },
      {
        name: "MySQL",
        level: "Aplicado en proyectos",
        projects: ["Fletes Italsa"],
      },
      {
        name: "SQLite",
        level: "Aplicado en proyectos",
        projects: ["Auxilio.AI"],
      },
      {
        name: "Supabase",
        level: "En consolidación",
        projects: ["Prácticas académicas"],
      },
      {
        name: "Modelado relacional",
        level: "Uso frecuente",
        projects: ["APIs", "Sistemas empresariales"],
      },
      {
        name: "Migraciones",
        level: "Aplicado en proyectos",
        projects: ["Laravel", "Flask"],
      },
    ],
  },
  {
    id: "data-bi",
    titleEs: "Datos y Business Intelligence",
    titleEn: "Data and Business Intelligence",
    shortEs: "Datos y BI",
    shortEn: "Data and BI",
    descriptionEs:
      "Transformación de datos en indicadores, análisis y visualizaciones útiles para la toma de decisiones.",
    descriptionEn:
      "Transforming data into indicators, analysis and useful visualizations for decision-making.",
    focusEs: "Análisis, indicadores y toma de decisiones",
    focusEn: "Analytics, indicators and decision-making",
    icon: BarChart3,
    accent: "from-amber-400/20 via-orange-400/10 to-transparent",
    skills: [
      {
        name: "Qlik Sense",
        level: "Uso frecuente",
        projects: ["ITALSA S.A.","Dashboards empresariales"],
      },
      {
        name: "Qlik Script",
        level: "Aplicado en proyectos",
        projects: ["ITALSA S.A.","Carga y transformación de datos"],
      },
      {
        name: "Power BI",
        level: "Aplicado en proyectos",
        projects: ["ITALSA S.A.","Análisis y visualización"],
      },
      {
        name: "DAX",
        level: "Aplicado en proyectos",
        projects: ["Medidas e indicadores"],
      },
      {
        name: "Machine Learning",
        level: "Aplicado en proyectos",
        projects: ["Aula Inteligente"],
      },
      {
        name: "Excel avanzado",
        level: "Uso frecuente",
        projects: ["ITALSA S.A.","Fletes Italsa","Automatización","Proyecciones"],
      },
      {
        name: "ETL",
        level: "Aplicado en proyectos",
        projects: ["Data Warehouse", "Integración de datos"],
      },
      {
        name: "Data Warehouse",
        level: "En consolidación",
        projects: ["Proyectos académicos"],
      },
      {
        name: "Diseño de KPI",
        level: "Aplicado en proyectos",
        projects: ["ITALSA S.A.","Dashboards empresariales"],
      },
    ],
  },
  {
    id: "tools",
    titleEs: "Herramientas de desarrollo",
    titleEn: "Development tools",
    shortEs: "Herramientas",
    shortEn: "Tools",
    descriptionEs:
      "Herramientas para desarrollar, probar, documentar, versionar y ejecutar aplicaciones.",
    descriptionEn:
      "Tools for developing, testing, documenting, versioning and running applications.",
    focusEs: "Productividad, pruebas y control de versiones",
    focusEn: "Productivity, testing and version control",
    icon: Wrench,
    accent: "from-rose-400/20 via-pink-400/10 to-transparent",
    skills: [
      {
        name: "Git",
        level: "Uso frecuente",
        projects: ["Todos los proyectos"],
      },
      {
        name: "GitHub",
        level: "Uso frecuente",
        projects: ["Repositorios y colaboración"],
      },
      {
        name: "Postman",
        level: "Uso frecuente",
        projects: ["Pruebas de APIs"],
      },
      {
        name: "Visual Studio Code",
        level: "Uso frecuente",
        projects: ["Desarrollo diario"],
      },
      {
        name: "PowerShell",
        level: "Uso frecuente",
        projects: ["Automatización y entornos locales"],
      },
      {
        name: "Docker",
        level: "En consolidación",
        projects: ["Contenedores y despliegue"],
      },
      {
        name: "Railway",
        level: "Aplicado en proyectos",
        projects: ["Portafolio"],
      },
      {
        name: "pgAdmin",
        level: "Aplicado en proyectos",
        projects: ["PostgreSQL"],
      },
      {
        name: "Vite",
        level: "Aplicado en proyectos",
        projects: ["AgroEnlace"],
      },
    ],
  },
  {
    id: "engineering",
    titleEs: "Ingeniería de software y sistemas",
    titleEn: "Software and systems engineering",
    shortEs: "Metodologías",
    shortEn: "Methods",
    descriptionEs:
      "Análisis, planificación y documentación para construir soluciones alineadas con las necesidades del usuario.",
    descriptionEn:
      "Analysis, planning and documentation for building solutions aligned with user needs.",
    focusEs: "Requisitos, procesos y organización del desarrollo",
    focusEn: "Requirements, processes and development organization",
    icon: Workflow,
    accent: "from-cyan-400/20 via-blue-400/10 to-transparent",
    skills: [
      {
        name: "Scrum",
        level: "Aplicado en proyectos",
        projects: ["Proyectos universitarios"],
      },
      {
        name: "Historias de usuario",
        level: "Uso frecuente",
        projects: ["Planificación funcional"],
      },
      {
        name: "Casos de uso",
        level: "Uso frecuente",
        projects: ["Fletes Italsa","Biblioteca Alejandría","Horus"],
      },
      {
        name: "UML",
        level: "Aplicado en proyectos",
        projects: ["Horus","Biblioteca Alejandría"],
      },
      {
        name: "BPMN",
        level: "En consolidación",
        projects: ["Modelado de procesos"],
      },
      {
        name: "Levantamiento de requisitos",
        level: "Aplicado en proyectos",
        projects: ["Fletes Italsa","Sistemas empresariales"],
      },
      {
        name: "Modelado de procesos",
        level: "Aplicado en proyectos",
        projects: ["Análisis funcional"],
      },
      {
        name: "Documentación técnica",
        level: "Uso frecuente",
        projects: ["Fletes Italsa","AgroEnlace","Auxilio.AI","Proyectos académicos"],
      },
    ],
  },
];

const ui = {
  es: {
    badge: "Ecosistema técnico",
    eyebrow: "Habilidades y conocimientos",
    title: "Un perfil que conecta software, datos y procesos.",
    description:
      "Explora cada área para conocer las tecnologías, herramientas y metodologías que he aplicado en proyectos reales y académicos.",
    areas: "Áreas profesionales",
    skills: "Capacidades técnicas",
    applied: "Experiencia aplicada",
    noPercentages: "Sin porcentajes arbitrarios",
    capabilities: "capacidades",
    abilities: "habilidades",
    appliedIn: "Aplicado en",
    note:
      "Los niveles representan frecuencia de uso y aplicación en proyectos, no porcentajes subjetivos de dominio.",
    tabLabel: "Categorías de habilidades",
  },
  en: {
    badge: "Technical ecosystem",
    eyebrow: "Skills and knowledge",
    title: "A profile connecting software, data and processes.",
    description:
      "Explore each area to see the technologies, tools and methods I have applied in real and academic projects.",
    areas: "Professional areas",
    skills: "Technical capabilities",
    applied: "Applied experience",
    noPercentages: "No arbitrary percentages",
    capabilities: "capabilities",
    abilities: "skills",
    appliedIn: "Applied in",
    note:
      "Levels represent frequency of use and application in projects, not subjective proficiency percentages.",
    tabLabel: "Skill categories",
  },
} as const;

const levelLabels = {
  es: {
    "Uso frecuente": "Uso frecuente",
    "Aplicado en proyectos": "Aplicado en proyectos",
    "En consolidación": "En consolidación",
    "Formación académica": "Formación académica",
  },
  en: {
    "Uso frecuente": "Frequent use",
    "Aplicado en proyectos": "Applied in projects",
    "En consolidación": "In progress",
    "Formación académica": "Academic training",
  },
} as const;

function translateSkillName(
  name: string,
  locale: Locale
) {
  if (locale === "es") {
    return name;
  }

  return skillTranslations[name] ?? name;
}

function translateProjectName(
  name: string,
  locale: Locale
) {
  if (locale === "es") {
    return name;
  }

  return projectTranslations[name] ?? name;
}

function LevelIndicator({
  level,
  locale,
}: Readonly<{
  level: SkillLevel;
  locale: Locale;
}>) {
  const strength = levelStrength[level];

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${levelLabels[locale][level]}`}
      title={levelLabels[locale][level]}
    >
      {[1, 2, 3, 4].map((segment) => (
        <span
          key={segment}
          className={`h-1.5 w-5 rounded-full transition ${
            segment <= strength
              ? "bg-sky-300"
              : "bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}

export default function SkillsExplorer({
  locale,
}: Readonly<{
  locale: Locale;
}>) {
  const [activeId, setActiveId] = useState(
    categories[0].id
  );

  const copy = ui[locale];

  const activeCategory = useMemo(
    () =>
      categories.find(
        (category) => category.id === activeId
      ) ?? categories[0],
    [activeId]
  );

  const totalSkills = useMemo(
    () =>
      new Set(
        categories.flatMap((category) =>
          category.skills.map((skill) => skill.name)
        )
      ).size,
    []
  );

  const ActiveIcon = activeCategory.icon;

  const activeTitle =
    locale === "es"
      ? activeCategory.titleEs
      : activeCategory.titleEn;

  const activeDescription =
    locale === "es"
      ? activeCategory.descriptionEs
      : activeCategory.descriptionEn;

  const activeFocus =
    locale === "es"
      ? activeCategory.focusEs
      : activeCategory.focusEn;

  return (
    <section
      id="habilidades"
      className="relative overflow-hidden border-y border-white/5 bg-white/[0.015]"
    >
      <div className="skills-background-orb skills-background-orb-one" />
      <div className="skills-background-orb skills-background-orb-two" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/15 bg-sky-400/[0.06] px-4 py-2 text-sm text-sky-200">
              <Sparkles className="h-4 w-4" />
              {copy.badge}
            </div>

            <p className="mt-7 text-sm font-medium uppercase tracking-[0.28em] text-sky-300">
              {copy.eyebrow}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {copy.title}
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400">
              {copy.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="glass-panel rounded-2xl px-5 py-4">
              <p className="text-2xl font-semibold text-sky-300">
                {categories.length}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {copy.areas}
              </p>
            </div>

            <div className="glass-panel rounded-2xl px-5 py-4">
              <p className="text-2xl font-semibold text-indigo-300">
                {totalSkills}+
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {copy.skills}
              </p>
            </div>

            <div className="glass-panel col-span-2 rounded-2xl px-5 py-4 sm:col-span-1">
              <p className="text-sm font-medium text-emerald-200">
                {copy.applied}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {copy.noPercentages}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.38fr_1fr]">
          <div
            className="glass-panel flex gap-2 overflow-x-auto rounded-3xl p-3 lg:flex-col lg:overflow-visible"
            role="tablist"
            aria-label={copy.tabLabel}
          >
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive =
                category.id === activeCategory.id;

              const shortTitle =
                locale === "es"
                  ? category.shortEs
                  : category.shortEn;

              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() =>
                    setActiveId(category.id)
                  }
                  className={`skill-category-button group min-w-max lg:min-w-0 ${
                    isActive
                      ? "skill-category-button-active"
                      : ""
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition ${
                      isActive
                        ? "border-sky-400/30 bg-sky-400/15 text-sky-200"
                        : "border-white/10 bg-white/[0.03] text-slate-500 group-hover:text-slate-300"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <span className="text-left">
                    <span className="block text-sm font-medium">
                      {shortTitle}
                    </span>

                    <span className="mt-1 hidden text-xs text-slate-500 lg:block">
                      {category.skills.length}{" "}
                      {copy.capabilities}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            key={`${locale}-${activeCategory.id}`}
            className="glass-panel skills-panel-enter relative overflow-hidden rounded-3xl p-6 sm:p-8"
            role="tabpanel"
          >
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b ${activeCategory.accent}`}
            />

            <div className="relative">
              <div className="flex flex-col justify-between gap-7 border-b border-white/10 pb-8 md:flex-row md:items-start">
                <div className="flex gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sky-400/25 bg-sky-400/10 text-sky-200 shadow-[0_0_35px_rgba(56,189,248,0.12)]">
                    <ActiveIcon className="h-7 w-7" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-sky-300">
                      {activeFocus}
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
                      {activeTitle}
                    </h3>

                    <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                      {activeDescription}
                    </p>
                  </div>
                </div>

                <div className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/10 bg-black/10 px-4 py-2 text-sm text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {activeCategory.skills.length}{" "}
                  {copy.abilities}
                </div>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {activeCategory.skills.map((skill) => (
                  <article
                    key={skill.name}
                    className="skill-detail-card group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-medium text-slate-100">
                        {translateSkillName(
                          skill.name,
                          locale
                        )}
                      </h4>

                      <span className="h-2 w-2 shrink-0 rounded-full bg-sky-300 opacity-60 transition group-hover:opacity-100" />
                    </div>

                    <div className="mt-4">
                      <LevelIndicator
                        level={skill.level}
                        locale={locale}
                      />
                      <p className="mt-2 text-xs text-slate-500">
                        {levelLabels[locale][skill.level]}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-white/5 pt-4">
                      <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-slate-600">
                        {copy.appliedIn}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {skill.projects.map((project) => (
                          <span
                            key={project}
                            className="rounded-full border border-white/8 bg-white/[0.035] px-2.5 py-1 text-xs text-slate-400"
                          >
                            {translateProjectName(
                              project,
                              locale
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs leading-6 text-slate-600">
          {copy.note}
        </p>
      </div>
    </section>
  );
}