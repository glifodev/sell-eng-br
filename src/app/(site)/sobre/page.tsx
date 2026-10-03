import Image from "next/image";
import { ClientMarquee } from "@/components/sections/Clients";
import { PageHero } from "@/components/sections/PageHero";
import { WireScene } from "@/components/three/Scene";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArrowCard, ButtonLink, Eyebrow, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sobre a SELL | Engenharia e Logística em São Luís",
  description:
    "Conheça a SELL: engenharia naval, portuária e logística no Maranhão, com equipe experiente atuando para a Marinha do Brasil, operadores portuários e dragagem.",
  path: "/sobre",
});

const values = [
  { icon: "anchor", title: "Experiência é o nosso pilar", text: "Anos de atuação nas principais áreas da cadeia produtiva portuária e de construção." },
  { icon: "shield", title: "Segurança antes de tudo", text: "Nenhuma operação começa sem análise de risco, plano e responsáveis definidos." },
  { icon: "mesh", title: "Engenharia sobre palpite", text: "Decisões apoiadas por cálculo, simulação e medição — não por suposição." },
  { icon: "leaf", title: "Soluções sustentáveis", text: "Eficiência, conformidade ambiental e responsabilidade em cada novo projeto." },
] as const;

const region = ["São Luís", "Porto do Itaqui", "Ponta da Madeira", "Maranhão", "Pará", "Hidrovias da Amazônia", "Nordeste"];

export default function SobrePage() {
  return (
    <>
      <PageHero
        size="lg"
        ocean
        image="/images/stock/navio-nevoa.jpg"
        imageAlt="Navio fundeado em baía coberta por neblina"
        crumbs={[{ href: "/", label: "Início" }, { label: "Sobre" }]}
        title="Projetando resultados de sucesso."
        lead="Uma empresa de engenharia cujo pilar é a experiência — e o sucesso das operações que entrega."
      >
        <ButtonLink href="/contato" variant="light" arrow>
          Fale conosco
        </ButtonLink>
        <ButtonLink href="/projetos" variant="ghost-dark">
          Ver projetos
        </ButtonLink>
      </PageHero>

      <section className="container-x py-24 md:py-32">
        <SectionHeader eyebrow="Quem somos" title="Engenharia naval e logística feita por quem conhece a operação." />
        <div className="mt-12 grid gap-8 text-muted md:grid-cols-2 md:gap-14">
          <Reveal>
            <p className="leading-relaxed">
              A {company.name} conta com uma equipe altamente experiente e capacitada para as demandas do mercado de logística e operações navais —
              da construção e do projeto de embarcações à gestão da operação, ao treinamento de equipes e à adequação às normas.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="leading-relaxed">
              Nossos colaboradores acumulam anos de experiência nas principais áreas da cadeia produtiva portuária e de construção. Combinada, essa
              experiência é uma ferramenta poderosa para enfrentar desafios e alcançar resultados excepcionais. Nosso quadro técnico tem o know-how
              para colocar em prática qualquer demanda operacional.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-3">
          <div className="flex min-h-[150px] flex-col justify-between bg-paper p-6">
            <p className="text-sm">Sede</p>
            <p className="text-3xl tracking-tight">São Luís · MA</p>
          </div>
          <div className="flex min-h-[150px] flex-col justify-between bg-paper p-6">
            <p className="text-sm">Atuação</p>
            <p className="text-3xl tracking-tight">Norte & Nordeste</p>
          </div>
          <div className="flex min-h-[150px] flex-col justify-between bg-paper p-6">
            <p className="text-sm">Especialidades</p>
            <p className="text-3xl tracking-tight">Naval · Portuária · Mecânica · Ambiental</p>
          </div>
        </div>
      </section>

      <section className="mx-0 bg-abyss py-24 text-white md:mx-3 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div className="flex flex-col justify-between gap-12">
            <SectionHeader tone="light" eyebrow="Valores" title="Princípios que guiam cada operação." />
            <WireScene model="jacket" className="aspect-[4/3] w-full max-w-md" />
            <ArrowCard href="/corpo-tecnico" title="Conheça o corpo técnico" text="Engenheiros navais, mecânicos e ambientais." className="max-w-sm" />
          </div>
          <ul>
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.06} className="border-b border-line-dark py-7 first:pt-0">
                <Icon name={v.icon} className="size-5 text-signal" />
                <h3 className="mt-5 text-lg tracking-tight">{v.title}</h3>
                <p className="mt-1.5 text-sm text-white/60">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-24 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/3] overflow-hidden bg-deep">
            <Image
              src="/images/stock/itaqui-aluminio.jpg"
              alt="Lingotes de alumínio em vagões na área portuária de São Luís"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </Reveal>
          <div>
            <Eyebrow>Área de atuação</Eyebrow>
            <h2 className="h-section mt-5">No coração do Complexo Portuário de São Luís.</h2>
            <p className="mt-5 max-w-lg text-muted">
              Estamos onde a operação acontece: um dos maiores complexos portuários do país, com marés que ultrapassam seis metros, e porta de entrada
              para as hidrovias do Norte.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {region.map((r) => (
                <li key={r} className="chip">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ClientMarquee />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Sobre", path: "/sobre" }])} />
    </>
  );
}
