export type Locale = "es" | "en";

export type ProjectVariant =
  | "logistics"
  | "emergency"
  | "agriculture"
  | "healthcare"
  | "analytics"
  | "library";

type ProjectCopy = {
  title: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  role: string;
  result: string;
  highlights: readonly string[];
};

export type Project = {
  slug: string;
  year: string;
  featured: boolean;
  variant: ProjectVariant;
  stack: readonly string[];
  es: ProjectCopy;
  en: ProjectCopy;
};

export const projectCatalog: readonly Project[] = [
  {
    slug: "fletes-italsa",
    year: "2026",
    featured: true,
    variant: "logistics",
    stack: [
      "React",
      "TypeScript",
      "Material UI",
      "PHP",
      "Laravel",
      "MySQL",
      "API REST",
    ],
    es: {
      title: "Fletes Italsa",
      category: "Proyecto profesional",
      summary:
        "Sistema web empresarial para centralizar el registro de despachos, viajes, pedidos, unidades, movimientos, ventas y reportes.",
      challenge:
        "El proceso dependía de archivos de Excel y macros VBA, con información distribuida, reglas operativas difíciles de mantener y reportes que requerían trabajo manual.",
      solution:
        "Se diseñó una plataforma web modular con formularios guiados, catálogos, validaciones, integración con servicios internos y reportes consolidados para apoyar la operación y la planificación.",
      role:
        "Participé en el levantamiento de requerimientos, definición de reglas de negocio, desarrollo full stack, validación de escenarios, diseño de reportes y coordinación con usuarios del proceso.",
      result:
        "Una base tecnológica centralizada y mantenible que permite evolucionar el proceso operativo sin depender de una única hoja de cálculo.",
      highlights: [
        "Registro de viajes y pedidos con múltiples escenarios operativos.",
        "Gestión de unidades, tarifas y movimientos.",
        "Integración de información comercial y reglas de negocio.",
        "Reportes de detalle, cabecera y consolidado.",
      ],
    },
    en: {
      title: "Fletes Italsa",
      category: "Professional project",
      summary:
        "Enterprise web system for centralizing dispatches, trips, orders, vehicles, movements, sales and operational reports.",
      challenge:
        "The process relied on Excel files and VBA macros, with distributed information, difficult-to-maintain business rules and reports that required manual work.",
      solution:
        "A modular web platform was designed with guided forms, catalogs, validations, internal-service integration and consolidated reports for operations and planning.",
      role:
        "I participated in requirements gathering, business-rule definition, full-stack development, scenario validation, report design and coordination with process users.",
      result:
        "A centralized and maintainable technology foundation that allows the operation to evolve without depending on a single spreadsheet.",
      highlights: [
        "Trip and order registration across multiple operational scenarios.",
        "Vehicle, rate and movement management.",
        "Commercial-information integration and business rules.",
        "Detail, header and consolidated reports.",
      ],
    },
  },
  {
    slug: "auxilio-ai",
    year: "2026",
    featured: true,
    variant: "emergency",
    stack: ["Next.js", "TypeScript", "FastAPI", "Python", "SQLite", "IA"],
    es: {
      title: "Auxilio.AI",
      category: "Inteligencia artificial",
      summary:
        "Plataforma inteligente para registrar, organizar y dar seguimiento a emergencias vehiculares desde una interfaz web moderna.",
      challenge:
        "Centralizar solicitudes de auxilio, evidencias e incidencias en un flujo comprensible, manteniendo la información disponible para seguimiento y análisis.",
      solution:
        "Se construyó una arquitectura con Next.js y FastAPI que organiza el ciclo de atención y prepara el uso de inteligencia artificial como apoyo al diagnóstico y la clasificación.",
      role:
        "Trabajé en la estructura funcional, experiencia de usuario, API, persistencia local y preparación de los módulos inteligentes del sistema.",
      result:
        "Un prototipo funcional completamente local, preparado para demostraciones y futuras integraciones con servicios de asistencia.",
      highlights: [
        "Registro estructurado de emergencias e incidencias.",
        "Seguimiento del estado de cada solicitud.",
        "Arquitectura separada entre frontend y API.",
        "Base preparada para asistencia mediante IA.",
      ],
    },
    en: {
      title: "Auxilio.AI",
      category: "Artificial intelligence",
      summary:
        "An intelligent platform for registering, organizing and tracking vehicle emergencies through a modern web interface.",
      challenge:
        "Centralize assistance requests, evidence and incidents in a clear workflow while keeping information available for tracking and analysis.",
      solution:
        "A Next.js and FastAPI architecture was built to organize the response cycle and prepare artificial intelligence as support for diagnosis and classification.",
      role:
        "I worked on the functional structure, user experience, API, local persistence and preparation of the system's intelligent modules.",
      result:
        "A fully local functional prototype prepared for demonstrations and future integrations with assistance services.",
      highlights: [
        "Structured emergency and incident registration.",
        "Request-status tracking.",
        "Separated frontend and API architecture.",
        "Foundation prepared for AI assistance.",
      ],
    },
  },
  {
    slug: "agroenlace",
    year: "2026",
    featured: true,
    variant: "agriculture",
    stack: ["React", "Vite", "Python", "Flask", "PostgreSQL", "Socket.IO"],
    es: {
      title: "AgroEnlace",
      category: "Sistema de información",
      summary:
        "Plataforma para gestionar procesos del sector agropecuario y dar seguimiento a incidencias operativas en tiempo real.",
      challenge:
        "Organizar información operativa y comunicaciones de distintos actores dentro de un único sistema con trazabilidad.",
      solution:
        "Se implementó una aplicación React y Flask con PostgreSQL, módulos de incidencias y comunicación en tiempo real mediante Socket.IO.",
      role:
        "Participé en la preparación del entorno local, configuración de base de datos, desarrollo del caso de uso de incidencias y documentación del proyecto.",
      result:
        "Un sistema ejecutable de forma completamente local, con datos de demostración y un flujo operativo funcional.",
      highlights: [
        "Gestión de incidencias operativas.",
        "Comunicación en tiempo real.",
        "Persistencia relacional con PostgreSQL.",
        "Entorno local reproducible para presentación.",
      ],
    },
    en: {
      title: "AgroEnlace",
      category: "Information system",
      summary:
        "A platform for managing agricultural-sector processes and tracking operational incidents in real time.",
      challenge:
        "Organize operational information and communications from different stakeholders in a single traceable system.",
      solution:
        "A React and Flask application with PostgreSQL, incident modules and real-time communication through Socket.IO was implemented.",
      role:
        "I participated in local-environment preparation, database configuration, incident use-case development and project documentation.",
      result:
        "A fully local executable system with demo data and a functional operational workflow.",
      highlights: [
        "Operational-incident management.",
        "Real-time communication.",
        "Relational persistence with PostgreSQL.",
        "Reproducible local environment for presentation.",
      ],
    },
  },
  {
    slug: "clinica-horus",
    year: "2025",
    featured: false,
    variant: "healthcare",
    stack: ["React", "TypeScript", "Spring Boot", "Java", "PostgreSQL"],
    es: {
      title: "Clínica Oftalmológica Horus",
      category: "Gestión médica",
      summary:
        "Sistema web y móvil para administrar pacientes, especialistas, historiales clínicos y programación de citas.",
      challenge:
        "Representar procesos médicos y administrativos en una experiencia ordenada, con información clínica vinculada a cada paciente.",
      solution:
        "Se planteó una solución con frontend React y backend Spring Boot, organizada alrededor de pacientes, profesionales, citas e historiales.",
      role:
        "Participé en el análisis, modelado, diseño funcional y desarrollo de módulos del sistema.",
      result:
        "Una propuesta integral para digitalizar la gestión de una clínica oftalmológica.",
      highlights: [
        "Gestión de pacientes y especialistas.",
        "Programación de citas.",
        "Historiales clínicos organizados.",
        "Arquitectura web y móvil.",
      ],
    },
    en: {
      title: "Horus Ophthalmology Clinic",
      category: "Healthcare management",
      summary:
        "A web and mobile system for managing patients, specialists, medical records and appointment scheduling.",
      challenge:
        "Represent medical and administrative processes in an organized experience with clinical information linked to each patient.",
      solution:
        "A React frontend and Spring Boot backend solution was designed around patients, professionals, appointments and medical records.",
      role:
        "I participated in analysis, modeling, functional design and module development.",
      result:
        "A comprehensive proposal for digitizing ophthalmology-clinic management.",
      highlights: [
        "Patient and specialist management.",
        "Appointment scheduling.",
        "Organized medical records.",
        "Web and mobile architecture.",
      ],
    },
  },
  {
    slug: "aula-inteligente",
    year: "2025",
    featured: false,
    variant: "analytics",
    stack: ["Python", "Flask", "Machine Learning", "PostgreSQL"],
    es: {
      title: "Aula Inteligente",
      category: "Análisis predictivo",
      summary:
        "Plataforma académica para analizar información estudiantil y anticipar el rendimiento mediante modelos predictivos.",
      challenge:
        "Convertir datos académicos en información útil para detectar tendencias y apoyar decisiones educativas.",
      solution:
        "Se integraron modelos como Random Forest y regresión lineal dentro de una aplicación web orientada a visualización y seguimiento.",
      role:
        "Participé en el tratamiento de datos, preparación de modelos, lógica de la aplicación y presentación de resultados.",
      result:
        "Una solución académica que demuestra la aplicación práctica de analítica y aprendizaje automático.",
      highlights: [
        "Preparación y análisis de datos.",
        "Modelos predictivos.",
        "Visualización de resultados.",
        "Integración entre aplicación y modelo.",
      ],
    },
    en: {
      title: "Smart Classroom",
      category: "Predictive analytics",
      summary:
        "An academic platform for analyzing student information and anticipating performance through predictive models.",
      challenge:
        "Transform academic data into useful information for detecting trends and supporting educational decisions.",
      solution:
        "Models such as Random Forest and linear regression were integrated into a web application focused on visualization and monitoring.",
      role:
        "I participated in data processing, model preparation, application logic and presentation of results.",
      result:
        "An academic solution that demonstrates the practical application of analytics and machine learning.",
      highlights: [
        "Data preparation and analysis.",
        "Predictive models.",
        "Result visualization.",
        "Application-model integration.",
      ],
    },
  },
  {
    slug: "biblioteca-alejandria",
    year: "2024",
    featured: false,
    variant: "library",
    stack: ["Angular", "Node.js", "PostgreSQL", "UML"],
    es: {
      title: "Biblioteca Alejandría",
      category: "Sistema de información",
      summary:
        "Sistema para administrar miembros, personal, catálogo bibliográfico y préstamos digitales.",
      challenge:
        "Modelar los procesos fundamentales de una biblioteca y mantener relaciones claras entre usuarios, ejemplares y préstamos.",
      solution:
        "Se diseñó una solución basada en casos de uso, UML y una arquitectura Angular, Node.js y PostgreSQL.",
      role:
        "Participé en análisis, modelado del sistema, definición de casos de uso y desarrollo de funcionalidades.",
      result:
        "Un sistema académico completo que consolidó fundamentos de análisis, diseño y desarrollo de software.",
      highlights: [
        "Gestión de miembros y personal.",
        "Catálogo bibliográfico.",
        "Control de préstamos.",
        "Modelado UML y casos de uso.",
      ],
    },
    en: {
      title: "Alexandria Library",
      category: "Information system",
      summary:
        "A system for managing members, staff, the bibliographic catalog and digital loans.",
      challenge:
        "Model the core processes of a library and maintain clear relationships among users, copies and loans.",
      solution:
        "A solution based on use cases, UML and an Angular, Node.js and PostgreSQL architecture was designed.",
      role:
        "I participated in analysis, system modeling, use-case definition and feature development.",
      result:
        "A complete academic system that consolidated software analysis, design and development fundamentals.",
      highlights: [
        "Member and staff management.",
        "Bibliographic catalog.",
        "Loan control.",
        "UML modeling and use cases.",
      ],
    },
  },
] as const;

export function getProjectBySlug(slug: string): Project | undefined {
  return projectCatalog.find((project) => project.slug === slug);
}
