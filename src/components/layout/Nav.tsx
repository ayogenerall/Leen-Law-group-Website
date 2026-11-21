"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/primitives";

export interface NavServiceLink {
  label: string;
  href: string;
  description?: string;
}

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", menu: true },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Leen Law Group home">
      <Image src="/brand/leen-emblem-gold.webp" alt="" width={400} height={401} priority className="h-11 w-auto" />
      <Image src="/brand/leen-wordmark-gold.webp" alt="" width={600} height={221} priority className="h-7 w-auto sm:h-8" />
    </Link>
  );
}

export function Nav({ serviceLinks }: { serviceLinks: NavServiceLink[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  // Desktop dropdown: close on outside click / Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Mobile sheet: scroll lock, Escape, focus trap
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const sheet = sheetRef.current;
    const focusables = () =>
      Array.from(sheet?.querySelectorAll<HTMLElement>("a, button") ?? []).filter((el) => !el.hasAttribute("disabled"));
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const f = focusables();
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || mobileOpen
          ? "border-b border-champagne/25 bg-obsidian/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) =>
            l.menu ? (
              <li key={l.href} className="relative" ref={menuRef}>
                <button
                  type="button"
                  aria-expanded={menuOpen}
                  aria-controls="services-menu"
                  onClick={() => setMenuOpen((v) => !v)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-[0.9375rem] font-medium transition-colors hover:text-turquoise ${
                    isActive(l.href) || isActive("/consumer-support") || isActive("/business-startup") ? "text-turquoise" : "text-ivory/90"
                  }`}
                >
                  {l.label}
                  <svg viewBox="0 0 12 12" className={`h-2.5 w-2.5 transition-transform ${menuOpen ? "rotate-180" : ""}`} aria-hidden="true">
                    <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                <div
                  id="services-menu"
                  hidden={!menuOpen}
                  className="absolute left-1/2 top-full mt-3 w-[22rem] -translate-x-1/2 border border-graphite bg-charcoal p-2 shadow-2xl shadow-black/50"
                >
                  <div className="hairline-gold mb-2" />
                  <ul>
                    {serviceLinks.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} className="block rounded-[2px] px-4 py-3 transition-colors hover:bg-graphite">
                          <span className="block text-[0.9375rem] font-semibold text-ivory">{s.label}</span>
                          {s.description && <span className="mt-0.5 block text-sm text-mist">{s.description}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`relative px-3.5 py-2 text-[0.9375rem] font-medium transition-colors hover:text-turquoise ${
                    isActive(l.href) ? "text-turquoise" : "text-ivory/90"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <Link href="/contact" className={`${buttonClass("primary")} !min-h-10 whitespace-nowrap !px-5 !py-2 text-sm`}>
              Request Support
              <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center text-ivory lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Icon name={mobileOpen ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        ref={sheetRef}
        hidden={!mobileOpen}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain bg-obsidian lg:hidden"
      >
        <div className="container-x flex min-h-full flex-col py-8">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block border-b border-graphite py-4 font-serif text-3xl ${isActive(l.href) ? "text-turquoise" : "text-ivory"}`}
                >
                  {l.label}
                </Link>
                {l.menu && (
                  <ul className="border-b border-graphite py-2 pl-4">
                    {serviceLinks.slice(1).map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} className="block py-2.5 text-[0.9375rem] text-mist hover:text-turquoise">
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link href="/contact" className={`${buttonClass("primary")} mt-10 w-full`}>
            Request Support <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <p className="mt-6 text-sm text-mist">
            Administrative and consumer-support services. Leen Law Group is not a law firm and does not provide legal advice.
          </p>
        </div>
      </div>
    </header>
  );
}
