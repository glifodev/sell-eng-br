import Image from "next/image";
import Link from "next/link";
import { LogoWordmark } from "@/components/brand/Logo";
import { BackToTop } from "@/components/layout/BackToTop";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { company, nav, services, whatsappLink } from "@/content/site";

export function Footer() {
  const a = company.address;
  const tel = `tel:${company.phone.replace(/\s|-/g, "")}`;
  return (
    <footer className="relative isolate overflow-hidden bg-abyss text-white">
      {/* CTA */}
      <section className="relative isolate border-b border-line-dark">
        <Image src="/images/stock/porto-noite-azul.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-abyss/60 via-abyss/80 to-abyss" />
        <div className="container-x grid items-end gap-10 pt-28 pb-16 md:grid-cols-[1.4fr_1fr] md:pt-40 md:pb-20">
          <div>
            <Eyebrow className="text-white/75">Vamos conversar</Eyebrow>
            <p className="h-section mt-5 max-w-2xl text-balance">Seu próximo projeto naval começa com uma boa conversa técnica.</p>
          </div>
          <div className="flex flex-col gap-6 md:items-end">
            <p className="max-w-sm text-white/60 md:text-right">Engenharia naval, portuária e mecânica em São Luís/MA, com atuação em todo o Norte e Nordeste.</p>
            <div className="flex flex-wrap gap-2">
              <ButtonLink href="/contato" variant="signal" arrow>
                Solicitar orçamento
              </ButtonLink>
              <ButtonLink href={whatsappLink()} variant="ghost-dark">
                <Icon name="whatsapp" className="size-4" /> WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Colunas */}
      <div className="container-x">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <LogoWordmark className="h-7 w-auto text-white" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">{company.tagline} para portos, embarcações e estruturas — do projeto à operação em campo.</p>
            <div className="mt-8 flex gap-2">
              {(["instagram", "linkedin", "facebook"] as const).map((k) => (
                <a
                  key={k}
                  href={company.social[k]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={k}
                  className="grid size-10 place-items-center rounded-full border border-line-dark text-white/70 transition-colors hover:border-signal hover:bg-signal hover:text-abyss"
                >
                  <Icon name={k} className="size-[17px]" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Navegação" className="lg:col-span-2">
            {[{ href: "/", label: "Início" }, ...nav, { href: "/links", label: "Links" }].map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Serviços" className="lg:col-span-3">
            {services.slice(0, 6).map((s) => (
              <FooterLink key={s.slug} href={`/servicos/${s.slug}`}>
                {s.title}
              </FooterLink>
            ))}
            <li>
              <Link href="/servicos" className="mt-1 inline-flex items-center gap-1.5 text-sm text-signal hover:underline">
                Todos os serviços <Icon name="arrowRight" className="size-3.5" />
              </Link>
            </li>
          </FooterCol>

          <FooterCol title="Contato" className="lg:col-span-3">
            <li>
              <a href={tel} className="text-lg tracking-tight text-white hover:text-signal">
                {company.phoneDisplay}
              </a>
            </li>
            {Object.values(company.emails).map((e) => (
              <FooterLink key={e} href={`mailto:${e}`}>
                {e}
              </FooterLink>
            ))}
            <li className="pt-3">
              <address className="text-sm leading-relaxed text-white/55 not-italic">
                {a.street}, {a.complement}
                <br />
                {a.district} · {a.city}/{a.state} · {a.postalCode}
              </address>
            </li>
            <li className="eyebrow pt-2 text-white/40">{company.hours}</li>
          </FooterCol>
        </div>
      </div>

      {/* Marca d'água */}
      <div className="container-x pointer-events-none select-none" aria-hidden="true">
        <LogoWordmark className="h-auto w-full text-white/[0.05]" wave="rgb(242 169 0 / 0.18)" />
      </div>

      {/* Base */}
      <div className="border-t border-line-dark">
        <div className="container-x flex flex-col gap-4 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName} Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacidade" className="hover:text-white">
              Privacidade
            </Link>
            <Link href="/termos" className="hover:text-white">
              Termos
            </Link>
            <Link href="/creditos" className="hover:text-white">
              Créditos de imagem
            </Link>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, className = "", children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="eyebrow text-white/40">{title}</p>
      <ul className="mt-5 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("mailto:");
  const cls = "text-sm text-white/70 transition-colors hover:text-white";
  return (
    <li>
      {external ? (
        <a href={href} className={cls}>
          {children}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {children}
        </Link>
      )}
    </li>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp"
      className="fixed right-4 bottom-4 z-30 grid size-13 place-items-center rounded-full bg-signal text-abyss shadow-[0_10px_40px_-10px_rgba(242,169,0,0.7)] transition-transform hover:scale-105 md:right-6 md:bottom-6 md:size-14"
    >
      <Icon name="whatsapp" className="size-6" strokeWidth={1.8} />
    </a>
  );
}
