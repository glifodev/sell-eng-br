import { useId } from "react";

/**
 * Marca SELL — três faixas d'água (mar, canal, cais) que descem numa curva
 * sigmoide: o desenho forma o "S" e tem simetria de 180°. Os chanfros nos
 * cantos extremos vêm do vocabulário de chapa/estrutura naval.
 * Wordmark: Outfit SemiBold em caixa-baixa, com a linha de base cortada por
 * uma onda (convertido em curvas — não depende da fonte instalada).
 */

type Tone = { a?: string; b?: string; c?: string };
type MarkProps = { className?: string; title?: string; mono?: boolean } & Tone;

/** Faixa da marca (viewBox 0 0 64 38): topo em `y`, chanfros opcionais. */
function band(y: number, tl = false, br = false, k = 7) {
  const start = tl ? `M0 ${y + k} L${k} ${y}` : `M0 ${y}`;
  const end = br ? `V${y + 18 - k} L${64 - k} ${y + 18}` : `V${y + 18}`;
  return `${start} H22 C32.5 ${y} 32.5 ${y + 10} 43 ${y + 10} H64 ${end} H43 C32.5 ${y + 18} 32.5 ${y + 8} 22 ${y + 8} H0 Z`;
}

export const MARK_BANDS = [band(0, true), band(10), band(20, false, true)] as const;

/** Glifos "sell" (Outfit 600, 40px) — baseline em y=29.6. */
export const WORD_PATH =
  "M8.96 30.04Q7.32 30.04 5.74 29.6Q4.16 29.16 2.84 28.38Q1.52 27.6 .56 26.48L3.68 23.32Q4.68 24.44 6 25Q7.32 25.56 8.92 25.56Q10.2 25.56 10.86 25.2Q11.52 24.84 11.52 24.12Q11.52 23.32 10.82 22.88Q10.12 22.44 9 22.14Q7.88 21.84 6.66 21.46Q5.44 21.08 4.32 20.46Q3.2 19.84 2.5 18.74Q1.8 17.64 1.8 15.88Q1.8 14.04 2.7 12.68Q3.6 11.32 5.28 10.56Q6.96 9.8 9.24 9.8Q11.64 9.8 13.58 10.64Q15.52 11.48 16.8 13.16L13.64 16.32Q12.76 15.24 11.66 14.76Q10.56 14.28 9.28 14.28Q8.12 14.28 7.5 14.64Q6.88 15 6.88 15.64Q6.88 16.36 7.58 16.76Q8.28 17.16 9.4 17.46Q10.52 17.76 11.74 18.14Q12.96 18.52 14.06 19.2Q15.16 19.88 15.86 21Q16.56 22.12 16.56 23.88Q16.56 26.72 14.52 28.38Q12.48 30.04 8.96 30.04ZM29.32 30Q26.28 30 23.92 28.7Q21.56 27.4 20.18 25.12Q18.8 22.84 18.8 19.92Q18.8 17.04 20.14 14.78Q21.48 12.52 23.8 11.18Q26.12 9.84 28.96 9.84Q31.76 9.84 33.9 11.1Q36.04 12.36 37.26 14.54Q38.48 16.72 38.48 19.48Q38.48 20 38.42 20.54Q38.36 21.08 38.2 21.76L21.96 21.8V17.88L35.76 17.84L33.64 19.48Q33.56 17.76 33.02 16.6Q32.48 15.44 31.46 14.82Q30.44 14.2 28.96 14.2Q27.4 14.2 26.24 14.9Q25.08 15.6 24.46 16.86Q23.84 18.12 23.84 19.84Q23.84 21.6 24.5 22.9Q25.16 24.2 26.4 24.9Q27.64 25.6 29.28 25.6Q30.76 25.6 31.96 25.1Q33.16 24.6 34.04 23.6L37.12 26.68Q35.72 28.32 33.7 29.16Q31.68 30 29.32 30ZM46.96 29.6H41.72V.68H46.96V29.6ZM56.84 29.6H51.6V.68H56.84V29.6Z";

/** Corte em onda na base do wordmark (λ=26: preserva em x=4/30/56, corta em 17/43). */
export const WORD_CLIP =
  "M-9 -2H69V27.8C62.5 27.8 62.5 29.6 56 29.6S49.5 27.8 43 27.8 36.5 29.6 30 29.6 23.5 27.8 17 27.8 10.5 29.6 4 29.6-2.5 27.8-9 27.8Z";

/** Lockup marca + wordmark: marca escalada à altura da haste do "l". */
export const LOCKUP = { viewBox: "0 0 113 31", markTransform: "translate(0 .68) scale(.761)", wordX: 56.2 } as const;

const DEFAULT_TONE = { a: "var(--color-signal)", b: "var(--color-tide)", c: "currentColor" };

function Bands({ mono, a, b, c }: Tone & { mono?: boolean }) {
  const fills = mono ? ["currentColor", "currentColor", "currentColor"] : [a, b, c];
  return MARK_BANDS.map((d, i) => <path key={i} d={d} fill={fills[i]} />);
}

export function LogoMark({ className, title = "SELL", mono, ...tone }: MarkProps) {
  return (
    <svg viewBox="0 0 64 38" className={className} role="img" aria-label={title}>
      <Bands mono={mono} {...DEFAULT_TONE} {...tone} />
    </svg>
  );
}

/** Marca dentro do bloco chanfrado — favicon, avatar, selo. */
export function LogoTile({ className, title = "SELL" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label={title}>
      <path d="M0 0H40V31L31 40H0Z" fill="var(--color-abyss)" />
      <g transform="translate(4 10.5) scale(.5)">
        <Bands a="var(--color-signal)" b="var(--color-tide-soft)" c="#fff" />
      </g>
    </svg>
  );
}

export function LogoWordmark({ className, title = "SELL", mono, ...tone }: MarkProps) {
  const clip = useId();
  return (
    <svg viewBox={LOCKUP.viewBox} className={className} role="img" aria-label={title}>
      <g transform={LOCKUP.markTransform}>
        <Bands mono={mono} {...DEFAULT_TONE} {...tone} />
      </g>
      <clipPath id={clip}>
        <path d={WORD_CLIP} />
      </clipPath>
      <path d={WORD_PATH} transform={`translate(${LOCKUP.wordX} 0)`} clipPath={`url(#${clip})`} fill="currentColor" />
    </svg>
  );
}

/** Logo horizontal com descritor — uso em header/footer. */
export function Logo({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const color = tone === "light" ? "text-white" : "text-ink";
  return (
    <span className={`inline-flex items-center gap-3 ${color} ${className}`}>
      <LogoWordmark className="h-[26px] w-auto" b={tone === "light" ? "var(--color-tide-soft)" : undefined} />
      <span className="hidden border-l border-current/20 pl-3 font-display text-[12px] leading-[1.15] font-medium opacity-75 sm:block">
        engenharia
        <br />& logística
      </span>
    </span>
  );
}
