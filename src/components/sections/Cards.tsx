import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import type { Project, Service } from "@/content/site";

export function ServiceCard({ s, index = 0, tone = "light" }: { s: Service; index?: number; tone?: "light" | "dark" }) {
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <Link href={`/servicos/${s.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-deep">
          <Image
            src={s.image}
            alt={s.imageAlt}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover grayscale-[35%] transition duration-[1.2s] ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/10 to-transparent" />
          <span className="absolute top-0 right-0 grid size-11 place-items-center bg-paper text-ink transition-colors group-hover:bg-signal">
            <Icon name="arrow" className="size-4" />
          </span>
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <Icon name={s.icon} className="mb-3 size-5 text-signal" />
            <h3 className="h-card">{s.title}</h3>
          </div>
        </div>
        <p className={`mt-4 text-sm leading-relaxed ${tone === "dark" ? "text-white/60" : "text-muted"}`}>{s.short}</p>
      </Link>
    </Reveal>
  );
}

/** Card largo de projeto: texto à esquerda sobre gradiente, foto ocupando tudo. */
export function ProjectFeature({ p, layout = "wide", delay = 0 }: { p: Project; layout?: "wide" | "column"; delay?: number }) {
  const column = layout === "column";
  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={`group relative isolate flex h-full overflow-hidden bg-abyss text-white ${
          column ? "min-h-[540px] md:min-h-[620px]" : "min-h-[460px] md:min-h-[520px]"
        }`}
      >
        <Image
          src={p.cover}
          alt={p.title}
          fill
          sizes={column ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1240px) 1160px, 100vw"}
          className="-z-20 object-cover transition duration-[1.6s] ease-out-expo group-hover:scale-[1.04]"
        />
        <div
          className={`absolute inset-0 -z-10 ${
            column
              ? "bg-gradient-to-t from-abyss via-abyss/60 to-abyss/10"
              : "bg-gradient-to-r from-abyss via-abyss/75 to-abyss/0 md:via-abyss/55"
          }`}
        />
        <div className={`flex flex-col justify-between p-6 md:p-10 ${column ? "w-full" : "max-w-md"}`}>
          <p className="eyebrow text-white/70">{p.category}</p>
          <div>
            <h3 className="text-3xl tracking-tight md:text-4xl">{p.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{p.summary}</p>
            <Link href={`/projetos/${p.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm underline underline-offset-4 after:absolute after:inset-0">
              Ver projeto <Icon name="arrowRight" className="size-4" />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function ProjectCard({ p, index = 0, tone = "light" }: { p: Project; index?: number; tone?: "light" | "dark" }) {
  const muted = tone === "dark" ? "text-white/55" : "text-muted";
  return (
    <Reveal delay={(index % 2) * 0.08}>
      <Link href={`/projetos/${p.slug}`} className="group block">
        <div className="relative aspect-[16/11] overflow-hidden bg-deep">
          <Image
            src={p.cover}
            alt={p.title}
            fill
            sizes="(min-width: 1024px) 580px, 100vw"
            className="object-cover transition duration-[1.2s] ease-out-expo group-hover:scale-105"
          />
          <span className="absolute top-0 right-0 grid size-11 place-items-center bg-paper text-ink transition-colors group-hover:bg-signal">
            <Icon name="arrow" className="size-4" />
          </span>
        </div>
        <p className={`eyebrow mt-5 ${muted}`}>{p.category}</p>
        <h3 className="h-card mt-2">{p.title}</h3>
        <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{p.summary}</p>
      </Link>
    </Reveal>
  );
}
