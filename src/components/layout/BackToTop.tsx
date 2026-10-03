"use client";

import { getLenis } from "@/components/layout/SmoothScroll";
import { Icon } from "@/components/ui/Icon";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0, { duration: 1.4 });
        else window.scrollTo({ top: 0 });
      }}
      className="group inline-flex items-center gap-2 text-white/70 hover:text-white"
    >
      Voltar ao topo
      <span className="grid size-8 place-items-center rounded-full border border-line-dark transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-abyss">
        <Icon name="arrow" className="size-3.5 -rotate-45" />
      </span>
    </button>
  );
}
