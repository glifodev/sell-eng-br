"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Project } from "@/content/site";

const area = (p: Project) => p.category.split(" · ")[0];

/** Grade de projetos com filtro por área — versão para fundo escuro. */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const areas = ["Todos", ...Array.from(new Set(projects.map(area)))];
  const [active, setActive] = useState("Todos");
  const list = active === "Todos" ? projects : projects.filter((p) => area(p) === active);

  return (
    <div>
      <div role="tablist" aria-label="Filtrar projetos por área" className="flex flex-wrap gap-2">
        {areas.map((a) => {
          const count = a === "Todos" ? projects.length : projects.filter((p) => area(p) === a).length;
          return (
            <button
              key={a}
              role="tab"
              type="button"
              aria-selected={active === a}
              onClick={() => setActive(a)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] transition-colors ${
                active === a ? "border-signal bg-signal text-abyss" : "border-line-dark text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              {a}
              <span className={`font-mono text-[10px] ${active === a ? "text-abyss/60" : "text-white/40"}`}>{String(count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <li key={p.slug} className="animate-[fade_0.6s_ease-out_both]" style={{ animationDelay: `${i * 60}ms` }}>
            <Link
              href={`/projetos/${p.slug}`}
              className="group flex h-full flex-col border border-line-dark bg-deep transition-colors duration-300 hover:border-signal/60 hover:bg-hull"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 ease-out-expo group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/80 to-transparent transition-opacity duration-300 group-hover:opacity-40" />
                <span className="absolute top-0 right-0 grid size-11 place-items-center bg-white/90 text-ink transition-colors duration-300 group-hover:bg-signal">
                  <Icon name="arrow" className="size-4" />
                </span>
                <span className="eyebrow absolute bottom-4 left-4 bg-abyss/70 px-2 py-1 text-white/80 backdrop-blur">{area(p)}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[22px] leading-tight tracking-tight">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{p.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {p.scope.slice(0, 3).map((s) => (
                    <li key={s} className="chip-dark">
                      {s}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-2 border-t border-line-dark pt-4 text-sm text-white/80 transition-colors group-hover:text-signal">
                  Ver projeto <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
