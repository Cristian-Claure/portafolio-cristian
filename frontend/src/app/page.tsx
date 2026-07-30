import {
  ArrowDown,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Code2,
  Database,
  GraduationCap,
  Mail,
  MessageCircle,
  UserRound,
  ServerCog,
  Sparkles,
} from "lucide-react";

type HealthResponse = {
  success: boolean;
  status: string;
  application: string;
  database: string;
  message: string;
  timestamp: string;
};

type HealthState = {
  online: boolean;
  data: HealthResponse | null;
};

async function getApiHealth(): Promise<HealthState> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8001/api";

  try {
    const response = await fetch(`${apiUrl}/health`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API respondió con estado ${response.status}`);
    }

    const data = (await response.json()) as HealthResponse;

    return {
      online: data.success === true,
      data,
    };
  } catch {
    return {
      online: false,
      data: null,
    };
  }
}

const skillGroups = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: ServerCog,
    skills: ["PHP", "Laravel", "Python", "Flask", "APIs REST"],
  },
  {
    title: "Datos y BI",
    icon: BarChart3,
    skills: ["Qlik Sense", "Business Intelligence", "Power BI", "Excel", "SQL"],
  },
  {
    title: "Bases de datos",
    icon: Database,
    skills: ["PostgreSQL", "SQL Server", "MySQL", "Modelado de datos"],
  },
];

const processSteps = [
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
];
const projects = [
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
];

export default async function Home() {
  const health = await getApiHealth();

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";

  const linkedinUrl =
    process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "";

  const whatsappMessage = encodeURIComponent(
    "Hola Cristian, vi tu portafolio y me gustaría conversar contigo."
  );

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#050a12]/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a
            href="#inicio"
            className="flex items-center gap-3 font-medium tracking-tight"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
              CC
            </span>

            <span className="hidden sm:block">Cristian Claure</span>
          </a>

          <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
            <a className="transition hover:text-white" href="#sobre-mi">
              Sobre mí
            </a>
            <a className="transition hover:text-white" href="#habilidades">
              Habilidades
            </a>
            <a className="transition hover:text-white" href="#proyectos">
              Proyectos
            </a>
                        <a className="transition hover:text-white" href="#proceso">
              Proceso
            </a>
<a className="transition hover:text-white" href="#contacto">
              Contacto
            </a>
          </div>

          <a
            href="mailto:cristianclaurepinto14@gmail.com"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:border-sky-400/30 hover:bg-sky-400/10"
          >
            Hablemos
          </a>
        </nav>
      </header>

      <section
        id="inicio"
        className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-8"
      >
        <div>
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <Sparkles className="h-4 w-4 text-sky-300" />
            Ingeniería, software y análisis de datos
          </div>

          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-sky-300">
            Portafolio profesional
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            Hola, soy{" "}
            <span className="text-gradient">Cristian Claure Pinto.</span>
          </h1>

          <h2 className="mt-6 max-w-3xl text-xl font-medium text-slate-200 sm:text-2xl">
            Desarrollador full stack y analista de datos.
          </h2>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-sky-300" />
              Santa Cruz de la Sierra, Bolivia
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Disponible para oportunidades
            </span>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Construyo aplicaciones web, APIs, soluciones empresariales y
            herramientas de inteligencia de negocios orientadas a resolver
            problemas reales.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#proyectos"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-400 px-6 py-3 font-medium text-slate-950 transition hover:bg-sky-300"
            >
              Ver proyectos
              <ArrowDown className="h-4 w-4" />
            </a>

            <a
              href="mailto:cristianclaurepinto14@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium transition hover:border-white/20 hover:bg-white/10"
            >
              Contactarme
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
                LinkedIn
              </a>
            )}

            <a
              href="https://github.com/Cristian-Claure"
              target="_blank"
              rel="noreferrer"
              className="social-pill"
            >
              <Code2 className="h-4 w-4" />
              GitHub
            </a>

            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="social-pill social-pill-whatsapp"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            )}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-slate-400">
            <span className="inline-flex items-center gap-3">
              <span
                className={`status-dot ${
                  health.online ? "status-online" : "status-offline"
                }`}
              />
              {health.online
                ? "Frontend, API y PostgreSQL conectados"
                : "API no disponible en este momento"}
            </span>

            {health.data && (
              <span className="rounded-full border border-white/10 px-3 py-1">
                Base: {health.data.database}
              </span>
            )}
          </div>
        </div>

        <aside className="glass-panel relative overflow-hidden rounded-3xl p-7 sm:p-9">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />

          <div className="relative">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Perfil actual
            </p>

            <h3 className="mt-4 text-2xl font-medium">
              Tecnología aplicada a resultados
            </h3>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-3xl font-semibold text-sky-300">10+</p>
                <p className="mt-2 text-sm text-slate-400">
                  Tecnologías utilizadas
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-3xl font-semibold text-indigo-300">3</p>
                <p className="mt-2 text-sm text-slate-400">
                  Áreas principales
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-4">
              {[
                "Desarrollo web full stack",
                "Business Intelligence",
                "Análisis y modelado de datos",
              ].map((item) => (
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
              Sobre mí
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Aprendizaje continuo y soluciones funcionales.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <article className="glass-panel rounded-2xl p-7">
              <BriefcaseBusiness className="h-6 w-6 text-sky-300" />
              <h3 className="mt-5 text-xl font-medium">Enfoque profesional</h3>
              <p className="mt-3 leading-7 text-slate-400">
                Desarrollo sistemas orientados a procesos reales, cuidando
                tanto la experiencia del usuario como la estructura técnica.
              </p>
            </article>

            <article className="glass-panel rounded-2xl p-7">
              <GraduationCap className="h-6 w-6 text-indigo-300" />
              <h3 className="mt-5 text-xl font-medium">Formación</h3>
              <p className="mt-3 leading-7 text-slate-400">
                Estudiante de Ingeniería en Sistemas en la Universidad
                Autónoma Gabriel René Moreno.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="habilidades"
        className="border-y border-white/5 bg-white/[0.015]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-300">
              Habilidades
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Una combinación de desarrollo, datos y negocio.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map(({ title, icon: Icon, skills }) => (
              <article
                key={title}
                className="glass-panel rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-400/25"
              >
                <Icon className="h-6 w-6 text-sky-300" />
                <h3 className="mt-5 text-lg font-medium">{title}</h3>

                <div className="mt-5 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="proyectos"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-300">
              Proyectos
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Experiencias que demuestran lo que sé construir.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-slate-500">
            Este contenido es inicial. Después agregaremos capturas, casos de
            estudio, repositorios y resultados reales.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`glass-panel project-card group flex min-h-80 flex-col rounded-2xl p-7 transition duration-300 hover:-translate-y-1 hover:border-sky-400/30 ${
                index < 2 ? "lg:col-span-6" : "lg:col-span-4"
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

              <h3 className="mt-8 text-2xl font-medium">{project.title}</h3>

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
                Cómo trabajo
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                Del problema a una solución funcional.
              </h2>

              <p className="mt-5 max-w-md leading-7 text-slate-400">
                No se trata solamente de escribir código. Primero entiendo el
                contexto y después construyo una solución que pueda utilizarse
                y mantenerse.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {processSteps.map(
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
      <section id="contacto" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="glass-panel overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-300">
                Contacto
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">
                ¿Tienes una idea, oportunidad o proyecto en el que podamos
                trabajar?
              </h2>

              <p className="mt-5 text-slate-400">
                Actualmente disponible para conversar sobre desarrollo de
                software, sistemas empresariales y análisis de datos.
              </p>
            </div>


            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href="mailto:cristianclaurepinto14@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-400 px-6 py-3 font-medium text-slate-950 transition hover:bg-sky-300"
              >
                <Mail className="h-4 w-4" />
                Enviar correo
              </a>

              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-6 py-3 font-medium text-emerald-200 transition hover:border-emerald-400/40 hover:bg-emerald-400/15"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
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
                  LinkedIn
                </a>
              )}

              <a
                href="https://github.com/Cristian-Claure"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium transition hover:bg-white/10"
              >
                <Code2 className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 Cristian Claure Pinto.</p>
          <p>Construido con Next.js, Laravel y PostgreSQL.</p>
        </div>
      </footer>
      {whatsappNumber && (
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noreferrer"
          className="whatsapp-floating"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="hidden sm:inline">
            WhatsApp
          </span>
        </a>
      )}
    </main>
  );
}