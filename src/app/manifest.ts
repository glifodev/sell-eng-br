import type { MetadataRoute } from "next";
import { company } from "@/content/site";

export const dynamic = "force-static";

// Prévia no GitHub Pages é servida em /<repo>; caminhos aqui não recebem o basePath sozinhos.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: company.short,
    description: company.description,
    start_url: `${base}/`,
    display: "standalone",
    background_color: "#031330",
    theme_color: "#031330",
    lang: "pt-BR",
    icons: [
      { src: `${base}/icon.svg`, sizes: "any", type: "image/svg+xml" },
      { src: `${base}/icons/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${base}/icons/icon-512.png`, sizes: "512x512", type: "image/png" },
      { src: `${base}/icons/icon-maskable-512.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
