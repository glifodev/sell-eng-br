import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArrowCard, ButtonLink } from "@/components/ui/primitives";
import { getArea, getService, whatsappLink } from "@/content/site";
import { formatDate, getPost, posts } from "@/content/posts";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/conteudos/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return pageMetadata({ title: `${p.title} | SELL`, description: p.excerpt, path: `/conteudos/${p.slug}`, keywords: p.keywords });
}

export default async function ConteudoPage({ params }: PageProps<"/conteudos/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const area = getArea(p.area);
  const svc = p.services.map(getService).filter((s) => s !== undefined);
  const more = posts.filter((o) => o.slug !== p.slug).slice(0, 3);

  return (
    <>
      <PageHero
        image={p.cover}
        imageAlt={p.coverAlt}
        crumbs={[{ href: "/", label: "Início" }, { href: "/conteudos", label: "Conteúdos" }, { label: area?.label ?? "Artigo" }]}
        title={p.title}
        lead={p.excerpt}
      >
        <p className="eyebrow text-white/60">
          {formatDate(p.date)} · {p.readingMinutes} min de leitura · Equipe técnica SELL
        </p>
      </PageHero>

      <section className="container-x py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_300px] lg:gap-20">
          <article className="prose-sell max-w-3xl text-[17px]">
            {p.body.map((b, i) =>
              b.type === "h2" ? (
                <h2 key={i}>{b.text}</h2>
              ) : b.type === "ul" ? (
                <ul key={i}>
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              ) : (
                <p key={i} className="mt-4">
                  {b.text}
                </p>
              ),
            )}
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {area && (
              <Link href={`/areas/${area.slug}`} className="flex items-center justify-between gap-4 border border-line p-4 text-sm transition-colors hover:border-ink">
                <span>
                  <span className="eyebrow block text-muted">Área de atuação</span>
                  <span className="mt-1 block">{area.title}</span>
                </span>
                <Icon name="arrow" className="size-4 shrink-0" />
              </Link>
            )}
            {svc.length > 0 && (
              <div>
                <p className="eyebrow text-muted">Serviços relacionados</p>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {svc.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/servicos/${s.slug}`} className="flex items-center gap-3 py-3 text-sm hover:text-tide">
                        <Icon name={s.icon} className="size-4 shrink-0 text-tide" />
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="bg-abyss p-6 text-white">
              <p className="text-lg tracking-tight">Precisa de apoio técnico nesse tema?</p>
              <div className="mt-5 grid gap-2">
                <ButtonLink href="/contato" variant="signal" arrow className="justify-between">
                  Falar com a engenharia
                </ButtonLink>
                <ButtonLink href={whatsappLink(`Olá, SELL! Li o artigo "${p.title}" e gostaria de conversar.`)} variant="ghost-dark" className="justify-center">
                  <Icon name="whatsapp" className="size-4" /> WhatsApp
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {more.length > 0 && (
        <section className="border-t border-line">
          <div className="container-x py-20">
            <p className="eyebrow text-muted">Continue lendo</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((o) => (
                <ArrowCard key={o.slug} href={`/conteudos/${o.slug}`} title={o.title} text={`${o.readingMinutes} min de leitura`} className="min-h-[170px]" />
              ))}
            </div>
          </div>
        </section>
      )}

      <JsonLd data={articleJsonLd(p)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Conteúdos", path: "/conteudos" },
          { name: p.title, path: `/conteudos/${p.slug}` },
        ])}
      />
    </>
  );
}
