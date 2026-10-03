# sell.eng.br — novo site

Redesign do site da **SELL Engenharia e Logística** (São Luís/MA). Next.js 16 (App Router, Turbopack) + Tailwind v4 + three.js (React Three Fiber) + Motion.

Linguagem visual inspirada no template **Elyte** (Framer): heros escuros com foto, rótulos em mono, títulos grandes em Geist, grids e cards com seta. O código foi escrito do zero, sem copiar o JS do Framer.

## Rodar

```bash
npm install
npm run dev          # http://localhost:3000 (use -p 3100 se a 3000 estiver ocupada)
npm run build && npm run start
```

Node ≥ 20.9.

## Estrutura

```
src/
  app/
    (site)/            páginas com header/footer
      page.tsx         Home
      servicos/        índice + [slug] (11 páginas de serviço)
      projetos/        índice + [slug] (6 cases)
      sobre/  corpo-tecnico/  contato/
      privacidade/  termos/  creditos/
    links/             página link-in-bio (sem header/footer)
    api/contato/       POST do formulário (Resend)
    sitemap.ts  robots.ts  manifest.ts  opengraph-image.tsx  icon.svg
  components/
    brand/Logo.tsx     marca nova (SVG)
    three/             OceanField (hero), HullWireframe (MEF), Scene (lazy + pausa fora da tela)
    sections/  layout/  ui/
  content/
    site.ts            TODO o conteúdo (empresa, serviços, projetos, equipe, FAQ)
    credits.json       autoria/licença das fotos de ambientação
  lib/seo.ts           metadata + JSON-LD (Organization, Service, FAQPage, Breadcrumb…)
public/
  images/stock/        fotos de ambientação 4K (Wikimedia Commons, ver /creditos)
  images/sell/         fotos próprias de projetos (site antigo)
  images/clientes/     logos de clientes
  brand/               logo em SVG (cor, branco, mono; wordmark e símbolo)
_legacy/               backup do site Wix antigo (HTML, mídia, inventário)
docs/                  SEO.md, BRAND.md
```

## Variáveis de ambiente (formulário de contato)

| Variável | Uso |
|---|---|
| `RESEND_API_KEY` | ativa o envio de e-mail. Sem ela, o formulário responde 503 e sugere WhatsApp. |
| `CONTACT_TO` | destino (padrão `comercial@sell.eng.br`) |
| `CONTACT_FROM` | remetente em domínio verificado no Resend (padrão `Site SELL <site@sell.eng.br>`) |

## SEO

- URLs em português, com **redirects 308** das URLs antigas do Wix (`next.config.ts`).
- Uma página por serviço, com title/description por cluster de palavra-chave (`docs/SEO.md`).
- JSON-LD: Organization + ProfessionalService (areaServed, knowsAbout, catálogo de serviços), Service, CreativeWork (cases), Person (equipe), FAQPage, BreadcrumbList.
- `sitemap.xml`, `robots.txt`, imagem OG gerada, canonical em todas as páginas.

## Pendências com o cliente (`TODO(cliente)` no código)

1. URLs reais de Instagram, LinkedIn e Facebook (`content/site.ts → company.social`).
2. Equipe: fotos individuais, mini-bio, CREA/LinkedIn e cargo de João Guilherme Santana.
3. Projetos: cliente, local, ano e números, quando autorizados.
4. Confirmar as coordenadas da sede e o horário de atendimento.
5. Revisão jurídica de Privacidade e Termos.
6. Revisar os textos de entregáveis e etapas de cada serviço.
7. Configurar `RESEND_API_KEY` no deploy.
