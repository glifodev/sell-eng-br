import type { MetadataRoute } from "next";
import { areas, projects, services, SITE_URL, team } from "@/content/site";
import { posts } from "@/content/posts";

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
    ...areas.map((a) => page(`/areas/${a.slug}`, 0.85)),
    ...services.map((s) => page(`/servicos/${s.slug}`, 0.85)),
    page("/projetos", 0.8),
    ...projects.map((p) => page(`/projetos/${p.slug}`, 0.7)),
    page("/sobre", 0.7),
    page("/corpo-tecnico", 0.6),
    // perfis sem bio ficam fora (noindex)
    ...team.filter((m) => m.bio).map((m) => page(`/corpo-tecnico/${m.slug}`, 0.4)),
    page("/regioes", 0.7),
    page("/conteudos", 0.7),
    ...posts.map((p) => ({ ...page(`/conteudos/${p.slug}`, 0.6), lastModified: new Date(`${p.date}T12:00:00`) })),
    page("/carreiras", 0.4),
    page("/contratar", 0.9),
    page("/contato", 0.8),
    page("/links", 0.3),
    page("/privacidade", 0.2, "yearly"),
    page("/termos", 0.2, "yearly"),
  ];
}
