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