import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/site";
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
        lead="Uma solução de engenharia para cada necessidade — do projeto conceitual à operação em campo, em portos, embarcações e estruturas."
      >
        <ButtonLink href="/contato" variant="light" arrow>
          Qual a sua demanda?
        </ButtonLink>
      </PageHero>

      <section className="container-x py-24 md:py-32">
        <SectionHeader eyebrow={`${services.length} especialidades`} title="Engenharia integrada, uma equipe só." />
        <ol className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
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
                  <div className="flex items-center justify-between">
                    <Icon name={s.icon} className="size-6 text-tide transition-colors duration-300 group-hover:text-signal" />
                    <span className="font-mono text-xs text-muted transition-colors duration-300 group-hover:text-white/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-6 text-[22px] leading-tight tracking-tight">{s.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-white/65">{s.short}</p>
                  <span className="mt-6 inline-flex items-center gap-2 border-t border-line pt-4 text-sm transition-colors duration-300 group-hover:border-line-dark group-hover:text-signal">
                    Ver serviço <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
          <Reveal as="li" delay={0.12} className="h-full sm:col-span-2 lg:col-span-1">
            <Link
              href="/contato"
              className="group flex h-full min-h-[320px] flex-col justify-between bg-signal p-6 text-abyss transition-colors duration-300 hover:bg-abyss hover:text-white"
            >
              <Icon name="arrow" className="size-5 self-end transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <div>
                <p className="eyebrow opacity-70">Sob medida</p>
                <h2 className="mt-4 text-[26px] leading-tight tracking-tight">Não encontrou o que precisa?</h2>
                <p className="mt-3 text-sm leading-relaxed opacity-75">Conte a sua demanda — nossa engenharia monta a solução.</p>
              </div>
            </Link>
          </Reveal>
        </ol>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Serviços", path: "/servicos" }])} />
    </>
  );
}
