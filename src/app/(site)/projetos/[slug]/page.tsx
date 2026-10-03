import Image from "next/image";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/sections/Cards";
import { PageHero } from "@/components/sections/PageHero";
import { WireScene } from "@/components/three/Scene";
import { modelInfo } from "@/components/three/wireModels";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArrowCard, ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { getProject, getService, projects } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata, projectJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({ title: `${p.title} — Projeto | SELL`, description: p.summary, path: `/projetos/${p.slug}` });
}

export default async function ProjetoPage({ params }: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const svc = p.services.map(getService).filter((s) => s !== undefined);
  const facts = [
    ["Categoria", p.category],
    ["Cliente", p.client],
    ["Local", p.location],
    ["Ano", p.year],
  ].filter(([, v]) => v) as [string, string][];
  const more = projects.filter((o) => o.slug !== p.slug).slice(0, 2);

  return (
    <div className="bg-abyss text-white">
      <PageHero
        image={p.cover}
        imageAlt={p.title}
        crumbs={[{ href: "/", label: "Início" }, { href: "/projetos", label: "Projetos" }, { label: p.title }]}
        title={p.title}
        lead={p.summary}
      />

      <section className="container-x py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[320px_1fr] lg:gap-20">
          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <dl className="divide-y divide-line-dark border-y border-line-dark">
              {facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-4 text-sm">
                  <dt className="eyebrow text-white/45">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <div>
              <p className="eyebrow text-white/45">Escopo</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.scope.map((s) => (
                  <li key={s} className="chip-dark">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden border border-line-dark bg-deep p-4 text-white">
              <p className="eyebrow text-white/50">Modelo de engenharia</p>
              <WireScene model={p.model} className="aspect-square w-full" />
              <p className="text-xs leading-relaxed text-white/60">{modelInfo[p.model].title}</p>
            </div>
            <ButtonLink href="/contato" variant="signal" arrow className="w-full justify-between">
              Projeto semelhante?
            </ButtonLink>
          </aside>

          <div>
            <Reveal>
              <Eyebrow className="text-white/75">Desafio</Eyebrow>
              <p className="mt-6 text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.25] tracking-[-0.02em] text-balance">{p.challenge}</p>
            </Reveal>
            <Reveal delay={0.08} className="mt-14">
              <Eyebrow className="text-white/75">Solução</Eyebrow>
              <p className="mt-6 text-lg leading-relaxed text-white/65">{p.solution}</p>
            </Reveal>

            <div className="mt-14 grid gap-3 sm:grid-cols-2">
              {p.gallery.map((src, i) => (
                <Reveal key={src} delay={i * 0.06} className={`relative overflow-hidden bg-deep ${i === 0 ? "aspect-[16/10] sm:col-span-2" : "aspect-[4/3]"}`}>
                  <Image src={src} alt={`${p.title} — registro ${i + 1}`} fill sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
                </Reveal>
              ))}
            </div>

            {svc.length > 0 && (
              <div className="mt-16">
                <p className="eyebrow text-white/45">Serviços envolvidos</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {svc.map((s) => (
                    <ArrowCard key={s.slug} href={`/servicos/${s.slug}`} title={s.title} text={s.short} tone="dark" className="border border-line-dark" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-line-dark bg-deep py-24 text-white md:py-32">
        <div className="container-x">
          <h2 className="h-section">Outros projetos</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {more.map((o, i) => (
              <ProjectCard key={o.slug} p={o} index={i} tone="dark" />
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={projectJsonLd(p)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Projetos", path: "/projetos" },
          { name: p.title, path: `/projetos/${p.slug}` },
        ])}
      />
    </div>
  );
}
