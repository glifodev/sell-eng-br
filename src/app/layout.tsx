import type { Metadata, Viewport } from "next";
import { Fragment_Mono, Geist } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { JsonLd } from "@/components/ui/JsonLd";
import { company, SITE_URL } from "@/content/site";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin", "latin-ext"], display: "swap" });
const fragment = Fragment_Mono({ variable: "--font-fragment", weight: "400", subsets: ["latin", "latin-ext"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SELL Engenharia Naval e Portuária | São Luís - MA",
    template: "%s | SELL Engenharia",
  },
  description: company.description,
  applicationName: company.name,
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  formatDetection: { telephone: true, email: true, address: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: company.name,
    url: "/",
    title: "SELL Engenharia Naval e Portuária | São Luís - MA",
    description: company.description,
  },
  twitter: { card: "summary_large_image" },
  robots:
    process.env.NEXT_PUBLIC_STATIC_EXPORT === "true"
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  category: "engineering",
};

export const viewport: Viewport = {
  themeColor: "#07111c",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${fragment.variable} antialiased`}>
      <body className="min-h-dvh">
        <a href="#conteudo" className="sr-only z-[100] bg-signal px-4 py-2 text-abyss focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Pular para o conteúdo
        </a>
        <SmoothScroll />
        {children}
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
