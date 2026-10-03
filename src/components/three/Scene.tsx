"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { WireModelName } from "./wireModels";

const OceanField = dynamic(() => import("./OceanField"), { ssr: false });
const WireModel = dynamic(() => import("./WireModel"), { ssr: false });

/** Monta a cena WebGL só quando visível e pausa fora da viewport. */
function useVisibility<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduce] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, mount: seen, paused: !visible || reduce };
}

export function OceanScene({ className = "", base, crest }: { className?: string; base?: string; crest?: string }) {
  const { ref, mount, paused } = useVisibility<HTMLDivElement>();
  return (
    <div ref={ref} className={className} aria-hidden="true">
      {mount && <OceanField base={base} crest={crest} paused={paused} />}
    </div>
  );
}

/** Modelo de engenharia em wireframe com mapa de tensões (casco, olhal, fundeio, jaqueta, guindaste). */
export function WireScene({ model, className = "" }: { model: WireModelName; className?: string }) {
  const { ref, mount, paused } = useVisibility<HTMLDivElement>();
  return (
    <div ref={ref} className={className} aria-hidden="true">
      {mount && <WireModel name={model} paused={paused} />}
    </div>
  );
}

export function HullScene({ className = "" }: { className?: string }) {
  return <WireScene model="hull" className={className} />;
}
