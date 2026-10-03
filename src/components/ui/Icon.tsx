import type { IconName } from "@/content/site";

type Extra = "arrow" | "arrowRight" | "plus" | "mail" | "phone" | "pin" | "clock" | "whatsapp" | "instagram" | "linkedin" | "facebook" | "menu" | "close" | "chevron";

const paths: Record<IconName | Extra, React.ReactNode> = {
  anchor: (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v14M5 12H3a9 9 0 0 0 18 0h-2M8 10h8" />
    </>
  ),
  mesh: (
    <>
      <path d="M3 17 9 7l6 10 6-10" />
      <path d="M3 17h18M6 12h12M9 7h12" />
    </>
  ),
  gantt: <path d="M4 5h9M8 10h10M6 15h7M11 20h9M4 3v18" />,
  leaf: (
    <>
      <path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15" />
      <path d="M5 19 13 11" />
    </>
  ),
  wave: <path d="M2 12c2.5-4 5-4 7.5 0s5 4 7.5 0 3.5-3 5-2M2 18c2.5-4 5-4 7.5 0s5 4 7.5 0 3.5-3 5-2M2 6c2.5-4 5-4 7.5 0s5 4 7.5 0 3.5-3 5-2" />,
  diver: (
    <>
      <rect x="4" y="7" width="12" height="8" rx="3" />
      <path d="M16 11h3a2 2 0 0 0 2-2V5M8 19c1.3-.8 2.7-.8 4 0s2.7.8 4 0" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  hull: <path d="M2 10h20l-3 7H5zM7 10V6h6v4M15 10V8h3v2M2 20c2 1 4 1 6 0s4-1 6 0 4 1 6 0" />,
  crane: <path d="M5 21V4l13 3M5 7h13M18 7v5M16 12h4v3h-4zM3 21h6M5 4l4 3" />,
  lifebuoy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="m5.6 5.6 3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6" />
    </>
  ),
  cap: <path d="m2 9 10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6" />,
  arrow: <path d="M7 17 17 7M8 7h9v9" />,
  arrowRight: <path d="M4 12h16M14 6l6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  pin: (
    <>
      <path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3 21l1.7-5A9 9 0 1 1 8 19.4z" />
      <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </>
  ),
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
};

export function Icon({ name, className = "size-5", strokeWidth = 1.5 }: { name: IconName | Extra; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
