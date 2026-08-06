"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/data/projects";

type MobileNavigationProps = Readonly<{ locale: Locale }>;

const labels = {
  es: [
    ["Sobre mí", "#sobre-mi"],
    ["Experiencia", "#experiencia"],
    ["Habilidades", "#habilidades"],
    ["Proyectos", "#proyectos"],
    ["Proceso", "#proceso"],
    ["Contacto", "#contacto"],
  ],
  en: [
    ["About", "#sobre-mi"],
    ["Experience", "#experiencia"],
    ["Skills", "#habilidades"],
    ["Projects", "#proyectos"],
    ["Process", "#proceso"],
    ["Contact", "#contacto"],
  ],
} as const;

export default function MobileNavigation({
  locale,
}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    function handleDesktopChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    desktopQuery.addEventListener("change", handleDesktopChange);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      desktopQuery.removeEventListener("change", handleDesktopChange);
    };
  }, []);

  const toggleLabel =
    locale === "es"
      ? open
        ? "Cerrar navegación"
        : "Abrir navegación"
      : open
        ? "Close navigation"
        : "Open navigation";

  return (
    <>
      <button
        type="button"
        className="mobile-menu-toggle"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={toggleLabel}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div id="mobile-navigation" className="mobile-nav-panel">
          <nav
            aria-label={
              locale === "es" ? "Navegación móvil" : "Mobile navigation"
            }
          >
            {labels[locale].map(([label, href], index) => (
              <a href={href} onClick={() => setOpen(false)} key={href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}