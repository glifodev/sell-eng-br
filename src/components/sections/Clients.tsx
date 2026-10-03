import Image from "next/image";
import { clients } from "@/content/site";

export function ClientMarquee({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const row = [...clients, ...clients];
  const dark = tone === "dark";
  return (
    <section aria-label="Clientes" className={`overflow-hidden border-y ${dark ? "border-line-dark bg-deep" : "border-line bg-paper"} ${className}`}>
      <div className="flex items-center">
        <p className={`eyebrow hidden shrink-0 border-r px-8 py-8 md:block ${dark ? "border-line-dark text-white/50" : "border-line text-muted"}`}>Confiam na SELL</p>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className={`flex w-max animate-marquee items-center hover:[animation-play-state:paused] ${dark ? "gap-3 py-5 pr-3" : "gap-16 py-7 pr-16"}`}>
            {row.map((c, i) => (
              <li key={`${c.name}-${i}`} aria-hidden={i >= clients.length} className={`shrink-0 ${dark ? "grid h-16 w-40 place-items-center rounded-sm bg-white/95 px-4" : ""}`}>
                <Image
                  src={c.logo}
                  alt={i < clients.length ? c.name : ""}
                  width={140}
                  height={56}
                  className={`w-auto object-contain transition duration-300 hover:grayscale-0 ${dark ? "h-9 opacity-80 grayscale hover:opacity-100" : "h-10 opacity-60 grayscale hover:opacity-100"}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
