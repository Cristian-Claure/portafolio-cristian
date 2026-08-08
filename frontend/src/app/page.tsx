"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
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
import CvActions from "@/components/CvActions";
import MobileNavigation from "@/components/MobileNavigation";
import PortfolioProjects from "@/components/PortfolioProjects";
import ProfessionalExperience from "@/components/ProfessionalExperience";

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
  const [preferencesReady, setPreferencesReady] = useState(false);
  const [health, setHealth] = useState<HealthState>({
    loading: true,
    online: false,
    data: null,
  });

  const copy = translations[locale];
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
      setPreferencesReady(true);
    }, 0);

    return () => window.clearTimeout(restorePreferences);
  }, []);

  useEffect(() => {
    if (!preferencesReady) {
      return;
    }

    document.documentElement.lang = locale;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-locale", locale);
    localStorage.setItem("portfolio-theme", theme);
  }, [locale, theme, preferencesReady]);

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
            <a className="transition hover:text-white" href="#experiencia">
              {locale === "es" ? "Experiencia" : "Experience"}
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

            <MobileNavigation locale={locale} />
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

          <div className="mt-9 flex flex-col flex-wrap gap-4 sm:flex-row">
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
            <CvActions locale={locale} />
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

      <ProfessionalExperience locale={locale} />

      <SkillsExplorer locale={locale} />
      <PortfolioProjects locale={locale} />
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