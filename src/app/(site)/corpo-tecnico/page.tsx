import Image from "next/image";
import { CompetencyExplorer } from "@/components/sections/CompetencyExplorer";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { SITE_URL, team } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Corpo Técnico: Engenheiros Navais e Mecânicos | SELL",
  description:
    "Equipe multidisciplinar de engenheiros navais, mecânicos e ambientais da SELL, em São Luís/MA, pronta para projetos, inspeções e operações.",
  path: "/corpo-tecnico",
});

const initials = (n: string) =>
  n
    .split(" ")
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");


export default function CorpoTecnicoPage() {
  return (
    <>
      <PageHero
        image="/images/stock/solda-casco.jpg"
        imageAlt="Profissional realizando solda em abertura no costado de navio"
        crumbs={[{ href: "/", label: "Início" }, { label: "Corpo Técnico" }]}
        title="Um time multidisciplinar de engenharia."
        lead="Engenheiros navais, mecânicos e ambientais com experiência de campo e formação acadêmica sólida."
      >
        <ButtonLink href="/contato" variant="light" arrow>
          Qual a sua demanda?
        </ButtonLink>
      </PageHero>

      <section id="equipe" className="scroll-mt-24 container-x py-24 md:py-32">
        <SectionHeader eyebrow="Equipe" title="Quem assina a engenharia da SELL." />
        <ul className="mt-14 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal as="li" key={m.name} delay={(i % 3) * 0.06}>
              <div className="relative aspect-[4/5] overflow-hidden bg-abyss">
                {m.photo ? (
                  <Image src={m.photo} alt={m.name} fill sizes="(min-width: 1024px) 380px, 50vw" className="object-cover" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#0b2c63,#031330_70%)]">
                    <span className="text-6xl font-light tracking-tight text-white/85">{initials(m.name)}</span>
                    <svg className="absolute inset-x-0 bottom-0 h-24 w-full text-tide/40" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M0 60 Q50 40 100 60 T200 60 T300 60 T400 60" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M0 75 Q50 55 100 75 T200 75 T300 75 T400 75" fill="none" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                )}
                <span className="eyebrow absolute top-4 left-4 bg-white/10 px-2 py-1 text-white/80 backdrop-blur">{m.area}</span>
              </div>
              <h2 className="mt-5 text-xl tracking-tight">{m.name}</h2>
              <p className="mt-1 text-sm text-muted">{m.role}</p>
              {m.linkedin && (
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm hover:underline">
                  <Icon name="linkedin" className="size-4" /> LinkedIn
                </a>
              )}
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="relative isolate overflow-hidden bg-deep py-24 text-white md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_0%,#0b2c63,transparent_55%)]" aria-hidden="true" />
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader tone="light" eyebrow="Competências" title="Conhecimento técnico que cobre a operação inteira." />
            <p className="max-w-sm text-sm text-white/55">Selecione uma competência para ver o tipo de modelo de engenharia e os serviços em que ela é aplicada.</p>
          </div>
          <div className="mt-14">
            <CompetencyExplorer />
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": team.map((m) => ({
            "@type": "Person",
            name: m.name,
            jobTitle: m.role,
            worksFor: { "@id": `${SITE_URL}/#organizacao` },
          })),
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Corpo Técnico", path: "/corpo-tecnico" }])} />
    </>
  );
}
