"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

let instance: Lenis | null = null;

/** Acesso à instância ativa (ex.: travar o scroll com o menu móvel aberto). */
export const getLenis = () => instance;

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      anchors: { offset: -88 },
      autoRaf: true,
      // elementos com rolagem própria (menu móvel, iframes) não são suavizados
      prevent: (node) => node.closest?.("[data-lenis-prevent]") !== null,
    });
    instance = lenis;
    document.documentElement.classList.add("lenis");
    return () => {
      lenis.destroy();
      instance = null;
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  // nova rota começa do topo, sem animação
  useEffect(() => {
    instance?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
