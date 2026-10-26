"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { getLenis } from "@/components/layout/SmoothScroll";
import { Icon } from "@/components/ui/Icon";
import { areaServices, areas, company, nav, whatsappLink } from "@/content/site";

/** Menu móvel: itens com submenu viram o item-pai seguido dos filhos (sem repetir o pai). */
const mobileLinks = [
  { href: "/", label: "Início" },
  ...nav.flatMap((n) => (n.children ? [{ href: n.href, label: n.label }, ...n.children.filter((c) => c.href !== n.href)] : [n])),
];

/** Rotas cuja primeira dobra é clara (header começa com texto escuro). */
const LIGHT_TOP = ["/contato", "/privacidade", "/termos", "/creditos"];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null); // href do submenu aberto (desktop)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // fecha menus ao trocar de rota (ajuste de estado durante o render, sem efeito)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setMenu(null);
  }

  // trava a rolagem da página com o menu móvel aberto + Esc fecha
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const lightTop = LIGHT_TOP.some((p) => pathname.startsWith(p));
  const dark = scrolled || open || !lightTop; // texto branco
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
          open ? "border-b border-line-dark bg-abyss" : scrolled ? "border-b border-line-dark bg-abyss/80 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className={`container-x flex h-[72px] items-center justify-between ${dark ? "text-white" : "text-ink"}`}>
          <Link href="/" aria-label="SELL Engenharia e Logística — início" className="relative z-10">
            <Logo tone={dark ? "light" : "dark"} />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const mega = item.href === "/servicos";
              if (!mega && !item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3 py-2 text-[13.5px] transition-opacity ${isActive(item.href) ? "opacity-100" : "opacity-75 hover:opacity-100"}`}
                  >
                    {item.label}
                    {isActive(item.href) && <span className="absolute inset-x-3 -bottom-0.5 h-px bg-signal" aria-hidden="true" />}
                  </Link>
                );
              }
              const isOpen = menu === item.href;
              const active = isActive(item.href) || (mega ? pathname.startsWith("/areas/") : item.children!.some((c) => isActive(c.href)));
              // fecha ao sair do painel pelo teclado
              const onBlur = (e: React.FocusEvent<HTMLElement>) => {
                if (!e.currentTarget.closest("[data-submenu]")?.contains(e.relatedTarget as Node)) setMenu(null);
              };
              return (
                <div key={item.href} data-submenu className="relative" onMouseEnter={() => setMenu(item.href)} onMouseLeave={() => setMenu(null)}>
                  <Link
                    href={item.href}
                    aria-expanded={isOpen}
                    onFocus={() => setMenu(item.href)}
                    className={`relative flex items-center gap-1 px-3 py-2 text-[13.5px] transition-opacity ${active ? "opacity-100" : "opacity-75 hover:opacity-100"}`}
                  >
                    {item.label}
                    <Icon name="chevron" className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    {active && <span className="absolute inset-x-3 -bottom-0.5 h-px bg-signal" aria-hidden="true" />}
                  </Link>
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 ${mega ? "w-[820px]" : "w-[240px]"} ${
                      isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    {mega ? (
                      <div className="grid grid-cols-3 gap-px border border-line-dark bg-line-dark text-white shadow-2xl shadow-black/40">
                        {areas.map((a) => (
                          <div key={a.slug} className="bg-abyss p-4">
                            <Link
                              href={`/areas/${a.slug}`}
                              onBlur={onBlur}
                              className="flex items-center gap-2 text-[13.5px] font-medium transition-colors hover:text-signal"
                            >
                              <Icon name={a.icon} className="size-4 shrink-0 text-signal" />
                              {a.title}
                            </Link>
                            <ul className="mt-3 space-y-1 border-l border-line-dark pl-4">
                              {areaServices(a).map((s) => (
                                <li key={s.slug}>
                                  <Link href={`/servicos/${s.slug}`} onBlur={onBlur} className="block py-1 text-[12.5px] leading-snug text-white/65 transition-colors hover:text-white">
                                    {s.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <Link
                          href="/servicos"
                          onBlur={onBlur}
                          className="flex flex-col justify-between gap-4 bg-hull p-4 text-[13.5px] transition-colors hover:bg-signal hover:text-abyss"
                        >
                          <Icon name="arrow" className="size-4 self-end" />
                          <span>Ver todos os serviços</span>
                        </Link>
                      </div>
                    ) : (
                      <ul className="grid gap-px border border-line-dark bg-line-dark text-white shadow-2xl shadow-black/40">
                        {item.children!.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} onBlur={onBlur} className="block bg-abyss px-4 py-3 text-[13px] transition-colors hover:bg-hull">
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contato"
              className={`hidden h-10 items-center border px-4 text-[13.5px] transition-colors sm:inline-flex ${
                dark ? "border-line-dark hover:border-signal hover:bg-signal hover:text-abyss" : "border-line hover:bg-ink hover:text-white"
              }`}
            >
              Solicitar orçamento
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movel"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="relative grid size-11 place-items-center lg:hidden"
            >
              <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span className={`absolute left-0 h-[1.5px] w-6 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[1.5px] w-6 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu móvel — fora do <header> para não herdar o containing block do backdrop-filter */}
      <div
        id="menu-movel"
        data-lenis-prevent
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-abyss pt-[72px] text-white transition-[opacity,visibility] duration-400 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#0b2c63,transparent_60%)]" aria-hidden="true" />
        <nav aria-label="Menu móvel" className="container-x relative flex min-h-full flex-col py-8">
          <ul>
            {mobileLinks.map((item, i) => (
              <li
                key={item.href}
                className={`border-b border-line-dark transition-all duration-500 ease-out-expo ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
              >
                <Link href={item.href} className="flex items-center justify-between py-4 text-[28px] tracking-tight">
                  {item.label}
                  {(item.href === "/" ? pathname === "/" : isActive(item.href)) && <span className="size-2 bg-signal" aria-hidden="true" />}
                </Link>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-10 text-white/50">Áreas de atuação</p>
          <ul className="mt-4 grid gap-x-6 sm:grid-cols-2">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="flex items-center gap-3 py-2.5 text-[15px] text-white/75 hover:text-white">
                  <Icon name={a.icon} className="size-4 shrink-0 text-signal" />
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto grid gap-2 pt-10 sm:grid-cols-2">
            <Link href="/contato" className="btn btn-signal justify-center">
              Solicitar orçamento
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark justify-center">
              <Icon name="whatsapp" className="size-4" /> {company.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
