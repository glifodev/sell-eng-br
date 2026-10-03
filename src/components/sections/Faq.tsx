"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ArrowCard, Eyebrow } from "@/components/ui/primitives";

export function Faq({
  items,
  title = "Perguntas frequentes",
  tone = "light",
}: {
  items: { q: string; a: string }[];
  title?: string;
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState(0);
  const dark = tone === "dark";
  const line = dark ? "border-line-dark" : "border-line";
  return (
    <section className={dark ? "bg-deep text-white" : ""}>
      <div className="container-x py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <Eyebrow className={dark ? "text-white/75" : ""}>Dúvidas</Eyebrow>
              <h2 className="h-section mt-5 max-w-sm">{title}</h2>
            </div>
            <ArrowCard href="/contato" title="Não encontrou sua resposta?" text="Fale direto com nossa engenharia." className="max-w-sm" tone={dark ? "light" : "dark"} />
          </div>
          <ul className={`border-t ${line}`}>
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <li key={it.q} className={`border-b ${line}`}>
                  <h3>
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-6 py-6 text-left text-[17px] tracking-tight"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                    >
                      <span className={dark ? (isOpen ? "text-white" : "text-white/70") : isOpen ? "text-ink" : "text-ink/75"}>{it.q}</span>
                      <Icon name="plus" className={`mt-1 size-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                    </button>
                  </h3>
                  <div
                    id={`faq-${i}`}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <p className={`overflow-hidden pr-10 text-sm leading-relaxed ${dark ? "text-white/60" : "text-muted"}`}>
                      <span className="block pb-6">{it.a}</span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
