import type { MetadataRoute } from "next";
import { projects, services, SITE_URL } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "monthly" | "yearly" = "monthly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1),
    page("/servicos", 0.9),
    ...services.map((s) => page(`/servicos/${s.slug}`, 0.85)),
    page("/projetos", 0.8),
    ...projects.map((p) => page(`/projetos/${p.slug}`, 0.7)),
    page("/sobre", 0.7),
    page("/corpo-tecnico", 0.6),
    page("/contato", 0.8),
    page("/links", 0.3),
    page("/privacidade", 0.2, "yearly"),
    page("/termos", 0.2, "yearly"),
  ];
}
