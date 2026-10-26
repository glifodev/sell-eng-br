"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { areaServices, areas, company, getArea, getService, whatsappLink } from "@/content/site";

/** No export estático (prévia no GitHub Pages) não há API: o formulário abre o e-mail pré-preenchido. */
const STATIC = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

const field =
  "w-full border border-line bg-fog/60 px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-mist focus:border-ink focus:bg-paper";

const ativos = ["Embarcação", "Balsa ou flutuante", "Estrutura portuária", "Equipamento / içamento", "Instalação industrial", "Outro"];

const urgencias = [
  { value: "emergencia", label: "Emergência", text: "Sinistro ou operação parada agora" },
  { value: "curto", label: "Até 30 dias", text: "Demanda próxima, já definida" },
  { value: "planejamento", label: "Planejamento", text: "Orçamento para avaliar" },
] as const;

/** Formulário de contratação. Lê ?servico=<slug> ou ?area=<slug> para pré-selecionar. */
export function HireForm() {
  const params = useSearchParams();
  const preService = getService(params.get("servico") ?? "");
  const preArea = preService ? undefined : getArea(params.get("area") ?? "");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [urgencia, setUrgencia] = useState<string>("curto");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const urg = urgencias.find((u) => u.value === data.urgencia)?.label ?? "";

    if (STATIC) {
      const body = [
        `Serviço: ${data.servico || "A definir"}`,
        data.area && `Área: ${data.area}`,
        `Urgência: ${urg}`,
        `Ativo: ${data.ativo}`,
        `Local: ${data.local}`,
        data.prazo && `Prazo desejado: ${data.prazo}`,
        "",
        data.mensagem,
        "",
        `Nome: ${data.nome}`,
        `Empresa: ${data.empresa}`,
        `E-mail: ${data.email}`,
        `Telefone: ${data.telefone}`,
      ]
        .filter((l) => l !== undefined && l !== "")
        .join("\n");
      const subject = `${data.urgencia === "emergencia" ? "[EMERGÊNCIA] " : ""}Contratar serviço — ${data.servico || "A definir"}`;
      window.location.href = `mailto:${company.emails.comercial}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ kind: "ok", message: "Abrimos seu aplicativo de e-mail com o pedido pronto para envio." });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, tipo: "contratacao" }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Não foi possível enviar agora.");
      form.reset();
      setStatus({ kind: "ok", message: "Pedido enviado. Nossa engenharia retorna em até 1 dia útil." });
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Erro ao enviar." });
    }
  }

  if (status.kind === "ok") {
    return (
      <div role="status" className="flex h-full flex-col justify-center gap-4">
        <p className="eyebrow text-tide">Pedido recebido</p>
        <p className="text-3xl tracking-tight">Obrigado. Vamos analisar a sua demanda.</p>
        <p className="text-sm text-muted">{status.message}</p>
        {urgencia === "emergencia" && (
          <a href={whatsappLink("Olá, SELL! Acabei de enviar um pedido de EMERGÊNCIA pelo site.")} className="btn btn-signal w-fit">
            Avisar pelo WhatsApp agora
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8">
      {/* honeypot anti-spam */}
      <input type="text" name="empresa_site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {preArea && <input type="hidden" name="area" value={preArea.title} />}

      <fieldset className="grid gap-5">
        <legend className="eyebrow mb-5 text-ink">01 · O que você precisa</legend>
        <label className="grid gap-2 text-sm">
          Serviço
          <select name="servico" className={field} defaultValue={preService?.title ?? ""}>
            <option value="">{preArea ? `Algum serviço de ${preArea.title}` : "Ainda não sei — quero orientação"}</option>
            {(preArea ? [preArea] : areas).map((a) => (
              <optgroup key={a.slug} label={a.title}>
                {areaServices(a).map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>

        <div className="grid gap-2 text-sm">
          <span>Urgência*</span>
          <div role="radiogroup" className="grid gap-2 sm:grid-cols-3">
            {urgencias.map((u) => (
              <label
                key={u.value}
                className={`cursor-pointer border p-4 transition-colors ${
                  urgencia === u.value ? (u.value === "emergencia" ? "border-red-700 bg-red-50" : "border-ink bg-paper") : "border-line bg-fog/60 hover:border-ink/40"
                }`}
              >
                <input type="radio" name="urgencia" value={u.value} checked={urgencia === u.value} onChange={() => setUrgencia(u.value)} className="sr-only" />
                <span className="block text-[15px]">{u.label}</span>
                <span className="mt-0.5 block text-xs text-muted">{u.text}</span>
              </label>
            ))}
          </div>
          {urgencia === "emergencia" && (
            <p className="text-sm text-red-800">
              Em emergência, ligue também para{" "}
              <a href={`tel:${company.phone.replace(/\s|-/g, "")}`} className="underline">
                {company.phoneDisplay}
              </a>{" "}
              ou{" "}
              <a href={whatsappLink("Olá, SELL! Tenho uma EMERGÊNCIA operacional.")} target="_blank" rel="noopener noreferrer" className="underline">
                chame no WhatsApp
              </a>
              .
            </p>
          )}
        </div>
      </fieldset>

      <fieldset className="grid gap-5">
        <legend className="eyebrow mb-5 text-ink">02 · Sobre a demanda</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            Tipo de ativo*
            <select name="ativo" required className={field} defaultValue="">
              <option value="" disabled>
                Selecione
              </option>
              {ativos.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Local*
            <input name="local" required placeholder="Porto, terminal, cidade" className={field} />
          </label>
        </div>
        <label className="grid gap-2 text-sm sm:max-w-[calc(50%-0.625rem)]">
          Prazo desejado
          <input name="prazo" type="date" className={field} />
        </label>
        <label className="grid gap-2 text-sm">
          Descreva a demanda*
          <textarea
            name="mensagem"
            required
            minLength={10}
            rows={5}
            placeholder="Embarcação ou estrutura, dimensões, o que aconteceu ou o que precisa ser feito."
            className={field}
          />
        </label>
      </fieldset>

      <fieldset className="grid gap-5">
        <legend className="eyebrow mb-5 text-ink">03 · Seus dados</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            Nome*
            <input name="nome" required minLength={2} autoComplete="name" className={field} />
          </label>
          <label className="grid gap-2 text-sm">
            Empresa
            <input name="empresa" autoComplete="organization" className={field} />
          </label>
          <label className="grid gap-2 text-sm">
            E-mail*
            <input name="email" type="email" required autoComplete="email" placeholder="voce@empresa.com.br" className={field} />
          </label>
          <label className="grid gap-2 text-sm">
            Telefone / WhatsApp*
            <input name="telefone" type="tel" required autoComplete="tel" placeholder="(98) 90000-0000" className={field} />
          </label>
        </div>
      </fieldset>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status.kind === "sending"} className="btn btn-dark justify-center disabled:opacity-60">
          {status.kind === "sending" ? "Enviando…" : "Enviar pedido"}
        </button>
        <p className="text-xs text-muted">
          Ao enviar, você concorda com a nossa{" "}
          <Link href="/privacidade" className="underline">
            Política de Privacidade
          </Link>
          .
        </p>
      </div>
      {status.kind === "error" && (
        <p role="alert" className="text-sm text-red-700">
          {status.message}{" "}
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="underline">
            Fale pelo WhatsApp
          </a>
          .
        </p>
      )}
    </form>
  );
}
