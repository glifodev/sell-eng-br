import { LegalPage } from "@/components/sections/LegalPage";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Política de Privacidade | SELL",
  description: "Como a SELL Engenharia e Logística trata dados pessoais coletados pelo site, conforme a LGPD.",
  path: "/privacidade",
});

// TODO(cliente): revisar com assessoria jurídica antes da publicação.
export default function PrivacidadePage() {
  return (
    <LegalPage title="Política de Privacidade" updated="outubro de 2026">
      <p>
        Esta política explica como a {company.legalName} (“SELL”) coleta, usa e protege dados pessoais de quem visita este site, em conformidade com
        a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
      </p>
      <h2>Dados que coletamos</h2>
      <ul>
        <li>Dados informados no formulário de contato: nome, e-mail, telefone, empresa e conteúdo da mensagem.</li>
        <li>Dados técnicos de navegação, como endereço IP, tipo de navegador e páginas acessadas, para segurança e estatística.</li>
      </ul>
      <h2>Para que usamos</h2>
      <ul>
        <li>Responder solicitações, elaborar propostas e prestar os serviços contratados.</li>
        <li>Melhorar o funcionamento e a segurança do site.</li>
        <li>Cumprir obrigações legais e regulatórias.</li>
      </ul>
      <h2>Compartilhamento</h2>
      <p>
        Não vendemos dados pessoais. Podemos compartilhá-los apenas com prestadores que nos apoiam na operação do site e no envio de e-mails, sob
        obrigação de confidencialidade, ou quando exigido por lei.
      </p>
      <h2>Retenção</h2>
      <p>Mantemos os dados pelo tempo necessário ao atendimento da finalidade ou pelo prazo exigido em lei.</p>
      <h2>Seus direitos</h2>
      <p>
        Você pode solicitar acesso, correção, anonimização, portabilidade ou exclusão dos seus dados, além de revogar consentimentos, pelo e-mail{" "}
        <a href={`mailto:${company.emails.comercial}`}>{company.emails.comercial}</a>.
      </p>
      <h2>Cookies</h2>
      <p>Este site utiliza apenas cookies estritamente necessários ao seu funcionamento. Caso venhamos a usar cookies de análise, esta política será atualizada.</p>
      <h2>Contato</h2>
      <p>
        {company.legalName} — {company.address.street}, {company.address.complement}, {company.address.district}, {company.address.city}/
        {company.address.state}.
      </p>
    </LegalPage>
  );
}
