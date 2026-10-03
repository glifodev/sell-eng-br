import { company } from "@/content/site";

/**
 * Recebe o formulário de contato.
 * Envio por e-mail via Resend quando RESEND_API_KEY estiver definido
 * (CONTACT_TO opcional, padrão comercial@sell.eng.br; CONTACT_FROM precisa ser domínio verificado).
 */

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Requisição inválida." }, { status: 400 });
  }

  // honeypot: robôs preenchem, humanos não veem
  if (clean(body.empresa_site)) return Response.json({ ok: true });

  const data = {
    nome: clean(body.nome, 120),
    email: clean(body.email, 160),
    telefone: clean(body.telefone, 40),
    empresa: clean(body.empresa, 160),
    servico: clean(body.servico, 160),
    mensagem: clean(body.mensagem, 5000),
  };

  if (data.nome.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.mensagem.length < 10) {
    return Response.json({ error: "Preencha nome, e-mail válido e mensagem." }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[contato] RESEND_API_KEY ausente — mensagem não enviada:", data.email);
    return Response.json(
      { error: "O envio por formulário ainda não está configurado. Use o WhatsApp ou e-mail." },
      { status: 503 },
    );
  }

  const html = Object.entries(data)
    .map(([k, v]) => `<p><strong>${k}:</strong> ${escape(v).replace(/\n/g, "<br>")}</p>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? `Site SELL <site@sell.eng.br>`,
      to: [process.env.CONTACT_TO ?? company.emails.comercial],
      reply_to: data.email,
      subject: `Contato pelo site — ${data.nome}${data.servico ? ` (${data.servico})` : ""}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[contato] falha Resend", res.status, await res.text());
    return Response.json({ error: "Não foi possível enviar agora." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
