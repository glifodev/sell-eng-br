import Image from "next/image";
import Link from "next/link";
import { LogoWordmark } from "@/components/brand/Logo";
import { OceanScene } from "@/components/three/Scene";
import { Icon } from "@/components/ui/Icon";
import { company, whatsappLink } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Links | SELL Engenharia e Logística",
  description: "Todos os canais da SELL Engenharia e Logística: WhatsApp, orçamento, serviços, projetos, redes sociais e localização.",
  path: "/links",
});

type Item = { label: string; sub?: string; href: string; icon: Parameters<typeof Icon>[0]["name"]; primary?: boolean };

export default function LinksPage() {
  const a = company.address;
  const items: Item[] = [
    { label: "Falar no WhatsApp", sub: company.phoneDisplay, href: whatsappLink(), icon: "whatsapp", primary: true },
    { label: "Solicitar orçamento", href: "/contato", icon: "arrow" },
    { label: "Nossos serviços", href: "/servicos", icon: "hull" },
    { label: "Projetos realizados", href: "/projetos", icon: "crane" },
    { label: "Corpo técnico", href: "/corpo-tecnico", icon: "cap" },
    { label: "Instagram", href: company.social.instagram, icon: "instagram" },
    { label: "LinkedIn", href: company.social.linkedin, icon: "linkedin" },
    { label: "E-mail comercial", sub: company.emails.comercial, href: `mailto:${company.emails.comercial}`, icon: "mail" },
    {
      label: "Como chegar",
      sub: `${a.district} · ${a.city}/${a.state}`,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${a.street}, ${a.city} - ${a.state}`)}`,
      icon: "pin",
    },
  ];

  return (
    <main id="conteudo" className="grain relative isolate min-h-dvh overflow-hidden bg-abyss text-white">
      <Image src="/images/stock/oceano-aereo.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-abyss/60 via-abyss/85 to-abyss" />
      <OceanScene className="absolute inset-x-0 bottom-0 -z-10 h-1/2 opacity-80" />

      <div className="mx-auto flex max-w-md flex-col items-center px-5 pt-16 pb-20">
        <Link href="/" aria-label="Ir para o site da SELL" className="grid size-20 place-items-center rounded-2xl border border-line-dark bg-white/5 backdrop-blur">
          <LogoWordmark className="h-5 w-auto text-white" />
        </Link>
        <h1 className="mt-6 text-2xl tracking-tight">{company.name}</h1>
        <p className="mt-2 text-center text-sm text-white/60">Engenharia naval, portuária e mecânica · São Luís/MA</p>

        <ul className="mt-10 w-full space-y-2.5">
          {items.map((it) => {
            const external = it.href.startsWith("http") || it.href.startsWith("mailto:");
            const cls = `group flex items-center gap-4 px-5 py-4 transition-colors ${
              it.primary ? "bg-signal text-abyss hover:bg-[#ffbe2e]" : "border border-line-dark bg-white/[0.04] backdrop-blur hover:bg-white/10"
            }`;
            const inner = (
              <>
                <Icon name={it.icon} className="size-5 shrink-0" />
                <span className="flex-1">
                  <span className="block text-[15px]">{it.label}</span>
                  {it.sub && <span className={`block text-xs ${it.primary ? "text-abyss/70" : "text-white/50"}`}>{it.sub}</span>}
                </span>
                <Icon name="arrow" className="size-4 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            );
            return (
              <li key={it.label}>
                {external ? (
                  <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>
                    {inner}
                  </a>
                ) : (
                  <Link href={it.href} className={cls}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-12 font-mono text-[10px] tracking-[0.16em] text-white/40 uppercase">sell.eng.br</p>
      </div>
    </main>
  );
}
