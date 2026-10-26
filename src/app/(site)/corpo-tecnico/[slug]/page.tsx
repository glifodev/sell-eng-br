import Link from "next/link";
import { notFound } from "next/navigation";
import { MemberAvatar } from "@/components/sections/MemberAvatar";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArrowCard, Breadcrumbs, ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { areaServices, getArea, getMember, team } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata, personJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/corpo-tecnico/[slug]">) {
  const { slug } = await params;
  const m = getMember(slug);
  if (!m) return {};
  return {
    ...pageMetadata({
      title: `${m.name} — ${m.role} | SELL`,
      description: m.bio ?? `${m.name}, ${m.role} no corpo técnico da SELL Engenharia e Logística, em São Luís/MA.`,
      path: `/corpo-tecnico/${m.slug}`,
    }),
    // perfil incompleto não entra no índice de busca
    ...(m.bio ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function MembroPage({ params }: PageProps<"/corpo-tecnico/[slug]">) {
  const { slug } = await params;
  const m = getMember(slug);
  if (!m) notFound();

  const memberAreas = m.areas.map(getArea).filter((a) => a !== undefined);
  const svc = memberAreas.flatMap(areaServices);
  const others = team.filter((o) => o.slug !== m.slug);

  return (
    <div className="bg-abyss text-white">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_0%,#0b2c63,transparent_60%)]" aria-hidden="true" />
        <div className="container-x grid gap-12 pt-36 pb-20 md:pb-28 lg:grid-cols-[360px_1fr] lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden bg-deep">
            <MemberAvatar m={m} sizes="(min-width: 1024px) 360px, 100vw" />
          </div>
          <div className="flex flex-col justify-end">
            <Breadcrumbs items={[{ href: "/", label: "Início" }, { href: "/corpo-tecnico", label: "Corpo Técnico" }, { label: m.name }]} />
            <h1 className="h-display mt-6 text-balance">{m.name}</h1>
            <p className="mt-4 font-mono text-sm tracking-[0.12em] text-signal uppercase">{m.role}</p>
            {m.bio && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70">{m.bio}</p>}

            <dl className="mt-10 grid max-w-2xl divide-y divide-line-dark border-y border-line-dark">
              <div className="flex justify-between gap-6 py-4 text-sm">
                <dt className="eyebrow text-white/45">Área</dt>
                <dd>{m.area}</dd>
              </div>
              {m.crea && (
                <div className="flex justify-between gap-6 py-4 text-sm">
                  <dt className="eyebrow text-white/45">Registro</dt>
                  <dd>{m.crea}</dd>
                </div>
              )}
              {m.education && m.education.length > 0 && (
                <div className="flex justify-between gap-6 py-4 text-sm">
                  <dt className="eyebrow text-white/45">Formação</dt>
                  <dd className="text-right">
                    {m.education.map((e) => (
                      <span key={e} className="block">
                        {e}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contato" variant="signal" arrow>
                Falar com a engenharia
              </ButtonLink>
              {m.linkedin && (
                <ButtonLink href={m.linkedin} variant="ghost-dark">
                  <Icon name="linkedin" className="size-4" /> LinkedIn
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </section>

      {memberAreas.length > 0 && (
        <section className="border-t border-line-dark bg-deep py-20 md:py-28">
          <div className="container-x">
            <Eyebrow className="text-white/75">Atuação</Eyebrow>
            <h2 className="h-section mt-5">Áreas e serviços</h2>
            <div className="mt-12 grid gap-3 md:grid-cols-2">
              {memberAreas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="group flex flex-col gap-6 border border-line-dark bg-abyss p-6 transition-colors hover:border-signal/60 hover:bg-hull"
                >
                  <div className="flex items-center justify-between">
                    <Icon name={a.icon} className="size-6 text-signal" />
                    <Icon name="arrow" className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-xl tracking-tight">{a.title}</h3>
                    <p className="mt-2 text-sm text-white/60">{a.short}</p>
                  </div>
                </Link>
              ))}
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {svc.map((s) => (
                <li key={s.slug}>
                  <Link href={`/servicos/${s.slug}`} className="chip-dark hover:border-signal">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-line-dark py-20">
        <div className="container-x">
          <p className="eyebrow text-white/45">Corpo técnico</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <ArrowCard key={o.slug} href={`/corpo-tecnico/${o.slug}`} title={o.name} text={o.role} tone="dark" className="border border-line-dark" />
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={personJsonLd(m)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Corpo Técnico", path: "/corpo-tecnico" },
          { name: m.name, path: `/corpo-tecnico/${m.slug}` },
        ])}
      />
    </div>
  );
}
