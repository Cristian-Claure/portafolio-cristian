import { Download, FileText } from "lucide-react";
import type { Locale } from "@/data/projects";

type CvActionsProps = Readonly<{
  locale: Locale;
  cvUrl?: string;
}>;

export default function CvActions({
  locale,
  cvUrl = "/documents/cv-cristian-claure-pinto.pdf",
}: CvActionsProps) {
  const labels =
    locale === "es"
      ? { view: "Ver CV", download: "Descargar CV" }
      : { view: "View résumé", download: "Download résumé" };

  return (
    <div className="cv-actions">
      <a
        href={cvUrl}
        target="_blank"
        rel="noreferrer"
        className="cv-action cv-action-view"
      >
        <FileText className="h-4 w-4" />
        {labels.view}
      </a>
      <a
        href={cvUrl}
        download="CV-Cristian-Claure-Pinto.pdf"
        className="cv-action cv-action-download"
      >
        <Download className="h-4 w-4" />
        {labels.download}
      </a>
    </div>
  );
}
