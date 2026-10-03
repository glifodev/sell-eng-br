import Image from "next/image";
import Link from "next/link";
import { ProjectFeature, ServiceCard } from "@/components/sections/Cards";
import { ClientMarquee } from "@/components/sections/Clients";
import { Faq } from "@/components/sections/Faq";
import { MethodFlow } from "@/components/sections/MethodFlow";
import { ModelShowcase } from "@/components/three/ModelShowcase";
import { OceanScene } from "@/components/three/Scene";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArrowCard, ButtonLink, Eyebrow, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { faq, pillars, projects, services } from "@/content/site";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "SELL Engenharia Naval e Portuária | São Luís - MA",
  description:
    "Engenharia naval, portuária e mecânica em São Luís/MA: projetos, MEF, inspeção subaquática, END e salvatagem. Atendemos Itaqui e todo o Norte/Nordeste.",
  path: "/",
  keywords: ["engenharia naval São Luís", "engenharia naval Maranhão", "engenharia portuária", "arquitetura naval", "Porto do Itaqui"],
});

const roman = ["I", "II", "III", "IV"];

export default function Home() {
  const featured = services.slice(0, 3);
  const rest = services.slice(3);
  return (
    <>
      {/* HERO */}
      <section className="grain relative isolate flex min-h-[100svh] overflow-hidden bg-abyss text-white">
        <Image
          src="/images/stock/porto-noite.jpg"
          alt="Terminal portuário iluminado à noite com navio atracado e reflexos na água"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[50%_40%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-abyss via-abyss/40 to-abyss/60" />
        <OceanScene className="absolute inset-x-0 bottom-0 -z-10 h-[62%]" />

        <div className="container-x flex flex-col justify-end pt-32">
          <Reveal>
            <Eyebrow className="text-white/75">Engenharia naval · portuária · mecânica</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="h-display mt-6 max-w-[15ch] text-balance">Engenharia que mantém operações no mar em movimento.</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-pretty text-white/70 md:text-lg">
              Projetos, simulação, inspeção e operações para portos, embarcações e estruturas — com base em São Luís/MA e atuação em
              todo o Norte e Nordeste.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contato" variant="light" arrow>
                Solicitar orçamento
              </ButtonLink>
              <ButtonLink href="/projetos" variant="ghost-dark">
                Ver projetos
              </ButtonLink>
            </div>
          </Reveal>

          <div className="mt-20 flex items-center justify-between border-t border-line-dark py-5 font-mono text-[11px] tracking-[0.14em] text-white/60 uppercase">
            <span>
              São Luís · MA<span className="hidden md:inline"> — 02°31′S 44°18′W</span>
            </span>
            <span className="hidden sm:block">Complexo Portuário de São Luís</span>
            <span className="pr-16 sm:pr-0">Norte & Nordeste</span>
          </div>
        </div>
      </section>

      <ClientMarquee />

      {/* PILARES */}
      <section className="container-x py-24 md:py-36">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader eyebrow="Pilares" title="Experiência de campo, decisões baseadas em engenharia." />
            <ol className="mt-12 space-y-9">
              {pillars.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 0.06} className="grid grid-cols-[44px_1fr] gap-4">
                  <span className="grid size-8 place-items-center rounded-full border border-line font-mono text-[10px] text-muted">
                    {roman[i]}
                  </span>
                  <div>
                    <h3 className="text-[17px] tracking-tight">{p.title}</h3>
                    <p className="mt-1.5 text-sm text-muted">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal className="relative min-h-[520px] overflow-hidden bg-deep">
            <Image
              src="/images/sell/hero-guindaste-navio.jpg"
              alt="Equipe da SELL em operação de içamento junto ao costado de um navio"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss/70 to-transparent" />
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-4 bg-abyss/80 p-4 text-white backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-signal text-abyss">
                  <Icon name="hull" className="size-5" />
                </span>
                <div>
                  <p className="text-[15px]">Equipe multidisciplinar</p>
                  <p className="eyebrow text-white/55">Naval · Mecânica · Ambiental</p>
                </div>
              </div>
              <Link href="/corpo-tecnico" className="hidden items-center gap-2 text-sm hover:underline sm:flex">
                Conheça <Icon name="arrow" className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section className="relative isolate overflow-hidden bg-deep py-24 text-white md:py-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_0%,#13263a,transparent_55%)]" aria-hidden="true" />
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeader tone="light" eyebrow="Serviços" title="Soluções de engenharia para cada etapa da operação." />
            <ButtonLink href="/servicos" variant="ghost-dark" arrow>
              Todos os serviços
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s, i) => (
              <ServiceCard key={s.slug} s={s} index={i} tone="dark" />
            ))}
          </div>
          <ul className="mt-16 grid gap-px border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((s) => (
              <li key={s.slug} className="bg-deep">
                <Link
                  href={`/servicos/${s.slug}`}
                  className="group flex h-full items-start gap-3 p-5 transition-colors duration-300 hover:bg-signal hover:text-abyss"
                >
                  <Icon name={s.icon} className="mt-0.5 size-5 shrink-0 text-signal transition-colors group-hover:text-abyss" />
                  <span className="text-[15px] leading-snug tracking-tight">{s.title}</span>
                  <Icon name="arrow" className="ml-auto size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MÉTODO */}
      <MethodFlow />

      {/* MEF / FEA */}
      <section className="relative isolate overflow-hidden bg-abyss py-24 text-white md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_50%,#13263a_0%,transparent_60%)]" />
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader
              tone="light"
              eyebrow="Simulação estrutural"
              title="Antes do aço, o modelo."
              text="Simulamos cascos, olhais, sistemas de fundeio, estruturas treliçadas e guindastes para prever tensões e deformações — reforço onde precisa, economia onde dá."
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/servicos/analise-elementos-finitos-mef" variant="light" arrow>
                Conheça a análise MEF
              </ButtonLink>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-px bg-line-dark text-center">
              {[
                ["Tensão", "von Mises"],
                ["Fadiga", "ciclos"],
                ["Fator", "segurança"],
              ].map(([k, v]) => (
                <div key={k} className="bg-abyss px-3 py-4">
                  <dt className="text-sm">{k}</dt>
                  <dd className="eyebrow mt-1 text-white/50">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ModelShowcase />
        </div>
      </section>

      {/* PROJETOS */}
      <section className="container-x py-24 md:py-36">
        <SectionHeader align="center" eyebrow="Projetos" title="Engenharia comprovada em campo." />
        <div className="mt-14 grid gap-3 md:grid-cols-2">
          {projects.slice(0, 2).map((p, i) => (
            <ProjectFeature key={p.slug} p={p} layout="column" delay={i * 0.08} />
          ))}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
          <p className="flex items-center bg-paper px-6 py-5 text-sm text-muted">
            Fundeio, salvatagem, reforma estrutural, içamento, gestão de operação e capacitação.
          </p>
          <ArrowCard href="/projetos" title="Ver todos os projetos" tone="dark" className="min-h-[80px] sm:w-64" />
        </div>
      </section>

      <Faq items={faq} tone="dark" />
      <JsonLd data={faqJsonLd(faq)} />
    </>
  );
}
