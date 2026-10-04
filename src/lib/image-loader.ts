/**
 * Loader usado apenas no export estático (GitHub Pages): não há otimizador de imagem no servidor,
 * então apontamos para as variantes WebP pré-geradas por scripts/build-images.mjs.
 * As larguras possíveis são as de src/lib/image-sizes.json (as mesmas configuradas no next.config).
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (/^https?:\/\//.test(src) || !src.startsWith("/images/") || /\.svg$/i.test(src)) return `${base}${src}`;
  return `${base}/_img${src.replace(/\.[a-z0-9]+$/i, "")}-${width}.webp`;
}
