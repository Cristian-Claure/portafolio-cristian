"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  Monitor,
  Play,
  RotateCcw,
  Server,
  Sparkles,
} from "lucide-react";
import type { Locale, Project } from "@/data/projects";
import styles from "./SystemXRay.module.css";

type XRayNodeKind = "frontend" | "backend" | "data" | "integration";

type XRayNode = {
  id: string;
  kind: XRayNodeKind;
  titleEs: string;
  titleEn: string;
  technology: string;
  descriptionEs: string;
  descriptionEn: string;
  contributionEs: string;
  contributionEn: string;
};

type XRayDefinition = {
  subtitleEs: string;
  subtitleEn: string;
  nodes: readonly XRayNode[];
};

const architectures: Record<string, XRayDefinition> = {
  "fletes-italsa": {
    subtitleEs: "Logística, pagos de viajes y planificación de abastecimientos en una plataforma.",
    subtitleEn: "Logistics, trip payments and supply planning in one platform.",
    nodes: [
      {
        id: "ui",
        kind: "frontend",
        titleEs: "Experiencia operativa",
        titleEn: "Operational experience",
        technology: "React + TypeScript + Material UI",
        descriptionEs:
          "Formularios y vistas para viajes, pedidos y unidades, con flujos de aprobación y ejecución de pagos y planificación de abastecimientos.",
        descriptionEn:
          "Forms and views for trips, orders and vehicles, with payment approval and execution workflows and supply planning.",
        contributionEs:
          "Diseño y desarrollo de la interfaz, validaciones de escenarios y adaptación del flujo a usuarios reales del proceso.",
        contributionEn:
          "Interface design and development, scenario validation and workflow adaptation for real process users.",
      },
      {
        id: "api",
        kind: "backend",
        titleEs: "Reglas de negocio",
        titleEn: "Business rules",
        technology: "PHP + Laravel + API REST",
        descriptionEs:
          "Centraliza reglas operativas, aprobación y ejecución de pagos de viajes, planificación de abastecimientos y coordinación con servicios internos.",
        descriptionEn:
          "Centralizes operational rules, trip payment approval and execution, supply planning and coordination with internal services.",
        contributionEs:
          "Definición e implementación de reglas, endpoints, validaciones y resolución de casos funcionales junto a usuarios.",
        contributionEn:
          "Definition and implementation of rules, endpoints, validations and functional cases with users.",
      },
      {
        id: "db",
        kind: "data",
        titleEs: "Persistencia",
        titleEn: "Persistence",
        technology: "MySQL",
        descriptionEs:
          "Estructura relacional para viajes, detalles, unidades, catálogos y datos operativos que antes estaban distribuidos.",
        descriptionEn:
          "Relational structure for trips, details, vehicles, catalogs and operational data that was previously distributed.",
        contributionEs:
          "Modelado de datos, migraciones y soporte a consultas necesarias para registro y reportes.",
        contributionEn:
          "Data modeling, migrations and query support for registration and reporting.",
      },
      {
        id: "reports",
        kind: "integration",
        titleEs: "Integraciones y reportes",
        titleEn: "Integrations and reports",
        technology: "Servicios internos + Reportes",
        descriptionEs:
          "Conecta información comercial y operacional para producir reportes de detalle, cabecera y consolidados, como apoyo a la logística y la planificación de abastecimientos.",
        descriptionEn:
          "Connects commercial and operational information to produce detail, header and consolidated reports supporting logistics and supply planning.",
        contributionEs:
          "Integración funcional, definición de salidas y construcción de reportes sin exponer infraestructura empresarial sensible.",
        contributionEn:
          "Functional integration, output definition and report construction without exposing sensitive enterprise infrastructure.",
      },
    ],
  },
  velora: {
    subtitleEs: "Comercio de moda web y móvil, módulos de IA y despliegue en Azure.",
    subtitleEn: "Web and mobile fashion commerce, AI modules and deployment on Azure.",
    nodes: [
      {
        id: "channels",
        kind: "frontend",
        titleEs: "Canales web y móvil",
        titleEn: "Web and mobile channels",
        technology: "React + React Native",
        descriptionEs:
          "Interfaces web y móvil para la experiencia de compra de moda femenina dentro de una plataforma omnicanal.",
        descriptionEn:
          "Web and mobile interfaces for women's fashion shopping within an omnichannel platform.",
        contributionEs:
          "Desarrollo de las interfaces y su integración con los servicios del backend.",
        contributionEn:
          "Interface development and integration with backend services.",
      },
      {
        id: "api",
        kind: "backend",
        titleEs: "Servicios de comercio",
        titleEn: "Commerce services",
        technology: "NestJS",
        descriptionEs:
          "Backend modular que concentra la lógica de la plataforma y conecta los canales web y móvil.",
        descriptionEn:
          "A modular backend that centralizes platform logic and connects web and mobile channels.",
        contributionEs:
          "Desarrollo e integración de los servicios que utiliza la plataforma de comercio.",
        contributionEn:
          "Development and integration of services used by the commerce platform.",
      },
      {
        id: "ai",
        kind: "integration",
        titleEs: "Experiencia con IA",
        titleEn: "AI experience",
        technology: "IA / AI",
        descriptionEs:
          "Probador virtual, chatbot de recomendación y reportes generados mediante inteligencia artificial.",
        descriptionEn:
          "Virtual try-on, a recommendation chatbot and reports generated with artificial intelligence.",
        contributionEs:
          "Integración de los módulos de IA en la experiencia de compra y la consulta de información.",
        contributionEn:
          "Integration of AI modules into the shopping experience and information access.",
      },
      {
        id: "cloud",
        kind: "integration",
        titleEs: "Contenedores y nube",
        titleEn: "Containers and cloud",
        technology: "Docker + Azure",
        descriptionEs:
          "Aplicación preparada con contenedores Docker y desplegada en Azure.",
        descriptionEn:
          "Application prepared with Docker containers and deployed on Azure.",
        contributionEs:
          "Preparación de los contenedores y configuración del despliegue de la plataforma.",
        contributionEn:
          "Container preparation and platform deployment configuration.",
      },
    ],
  },
  "auxilio-ai": {
    subtitleEs: "Un flujo de atención preparado para análisis inteligente y seguimiento.",
    subtitleEn: "A response workflow prepared for intelligent analysis and tracking.",
    nodes: [
      {
        id: "ui",
        kind: "frontend",
        titleEs: "Experiencia de emergencia",
        titleEn: "Emergency experience",
        technology: "Next.js + TypeScript",
        descriptionEs:
          "Interfaz para registrar incidencias, revisar estados y mantener visible el contexto de cada solicitud.",
        descriptionEn:
          "Interface for registering incidents, reviewing statuses and keeping each request context visible.",
        contributionEs:
          "Estructura funcional, experiencia de usuario y organización de pantallas para demostraciones completas en local.",
        contributionEn:
          "Functional structure, user experience and screen organization for complete local demonstrations.",
      },
      {
        id: "api",
        kind: "backend",
        titleEs: "Orquestación API",
        titleEn: "API orchestration",
        technology: "FastAPI + Python",
        descriptionEs:
          "API rápida para organizar solicitudes, persistencia y módulos inteligentes sin acoplarlos a la interfaz.",
        descriptionEn:
          "Fast API for organizing requests, persistence and intelligent modules without coupling them to the interface.",
        contributionEs:
          "Diseño de endpoints, lógica funcional e integración entre frontend, datos y servicios de análisis.",
        contributionEn:
          "Endpoint design, functional logic and integration across frontend, data and analysis services.",
      },
      {
        id: "ai",
        kind: "integration",
        titleEs: "Capa inteligente",
        titleEn: "Intelligence layer",
        technology: "IA + modelos de apoyo",
        descriptionEs:
          "Capa preparada para clasificación, apoyo al diagnóstico y análisis de contexto de emergencias vehiculares.",
        descriptionEn:
          "Layer prepared for classification, diagnostic support and contextual analysis of vehicle emergencies.",
        contributionEs:
          "Preparación de módulos inteligentes y separación de responsabilidades para permitir evolución futura.",
        contributionEn:
          "Preparation of intelligent modules and separation of responsibilities to support future evolution.",
      },
      {
        id: "db",
        kind: "data",
        titleEs: "Persistencia local",
        titleEn: "Local persistence",
        technology: "SQLite",
        descriptionEs:
          "Base ligera para conservar incidencias y estados durante demostraciones sin depender de infraestructura externa.",
        descriptionEn:
          "Lightweight database for keeping incidents and statuses during demos without depending on external infrastructure.",
        contributionEs:
          "Modelo de persistencia y preparación del sistema para ejecución reproducible completamente local.",
        contributionEn:
          "Persistence model and preparation of the system for fully reproducible local execution.",
      },
    ],
  },
  agroenlace: {
    subtitleEs: "Información agropecuaria, incidencias y eventos en tiempo real.",
    subtitleEn: "Agricultural information, incidents and real-time events.",
    nodes: [
      {
        id: "ui",
        kind: "frontend",
        titleEs: "Gestión visual",
        titleEn: "Visual management",
        technology: "React + Vite",
        descriptionEs:
          "Interfaz para organizar operaciones, incidencias y seguimiento de actores del sector agropecuario.",
        descriptionEn:
          "Interface for organizing operations, incidents and stakeholder tracking in the agricultural sector.",
        contributionEs:
          "Preparación del entorno, integración de vistas y soporte al flujo funcional del caso de incidencias.",
        contributionEn:
          "Environment preparation, view integration and support for the incident use-case workflow.",
      },
      {
        id: "api",
        kind: "backend",
        titleEs: "Servicios de aplicación",
        titleEn: "Application services",
        technology: "Flask + Python",
        descriptionEs:
          "Backend que concentra reglas, acceso a datos y operaciones del caso de uso de incidencias.",
        descriptionEn:
          "Backend concentrating rules, data access and operations for the incident use case.",
        contributionEs:
          "Desarrollo del caso de uso, configuración local y documentación técnica para ejecución reproducible.",
        contributionEn:
          "Use-case development, local configuration and technical documentation for reproducible execution.",
      },
      {
        id: "realtime",
        kind: "integration",
        titleEs: "Tiempo real",
        titleEn: "Real time",
        technology: "Socket.IO",
        descriptionEs:
          "Canal de eventos para mantener actualizaciones operativas sin depender de recargas completas de página.",
        descriptionEn:
          "Event channel for keeping operational updates current without relying on full page reloads.",
        contributionEs:
          "Integración y validación del flujo de comunicación en tiempo real dentro del entorno de demostración.",
        contributionEn:
          "Integration and validation of the real-time communication flow in the demo environment.",
      },
      {
        id: "db",
        kind: "data",
        titleEs: "Datos relacionales",
        titleEn: "Relational data",
        technology: "PostgreSQL",
        descriptionEs:
          "Persistencia estructurada para actores, operaciones e incidencias con trazabilidad.",
        descriptionEn:
          "Structured persistence for stakeholders, operations and incidents with traceability.",
        contributionEs:
          "Configuración de base de datos, esquema local y datos de demostración para el proyecto.",
        contributionEn:
          "Database configuration, local schema and demo data for the project.",
      },
    ],
  },
  "clinica-horus": {
    subtitleEs: "Del flujo clínico a una arquitectura organizada por pacientes y citas.",
    subtitleEn: "From clinical workflow to an architecture organized around patients and appointments.",
    nodes: [
      {
        id: "ui",
        kind: "frontend",
        titleEs: "Interfaz clínica",
        titleEn: "Clinical interface",
        technology: "React + TypeScript",
        descriptionEs:
          "Experiencia orientada a pacientes, especialistas, citas e historiales clínicos.",
        descriptionEn:
          "Experience focused on patients, specialists, appointments and medical records.",
        contributionEs:
          "Análisis funcional, diseño de módulos y participación en el desarrollo de la experiencia web.",
        contributionEn:
          "Functional analysis, module design and participation in web experience development.",
      },
      {
        id: "api",
        kind: "backend",
        titleEs: "Servicios clínicos",
        titleEn: "Clinical services",
        technology: "Spring Boot + Java",
        descriptionEs:
          "Capa de servicios para encapsular reglas y operaciones administrativas y clínicas.",
        descriptionEn:
          "Service layer for encapsulating administrative and clinical rules and operations.",
        contributionEs:
          "Modelado, definición funcional y desarrollo de módulos junto al equipo del proyecto.",
        contributionEn:
          "Modeling, functional definition and module development with the project team.",
      },
      {
        id: "db",
        kind: "data",
        titleEs: "Información clínica",
        titleEn: "Clinical information",
        technology: "PostgreSQL",
        descriptionEs:
          "Persistencia relacional para pacientes, profesionales, citas e historiales vinculados.",
        descriptionEn:
          "Relational persistence for patients, professionals, appointments and linked records.",
        contributionEs:
          "Participación en el modelado de entidades y relaciones principales del sistema.",
        contributionEn:
          "Participation in modeling the main entities and relationships of the system.",
      },
      {
        id: "workflow",
        kind: "integration",
        titleEs: "Flujo de atención",
        titleEn: "Care workflow",
        technology: "Procesos clínicos",
        descriptionEs:
          "La arquitectura organiza el recorrido desde el registro del paciente hasta su cita e historial.",
        descriptionEn:
          "The architecture organizes the journey from patient registration to appointments and records.",
        contributionEs:
          "Traducción de procesos del dominio a casos de uso y funcionalidades del sistema.",
        contributionEn:
          "Translation of domain processes into use cases and system functionality.",
      },
    ],
  },
  "aula-inteligente": {
    subtitleEs: "Datos académicos convertidos en señales predictivas y resultados comprensibles.",
    subtitleEn: "Academic data transformed into predictive signals and understandable results.",
    nodes: [
      {
        id: "ui",
        kind: "frontend",
        titleEs: "Visualización académica",
        titleEn: "Academic visualization",
        technology: "Aplicación web",
        descriptionEs:
          "Interfaz orientada a explorar indicadores y presentar resultados de análisis de rendimiento.",
        descriptionEn:
          "Interface focused on exploring indicators and presenting performance-analysis results.",
        contributionEs:
          "Preparación de vistas y presentación de resultados para convertir el modelo en una herramienta comprensible.",
        contributionEn:
          "View preparation and result presentation to turn the model into an understandable tool.",
      },
      {
        id: "api",
        kind: "backend",
        titleEs: "Lógica académica",
        titleEn: "Academic logic",
        technology: "Python + Flask / Django",
        descriptionEs:
          "Capa de aplicación para coordinar datos, reglas y ejecución de funciones predictivas.",
        descriptionEn:
          "Application layer coordinating data, rules and execution of predictive functions.",
        contributionEs:
          "Lógica de aplicación y uso frecuente de frameworks Python durante el desarrollo universitario.",
        contributionEn:
          "Application logic and frequent use of Python frameworks during university development.",
      },
      {
        id: "ml",
        kind: "integration",
        titleEs: "Modelo predictivo",
        titleEn: "Predictive model",
        technology: "Random Forest + Regresión Lineal",
        descriptionEs:
          "Modelos para encontrar patrones y apoyar la anticipación del rendimiento estudiantil.",
        descriptionEn:
          "Models for finding patterns and supporting the anticipation of student performance.",
        contributionEs:
          "Tratamiento de datos, preparación de modelos y validación de resultados dentro del flujo de la aplicación.",
        contributionEn:
          "Data processing, model preparation and result validation within the application workflow.",
      },
      {
        id: "db",
        kind: "data",
        titleEs: "Datos académicos",
        titleEn: "Academic data",
        technology: "PostgreSQL",
        descriptionEs:
          "Persistencia de información utilizada por la aplicación y el análisis predictivo.",
        descriptionEn:
          "Persistence of information used by the application and predictive analysis.",
        contributionEs:
          "Preparación y análisis de datos necesarios para alimentar funcionalidades del sistema.",
        contributionEn:
          "Preparation and analysis of data needed to feed system functionality.",
      },
    ],
  },
  "biblioteca-alejandria": {
    subtitleEs: "Casos de uso y datos conectados en un sistema de información clásico.",
    subtitleEn: "Use cases and data connected in a classic information system.",
    nodes: [
      {
        id: "ui",
        kind: "frontend",
        titleEs: "Gestión de biblioteca",
        titleEn: "Library management",
        technology: "Angular",
        descriptionEs:
          "Interfaz para miembros, catálogo, personal y préstamos digitales.",
        descriptionEn:
          "Interface for members, catalog, staff and digital loans.",
        contributionEs:
          "Desarrollo de funcionalidades y traducción de casos de uso a pantallas del sistema.",
        contributionEn:
          "Feature development and translation of use cases into system screens.",
      },
      {
        id: "api",
        kind: "backend",
        titleEs: "Servicios de negocio",
        titleEn: "Business services",
        technology: "Node.js",
        descriptionEs:
          "Capa encargada de operaciones de miembros, catálogo y control de préstamos.",
        descriptionEn:
          "Layer responsible for member, catalog and loan-control operations.",
        contributionEs:
          "Participación en análisis, lógica funcional y desarrollo de funcionalidades.",
        contributionEn:
          "Participation in analysis, functional logic and feature development.",
      },
      {
        id: "db",
        kind: "data",
        titleEs: "Modelo bibliográfico",
        titleEn: "Bibliographic model",
        technology: "PostgreSQL",
        descriptionEs:
          "Relaciones entre usuarios, ejemplares, catálogo y préstamos.",
        descriptionEn:
          "Relationships among users, copies, catalog and loans.",
        contributionEs:
          "Modelado de entidades y relaciones a partir de los requerimientos del sistema.",
        contributionEn:
          "Entity and relationship modeling from system requirements.",
      },
      {
        id: "analysis",
        kind: "integration",
        titleEs: "Diseño del sistema",
        titleEn: "System design",
        technology: "UML + Casos de uso",
        descriptionEs:
          "La solución se organiza desde análisis y modelado antes de llegar al código.",
        descriptionEn:
          "The solution is organized from analysis and modeling before reaching code.",
        contributionEs:
          "Definición de casos de uso, UML y estructura funcional del proyecto académico.",
        contributionEn:
          "Use-case definition, UML and functional structure of the academic project.",
      },
    ],
  },
};

