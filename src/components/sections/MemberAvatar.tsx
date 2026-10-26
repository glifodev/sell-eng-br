import Image from "next/image";
import type { Member } from "@/content/site";

const initials = (n: string) =>
  n
    .split(" ")
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");

/** Foto do membro ou, sem foto, iniciais sobre fundo oceânico. Ocupa o container (position relative). */
export function MemberAvatar({ m, sizes }: { m: Member; sizes: string }) {
  if (m.photo) return <Image src={m.photo} alt={m.name} fill sizes={sizes} className="object-cover" />;
  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#0b2c63,#031330_70%)]">
      <span className="text-6xl font-light tracking-tight text-white/85">{initials(m.name)}</span>
      <svg className="absolute inset-x-0 bottom-0 h-24 w-full text-tide/40" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60 Q50 40 100 60 T200 60 T300 60 T400 60" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0 75 Q50 55 100 75 T200 75 T300 75 T400 75" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}
