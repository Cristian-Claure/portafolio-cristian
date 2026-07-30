import type { Metadata } from "next";
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
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}