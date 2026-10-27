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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu when the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const first = menuRef.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="text-lg font-semibold tracking-[0.18em]" aria-label={`${site.wordmark}, home`}>
          {site.wordmark}
          <span className="text-violet">.</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors duration-200",
                    isActive(item.href) ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span aria-hidden className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact/"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex"
          >
            Let&apos;s work
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <span className={cn("absolute left-0 h-0.5 w-5 bg-ink transition-transform duration-200", open ? "top-1.5 rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 h-0.5 w-5 bg-ink transition-transform duration-200", open ? "top-1.5 -rotate-45" : "top-2.5")} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="h-[calc(100dvh-4rem)] border-t border-line bg-bg md:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex flex-col gap-2 py-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="display flex min-h-11 items-center text-5xl"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact/" className="mt-6 inline-flex w-fit rounded-full bg-ink px-6 py-3 text-bg">
            Let&apos;s work
          </Link>
        </nav>
      </div>
    </header>
  );
}
