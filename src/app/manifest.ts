import type { MetadataRoute } from "next";
import { company } from "@/content/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: company.short,
    description: company.description,
    start_url: "/",
    display: "standalone",
    background_color: "#07111c",
    theme_color: "#07111c",
    lang: "pt-BR",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
