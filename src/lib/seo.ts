import type { Metadata } from "next";
import { company, SITE_URL, services, type Service, type Project } from "@/content/site";

export function pageMetadata({
  title,
  description,
  path,
  image,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: company.name,
      url: path,
      title,
      description,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const orgId = `${SITE_URL}/#organizacao`;

export function organizationJsonLd() {
  const a = company.address;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: company.name,
        legalName: company.legalName,
        url: SITE_URL,
        logo: `${SITE_URL}/brand/sell-wordmark.svg`,
        image: `${SITE_URL}/opengraph-image`,
        description: company.description,
        telephone: company.phone,
        email: company.emails.comercial,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${a.street}, ${a.complement}`,
          addressLocality: a.city,
          addressRegion: a.state,
          postalCode: a.postalCode,
          addressCountry: a.country,
        },
        geo: { "@type": "GeoCoordinates", latitude: a.geo.lat, longitude: a.geo.lng },
        areaServed: company.areaServed.map((name) => ({ "@type": "Place", name })),
        knowsAbout: [
          "Engenharia naval",
          "Arquitetura naval",
          "Engenharia portuária",
          "Engenharia mecânica",
          "Análise por elementos finitos",
          "Ensaios não destrutivos",
          "Inspeção subaquática",
          "Salvatagem",
          "Sistemas de fundeio",
          "Consultoria ambiental",
          "Segurança do trabalho",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços de engenharia naval e portuária",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, url: `${SITE_URL}/servicos/${s.slug}` },
          })),
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: company.phone,
            contactType: "customer service",
            areaServed: "BR",
            availableLanguage: ["Portuguese"],
          },
        ],
        sameAs: Object.values(company.social).filter((u) => u.split("/").filter(Boolean).length > 2),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#site`,
        url: SITE_URL,
        name: company.name,
        inLanguage: "pt-BR",
        publisher: { "@id": orgId },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function serviceJsonLd(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    description: s.seoDescription,
    url: `${SITE_URL}/servicos/${s.slug}`,
    image: `${SITE_URL}${s.image}`,
    provider: { "@id": orgId },
    areaServed: company.areaServed.map((name) => ({ "@type": "Place", name })),
  };
}

export function projectJsonLd(p: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.summary,
    url: `${SITE_URL}/projetos/${p.slug}`,
    image: `${SITE_URL}${p.cover}`,
    creator: { "@id": orgId },
    inLanguage: "pt-BR",
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
