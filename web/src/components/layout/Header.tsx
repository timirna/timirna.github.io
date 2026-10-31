"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [{ href: "/", label: "Home" }, ...nav];
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open ? "bg-bg" : "bg-gradient-to-b from-black/80 to-transparent",
      )}
    >
      <div className="flex h-16 items-center gap-6 px-4 md:h-[68px] md:gap-10 md:px-12">
        <Link href="/" aria-label={`${site.wordmark}, home`} className="font-brand text-[34px] leading-none tracking-wide text-red md:text-[40px]">
          {site.wordmark}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-5 text-sm">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn("transition-colors duration-300", isActive(item.href) ? "font-semibold text-white" : "text-[#e5e5e5] hover:text-[#b3b3b3]")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="flex min-h-11 items-center gap-1 text-sm font-semibold md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          Browse <span aria-hidden className={cn("text-[10px] transition-transform", open && "rotate-180")}>▼</span>
        </button>

        <Link
          href="/contact/"
          className="ml-auto rounded bg-red px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--red-hover)]"
        >
          Let&apos;s work
        </Link>
      </div>

      <div id="mobile-menu" ref={menuRef} hidden={!open} className="border-t-2 border-white/80 bg-black/95 md:hidden">
        <nav aria-label="Mobile">
          <ul className="py-2 text-center">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn("block min-h-11 py-3 text-sm", isActive(item.href) ? "font-semibold text-white" : "text-[#b3b3b3]")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
