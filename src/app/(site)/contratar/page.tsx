import { Suspense } from "react";
import { HireForm } from "@/components/sections/HireForm";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink } from "@/components/ui/primitives";
import { company, whatsappLink } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contratar Serviço de Engenharia Naval e Portuária | SELL",
  description:
    "Peça orçamento de projeto naval, inspeção subaquática, ultrassom, içamento, salvatagem ou SST. Resposta da engenharia da SELL em até 1 dia útil.",
  path: "/contratar",
});

const steps = [
  { title: "Análise técnica", text: "Um engenheiro lê o pedido e, se preciso, liga para entender o cenário." },
  { title: "Visita ou reunião", text: "Levantamento em campo ou conversa técnica, conforme a demanda." },
  { title: "Proposta", text: "Escopo, prazo, entregáveis e valor por escrito." },
];

export default function ContratarPage() {
  return (
    <>
      <section className="container-x pt-36 pb-12 md:pt-44">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <h1 className="h-display">Contratar serviço.</h1>
          <p className="max-w-md text-muted md:justify-self-end">
            Conte o que você precisa. Nossa engenharia analisa o pedido e retorna com os próximos passos em até 1 dia útil.
          </p>
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="grid gap-px bg-line lg:grid-cols-[1fr_1.6fr]">
          <aside className="flex flex-col justify-between gap-10 bg-paper p-6 md:p-10">
            <div>
              <h2 className="text-2xl tracking-tight md:text-3xl">Como funciona</h2>
              <ol className="mt-8 divide-y divide-line border-y border-line">
                {steps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-2 py-5">
                    <span className="font-mono text-xs text-tide">0{i + 1}</span>
                    <span>
                      <span className="block text-[15px]">{s.title}</span>
                      <span className="mt-1 block text-sm text-muted">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="text-sm text-muted">Prefere conversar direto?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <ButtonLink href={whatsappLink("Olá, SELL! Gostaria de contratar um serviço.")} variant="signal">
                  <Icon name="whatsapp" className="size-4" /> WhatsApp
                </ButtonLink>
                <ButtonLink href={`tel:${company.phone.replace(/\s|-/g, "")}`} variant="ghost">
                  <Icon name="phone" className="size-4" /> {company.phoneDisplay}
                </ButtonLink>
              </div>
            </div>
          </aside>
          <div className="bg-paper p-6 md:p-10">
            <Suspense>
              <HireForm />
            </Suspense>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Contratar serviço", path: "/contratar" }])} />
    </>
  );
}
