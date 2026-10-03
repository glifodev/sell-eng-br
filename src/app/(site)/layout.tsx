import { Footer, WhatsAppFab } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
