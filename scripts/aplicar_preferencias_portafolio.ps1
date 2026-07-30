$ErrorActionPreference = "Stop"

$projectRoot = Join-Path $env:USERPROFILE "Desktop\PORTAFOLIO_CRISTIAN"
$frontendPath = Join-Path $projectRoot "frontend"
$srcAppPath = Join-Path $frontendPath "src\app"
$componentsPath = Join-Path $frontendPath "src\components"
$layoutPath = Join-Path $srcAppPath "layout.tsx"
$pagePath = Join-Path $srcAppPath "page.tsx"
$cssPath = Join-Path $srcAppPath "globals.css"
$skillsPath = Join-Path $componentsPath "SkillsExplorer.tsx"
$packagePath = Join-Path $frontendPath "package.json"
$gitignorePath = Join-Path $projectRoot ".gitignore"

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupPath = Join-Path $projectRoot ".project-backups\preferences-$timestamp"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Write-Utf8File {
    param(
        [Parameter(Mandatory)]
        [string]$Path,

        [Parameter(Mandatory)]
        [string]$Content
    )

    [System.IO.File]::WriteAllText(
        $Path,
        $Content,
        $utf8NoBom
    )
}

function Backup-File {
    param(
        [Parameter(Mandatory)]
        [string]$Path
    )

    if (Test-Path $Path) {
        Copy-Item `
            $Path `
            (Join-Path $backupPath (Split-Path $Path -Leaf)) `
            -Force
    }
}

function Restore-File {
    param(
        [Parameter(Mandatory)]
        [string]$Name,

        [Parameter(Mandatory)]
        [string]$Destination
    )

    $source = Join-Path $backupPath $Name

    if (Test-Path $source) {
        Copy-Item $source $Destination -Force
    }
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " PREFERENCIAS ESP/ENG Y TEMA CLARO/OSCURO" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

if (-not (Test-Path $frontendPath)) {
    throw "No se encontro el frontend en $frontendPath"
}

New-Item `
    -ItemType Directory `
    -Path $backupPath `
    -Force | Out-Null

New-Item `
    -ItemType Directory `
    -Path $componentsPath `
    -Force | Out-Null

Backup-File $layoutPath
Backup-File $pagePath
Backup-File $cssPath
Backup-File $skillsPath
Backup-File $packagePath

try {
    Set-Location $frontendPath

    Write-Host ""
    Write-Host "1. Cambiando desarrollo local a Webpack..." `
        -ForegroundColor Yellow

    npm pkg set "scripts.dev=next dev --webpack -p 3001"

    if ($LASTEXITCODE -ne 0) {
        throw "No se pudo actualizar el script dev."
    }

    Write-Host "[OK] npm run dev usara Webpack" `
        -ForegroundColor Green

    Write-Host ""
    Write-Host "2. Preparando .gitignore..." `
        -ForegroundColor Yellow

    $gitignore = [System.IO.File]::ReadAllText(
        $gitignorePath,
        [System.Text.Encoding]::UTF8
    )

    if ($gitignore -notmatch "(?m)^.project-backups/$") {
        $gitignore = $gitignore.TrimEnd() +
            "`r`n.project-backups/`r`n"

        Write-Utf8File `
            -Path $gitignorePath `
            -Content $gitignore
    }

    Write-Host "[OK] Copias locales excluidas de Git" `
        -ForegroundColor Green

    $layoutContent = @'
import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cristian Claure Pinto | Portafolio",
    template: "%s | Cristian Claure Pinto",
  },
  description:
    "Portafolio profesional de Cristian Claure Pinto, desarrollador full stack y analista de datos.",
  keywords: [
    "Cristian Claure Pinto",
    "Desarrollador Full Stack",
    "React",
    "Next.js",
    "Laravel",
    "PostgreSQL",
    "Qlik Sense",
    "Business Intelligence",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <Script id="portfolio-preferences" strategy="beforeInteractive">
          {`
            try {
              const theme =
                localStorage.getItem("portfolio-theme") || "dark";
              document.documentElement.dataset.theme = theme;
            } catch {}
          `}
        </Script>
      </head>

      <body>{children}</body>
    </html>
  );
}
'@

    $pageContent = @'
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Database,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Moon,
  Sparkles,
  Sun,
  UserRound,
} from "lucide-react";
import SkillsExplorer from "@/components/SkillsExplorer";

type Locale = "es" | "en";
type Theme = "dark" | "light";

type HealthResponse = {
  success: boolean;
  status: string;
  application: string;
  database: string;
  message: string;
  timestamp: string;
};

type HealthState = {
  loading: boolean;
  online: boolean;
  data: HealthResponse | null;
};

const translations = {
  es: {
    nav: {
      about: "Sobre mí",
      skills: "Habilidades",
      projects: "Proyectos",
      process: "Proceso",
      contact: "Contacto",
      talk: "Hablemos",
    },
    hero: {
      badge: "Ingeniería, software y análisis de datos",
      eyebrow: "Portafolio profesional",
      greeting: "Hola, soy",
      role: "Desarrollador full stack y analista de datos.",
      location: "Santa Cruz de la Sierra, Bolivia",
      available: "Disponible para oportunidades",
      description:
        "Construyo aplicaciones web, APIs, soluciones empresariales y herramientas de inteligencia de negocios orientadas a resolver problemas reales.",
      projects: "Ver proyectos",
      contact: "Contactarme",
      linkedin: "LinkedIn",
      github: "GitHub",
      whatsapp: "WhatsApp",
      checking: "Comprobando conexión...",
      connected: "Frontend, API y PostgreSQL conectados",
      disconnected: "API no disponible en este momento",
      database: "Base",
      profile: "Perfil actual",
      applied: "Tecnología aplicada a resultados",
      technologies: "Tecnologías utilizadas",
      areas: "Áreas principales",
      focus: [
        "Desarrollo web full stack",
        "Business Intelligence",
        "Análisis y modelado de datos",
      ],
    },
    about: {
      eyebrow: "Sobre mí",
      title: "Aprendizaje continuo y soluciones funcionales.",
      professionalTitle: "Enfoque profesional",
      professionalText:
        "Desarrollo sistemas orientados a procesos reales, cuidando tanto la experiencia del usuario como la estructura técnica.",
      educationTitle: "Formación",
      educationText:
        "Estudiante de Ingeniería en Sistemas en la Universidad Autónoma Gabriel René Moreno.",
    },
    projects: {
      eyebrow: "Proyectos",
      title: "Experiencias que demuestran lo que sé construir.",
      description:
        "Cada proyecto tendrá su propio caso de estudio, capturas, arquitectura, tecnologías y resultados obtenidos.",
    },
    process: {
      eyebrow: "Cómo trabajo",
      title: "Del problema a una solución funcional.",
      description:
        "No se trata solamente de escribir código. Primero entiendo el contexto y después construyo una solución que pueda utilizarse y mantenerse.",
    },
    contact: {
      eyebrow: "Contacto",
      title:
        "¿Tienes una idea, oportunidad o proyecto en el que podamos trabajar?",
      description:
        "Actualmente disponible para conversar sobre desarrollo de software, sistemas empresariales y análisis de datos.",
      email: "Enviar correo",
      whatsapp: "WhatsApp",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    footer: {
      built: "Construido con Next.js, Laravel y PostgreSQL.",
    },
    controls: {
      language: "Cambiar idioma",
      themeLight: "Activar modo claro",
      themeDark: "Activar modo oscuro",
    },
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      process: "Process",
      contact: "Contact",
      talk: "Let's talk",
    },
    hero: {
      badge: "Engineering, software and data analytics",
      eyebrow: "Professional portfolio",
      greeting: "Hi, I'm",
      role: "Full-stack developer and data analyst.",
      location: "Santa Cruz de la Sierra, Bolivia",
      available: "Open to opportunities",
      description:
        "I build web applications, APIs, business solutions and business intelligence tools focused on solving real-world problems.",
      projects: "View projects",
      contact: "Contact me",
      linkedin: "LinkedIn",
      github: "GitHub",
      whatsapp: "WhatsApp",
      checking: "Checking connection...",
      connected: "Frontend, API and PostgreSQL connected",
      disconnected: "API is currently unavailable",
      database: "Database",
      profile: "Current profile",
      applied: "Technology applied to results",
      technologies: "Technologies used",
      areas: "Core areas",
      focus: [
        "Full-stack web development",
        "Business Intelligence",
        "Data analysis and modeling",
      ],
    },
    about: {
      eyebrow: "About me",
      title: "Continuous learning and functional solutions.",
      professionalTitle: "Professional approach",
      professionalText:
        "I develop systems around real processes, balancing user experience with a solid technical structure.",
      educationTitle: "Education",
      educationText:
        "Systems Engineering student at Universidad Autónoma Gabriel René Moreno.",
    },
    projects: {
      eyebrow: "Projects",
      title: "Experiences that show what I can build.",
      description:
        "Each project will include its own case study, screenshots, architecture, technologies and achieved results.",
    },
    process: {
      eyebrow: "How I work",
      title: "From a problem to a functional solution.",
      description:
        "It is not only about writing code. I first understand the context and then build a solution that can be used and maintained.",
    },
    contact: {
      eyebrow: "Contact",
      title:
        "Do you have an idea, opportunity or project we could work on together?",
      description:
        "Currently available to discuss software development, business systems and data analytics.",
      email: "Send email",
      whatsapp: "WhatsApp",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    footer: {
      built: "Built with Next.js, Laravel and PostgreSQL.",
    },
    controls: {
      language: "Change language",
      themeLight: "Enable light mode",
      themeDark: "Enable dark mode",
    },
  },
} as const;

const projects = {
  es: [
    {
      year: "2026",
      focus: "Plataforma full stack",
      title: "AgroEnlace",
      description:
        "Plataforma web para gestionar procesos agrícolas e incidencias operativas, preparada para funcionar completamente en un entorno local.",
      stack: ["React", "Flask", "PostgreSQL"],
    },
    {
      year: "2026",
      focus: "Inteligencia artificial",
      title: "Auxilio.AI",
      description:
        "Plataforma inteligente de emergencias vehiculares para registrar, atender y realizar seguimiento de solicitudes de auxilio.",
      stack: ["Next.js", "FastAPI", "SQLite"],
    },
    {
      year: "2025",
      focus: "Gestión médica",
      title: "Clínica Oftalmológica Horus",
      description:
        "Sistema web y móvil para administrar pacientes, especialistas, historiales clínicos y programación de citas.",
      stack: ["React", "Spring Boot", "PostgreSQL"],
    },
    {
      year: "2025",
      focus: "Análisis predictivo",
      title: "Aula Inteligente",
      description:
        "Plataforma académica con modelos predictivos para analizar y anticipar el rendimiento estudiantil.",
      stack: ["Python", "Flask", "Machine Learning"],
    },
    {
      year: "2024",
      focus: "Sistema de información",
      title: "Biblioteca Alejandría",
      description:
        "Sistema para administrar miembros, personal, catálogo bibliográfico y préstamos digitales.",
      stack: ["Angular", "Node.js", "PostgreSQL"],
    },
  ],
  en: [
    {
      year: "2026",
      focus: "Full-stack platform",
      title: "AgroEnlace",
      description:
        "A web platform for managing agricultural processes and operational incidents, designed to run entirely in a local environment.",
      stack: ["React", "Flask", "PostgreSQL"],
    },
    {
      year: "2026",
      focus: "Artificial intelligence",
      title: "Auxilio.AI",
      description:
        "An intelligent vehicle-emergency platform for registering, handling and tracking roadside assistance requests.",
      stack: ["Next.js", "FastAPI", "SQLite"],
    },
    {
      year: "2025",
      focus: "Healthcare management",
      title: "Horus Ophthalmology Clinic",
      description:
        "A web and mobile system for managing patients, specialists, medical records and appointment scheduling.",
      stack: ["React", "Spring Boot", "PostgreSQL"],
    },
    {
      year: "2025",
      focus: "Predictive analytics",
      title: "Smart Classroom",
      description:
        "An academic platform with predictive models for analyzing and anticipating student performance.",
      stack: ["Python", "Flask", "Machine Learning"],
    },
    {
      year: "2024",
      focus: "Information system",
      title: "Alexandria Library",
      description:
        "A system for managing members, staff, the bibliographic catalog and digital loans.",
      stack: ["Angular", "Node.js", "PostgreSQL"],
    },
  ],
} as const;

const processSteps = {
  es: [
    {
      step: "01",
      title: "Entender",
      description:
        "Analizo el problema, los usuarios, las reglas del negocio y el resultado que se necesita alcanzar.",
      icon: BriefcaseBusiness,
    },
    {
      step: "02",
      title: "Diseñar",
      description:
        "Defino la arquitectura, los datos y una experiencia de usuario clara y mantenible.",
      icon: Database,
    },
    {
      step: "03",
      title: "Construir",
      description:
        "Desarrollo, pruebo e integro los componentes hasta obtener una solución funcional.",
      icon: Code2,
    },
  ],
  en: [
    {
      step: "01",
      title: "Understand",
      description:
        "I analyze the problem, its users, business rules and the result that needs to be achieved.",
      icon: BriefcaseBusiness,
    },
    {
      step: "02",
      title: "Design",
      description:
        "I define the architecture, data and a clear, maintainable user experience.",
      icon: Database,
    },
    {
      step: "03",
      title: "Build",
      description:
        "I develop, test and integrate the components until the solution is fully functional.",
      icon: Code2,
    },
  ],
} as const;

export default function Home() {
  const [locale, setLocale] = useState<Locale>("es");
  const [theme, setTheme] = useState<Theme>("dark");
  const [health, setHealth] = useState<HealthState>({
    loading: true,
    online: false,
    data: null,
  });

  const copy = translations[locale];
  const visibleProjects = projects[locale];
  const visibleProcess = processSteps[locale];

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8001/api";

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";

  const linkedinUrl =
    process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "";

  const githubUrl =
    process.env.NEXT_PUBLIC_GITHUB_URL ??
    "https://github.com/Cristian-Claure";

  const email =
    process.env.NEXT_PUBLIC_EMAIL ??
    "cristianclaurepinto14@gmail.com";

  const whatsappMessage = encodeURIComponent(
    locale === "es"
      ? "Hola Cristian, vi tu portafolio y me gustaría conversar contigo."
      : "Hi Cristian, I saw your portfolio and would like to talk with you."
  );

  useEffect(() => {
    const storedLocale = localStorage.getItem("portfolio-locale");
    const storedTheme = localStorage.getItem("portfolio-theme");

    const restorePreferences = window.setTimeout(() => {
      if (storedLocale === "es" || storedLocale === "en") {
        setLocale(storedLocale);
      }

      if (storedTheme === "dark" || storedTheme === "light") {
        setTheme(storedTheme);
      }
    }, 0);

    return () => window.clearTimeout(restorePreferences);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.theme = theme;

    localStorage.setItem("portfolio-locale", locale);
    localStorage.setItem("portfolio-theme", theme);
  }, [locale, theme]);

  useEffect(() => {
    let active = true;

    async function checkHealth() {
      try {
        const response = await fetch(`${apiUrl}/health`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`API status ${response.status}`);
        }

        const data = (await response.json()) as HealthResponse;

        if (active) {
          setHealth({
            loading: false,
            online: data.success === true,
            data,
          });
        }
      } catch {
        if (active) {
          setHealth({
            loading: false,
            online: false,
            data: null,
          });
        }
      }
    }

    void checkHealth();

    return () => {
      active = false;
    };
  }, [apiUrl]);

  const healthLabel = useMemo(() => {
    if (health.loading) {
      return copy.hero.checking;
    }

    return health.online
      ? copy.hero.connected
      : copy.hero.disconnected;
  }, [copy.hero.checking, copy.hero.connected, copy.hero.disconnected, health]);

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#050a12]/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <a
            href="#inicio"
            className="flex min-w-max items-center gap-3 font-medium tracking-tight"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
              CC
            </span>

            <span className="hidden sm:block">Cristian Claure</span>
          </a>

          <div className="hidden items-center gap-7 text-sm text-slate-300 lg:flex">
            <a className="transition hover:text-white" href="#sobre-mi">
              {copy.nav.about}
            </a>
            <a className="transition hover:text-white" href="#habilidades">
              {copy.nav.skills}
            </a>
            <a className="transition hover:text-white" href="#proyectos">
              {copy.nav.projects}
            </a>
            <a className="transition hover:text-white" href="#proceso">
              {copy.nav.process}
            </a>
            <a className="transition hover:text-white" href="#contacto">
              {copy.nav.contact}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="language-switch"
              aria-label={copy.controls.language}
            >
              <button
                type="button"
                className={`language-switch-button ${
                  locale === "es"
                    ? "language-switch-button-active"
                    : ""
                }`}
                onClick={() => setLocale("es")}
                aria-pressed={locale === "es"}
              >
                ESP
              </button>

              <button
                type="button"
                className={`language-switch-button ${
                  locale === "en"
                    ? "language-switch-button-active"
                    : ""
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
                setTheme((current) =>
                  current === "dark" ? "light" : "dark"
                )
              }
              aria-label={
                theme === "dark"
                  ? copy.controls.themeLight
                  : copy.controls.themeDark
              }
              title={
                theme === "dark"
                  ? copy.controls.themeLight
                  : copy.controls.themeDark
              }
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <a
              href="#contacto"
              className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:border-sky-400/30 hover:bg-sky-400/10 sm:inline-flex"
            >
              {copy.nav.talk}
            </a>
          </div>
        </nav>
      </header>

      <section
        id="inicio"
        className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-8"
      >
        <div className="hero-reveal">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <Sparkles className="h-4 w-4 text-sky-300" />
            {copy.hero.badge}
          </div>

          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-sky-300">
            {copy.hero.eyebrow}
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            {copy.hero.greeting}{" "}
            <span className="text-gradient">
              Cristian Claure Pinto.
            </span>
          </h1>

          <h2 className="mt-6 max-w-3xl text-xl font-medium text-slate-200 sm:text-2xl">
            {copy.hero.role}
          </h2>

          <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <MapPin className="h-4 w-4 text-sky-300" />
              {copy.hero.location}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-emerald-200">
              <CheckCircle2 className="h-4 w-4" />
              {copy.hero.available}
            </span>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            {copy.hero.description}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#proyectos"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-400 px-6 py-3 font-medium text-slate-950 transition hover:bg-sky-300"
            >
              {copy.hero.projects}
              <ArrowDown className="h-4 w-4" />
            </a>

            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium transition hover:border-white/20 hover:bg-white/10"
            >
              {copy.hero.contact}
              <Mail className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="social-pill"
              >
                <UserRound className="h-4 w-4" />
                {copy.hero.linkedin}
              </a>
            )}

            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="social-pill"
            >
              <Code2 className="h-4 w-4" />
              {copy.hero.github}
            </a>

            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="social-pill social-pill-whatsapp"
              >
                <MessageCircle className="h-4 w-4" />
                {copy.hero.whatsapp}
              </a>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-slate-400">
            <span className="inline-flex items-center gap-3">
              <span
                className={`status-dot ${
                  health.online
                    ? "status-online"
                    : "status-offline"
                }`}
              />
              {healthLabel}
            </span>

            {health.data && (
              <span className="rounded-full border border-white/10 px-3 py-1">
                {copy.hero.database}: {health.data.database}
              </span>
            )}
          </div>
        </div>

        <aside className="glass-panel hero-reveal hero-reveal-delay relative overflow-hidden rounded-3xl p-7 sm:p-9">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />

          <div className="relative">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              {copy.hero.profile}
            </p>

            <h3 className="mt-4 text-2xl font-medium">
              {copy.hero.applied}
            </h3>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-3xl font-semibold text-sky-300">
                  10+
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  {copy.hero.technologies}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-3xl font-semibold text-indigo-300">
                  3
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  {copy.hero.areas}
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-4">
              {copy.hero.focus.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-b border-white/5 pb-4 text-slate-300 last:border-0 last:pb-0"
                >
                  <span className="h-2 w-2 rounded-full bg-sky-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section
        id="sobre-mi"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
      >
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-300">
              {copy.about.eyebrow}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              {copy.about.title}
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <article className="glass-panel rounded-2xl p-7">
              <BriefcaseBusiness className="h-6 w-6 text-sky-300" />
              <h3 className="mt-5 text-xl font-medium">
                {copy.about.professionalTitle}
              </h3>
              <p className="mt-3 leading-7 text-slate-400">
                {copy.about.professionalText}
              </p>
            </article>

            <article className="glass-panel rounded-2xl p-7">
              <GraduationCap className="h-6 w-6 text-indigo-300" />
              <h3 className="mt-5 text-xl font-medium">
                {copy.about.educationTitle}
              </h3>
              <p className="mt-3 leading-7 text-slate-400">
                {copy.about.educationText}
              </p>
            </article>
          </div>
        </div>
      </section>

      <SkillsExplorer locale={locale} />

      <section
        id="proyectos"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-300">
              {copy.projects.eyebrow}
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              {copy.projects.title}
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-slate-500">
            {copy.projects.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          {visibleProjects.map((project, index) => (
            <article
              key={project.title}
              className={`glass-panel project-card group flex min-h-80 flex-col rounded-2xl p-7 transition duration-300 hover:-translate-y-1 hover:border-sky-400/30 ${
                index < 2
                  ? "lg:col-span-6"
                  : "lg:col-span-4"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                    {project.year}
                  </span>

                  <span className="rounded-full border border-sky-400/20 bg-sky-400/[0.07] px-3 py-1 text-xs text-sky-200">
                    {project.focus}
                  </span>
                </div>

                <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-600 transition group-hover:text-sky-300" />
              </div>

              <h3 className="mt-8 text-2xl font-medium">
                {project.title}
              </h3>

              <p className="mt-4 flex-1 leading-7 text-slate-400">
                {project.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.stack.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-lg bg-white/[0.05] px-3 py-1.5 text-xs text-slate-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="proceso"
        className="border-y border-white/5 bg-white/[0.015]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-300">
                {copy.process.eyebrow}
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                {copy.process.title}
              </h2>

              <p className="mt-5 max-w-md leading-7 text-slate-400">
                {copy.process.description}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {visibleProcess.map(
                ({ step, title, description, icon: Icon }) => (
                  <article
                    key={step}
                    className="glass-panel process-card rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-sky-300">
                        {step}
                      </span>

                      <Icon className="h-6 w-6 text-sky-300" />
                    </div>

                    <h3 className="mt-8 text-xl font-medium">
                      {title}
                    </h3>

                    <p className="mt-4 leading-7 text-slate-400">
                      {description}
                    </p>
                  </article>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contacto"
        className="mx-auto max-w-7xl px-6 py-20 lg:px-8"
      >
        <div className="glass-panel overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-300">
                {copy.contact.eyebrow}
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">
                {copy.contact.title}
              </h2>

              <p className="mt-5 text-slate-400">
                {copy.contact.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-400 px-6 py-3 font-medium text-slate-950 transition hover:bg-sky-300"
              >
                <Mail className="h-4 w-4" />
                {copy.contact.email}
              </a>

              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-6 py-3 font-medium text-emerald-200 transition hover:border-emerald-400/40 hover:bg-emerald-400/15"
                >
                  <MessageCircle className="h-4 w-4" />
                  {copy.contact.whatsapp}
                </a>
              )}

              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-400/20 bg-sky-400/10 px-6 py-3 font-medium text-sky-200 transition hover:border-sky-400/40 hover:bg-sky-400/15"
                >
                  <UserRound className="h-4 w-4" />
                  {copy.contact.linkedin}
                </a>
              )}

              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium transition hover:bg-white/10"
              >
                <Code2 className="h-4 w-4" />
                {copy.contact.github}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 Cristian Claure Pinto.</p>
          <p>{copy.footer.built}</p>
        </div>
      </footer>

      {whatsappNumber && (
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noreferrer"
          className="whatsapp-floating"
          aria-label={copy.contact.whatsapp}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="hidden sm:inline">
            {copy.contact.whatsapp}
          </span>
        </a>
      )}
    </main>
  );
}
'@

    $skillsContent = @'
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
        projects: ["AgroEnlace", "Horus", "Fletes Italsa"],
      },
      {
        name: "Next.js",
        level: "Aplicado en proyectos",
        projects: ["Auxilio.AI", "Portafolio"],
      },
      {
        name: "TypeScript",
        level: "Uso frecuente",
        projects: ["Portafolio", "Auxilio.AI", "Fletes Italsa"],
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
        projects: ["Portafolio"],
      },
      {
        name: "PHP",
        level: "En consolidación",
        projects: ["Portafolio", "Proyectos web"],
      },
      {
        name: "Python",
        level: "Uso frecuente",
        projects: ["AgroEnlace", "Aula Inteligente"],
      },
      {
        name: "Flask",
        level: "Aplicado en proyectos",
        projects: ["AgroEnlace", "Aula Inteligente"],
      },
      {
        name: "FastAPI",
        level: "Aplicado en proyectos",
        projects: ["Auxilio.AI"],
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
        projects: ["Portafolio", "AgroEnlace", "Auxilio.AI"],
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
        projects: ["Portafolio", "Fletes Italsa"],
      },
      {
        name: "JavaScript",
        level: "Uso frecuente",
        projects: ["Frontend web", "Node.js"],
      },
      {
        name: "Python",
        level: "Uso frecuente",
        projects: ["AgroEnlace", "Análisis de datos"],
      },
      {
        name: "PHP",
        level: "En consolidación",
        projects: ["Portafolio"],
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
        projects: ["Portafolio", "AgroEnlace", "Horus"],
      },
      {
        name: "SQL Server",
        level: "Aplicado en proyectos",
        projects: ["Business Intelligence", "Data Warehouse"],
      },
      {
        name: "MySQL",
        level: "Aplicado en proyectos",
        projects: ["Sistemas académicos"],
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
        projects: ["Dashboards empresariales"],
      },
      {
        name: "Qlik Script",
        level: "Aplicado en proyectos",
        projects: ["Carga y transformación de datos"],
      },
      {
        name: "Power BI",
        level: "Aplicado en proyectos",
        projects: ["Análisis y visualización"],
      },
      {
        name: "DAX",
        level: "Aplicado en proyectos",
        projects: ["Medidas e indicadores"],
      },
      {
        name: "Excel avanzado",
        level: "Uso frecuente",
        projects: ["Análisis", "Automatización", "Proyecciones"],
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
        projects: ["Dashboards", "Sistemas empresariales"],
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
        name: "pgAdmin",
        level: "Aplicado en proyectos",
        projects: ["PostgreSQL"],
      },
      {
        name: "Vite",
        level: "Aplicado en proyectos",
        projects: ["React", "AgroEnlace"],
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
        projects: ["Análisis de sistemas"],
      },
      {
        name: "UML",
        level: "Aplicado en proyectos",
        projects: ["Modelado de software"],
      },
      {
        name: "BPMN",
        level: "En consolidación",
        projects: ["Modelado de procesos"],
      },
      {
        name: "Levantamiento de requisitos",
        level: "Aplicado en proyectos",
        projects: ["Sistemas empresariales"],
      },
      {
        name: "Modelado de procesos",
        level: "Aplicado en proyectos",
        projects: ["Análisis funcional"],
      },
      {
        name: "Documentación técnica",
        level: "Uso frecuente",
        projects: ["README", "APIs", "Proyectos académicos"],
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
'@

    Write-Host ""
    Write-Host "3. Escribiendo layout y componentes..." `
        -ForegroundColor Yellow

    Write-Utf8File `
        -Path $layoutPath `
        -Content $layoutContent

    Write-Utf8File `
        -Path $pagePath `
        -Content $pageContent

    Write-Utf8File `
        -Path $skillsPath `
        -Content $skillsContent

    Write-Host "[OK] Componentes bilingues creados" `
        -ForegroundColor Green

    Write-Host ""
    Write-Host "4. Agregando estilos de preferencias..." `
        -ForegroundColor Yellow

    $css = [System.IO.File]::ReadAllText(
        $cssPath,
        [System.Text.Encoding]::UTF8
    )

    if ($css -notmatch "PREFERENCES_AND_LIGHT_THEME_V1") {
        $preferencesCss = @'

/* PREFERENCES_AND_LIGHT_THEME_V1 */

.language-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.035);
  padding: 0.2rem;
}

.language-switch-button {
  border: 0;
  border-radius: 9999px;
  background: transparent;
  padding: 0.42rem 0.58rem;
  color: #64748b;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition:
    background 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}

.language-switch-button:hover {
  color: #cbd5e1;
}

.language-switch-button-active {
  background: rgba(56, 189, 248, 0.14);
  color: #bae6fd;
  box-shadow: inset 0 0 0 1px rgba(56, 189, 248, 0.18);
}

.theme-toggle {
  display: inline-flex;
  width: 2.55rem;
  height: 2.55rem;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.035);
  color: #cbd5e1;
  cursor: pointer;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background 180ms ease,
    color 180ms ease;
}

.theme-toggle:hover {
  transform: translateY(-2px);
  border-color: rgba(56, 189, 248, 0.3);
  background: rgba(56, 189, 248, 0.08);
  color: #e0f2fe;
}

html[data-theme="light"] {
  --background: #f4f7fb;
  --foreground: #0f172a;
  --muted: #475569;
  --panel: rgba(255, 255, 255, 0.8);
  --panel-strong: rgba(255, 255, 255, 0.96);
  --border: rgba(15, 23, 42, 0.11);
  background: var(--background);
}

html[data-theme="light"] body {
  background:
    radial-gradient(
      circle at 15% 15%,
      rgba(14, 165, 233, 0.1),
      transparent 30%
    ),
    radial-gradient(
      circle at 85% 30%,
      rgba(99, 102, 241, 0.08),
      transparent 28%
    ),
    #f4f7fb;
  color: #0f172a;
}

html[data-theme="light"] body::before {
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.045) 1px, transparent 1px);
}

html[data-theme="light"] header {
  border-color: rgba(15, 23, 42, 0.08) !important;
  background: rgba(248, 250, 252, 0.84) !important;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.05);
}

html[data-theme="light"] .glass-panel {
  border-color: rgba(15, 23, 42, 0.11);
  background: rgba(255, 255, 255, 0.8);
  box-shadow:
    0 22px 55px rgba(15, 23, 42, 0.07),
    inset 0 1px 0 rgba(255, 255, 255, 0.85);
}

html[data-theme="light"] [class*="border-white/"] {
  border-color: rgba(15, 23, 42, 0.1) !important;
}

html[data-theme="light"] [class*="bg-white/"] {
  background-color: rgba(15, 23, 42, 0.035) !important;
}

html[data-theme="light"] [class~="text-slate-100"],
html[data-theme="light"] [class~="text-slate-200"],
html[data-theme="light"] [class~="text-slate-300"] {
  color: #1e293b !important;
}

html[data-theme="light"] [class~="text-slate-400"] {
  color: #475569 !important;
}

html[data-theme="light"] [class~="text-slate-500"] {
  color: #64748b !important;
}

html[data-theme="light"] [class~="text-slate-600"] {
  color: #64748b !important;
}

html[data-theme="light"] .text-gradient {
  background: linear-gradient(
    110deg,
    #0f172a 8%,
    #0284c7 50%,
    #6366f1 90%
  );
  background-clip: text;
  color: transparent;
}

html[data-theme="light"] .language-switch,
html[data-theme="light"] .theme-toggle,
html[data-theme="light"] .social-pill {
  border-color: rgba(15, 23, 42, 0.11);
  background: rgba(255, 255, 255, 0.72);
  color: #334155;
}

html[data-theme="light"] .language-switch-button {
  color: #64748b;
}

html[data-theme="light"] .language-switch-button-active {
  background: rgba(14, 165, 233, 0.11);
  color: #0369a1;
}

html[data-theme="light"] .skill-category-button {
  color: #64748b;
}

html[data-theme="light"] .skill-category-button:hover {
  border-color: rgba(15, 23, 42, 0.09);
  background: rgba(15, 23, 42, 0.035);
  color: #0f172a;
}

html[data-theme="light"] .skill-category-button-active {
  border-color: rgba(14, 165, 233, 0.18);
  background:
    linear-gradient(
      100deg,
      rgba(14, 165, 233, 0.1),
      rgba(99, 102, 241, 0.045)
    );
  color: #0f172a;
}

html[data-theme="light"] .skill-detail-card {
  border-color: rgba(15, 23, 42, 0.09);
  background: rgba(255, 255, 255, 0.65);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
}

html[data-theme="light"] .skill-detail-card:hover {
  border-color: rgba(14, 165, 233, 0.22);
  background: rgba(255, 255, 255, 0.94);
}

html[data-theme="light"] .process-card:hover {
  border-color: rgba(14, 165, 233, 0.2);
  background: rgba(255, 255, 255, 0.94);
}

html[data-theme="light"] .project-card::before {
  background: rgba(14, 165, 233, 0.08);
}

html[data-theme="light"] .status-offline {
  background: #f59e0b;
}

html[data-theme="light"] .whatsapp-floating {
  color: #ecfdf5;
}

@media (max-width: 640px) {
  .language-switch-button {
    padding-inline: 0.48rem;
    font-size: 0.64rem;
  }

  .theme-toggle {
    width: 2.35rem;
    height: 2.35rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .language-switch-button,
  .theme-toggle {
    transition: none;
  }
}
'@

        $css = $css.TrimEnd() +
            "`r`n" +
            $preferencesCss

        Write-Utf8File `
            -Path $cssPath `
            -Content $css
    }

    Write-Host "[OK] Tema claro y controles agregados" `
        -ForegroundColor Green

    Write-Host ""
    Write-Host "5. Ejecutando ESLint..." `
        -ForegroundColor Yellow

    npm run lint

    if ($LASTEXITCODE -ne 0) {
        throw "ESLint encontro errores."
    }

    Write-Host ""
    Write-Host "6. Creando compilacion..." `
        -ForegroundColor Yellow

    npm run build

    if ($LASTEXITCODE -ne 0) {
        throw "La compilacion fallo."
    }

    Set-Location $projectRoot

    Write-Host ""
    Write-Host "CAMBIOS PENDIENTES:" `
        -ForegroundColor Yellow

    git status --short

    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host " PREFERENCIAS CREADAS CORRECTAMENTE" `
        -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Modo inicial : Oscuro"
    Write-Host "Idioma inicial: Español"
    Write-Host "Desarrollo   : npm run dev (Webpack)"
    Write-Host ""
}
catch {
    Write-Host ""
    Write-Host "[ERROR] Restaurando archivos anteriores..." `
        -ForegroundColor Red

    Restore-File "layout.tsx" $layoutPath
    Restore-File "page.tsx" $pagePath
    Restore-File "globals.css" $cssPath
    Restore-File "SkillsExplorer.tsx" $skillsPath
    Restore-File "package.json" $packagePath

    Write-Host "[OK] Archivos restaurados" `
        -ForegroundColor Yellow

    throw
}
