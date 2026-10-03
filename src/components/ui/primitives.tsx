import Link from "next/link";
import { Icon } from "./Icon";

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-2 ${className}`}>
      <span className="inline-block size-1.5 bg-signal" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
}) {
  const center = align === "center";
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <Eyebrow className={`${center ? "justify-center" : ""} ${tone === "light" ? "text-white/80" : "text-ink"}`}>{eyebrow}</Eyebrow>
      <Tag className={`h-section mt-5 text-balance ${tone === "light" ? "text-white" : "text-ink"}`}>{title}</Tag>
      {text && <p className={`mt-5 max-w-xl text-pretty ${center ? "mx-auto" : ""} ${tone === "light" ? "text-white/65" : "text-muted"}`}>{text}</p>}
    </div>
  );
}

type BtnProps = {
  href: string;
  children: React.ReactNode;
  variant?: "light" | "dark" | "ghost" | "ghost-dark" | "signal";
  arrow?: boolean;
  className?: string;
  external?: boolean;
};

export function ButtonLink({ href, children, variant = "dark", arrow = false, className = "", external }: BtnProps) {
  const cls = `btn btn-${variant} group ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </>
  );
  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Cartão branco com seta no canto — padrão de CTA secundário. */
export function ArrowCard({
  href,
  title,
  text,
  className = "",
  tone = "light",
}: {
  href: string;
  title: string;
  text?: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const external = href.startsWith("http");
  const Comp = external ? "a" : Link;
  return (
    <Comp
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative flex min-h-[132px] flex-col justify-end p-5 transition-colors duration-300 ${
        tone === "dark" ? "bg-abyss text-white hover:bg-signal hover:text-abyss" : "bg-paper text-ink hover:bg-signal"
      } ${className}`}
    >
      <Icon name="arrow" className="absolute top-5 right-5 size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      <span className="text-[15px] font-medium">{title}</span>
      {text && <span className={`mt-1 text-xs group-hover:text-ink/70 ${tone === "dark" ? "text-white/60" : "text-muted"}`}>{text}</span>}
    </Comp>
  );
}

export function Breadcrumbs({ items, tone = "light" }: { items: { href?: string; label: string }[]; tone?: "light" | "dark" }) {
  return (
    <nav aria-label="Trilha de navegação" className={`eyebrow ${tone === "light" ? "text-white/60" : "text-muted"}`}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2">
            {it.href ? (
              <Link href={it.href} className={tone === "light" ? "hover:text-white" : "hover:text-ink"}>
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className={tone === "light" ? "text-white" : "text-ink"}>
                {it.label}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