function NodeIcon({ kind }: Readonly<{ kind: XRayNodeKind }>) {
  if (kind === "frontend") return <Monitor className="h-5 w-5" />;
  if (kind === "backend") return <Server className="h-5 w-5" />;
  if (kind === "data") return <Database className="h-5 w-5" />;
  return <Cpu className="h-5 w-5" />;
}

export default function SystemXRay({
  project,
  locale,
}: Readonly<{
  project: Project;
  locale: Locale;
}>) {
  const definition = architectures[project.slug] ?? architectures["fletes-italsa"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  const displayedIndex = isSimulating ? simulationStep : selectedIndex;
  const selectedNode = definition.nodes[displayedIndex];
  const ui = useMemo(
    () =>
      locale === "es"
        ? {
            eyebrow: "SYSTEM X-RAY",
            title: "Cómo está construido",
            simulate: "Simular flujo",
            restart: "Reiniciar",
            contribution: "Mi participación",
            architecture: "Arquitectura conceptual",
            step: "Paso",
          }
        : {
            eyebrow: "SYSTEM X-RAY",
            title: "How it is built",
            simulate: "Simulate flow",
            restart: "Restart",
            contribution: "My contribution",
            architecture: "Conceptual architecture",
            step: "Step",
          },
    [locale]
  );

  useEffect(() => {
    if (!isSimulating) return;

    if (simulationStep >= definition.nodes.length - 1) {
      const finishTimer = window.setTimeout(() => {
        setIsSimulating(false);
      }, 850);
      return () => window.clearTimeout(finishTimer);
    }

    const timer = window.setTimeout(() => {
      setSimulationStep((current) => current + 1);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [definition.nodes.length, isSimulating, simulationStep]);

  const startSimulation = () => {
    setSelectedIndex(0);
    setSimulationStep(0);
    setIsSimulating(true);
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    setSimulationStep(0);
    setSelectedIndex(0);
  };

  return (
    <section
      className={styles.xray}
      data-variant={project.variant}
      aria-label={`${ui.eyebrow}: ${project[locale].title}`}
    >
      <div className={styles.ambientOne} />
      <div className={styles.ambientTwo} />

      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>
            <Sparkles className="h-4 w-4" />
            {ui.eyebrow}
          </div>
          <h2>{ui.title}</h2>
          <p>
            {locale === "es" ? definition.subtitleEs : definition.subtitleEn}
          </p>
        </div>

        <button
          type="button"
          className={styles.simulateButton}
          onClick={isSimulating ? stopSimulation : startSimulation}
        >
          {isSimulating ? (
            <RotateCcw className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          {isSimulating ? ui.restart : ui.simulate}
        </button>
      </div>

      <div className={styles.architectureLabel}>
        <span>{ui.architecture}</span>
        {isSimulating && (
          <strong>
            {ui.step} {simulationStep + 1}/{definition.nodes.length}
          </strong>
        )}
      </div>

      <div className={styles.flow}>
        {definition.nodes.map((node, index) => {
          const isSelected = displayedIndex === index;
          const isPassed = isSimulating && index < simulationStep;
          const isLive = isSimulating && index === simulationStep;

          return (
            <div className={styles.flowItem} key={node.id}>
              <button
                type="button"
                className={`${styles.node} ${
                  isSelected ? styles.nodeSelected : ""
                } ${isPassed ? styles.nodePassed : ""} ${
                  isLive ? styles.nodeLive : ""
                }`}
                onClick={() => {
                  setIsSimulating(false);
                  setSelectedIndex(index);
                }}
                aria-pressed={isSelected}
              >
                <span className={styles.nodeIcon}>
                  <NodeIcon kind={node.kind} />
                </span>
                <span className={styles.nodeText}>
                  <small>{locale === "es" ? node.titleEs : node.titleEn}</small>
                  <strong>{node.technology}</strong>
                </span>
                {isPassed && (
                  <CheckCircle2 className={styles.nodeCheck} aria-hidden="true" />
                )}
              </button>

              {index < definition.nodes.length - 1 && (
                <div
                  className={`${styles.connector} ${
                    isSimulating && index < simulationStep
                      ? styles.connectorPassed
                      : ""
                  } ${
                    isSimulating && index === simulationStep
                      ? styles.connectorLive
                      : ""
                  }`}
                  aria-hidden="true"
                >
                  <span />
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.detail}>
        <div className={styles.detailMain}>
          <span className={styles.detailIcon}>
            <NodeIcon kind={selectedNode.kind} />
          </span>
          <div>
            <p className={styles.detailLabel}>
              {locale === "es" ? selectedNode.titleEs : selectedNode.titleEn}
            </p>
            <h3>{selectedNode.technology}</h3>
            <p className={styles.detailDescription}>
              {locale === "es"
                ? selectedNode.descriptionEs
                : selectedNode.descriptionEn}
            </p>
          </div>
        </div>

        <div className={styles.contribution}>
          <span>{ui.contribution}</span>
          <p>
            {locale === "es"
              ? selectedNode.contributionEs
              : selectedNode.contributionEn}
          </p>
        </div>
      </div>
    </section>
  );
}
