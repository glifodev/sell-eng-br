import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // prévia no GitHub Pages não deve ser indexada (evita conteúdo duplicado com o domínio oficial)
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
