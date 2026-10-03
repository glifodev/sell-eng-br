import { LegalPage } from "@/components/sections/LegalPage";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Termos de Uso | SELL",
  description: "Condições de uso do site da SELL Engenharia e Logística.",
  path: "/termos",
});

// TODO(cliente): revisar com assessoria jurídica antes da publicação.
export default function TermosPage() {
  return (
    <LegalPage title="Termos de Uso" updated="outubro de 2026">
      <p>Ao acessar este site você concorda com os termos abaixo. Se não concordar, recomendamos não utilizá-lo.</p>
      <h2>Conteúdo</h2>
      <p>
        As informações deste site têm caráter institucional e não substituem proposta técnica, laudo ou parecer de engenharia. Condições comerciais e
        técnicas são definidas exclusivamente em proposta formal.
      </p>
      <h2>Propriedade intelectual</h2>
      <p>
        Marca, logotipo, textos e fotografias de projetos pertencem à {company.legalName} ou são usados com autorização. Imagens de terceiros são
        utilizadas conforme suas licenças, indicadas na página de créditos de imagem.
      </p>
      <h2>Links externos</h2>
      <p>Não nos responsabilizamos pelo conteúdo de sites de terceiros eventualmente referenciados.</p>
      <h2>Alterações</h2>
      <p>Estes termos podem ser atualizados a qualquer momento, com publicação nesta página.</p>
      <h2>Foro</h2>
      <p>Fica eleito o foro da comarca de São Luís/MA para dirimir questões relacionadas a estes termos.</p>
    </LegalPage>
  );
}
