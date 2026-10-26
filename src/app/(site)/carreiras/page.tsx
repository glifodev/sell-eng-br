import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink, Eyebrow, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { company, competencies } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Trabalhe Conosco: Carreiras em Engenharia Naval | SELL",
  description:
    "Banco de talentos da SELL Engenharia e Logística: engenheiros navais, mecânicos, ambientais, técnicos de segurança e profissionais de operação em São Luís/MA.",
  path: "/carreiras",
});

// TODO(cliente): definir e-mail de RH/recrutamento; até lá, currículos vão para a engenharia.
const CAREERS_EMAIL = company.emails.engenharia;

const mailto = (area = "") =>
  `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Banco de talentos${area ? ` — ${area}` : ""}`)}&body=${encodeURIComponent(
    "Nome:\nCidade/UF:\nÁrea de interesse:\nFormação e registros (CREA, NRs, cursos):\nLinkedIn:\n\nCurrículo em anexo (PDF).",
  )}`;

const reasons = [
  { icon: "crane", title: "Campo e projeto", text: "Do cálculo à operação: quem projeta acompanha a execução e aprende com o resultado." },
  { icon: "shield", title: "Segurança em primeiro lugar", text: "Procedimentos, treinamento e autonomia para parar uma operação insegura." },
  { icon: "mesh", title: "Engenharia de verdade", text: "Simulação, modelagem e normas aplicadas a problemas reais de portos e embarcações." },
  { icon: "anchor", title: "Base em São Luís", text: "Atuação no Complexo Portuário de São Luís e em projetos por todo o Norte e Nordeste." },
] as const;

const steps = [
  { title: "Envio", text: "Mande seu currículo em PDF indicando a área de interesse." },
  { title: "Triagem", text: "A equipe técnica avalia formação, registros e experiência." },
  { title: "Conversa", text: "Entrevista técnica com os engenheiros da área." },
  { title: "Integração", text: "Treinamentos de segurança e acompanhamento nas primeiras operações." },
];

export default function CarreirasPage() {
  return (
    <>
      <PageHero
        image="/images/stock/rebocador.jpg"
        imageAlt="Rebocador navegando próximo ao porto"
        crumbs={[{ href: "/", label: "Início" }, { href: "/sobre", label: "Sobre" }, { label: "Carreiras" }]}
        title="Engenharia que vai ao cais. Venha com a gente."
        lead="Mantemos um banco de talentos permanente para engenheiros, técnicos e profissionais de operação."
      >
        <ButtonLink href={mailto()} variant="light" arrow>
          Enviar currículo
        </ButtonLink>
      </PageHero>

      <section className="container-x py-24 md:py-32">
        <SectionHeader eyebrow="Por que a SELL" title="Um lugar para quem gosta de resolver problemas reais." />
        <ul className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.06} className="bg-paper p-6">
              <Icon name={r.icon} className="size-6 text-tide" />
              <h2 className="mt-8 text-xl tracking-tight">{r.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="relative isolate overflow-hidden bg-deep py-24 text-white md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_0%,#0b2c63,transparent_55%)]" aria-hidden="true" />
        <div className="container-x">
          <SectionHeader tone="light" eyebrow="Áreas" title="Perfis que procuramos" text="Escolha a área e envie o currículo — o assunto do e-mail já vai preenchido." />
          <ul className="mt-14 grid gap-px border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
            {competencies.map((c) => (
              <li key={c.title} className="bg-deep">
                <a href={mailto(c.title)} className="group flex h-full flex-col gap-6 p-5 transition-colors duration-300 hover:bg-signal hover:text-abyss">
                  <div className="flex items-center justify-between">
                    <Icon name={c.icon} className="size-5 text-signal transition-colors group-hover:text-abyss" />
                    <Icon name="mail" className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <span className="text-[15px] leading-snug tracking-tight">{c.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <Eyebrow>Processo seletivo</Eyebrow>
            <h2 className="h-section mt-5 text-balance">Como funciona</h2>
            <p className="mt-5 max-w-md text-muted">
              Currículos ficam no banco de talentos e são consultados a cada nova vaga. Tratamos seus dados conforme a nossa{" "}
              <Link href="/privacidade" className="underline underline-offset-4">
                política de privacidade
              </Link>
              .
            </p>
            <ButtonLink href={mailto()} variant="dark" arrow className="mt-9">
              {CAREERS_EMAIL}
            </ButtonLink>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {steps.map((s, i) => (
              <li key={s.title} className="grid gap-2 py-6 sm:grid-cols-[110px_160px_1fr] sm:gap-6">
                <span className="font-mono text-xs tracking-[0.12em] text-tide uppercase">Etapa {i + 1}</span>
                <span className="text-lg tracking-tight">{s.title}</span>
                <span className="text-sm leading-relaxed text-muted">{s.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Sobre", path: "/sobre" },
          { name: "Carreiras", path: "/carreiras" },
        ])}
      />
    </>
  );
}
