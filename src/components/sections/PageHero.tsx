import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/primitives";
import { OceanScene } from "@/components/three/Scene";

/** Hero escuro de página interna com imagem 4K de fundo. */
export function PageHero({
  title,
  lead,
  image,
  imageAlt = "",
  crumbs,
  children,
  ocean = false,
  size = "md",
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  image: string;
  imageAlt?: string;
  crumbs?: { href?: string; label: string }[];
  children?: React.ReactNode;
  ocean?: boolean;
  size?: "md" | "lg";
}) {
  return (
    <section className={`grain relative isolate flex overflow-hidden bg-abyss text-white ${size === "lg" ? "min-h-[88svh]" : "min-h-[72svh]"}`}>
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-abyss via-abyss/55 to-abyss/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-abyss/80 via-abyss/20 to-transparent" />
      {ocean && <OceanScene className="absolute inset-x-0 bottom-0 -z-10 h-[55%] opacity-70" />}

      <div className="container-x flex flex-col justify-end pt-36 pb-14 md:pb-20">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <h1 className="h-display mt-6 max-w-4xl text-balance">{title}</h1>
        {lead && <p className="mt-6 max-w-xl text-pretty text-white/70 md:text-lg">{lead}</p>}
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
