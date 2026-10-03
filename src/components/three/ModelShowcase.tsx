"use client";

import { useState } from "react";
import { WireScene } from "./Scene";
import { modelInfo, type WireModelName } from "./wireModels";

const order: WireModelName[] = ["hull", "padeye", "mooring", "jacket", "crane"];

export function StressLegend({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none flex items-center gap-2 font-mono text-[10px] text-white/50 ${className}`}>
      <span>baixa</span>
      <span className="h-1.5 w-28 bg-gradient-to-r from-[#1d4f80] via-[#58c2b4] to-[#f27a00]" />
      <span>alta</span>
    </div>
  );
}

/** Vitrine com troca entre modelos de engenharia em wireframe. */
export function ModelShowcase({ initial = "hull" }: { initial?: WireModelName }) {
  const [model, setModel] = useState<WireModelName>(initial);
  const info = modelInfo[model];
  return (
    <div>
      <div role="tablist" aria-label="Modelos de engenharia" className="flex flex-wrap gap-1.5">
        {order.map((m) => (
          <button
            key={m}
            role="tab"
            type="button"
            aria-selected={model === m}
            onClick={() => setModel(m)}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.08em] uppercase transition-colors ${
              model === m ? "border-signal bg-signal text-abyss" : "border-line-dark text-white/65 hover:border-white/40 hover:text-white"
            }`}
          >
            {modelInfo[m].label}
          </button>
        ))}
      </div>
      <div className="relative mt-4 aspect-square w-full sm:aspect-[5/4]">
        {/* key força remontagem limpa ao trocar de modelo */}
        <WireScene key={model} model={model} className="absolute inset-0 animate-[fade_0.8s_ease-out]" />
        <StressLegend className="absolute right-0 bottom-0" />
      </div>
      <div role="tabpanel" className="mt-4 max-w-md border-l border-signal pl-4">
        <p className="text-sm text-white">{info.title}</p>
        <p className="mt-1 text-xs leading-relaxed text-white/55">{info.text}</p>
      </div>
    </div>
  );
}
