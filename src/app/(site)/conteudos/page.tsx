import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { getArea } from "@/content/site";
import { formatDate, posts } from "@/content/posts";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Conteúdos Técnicos de Engenharia Naval e Portuária | SELL",
  description:
    "Artigos da engenharia da SELL sobre inspeção de cascos, ultrassom, mergulho e ROV, salvatagem, içamento e segurança em operações portuárias.",
  path: "/conteudos",
});

export default function ConteudosPage() {
  const [first, ...rest] = posts;
  const firstArea = getArea(first.area);

  return (
    <>
      <PageHero
        image="/images/stock/navio-nevoa.jpg"
        imageAlt="Navio de grande porte navegando em meio à névoa"
        crumbs={[{ href: "/", label: "Início" }, { label: "Conteúdos" }]}
        title="Engenharia explicada por quem está em campo."
        lead="Artigos técnicos para armadores, operadores portuários e equipes de manutenção tomarem decisões melhores."
      />

      <section className="container-x py-24 md:py-32">
        <SectionHeader eyebrow="Em destaque" title="Último artigo" />
        <Reveal className="mt-12">
          <Link href={`/conteudos/${first.slug}`} className="group grid overflow-hidden bg-paper transition-colors duration-300 hover:bg-abyss hover:text-white lg:grid-cols-2">
            <div className="relative aspect-[16/10] overflow-hidden bg-deep lg:aspect-auto lg:min-h-[420px]">
              <Image
                src={first.cover}
                alt={first.coverAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition duration-700 ease-out-expo group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-between gap-10 p-6 md:p-10">
              <p className="eyebrow text-muted group-hover:text-white/60">
                {firstArea?.label} · {formatDate(first.date)}
              </p>
              <div>
                <h2 className="text-3xl leading-tight tracking-tight text-balance md:text-4xl">{first.title}</h2>
                <p className="mt-4 text-muted transition-colors group-hover:text-white/65">{first.excerpt}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm group-hover:text-signal">
                  Ler artigo · {first.readingMinutes} min <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>

        {rest.length > 0 && (
          <ul className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 3) * 0.06} className="h-full">
                <Link
                  href={`/conteudos/${p.slug}`}
                  className="group flex h-full flex-col bg-paper transition-colors duration-300 hover:bg-abyss hover:text-white"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-deep">
                    <Image
                      src={p.cover}
                      alt={p.coverAlt}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-700 ease-out-expo group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow text-muted group-hover:text-white/60">
                      {getArea(p.area)?.label} · {formatDate(p.date)}
                    </p>
                    <h3 className="mt-4 flex-1 text-[22px] leading-tight tracking-tight">{p.title}</h3>
                    <span className="mt-6 inline-flex items-center gap-2 border-t border-line pt-4 text-sm group-hover:border-line-dark group-hover:text-signal">
                      {p.readingMinutes} min de leitura <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </section>

      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Conteúdos", path: "/conteudos" }])} />
    </>
  );
}
