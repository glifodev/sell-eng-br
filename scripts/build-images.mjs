/**
 * Gera variantes responsivas (WebP) das imagens de public/images para o export estático
 * do GitHub Pages, onde não existe o otimizador do next/image.
 * Saída: public/_img/<caminho-sem-extensão>-<largura>.webp  (larguras em src/lib/image-sizes.json)
 * O loader em src/lib/image-loader.ts aponta para esses arquivos.
 */
import { readdir, mkdir, stat } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import { readFileSync } from "node:fs";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "public/images");
const OUT = join(ROOT, "public/_img");
const { deviceSizes, imageSizes } = JSON.parse(readFileSync(join(ROOT, "src/lib/image-sizes.json"), "utf8"));
const WIDTHS = [...new Set([...imageSizes, ...deviceSizes])].sort((a, b) => a - b);

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) yield p;
  }
}

const exists = (p) => stat(p).then(() => true, () => false);
let made = 0, bytes = 0;
const t0 = Date.now();
const jobs = [];
for await (const file of walk(SRC)) {
  const rel = relative(SRC, file).slice(0, -extname(file).length);
  jobs.push(async () => {
    const img = sharp(file, { failOn: "none" });
    const meta = await img.metadata();
    for (const w of WIDTHS) {
      const out = join(OUT, "images", `${rel}-${w}.webp`);
      if (await exists(out)) continue;
      await mkdir(dirname(out), { recursive: true });
      const info = await sharp(file, { failOn: "none" })
        .rotate()
        .resize({ width: Math.min(w, meta.width ?? w), withoutEnlargement: true })
        .webp({ quality: 72, effort: 4 })
        .toFile(out);
      made++;
      bytes += info.size;
    }
  });
}
// paralelismo limitado
const queue = [...jobs];
await Promise.all(Array.from({ length: 6 }, async () => { while (queue.length) await queue.shift()(); }));
console.log(`[build-images] ${jobs.length} imagens → ${made} variantes (${(bytes / 1e6).toFixed(1)} MB) em ${((Date.now() - t0) / 1000).toFixed(1)}s`);
