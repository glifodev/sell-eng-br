import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/sections/Cards";
import { PageHero } from "@/components/sections/PageHero";
import { StressLegend } from "@/components/three/ModelShowcase";
import { WireScene } from "@/components/three/Scene";
import { modelInfo } from "@/components/three/wireModels";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArrowCard, ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { getService, projects, services, whatsappLink } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicos/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({ title: s.seoTitle, description: s.seoDescription, path: `/servicos/${s.slug}`, keywords: s.keywords });
}

export default async function ServicoPage({ params }: PageProps<"/servicos/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = projects.filter((p) => p.services.includes(s.slug)).slice(0, 2);
  const others = services.filter((o) => o.slug !== s.slug).slice(0, 4);

  return (
    <>
      <PageHero
        image={s.image}
        imageAlt={s.imageAlt}
        crumbs={[{ href: "/", label: "Início" }, { href: "/servicos", label: "Serviços" }, { label: s.title }]}
        title={s.title}
        lead={s.short}
      >
        <ButtonLink href="/contato" variant="light" arrow>
          Solicitar orçamento
        </ButtonLink>
        <ButtonLink href={whatsappLink(`Olá, SELL! Gostaria de falar sobre ${s.title}.`)} variant="ghost-dark">
          <Icon name="whatsapp" className="size-4" /> WhatsApp
        </ButtonLink>
      </PageHero>

      {/* Problema */}
      <section className="container-x py-24 md:py-32">
        <Eyebrow>O problema que resolvemos</Eyebrow>
        <Reveal>
          <p className="mt-8 max-w-4xl text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.18] tracking-[-0.025em] text-balance">{s.problem}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted">{s.intro}</p>
        </Reveal>

        <div className="mt-16 border-t border-line pt-10">
          <p className="eyebrow text-ink">Entregáveis</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {s.deliverables.map((d) => (
              <li key={d} className="chip">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Como funciona */}
      <section className="relative isolate overflow-hidden bg-deep py-24 text-white md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_0%,#13263a,transparent_55%)]" aria-hidden="true" />
        <div className="container-x">
          <h2 className="h-section md:pl-[calc(140px+2.5rem)]">Como funciona</h2>
          <ol className="mt-14">
            {s.steps.map((st, i) => (
              <Reveal as="li" key={st.title} className="grid gap-4 border-t border-line-dark py-8 md:grid-cols-[140px_1fr_1.3fr] md:gap-10">
                <span className="w-fit rounded-full border border-signal/40 px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-signal uppercase">
                  Etapa {i + 1}
                </span>
                <h3 className="text-xl tracking-tight">{st.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{st.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-abyss text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_50%,#13263a_0%,transparent_60%)]" aria-hidden="true" />
        <div className="container-x grid items-center gap-8 py-20 md:py-28 lg:grid-cols-2">
          <div>
            <Eyebrow className="text-white/75">Engenharia em modelo</Eyebrow>
            <h2 className="h-section mt-5 text-balance">{modelInfo[s.model].title.split(" · ")[0]}</h2>
            <p className="mt-3 font-mono text-xs tracking-[0.12em] text-signal uppercase">{modelInfo[s.model].title.split(" · ")[1]}</p>
            <p className="mt-5 max-w-md text-white/65">{modelInfo[s.model].text}</p>
            <p className="mt-6 max-w-md text-xs text-white/40">Representação ilustrativa do tipo de leitura que entregamos em cada estudo.</p>
          </div>
          <div className="relative aspect-square w-full sm:aspect-[5/4]">
            <WireScene model={s.model} className="absolute inset-0" />
            <StressLegend className="absolute right-0 bottom-0" />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x py-24 md:py-32">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow>Aplicado em campo</Eyebrow>
              <h2 className="h-section mt-5">Projetos relacionados</h2>
            </div>
            <Link href="/projetos" className="hidden text-sm underline underline-offset-4 sm:block">
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

      <section className="border-t border-line">
        <div className="container-x py-20">
          <p className="eyebrow text-muted">Outros serviços</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <ArrowCard key={o.slug} href={`/servicos/${o.slug}`} title={o.title} text={o.short} className="min-h-[170px]" />
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={serviceJsonLd(s)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
          { name: s.title, path: `/servicos/${s.slug}` },
        ])}
      />
    </>
  );
}
