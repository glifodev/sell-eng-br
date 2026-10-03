"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { getLenis } from "@/components/layout/SmoothScroll";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/primitives";
import { method } from "@/content/site";

/**
 * Metodologia como "rota de navegação": seção fixa enquanto o scroll avança,
 * linha em onda que se desenha entre as etapas e um ponto que navega pela rota.
 */

const VW = 1200;
const VH = 240;
const N = method.length;
const nodes = method.map((_, i) => ({ x: 100 + i * ((VW - 200) / (N - 1)), y: i % 2 ? 160 : 80 }));
const routeD = nodes.reduce((d, p, i) => {
  if (i === 0) return `M ${p.x} ${p.y}`;
  const prev = nodes[i - 1];
  const dx = (p.x - prev.x) / 2;
  return `${d} C ${prev.x + dx} ${prev.y}, ${p.x - dx} ${p.y}, ${p.x} ${p.y}`;
}, "");

export function MethodFlow() {
  return (
    <section className="relative">
      <div className="hidden lg:block">
        <StickyFlow />
      </div>
      <div className="lg:hidden">
        <VerticalFlow />
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="max-w-2xl">
      <Eyebrow>Método</Eyebrow>
      <h2 className="h-section mt-5 text-balance">Do diagnóstico à entrega, cada etapa rastreada.</h2>
    </div>
  );
}

function BlueprintGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
    />
  );
}

/* --------------------------------- desktop --------------------------------- */

function StickyFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(1);
  const [active, setActive] = useState(0);
  const [dot, setDot] = useState(nodes[0]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  // cada etapa ocupa 1/N do scroll; o ponto pousa no nó no meio do trecho
  const route = useTransform(p, (v) => Math.min(1, Math.max(0, (v * N - 0.5) / (N - 1))));
  const dash = useTransform(route, (r) => len * (1 - r));

  useLayoutEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, []);

  useMotionValueEvent(route, "change", (r) => {
    const el = pathRef.current;
    if (!el) return;
    const pt = el.getPointAtLength(r * len);
    setDot({ x: pt.x, y: pt.y });
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N)))));

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    const y = top + span * ((i + 0.5) / N);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const step = method[active];

  return (
    <div ref={ref} style={{ height: `${N * 55 + 100}vh` }} className="relative">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <BlueprintGrid />
        <div className="container-x relative">
          <div className="flex items-end justify-between gap-10">
            <Header />
            <div className="pb-2 text-right font-mono text-xs tracking-[0.14em] text-muted uppercase">
              Etapa <span className="text-ink">{String(active + 1).padStart(2, "0")}</span> / {String(N).padStart(2, "0")}
              <div className="mt-3 h-px w-48 bg-line">
                <motion.div className="h-px origin-left bg-signal" style={{ scaleX: p }} />
              </div>
            </div>
          </div>

          {/* Rota */}
          <div className="relative mt-12" style={{ aspectRatio: `${VW} / ${VH}` }}>
            <svg viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
              <path d={routeD} fill="none" stroke="var(--color-line)" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
              <motion.path
                ref={pathRef}
                d={routeD}
                fill="none"
                stroke="var(--color-signal)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={len}
                style={{ strokeDashoffset: dash }}
              />
              {/* ponto navegando + esteira */}
              <circle cx={dot.x} cy={dot.y} r="16" fill="var(--color-signal)" opacity="0.15">
                <animate attributeName="r" values="10;22;10" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.25;0;0.25" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle cx={dot.x} cy={dot.y} r="5" fill="var(--color-abyss)" stroke="var(--color-signal)" strokeWidth="2.5" />
            </svg>

            {nodes.map((n, i) => {
              const reached = i <= active;
              const current = i === active;
              return (
                <button
                  key={method[i].title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={current ? "step" : undefined}
                  className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  style={{ left: `${(n.x / VW) * 100}%`, top: `${(n.y / VH) * 100}%` }}
                >
                  <span
                    className={`grid size-14 place-items-center rounded-full border transition-all duration-500 ${
                      current
                        ? "scale-110 border-abyss bg-abyss text-signal shadow-[0_0_0_8px_rgb(242_169_0/0.15)]"
                        : reached
                          ? "border-abyss bg-paper text-abyss"
                          : "border-line bg-fog text-mist group-hover:border-ink group-hover:text-ink"
                    }`}
                  >
                    <Icon name={method[i].icon} className="size-5" />
                  </span>
                  <span
                    className={`absolute whitespace-nowrap text-sm tracking-tight transition-colors duration-500 ${
                      n.y > VH / 2 ? "top-full mt-3" : "bottom-full mb-3"
                    } ${reached ? "text-ink" : "text-muted"}`}
                  >
                    <span className="mr-1.5 font-mono text-[10px] text-muted">0{i + 1}</span>
                    {method[i].title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detalhe da etapa */}
          <div className="relative mt-16 min-h-[150px] border-t border-line pt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-[auto_1fr_1fr] items-start gap-12"
              >
                <span className="font-mono text-6xl leading-none tracking-tight text-signal">{String(active + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-3xl tracking-tight">{step.title}</h3>
                  <p className="mt-3 max-w-md text-muted">{step.text}</p>
                </div>
                <div>
                  <p className="eyebrow text-muted">Entregáveis da etapa</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {step.outputs.map((o, k) => (
                      <motion.li
                        key={o}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + k * 0.07 }}
                        className="chip border-ink/15 bg-paper text-ink"
                      >
                        <span className="mr-2 size-1.5 rounded-full bg-signal" aria-hidden="true" />
                        {o}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- mobile --------------------------------- */

function VerticalFlow() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  return (
    <div className="relative overflow-hidden py-24">
      <BlueprintGrid />
      <div className="container-x relative">
        <Header />
        <ol ref={ref} className="relative mt-14 pl-14">
          <span className="absolute top-2 bottom-2 left-[19px] w-0.5 bg-line" aria-hidden="true" />
          <motion.span className="absolute top-2 bottom-2 left-[19px] w-0.5 origin-top bg-signal" style={{ scaleY: fill }} aria-hidden="true" />
          {method.map((m, i) => (
            <motion.li
              key={m.title}
              initial="off"
              whileInView="on"
              viewport={{ margin: "0px 0px -45% 0px", once: true }}
              variants={{ off: { opacity: 0.4 }, on: { opacity: 1 } }}
              transition={{ duration: 0.4 }}
              className="relative pb-12 last:pb-0"
            >
              <motion.span
                variants={{
                  off: { backgroundColor: "#eef1f4", color: "#a9b4bf", borderColor: "rgba(10,21,32,0.12)", scale: 1 },
                  on: { backgroundColor: "#07111c", color: "#f2a900", borderColor: "#07111c", scale: [1, 1.15, 1] },
                }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 -left-14 grid size-10 place-items-center rounded-full border"
              >
                <Icon name={m.icon} className="size-4" />
              </motion.span>
              <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
              <h3 className="mt-1 text-xl tracking-tight">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {m.outputs.map((o) => (
                  <li key={o} className="chip text-[11px]">
                    {o}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
