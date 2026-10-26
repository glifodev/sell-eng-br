import { PageHero } from "@/components/sections/PageHero";
import { RegionScene } from "@/components/three/Scene";
import { BASE, destinations } from "@/components/three/regionData";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArrowCard, ButtonLink, Eyebrow, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { company, whatsappLink } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Regiões Atendidas: Norte e Nordeste | SELL",
  description:
    "Base em São Luís/MA, no Complexo Portuário do Itaqui, com mobilização de engenharia naval e portuária para Belém, Manaus, Fortaleza, Recife e todo o Norte e Nordeste.",
  path: "/regioes",
  keywords: ["engenharia naval Belém", "engenharia naval Fortaleza", "engenharia portuária Norte", "engenharia naval Nordeste", "Porto do Itaqui"],
});

/** Distância em linha reta (km) entre dois pontos [lon, lat]. */
function km([lon1, lat1]: [number, number], [lon2, lat2]: [number, number]) {
  const r = (d: number) => (d * Math.PI) / 180;
  const a = Math.sin(r(lat2 - lat1) / 2) ** 2 + Math.cos(r(lat1)) * Math.cos(r(lat2)) * Math.sin(r(lon2 - lon1) / 2) ** 2;
  return Math.round((2 * 6371 * Math.asin(Math.sqrt(a))) / 10) * 10;
}

const regions = [
  {
    title: "Complexo Portuário de São Luís",
    tag: "Base",
    text: "Sede em São Luís, a poucos quilômetros do Porto do Itaqui e dos terminais da Baía de São Marcos. Atendimento técnico local, com visita no mesmo dia.",
    places: ["São Luís", "Porto do Itaqui", "Baía de São Marcos", "Interior do Maranhão"],
  },
  {
    title: "Norte e hidrovias da Amazônia",
    tag: "Mobilização",
    text: "Equipes mobilizadas para portos fluviais e marítimos da região Norte, incluindo operações de balsas e comboios nas hidrovias da Amazônia.",
    places: ["Belém", "Macapá", "Manaus", "Palmas"],
  },
  {
    title: "Nordeste",
    tag: "Mobilização",
    text: "Atendimento aos principais polos portuários e industriais do Nordeste, de Teresina a Salvador, com logística a partir de São Luís.",
    places: ["Teresina", "Fortaleza", "Natal", "Recife", "Salvador"],
  },
];

export default function RegioesPage() {
  const list = destinations.map((d) => ({ ...d, km: km(BASE, [d.lon, d.lat]) })).sort((a, b) => a.km - b.km);

  return (
    <>
      <PageHero
        image="/images/stock/sao-luis-centro.jpg"
        imageAlt="Litoral de São Luís na maré baixa"
        crumbs={[{ href: "/", label: "Início" }, { href: "/sobre", label: "Sobre" }, { label: "Regiões atendidas" }]}
        title="De São Luís para o Norte e o Nordeste."
        lead="Base no Complexo Portuário de São Luís e equipes prontas para mobilizar onde a operação estiver."
      >
        <ButtonLink href="/contato" variant="light" arrow>
          Atendemos a sua região?
        </ButtonLink>
        <ButtonLink href={whatsappLink("Olá, SELL! Gostaria de saber se vocês atendem a minha região.")} variant="ghost-dark">
          <Icon name="whatsapp" className="size-4" /> WhatsApp
        </ButtonLink>
      </PageHero>

      <section className="container-x py-24 md:py-32">
        <div className="grid gap-3 lg:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col gap-3">
            {regions.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06} className="flex flex-1 flex-col bg-paper p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <Eyebrow className="text-ink">{r.tag}</Eyebrow>
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </div>
                <h2 className="mt-5 text-2xl tracking-tight md:text-[28px]">{r.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{r.text}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {r.places.map((p) => (
                    <li key={p} className="chip">
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <figure className="relative isolate flex min-h-[520px] flex-col overflow-hidden bg-abyss text-white">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_60%_40%,#0b2c63,transparent_65%)]" aria-hidden="true" />
            <div className="flex items-start justify-between gap-4 p-6 pb-0">
              <div>
                <p className="eyebrow text-white/50">Mapa de atuação</p>
                <p className="mt-2 text-xl tracking-tight">Rotas a partir de São Luís</p>
              </div>
              <div className="hidden items-center gap-2 font-mono text-[10px] text-white/50 sm:flex">
                <span>base</span>
                <span className="h-1.5 w-24 bg-gradient-to-r from-[#f27a00] via-[#58c2b4] to-[#1d4f80]" />
                <span>distância</span>
              </div>
            </div>
            <RegionScene className="relative min-h-[380px] flex-1" />
            <figcaption className="border-t border-line-dark px-6 py-4 font-mono text-[10px] tracking-[0.12em] text-white/45 uppercase">
              Mapa ilustrativo · {company.address.city}/{company.address.state}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-deep py-24 text-white md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_0%,#0b2c63,transparent_55%)]" aria-hidden="true" />
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeader
            tone="light"
            eyebrow="Logística"
            title="Distância não é desculpa para engenharia improvisada."
            text="Planejamos a mobilização junto com a proposta: equipe, equipamentos, janela de maré e acesso ao local. Distâncias em linha reta a partir da base."
          />
          <ol className="divide-y divide-line-dark border-y border-line-dark">
            {list.map((d) => (
              <li key={d.name} className="flex items-center justify-between gap-6 py-4">
                <span className="flex items-center gap-3 text-lg tracking-tight">
                  <Icon name="pin" className="size-4 text-signal" />
                  {d.name}
                </span>
                <span className="font-mono text-sm text-white/55">≈ {d.km.toLocaleString("pt-BR")} km</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x py-24 md:py-32">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col justify-center bg-paper p-6 md:p-10">
            <p className="text-2xl tracking-tight md:text-3xl">Sua operação fica fora desta lista?</p>
            <p className="mt-2 text-sm text-muted">Conte onde está a embarcação ou a estrutura — avaliamos a mobilização para todo o território nacional.</p>
          </div>
          <ArrowCard href="/contato" title="Falar com a engenharia" text="Retorno em horário comercial" tone="dark" className="min-h-[140px] md:w-72" />
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Sobre", path: "/sobre" },
          { name: "Regiões atendidas", path: "/regioes" },
        ])}
      />
    </>
  );
}
