import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/sections/Cards";
import { PageHero } from "@/components/sections/PageHero";
import { StressLegend } from "@/components/three/ModelShowcase";
import { WireScene } from "@/components/three/Scene";
import { modelInfo } from "@/components/three/wireModels";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArrowCard, ButtonLink, Eyebrow, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { areaServices, areas, getArea, projects, SITE_URL, whatsappLink } from "@/content/site";
import { posts } from "@/content/posts";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/areas/[slug]">) {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) return {};
  return pageMetadata({ title: a.seoTitle, description: a.seoDescription, path: `/areas/${a.slug}`, keywords: a.keywords });
}

export default async function AreaPage({ params }: PageProps<"/areas/[slug]">) {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) notFound();

  const svc = areaServices(a);
  const related = projects.filter((p) => p.services.some((s) => a.services.includes(s))).slice(0, 4);
  const articles = posts.filter((p) => p.area === a.slug).slice(0, 3);
  const others = areas.filter((o) => o.slug !== a.slug);

  return (
    <>
      <PageHero
        image={a.image}
        imageAlt={a.imageAlt}
        crumbs={[{ href: "/", label: "Início" }, { href: "/servicos", label: "Serviços" }, { label: a.title }]}
        title={a.title}
        lead={a.short}
      >
        <ButtonLink href={`/contratar?area=${a.slug}`} variant="light" arrow>
          Contratar serviço
        </ButtonLink>
        <ButtonLink href={whatsappLink(`Olá, SELL! Gostaria de falar sobre ${a.title}.`)} variant="ghost-dark">
          <Icon name="whatsapp" className="size-4" /> WhatsApp
        </ButtonLink>
      </PageHero>

      {/* Visão geral */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>Visão geral</Eyebrow>
            <Reveal>
              <p className="mt-8 text-[clamp(1.5rem,2.8vw,2.3rem)] leading-[1.2] tracking-[-0.025em] text-balance">{a.intro}</p>
            </Reveal>
          </div>
          <Reveal delay={0.08} className="border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <p className="eyebrow text-ink">Para quem</p>
            <ul className="mt-6 divide-y divide-line">
              {a.forWho.map((w) => (
                <li key={w} className="flex items-center gap-3 py-3.5 text-[15px]">
                  <span className="size-1.5 shrink-0 bg-signal" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Serviços da área */}
      <section className="relative isolate overflow-hidden bg-deep py-24 text-white md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_0%,#0b2c63,transparent_55%)]" aria-hidden="true" />
        <div className="container-x">
          <SectionHeader tone="light" eyebrow={`${svc.length} serviços`} title="O que entregamos nesta área" />
          <ol className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {svc.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 0.06} className="h-full">
                <Link
                  href={`/servicos/${s.slug}`}
                  className="group flex h-full flex-col border border-line-dark bg-abyss transition-colors duration-300 hover:border-signal/60 hover:bg-hull"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover grayscale-[40%] transition duration-700 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <span className="absolute top-0 right-0 grid size-11 place-items-center bg-white/90 text-ink transition-colors duration-300 group-hover:bg-signal">
                      <Icon name="arrow" className="size-4" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <Icon name={s.icon} className="size-6 text-signal" />
                    <h3 className="mt-5 text-[22px] leading-tight tracking-tight">{s.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{s.short}</p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {s.deliverables.slice(0, 3).map((d) => (
                        <li key={d} className="chip-dark">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Modelo */}
      <section className="relative isolate overflow-hidden bg-abyss text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_50%,#0b2c63_0%,transparent_60%)]" aria-hidden="true" />
        <div className="container-x grid items-center gap-8 py-20 md:py-28 lg:grid-cols-2">
          <div>
            <Eyebrow className="text-white/75">Engenharia em modelo</Eyebrow>
            <h2 className="h-section mt-5 text-balance">{modelInfo[a.model].title.split(" · ")[0]}</h2>
            <p className="mt-5 max-w-md text-white/65">{modelInfo[a.model].text}</p>
            <p className="mt-6 max-w-md text-xs text-white/40">Representação ilustrativa do tipo de leitura que entregamos em cada estudo.</p>
          </div>
          <div className="relative aspect-square w-full sm:aspect-[5/4]">
            <WireScene model={a.model} className="absolute inset-0" />
            <StressLegend className="absolute right-0 bottom-0" />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x py-24 md:py-32">
          <div className="flex items-end justify-between gap-6">
            <SectionHeader eyebrow="Aplicado em campo" title="Projetos nesta área" />
            <Link href="/projetos#portfolio" className="hidden text-sm underline underline-offset-4 sm:block">
              Todos os projetos
            </Link>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {related.map((p, i) => (
              <ProjectCard key={p.slug} p={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {articles.length > 0 && (
        <section className="border-t border-line">
          <div className="container-x py-20">
            <p className="eyebrow text-muted">Conteúdos relacionados</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((p) => (
                <ArrowCard key={p.slug} href={`/conteudos/${p.slug}`} title={p.title} text={`${p.readingMinutes} min de leitura`} className="min-h-[170px]" />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line">
        <div className="container-x py-20">
          <p className="eyebrow text-muted">Outras áreas de atuação</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <ArrowCard key={o.slug} href={`/areas/${o.slug}`} title={o.title} text={o.short} className="min-h-[170px]" />
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: a.title,
          itemListElement: svc.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title, url: `${SITE_URL}/servicos/${s.slug}` })),
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
          { name: a.title, path: `/areas/${a.slug}` },
        ])}
      />
    </>
  );
}
