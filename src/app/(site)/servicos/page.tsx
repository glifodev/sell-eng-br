import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { areaServices, areas, services } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Serviços de Engenharia Naval e Portuária | SELL",
  description:
    "Projetos navais, elementos finitos, END por ultrassom, mergulho e ROV, fundeio, salvatagem e SST. Soluções completas para portos e embarcações.",
  path: "/servicos",
});

export default function ServicosPage() {
  return (
    <>
      <PageHero
        image="/images/stock/osv-aereo.jpg"
        imageAlt="Embarcação de apoio offshore navegando vista do alto"
        crumbs={[{ href: "/", label: "Início" }, { label: "Serviços" }]}
        title="Projetando, gerenciando e operando."
        lead={`${services.length} serviços organizados em ${areas.length} áreas de atuação — do projeto conceitual à operação em campo, em portos, embarcações e estruturas.`}
      >
        <ButtonLink href="/contato" variant="light" arrow>
          Qual a sua demanda?
        </ButtonLink>
      </PageHero>

      {/* Índice de áreas */}
      <section className="border-b border-line">
        <div className="container-x">
          <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
            {areas.map((a, i) => (
              <li key={a.slug} className="bg-paper">
                <a href={`#${a.slug}`} className="group flex h-full flex-col gap-6 py-6 pr-4 transition-colors hover:text-tide sm:px-5">
                  <div className="flex items-center justify-between">
                    <Icon name={a.icon} className="size-5 text-tide" />
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <span className="text-[15px] leading-snug tracking-tight">{a.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {areas.map((a, ai) => (
        <section key={a.slug} id={a.slug} className="container-x scroll-mt-24 py-20 md:py-28 [&+&]:border-t [&+&]:border-line">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader eyebrow={`Área ${String(ai + 1).padStart(2, "0")} · ${a.services.length} serviços`} title={a.title} text={a.short} />
            <ButtonLink href={`/areas/${a.slug}`} variant="ghost" arrow>
              Visão geral da área
            </ButtonLink>
          </div>
          <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {areaServices(a).map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 3) * 0.06} className="h-full">
                <Link
                  href={`/servicos/${s.slug}`}
                  className="group flex h-full flex-col bg-paper text-ink transition-colors duration-300 hover:bg-abyss hover:text-white focus-visible:bg-abyss focus-visible:text-white"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-deep">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover grayscale-[60%] transition duration-700 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <span className="absolute top-0 right-0 grid size-11 place-items-center bg-paper text-ink transition-colors duration-300 group-hover:bg-signal">
                      <Icon name="arrow" className="size-4" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <Icon name={s.icon} className="size-6 text-tide transition-colors duration-300 group-hover:text-signal" />
                    <h3 className="mt-6 text-[22px] leading-tight tracking-tight">{s.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-white/65">{s.short}</p>
                    <span className="mt-6 inline-flex items-center gap-2 border-t border-line pt-4 text-sm transition-colors duration-300 group-hover:border-line-dark group-hover:text-signal">
                      Ver serviço <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ol>
        </section>
      ))}

      <section className="container-x pb-24 md:pb-32">
        <Link
          href="/contato"
          className="group flex flex-col justify-between gap-8 bg-signal p-6 text-abyss transition-colors duration-300 hover:bg-abyss hover:text-white md:flex-row md:items-end md:p-10"
        >
          <div>
            <p className="eyebrow opacity-70">Sob medida</p>
            <h2 className="mt-4 text-[26px] leading-tight tracking-tight md:text-3xl">Não encontrou o que precisa?</h2>
            <p className="mt-3 text-sm leading-relaxed opacity-75">Conte a sua demanda — nossa engenharia monta a solução.</p>
          </div>
          <Icon name="arrow" className="size-6 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Serviços", path: "/servicos" }])} />
    </>
  );
}
