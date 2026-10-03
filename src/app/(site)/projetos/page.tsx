import { ProjectFeature } from "@/components/sections/Cards";
import { ClientMarquee } from "@/components/sections/Clients";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { StressLegend } from "@/components/three/ModelShowcase";
import { WireScene } from "@/components/three/Scene";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArrowCard, ButtonLink, Eyebrow, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { clients, projects, services } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projetos Navais e Portuários Realizados | SELL",
  description:
    "Cases de fundeio, reforço estrutural, içamento, salvatagem e gestão de operação no Complexo Portuário de São Luís e no Norte/Nordeste.",
  path: "/projetos",
});

const delivery = [
  { icon: "wave", title: "Levantamento", text: "Visita técnica, riscos, maré e restrições reais da operação." },
  { icon: "mesh", title: "Modelo", text: "Cálculo e simulação antes de mobilizar equipe e equipamentos." },
  { icon: "crane", title: "Campo", text: "Execução supervisionada, com rastreio de cada etapa." },
  { icon: "shield", title: "Entrega", text: "Relatório, documentação e recomendações de continuidade." },
] as const;

export default function ProjetosPage() {
  const [first, second] = projects;
  const facts = [
    [String(projects.length).padStart(2, "0"), "projetos em destaque"],
    [String(services.length).padStart(2, "0"), "especialidades aplicadas"],
    [String(clients.length).padStart(2, "0"), "clientes de referência"],
    ["N · NE", "área de atuação"],
  ];

  return (
    <div className="bg-abyss text-white">
      <PageHero
        image="/images/stock/guindaste-flutuante.jpg"
        imageAlt="Guindaste flutuante em operação no mar"
        crumbs={[{ href: "/", label: "Início" }, { label: "Projetos" }]}
        title="Projetos que demonstram precisão, segurança e resultado."
        lead="Cada operação começa com uma pergunta simples: qual é a restrição real? A partir dela, projetamos a solução certa e acompanhamos até a entrega."
      >
        <ButtonLink href="/contato" variant="signal" arrow>
          Falar sobre o seu projeto
        </ButtonLink>
        <a href="#portfolio" className="btn btn-ghost-dark">
          Ver portfólio <Icon name="chevron" className="size-4" />
        </a>
      </PageHero>

      {/* Números */}
      <section className="border-t border-line-dark">
        <div className="container-x">
          <dl className="grid grid-cols-2 gap-px bg-line-dark lg:grid-cols-4">
            {facts.map(([n, l]) => (
              <div key={l} className="flex flex-col bg-abyss py-8 pr-4 md:py-10 [&:nth-child(even)]:pl-6 lg:[&:not(:first-child)]:pl-8">
                <dt className="eyebrow order-2 mt-3 block text-white/50">{l}</dt>
                <dd className="-order-1 text-4xl tracking-tight md:text-5xl">{n}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ClientMarquee tone="dark" />

      {/* Destaques */}
      <section className="container-x py-24 md:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader tone="light" eyebrow="Em destaque" title="Engenharia sustentável, aplicada em campo." />
          <p className="max-w-sm text-sm text-white/55">Fundeio, salvatagem, reforma estrutural, içamento, gestão de operação e capacitação técnica.</p>
        </div>
        <div className="mt-14 grid gap-3 md:grid-cols-2">
          {[first, second].map((p, i) => (
            <ProjectFeature key={p.slug} p={p} layout="column" delay={i * 0.08} />
          ))}
        </div>
      </section>

      {/* Do modelo ao campo */}
      <section className="relative isolate overflow-hidden border-y border-line-dark bg-deep">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_50%,#13263a,transparent_60%)]" aria-hidden="true" />
        <div className="container-x grid items-center gap-10 py-20 md:py-28 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow className="text-white/75">Do modelo ao campo</Eyebrow>
            <h2 className="h-section mt-5 text-balance">Cada projeto nasce de um modelo — e só vai para a água depois de verificado.</h2>
            <ol className="mt-10 grid gap-px border border-line-dark bg-line-dark sm:grid-cols-2">
              {delivery.map((d, i) => (
                <Reveal as="li" key={d.title} delay={i * 0.06} className="bg-deep p-5">
                  <div className="flex items-center justify-between">
                    <Icon name={d.icon} className="size-5 text-signal" />
                    <span className="font-mono text-[11px] text-white/40">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-[17px] tracking-tight">{d.title}</h3>
                  <p className="mt-1.5 text-sm text-white/55">{d.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="relative aspect-square w-full sm:aspect-[5/4]">
            <WireScene model="mooring" className="absolute inset-0" />
            <StressLegend className="absolute right-0 bottom-0" />
          </div>
        </div>
      </section>

      {/* Portfólio filtrável */}
      <section id="portfolio" className="container-x scroll-mt-24 py-24 md:py-32">
        <SectionHeader tone="light" eyebrow="Portfólio" title="Todos os projetos" text="Filtre por área de atuação e conheça o desafio, a solução e o escopo de cada operação." />
        <div className="mt-12">
          <ProjectGrid projects={projects} />
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pb-24 md:pb-32">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col justify-center border border-line-dark bg-deep p-6 md:p-10">
            <p className="text-2xl tracking-tight md:text-3xl">Tem uma operação parecida pela frente?</p>
            <p className="mt-2 text-sm text-white/55">Conte o cenário — embarcação, local, prazo — e nossa engenharia propõe o caminho.</p>
          </div>
          <ArrowCard href="/contato" title="Solicitar orçamento" text="Atendimento técnico direto" className="min-h-[140px] md:w-72" />
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Projetos", path: "/projetos" }])} />
    </div>
  );
}
