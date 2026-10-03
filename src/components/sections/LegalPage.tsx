import { Breadcrumbs } from "@/components/ui/primitives";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <section className="container-x pt-36 pb-24 md:pt-44">
      <Breadcrumbs tone="dark" items={[{ href: "/", label: "Início" }, { label: title }]} />
      <h1 className="h-section mt-6">{title}</h1>
      <p className="eyebrow mt-4 text-muted">Atualizado em {updated}</p>
      <div className="prose-sell mt-10 max-w-3xl">{children}</div>
    </section>
  );
}
