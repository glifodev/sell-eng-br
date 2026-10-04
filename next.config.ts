import type { NextConfig } from "next";
import imageSizes from "./src/lib/image-sizes.json";

/**
 * Dois alvos de build:
 * - padrão (Vercel/Node): otimização de imagem, redirects 308 do site antigo, headers e API de contato.
 * - GITHUB_PAGES=true: export estático para o GitHub Pages (link de prévia), servido em /<repo>.
 */
const pages = process.env.GITHUB_PAGES === "true";
const basePath = pages ? process.env.NEXT_PUBLIC_BASE_PATH || "" : "";

const nextConfig: NextConfig = pages
  ? {
      output: "export",
      basePath,
      trailingSlash: true,
      images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts", ...imageSizes },
      env: { NEXT_PUBLIC_STATIC_EXPORT: "true", NEXT_PUBLIC_BASE_PATH: basePath },
    }
  : {
      images: {
        formats: ["image/avif", "image/webp"],
        qualities: [75, 85],
      },
      // URLs do site antigo (Wix) → novas rotas, preservando autoridade de SEO
      async redirects() {
        return [
          { source: "/about-us", destination: "/sobre", permanent: true },
          { source: "/about-us-1", destination: "/corpo-tecnico", permanent: true },
          { source: "/projects", destination: "/projetos", permanent: true },
          { source: "/projects-1", destination: "/projetos", permanent: true },
          { source: "/services", destination: "/servicos", permanent: true },
          { source: "/contact", destination: "/contato", permanent: true },
          { source: "/privacy-policy", destination: "/privacidade", permanent: true },
          { source: "/terms-and-conditions", destination: "/termos", permanent: true },
          { source: "/accessibility-statement", destination: "/", permanent: true },
        ];
      },
      async headers() {
        return [
          {
            source: "/:path*",
            headers: [
              { key: "X-Content-Type-Options", value: "nosniff" },
              { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
              { key: "X-Frame-Options", value: "SAMEORIGIN" },
              { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
            ],
          },
        ];
      },
    };

export default nextConfig;
