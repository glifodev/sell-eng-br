import { ContactForm } from "@/components/sections/ContactForm";
import { Faq } from "@/components/sections/Faq";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink } from "@/components/ui/primitives";
import { company, faq, whatsappLink } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contato | SELL Engenharia Naval em São Luís - MA",
  description:
    "Solicite orçamento de engenharia naval, inspeção subaquática ou operação portuária em São Luís/MA. Fale com a SELL por telefone, e-mail ou WhatsApp.",
  path: "/contato",
});

export default function ContatoPage() {
  const a = company.address;
  const mapQuery = encodeURIComponent(`${a.street}, ${a.district}, ${a.city} - ${a.state}, ${a.postalCode}`);
  const channels = [
    { icon: "mail" as const, label: "Comercial", value: company.emails.comercial, href: `mailto:${company.emails.comercial}` },
    { icon: "mail" as const, label: "Engenharia", value: company.emails.engenharia, href: `mailto:${company.emails.engenharia}` },
    { icon: "mail" as const, label: "Naval", value: company.emails.naval, href: `mailto:${company.emails.naval}` },
    { icon: "phone" as const, label: "Telefone", value: company.phoneDisplay, href: `tel:${company.phone.replace(/\s|-/g, "")}` },
    { icon: "clock" as const, label: "Horário", value: company.hours },
  ];

  return (
    <>
      <section className="container-x pt-36 pb-12 md:pt-44">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <h1 className="h-display">Vamos conversar.</h1>
          <p className="max-w-md text-muted md:justify-self-end">
            Conte sobre a embarcação, a estrutura ou a operação. Quanto mais contexto, mais objetiva será nossa primeira conversa técnica.
          </p>
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="grid gap-px bg-line lg:grid-cols-[1fr_1.25fr]">
          <div className="flex flex-col justify-between gap-10 bg-paper p-6 md:p-10">
            <div>
              <h2 className="text-3xl tracking-tight md:text-4xl">Fale com a SELL</h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Atendimento direto com nossa engenharia para orçamentos, visitas técnicas e emergências operacionais.
              </p>
              <ButtonLink href={whatsappLink()} variant="signal" className="mt-6">
                <Icon name="whatsapp" className="size-4" /> Conversar no WhatsApp
              </ButtonLink>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {channels.map((c) => (
                <li key={c.label} className="flex items-center justify-between gap-4 py-4">
                  <span className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center bg-abyss text-white">
                      <Icon name={c.icon} className="size-4" />
                    </span>
                    <span className="text-[15px]">{c.label}</span>
                  </span>
                  {c.href ? (
                    <a href={c.href} className="text-right text-sm text-muted hover:text-ink">
                      {c.value}
                    </a>
                  ) : (
                    <span className="text-right text-sm text-muted">{c.value}</span>
                  )}
                </li>
              ))}
            </ul>
            <address className="flex gap-3 text-sm text-muted not-italic">
              <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-ink" />
              <span>
                {a.street}, {a.complement} — {a.district}
                <br />
                {a.city}/{a.state} · CEP {a.postalCode}
              </span>
            </address>
          </div>
          <div className="bg-paper p-6 md:p-10">
            <ContactForm />
          </div>
        </div>

        <div className="mt-3 aspect-[16/7] min-h-[280px] overflow-hidden bg-deep">
          <iframe
            title="Mapa da sede da SELL em São Luís"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="size-full border-0 grayscale-[60%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <Faq items={faq} tone="dark" />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Contato", path: "/contato" }])} />
    </>
  );
}
