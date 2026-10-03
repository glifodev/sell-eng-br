/**
 * Loader usado apenas no export estático (GitHub Pages): não há otimizador de imagem,
 * então o arquivo original é servido com o basePath do repositório.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (/^https?:\/\//.test(src)) return src;
  // ?w= mantém srcset válido; o Pages ignora a query e entrega o original
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}?w=${width}`;
}
