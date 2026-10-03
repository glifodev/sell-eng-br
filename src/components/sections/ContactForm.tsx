"use client";

import Link from "next/link";
import { useState } from "react";
import { company, services, whatsappLink } from "@/content/site";

/** No export estático (prévia no GitHub Pages) não há API: o formulário abre o e-mail pré-preenchido. */
const STATIC = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

const field =
  "w-full border border-line bg-fog/60 px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-mist focus:border-ink focus:bg-paper";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (STATIC) {
      const body = [`Nome: ${data.nome}`, `E-mail: ${data.email}`, `Telefone: ${data.telefone}`, `Empresa: ${data.empresa}`, `Serviço: ${data.servico}`, "", data.mensagem].join("\n");
      const subject = `Contato pelo site — ${data.nome}${data.servico ? ` (${data.servico})` : ""}`;
      window.location.href = `mailto:${company.emails.comercial}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ kind: "ok", message: "Abrimos seu aplicativo de e-mail com a mensagem pronta para envio." });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Não foi possível enviar agora.");
      form.reset();
      setStatus({ kind: "ok", message: "Mensagem enviada. Nossa equipe retornará em breve." });
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Erro ao enviar." });
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate={false}>
      {/* honeypot anti-spam */}
      <input type="text" name="empresa_site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          Nome*
          <input name="nome" required minLength={2} autoComplete="name" placeholder="Seu nome" className={field} />
        </label>
        <label className="grid gap-2 text-sm">
          E-mail*
          <input name="email" type="email" required autoComplete="email" placeholder="voce@empresa.com.br" className={field} />
        </label>
        <label className="grid gap-2 text-sm">
          Telefone / WhatsApp
          <input name="telefone" type="tel" autoComplete="tel" placeholder="(98) 90000-0000" className={field} />
        </label>
        <label className="grid gap-2 text-sm">
          Empresa
          <input name="empresa" autoComplete="organization" placeholder="Nome da empresa" className={field} />
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        Serviço de interesse
        <select name="servico" className={field} defaultValue="">
          <option value="">Selecione (opcional)</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Outro">Outro</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm">
        Mensagem*
        <textarea name="mensagem" required minLength={10} rows={6} placeholder="Descreva a embarcação, estrutura ou operação, local e prazo." className={field} />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status.kind === "sending"} className="btn btn-dark justify-center disabled:opacity-60">
          {status.kind === "sending" ? "Enviando…" : "Enviar mensagem"}
        </button>
        <p className="text-xs text-muted">
          Ao enviar, você concorda com a nossa{" "}
          <Link href="/privacidade" className="underline">
            Política de Privacidade
          </Link>
          .
        </p>
      </div>
      <p role="status" aria-live="polite" className={`text-sm ${status.kind === "error" ? "text-red-700" : "text-tide"}`}>
        {status.message}
        {status.kind === "error" && (
          <>
            {" "}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="underline">
              Fale pelo WhatsApp
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
