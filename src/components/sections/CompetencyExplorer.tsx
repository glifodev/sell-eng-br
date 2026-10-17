"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { StressLegend } from "@/components/three/ModelShowcase";
import { WireScene } from "@/components/three/Scene";
import { modelInfo } from "@/components/three/wireModels";
import { Icon } from "@/components/ui/Icon";
import { competencies, getService, team } from "@/content/site";

const CYCLE_MS = 6000;

const initials = (n: string) =>
  n
    .split(" ")
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");

/** Lista de competências selecionável (acordeão) + painel com o modelo de engenharia correspondente. */
export function CompetencyExplorer() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [locked, setLocked] = useState(false); // após clique do usuário, para o ciclo automático
  const reduce = useReducedMotion();
  const auto = !reduce && !locked && !hover;

  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % competencies.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [active, auto]);

  const c = competencies[active];
  const info = modelInfo[c.model];
  const areas = Array.from(new Set(team.flatMap((m) => m.area.split(" e ")).map((a) => a[0].toUpperCase() + a.slice(1))));

  return (
    <div
      className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Lista */}
      <div className="order-2 flex flex-col border border-line-dark lg:order-1">
        <ol role="tablist" aria-label="Competências técnicas" className="flex flex-1 flex-col">
          {competencies.map((item, i) => {
            const on = i === active;
            const related = item.services.map(getService).filter((s) => s !== undefined);
            return (
              <li key={item.title} className={`flex flex-col border-b border-line-dark ${on ? "bg-hull" : "flex-1"}`}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="competencia-painel"
                  onClick={() => {
                    setActive(i);
                    setLocked(true);
                  }}
                  className={`group relative flex w-full flex-1 items-center gap-4 px-5 py-4 text-left transition-colors duration-300 ${
                    on ? "text-white" : "text-white/65 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  <span className={`absolute inset-y-0 left-0 w-0.5 transition-colors ${on ? "bg-signal" : "bg-transparent"}`} aria-hidden="true" />
                  <span className="font-mono text-[11px] text-white/35">{String(i + 1).padStart(2, "0")}</span>
                  <Icon name={item.icon} className={`size-5 shrink-0 transition-colors ${on ? "text-signal" : "text-tide-soft/70 group-hover:text-signal"}`} />
                  <span className="flex-1 text-[15px] tracking-tight">{item.title}</span>
                  <Icon name="chevron" className={`size-4 transition-transform duration-300 ${on ? "rotate-180 text-signal" : "opacity-40 group-hover:opacity-80"}`} />
                </button>

                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      key="detalhe"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="relative overflow-hidden"
                    >
                      <div className="pr-5 pb-5 pl-[68px]">
                        <p className="text-sm leading-relaxed text-white/60">{item.text}</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {related.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/servicos/${s.slug}`}
                                className="inline-flex items-center gap-1.5 rounded-full border border-line-dark px-3 py-1.5 text-xs text-white/75 transition-colors hover:border-signal hover:text-signal"
                              >
                                {s.title} <Icon name="arrow" className="size-3" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {auto && (
                        <motion.span
                          key={`p-${active}`}
                          className="absolute bottom-0 left-0 h-px bg-signal"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                          aria-hidden="true"
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>

        {/* Equipe por trás das competências */}
        <a href="#equipe" className="group flex items-center gap-4 bg-white/[0.02] px-5 py-4 transition-colors hover:bg-white/[0.05]">
          <span className="flex -space-x-2" aria-hidden="true">
            {team.map((m) => (
              <span
                key={m.name}
                className="grid size-9 place-items-center rounded-full border-2 border-deep bg-hull font-mono text-[10px] tracking-tight text-white/85"
                title={m.name}
              >
                {initials(m.name)}
              </span>
            ))}
          </span>
          <span className="flex-1">
            <span className="block text-sm text-white">{team.length} profissionais</span>
            <span className="block font-mono text-[10px] tracking-[0.12em] text-white/45 uppercase">{areas.join(" · ")}</span>
          </span>
          <Icon name="arrow" className="size-4 text-white/50 transition-colors group-hover:text-signal" />
        </a>
      </div>

      {/* Painel */}
      <div id="competencia-painel" role="tabpanel" className="relative order-1 flex flex-col overflow-hidden border border-line-dark bg-abyss lg:order-2">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#0b2c63,transparent_65%)]" aria-hidden="true" />
        <div className="relative flex items-center justify-between px-6 pt-5">
          <span className="font-mono text-[11px] tracking-[0.14em] text-white/45 uppercase">
            {String(active + 1).padStart(2, "0")} / {String(competencies.length).padStart(2, "0")}
          </span>
          <StressLegend />
        </div>

        <div className="relative aspect-[4/3] w-full flex-1 sm:aspect-[16/10]">
          {/* remonta só quando o modelo muda, com fade */}
          <WireScene key={c.model} model={c.model} className="absolute inset-0 animate-[fade_0.8s_ease-out]" />
        </div>

        <div className="relative border-t border-line-dark p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={c.model + active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono text-[10px] tracking-[0.14em] text-signal uppercase">Modelo · {info.label}</p>
              <h3 className="mt-2 text-2xl tracking-tight">{c.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">{info.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
