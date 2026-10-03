import credits from "@/content/credits.json";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Créditos de Imagem | SELL",
    description: "Autoria e licenças das fotografias de terceiros utilizadas no site da SELL.",
    path: "/creditos",
  }),
  robots: { index: false, follow: true },
};

export default function CreditosPage() {
  return (
    <LegalPage title="Créditos de imagem" updated="outubro de 2026">
      <p>
        Fotografias de projetos são de autoria da SELL. As imagens de ambientação abaixo vêm do Wikimedia Commons e são usadas conforme as licenças
        indicadas.
      </p>
      <ul>
        {credits.map((c) => (
          <li key={c.file}>
            <a href={c.source} target="_blank" rel="noopener noreferrer">
              {c.title}
            </a>{" "}
            — {c.author || "Autor desconhecido"} ·{" "}
            {c.licenseUrl ? (
              <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer">
                {c.license}
              </a>
            ) : (
              c.license
            )}
          </li>
        ))}
      </ul>
    </LegalPage>
  );
}
