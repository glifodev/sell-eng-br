/**
 * Marca SELL — o "S" é desenhado como um casco seccionado:
 * meia-nau superior, linha d'água em onda (âmbar) e meia-nau inferior.
 * As letras E-L-L seguem a mesma espessura de traço, com terminais retos.
 */

type MarkProps = { className?: string; wave?: string; stroke?: string; title?: string };

export const S_TOP = "M32 7 H14 A6 6 0 0 0 8 13 V20";
export const S_WAVE = "M8 20 Q12 15.5 16 20 T24 20 T32 20";
export const S_BOTTOM = "M32 20 V27 A6 6 0 0 1 26 33 H8";

export function LogoMark({ className, wave = "var(--color-signal)", stroke = "currentColor", title = "SELL" }: MarkProps) {
  return (
    <svg viewBox="4 3 32 34" className={className} role="img" aria-label={title} fill="none">
      <path d={S_TOP} stroke={stroke} strokeWidth="4.5" strokeLinejoin="round" />
      <path d={S_BOTTOM} stroke={stroke} strokeWidth="4.5" strokeLinejoin="round" />
      <path d={S_WAVE} stroke={wave} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LogoWordmark({ className, wave = "var(--color-signal)", stroke = "currentColor" }: MarkProps) {
  return (
    <svg viewBox="4 3 94 34" className={className} role="img" aria-label="SELL" fill="none">
      <g stroke={stroke} strokeWidth="4.5" strokeLinejoin="miter">
        <path d={S_TOP} strokeLinejoin="round" />
        <path d={S_BOTTOM} strokeLinejoin="round" />
        {/* E */}
        <path d="M58 7 H42.25 V33 H58" />
        <path d="M42 20 H54" />
        {/* L */}
        <path d="M66.25 4.75 V33 H80" />
        {/* L */}
        <path d="M84.25 4.75 V33 H98" />
      </g>
      <path d={S_WAVE} stroke={wave} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Logo horizontal com descritor — uso em header/footer. */
export function Logo({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const color = tone === "light" ? "text-white" : "text-ink";
  return (
    <span className={`inline-flex items-center gap-3 ${color} ${className}`}>
      <LogoWordmark className="h-[22px] w-auto" />
      <span className="hidden border-l border-current/20 pl-3 font-mono text-[9.5px] leading-[1.25] tracking-[0.16em] uppercase opacity-70 sm:block">
        Engenharia
        <br />& Logística
      </span>
    </span>
  );
}
