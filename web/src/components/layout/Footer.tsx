import Link from "next/link";
import { nav, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr] md:py-16">
        <div>
          <p className="text-lg font-semibold tracking-[0.18em]">
            {site.wordmark}
            <span className="text-violet">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">{site.role}. Lottie, Rive and 2D motion for products, brands and the web.</p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow mb-3">Pages</p>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-violet">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-3">Elsewhere</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-violet">
                {site.email}
              </a>
            </li>
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-violet">
                  {s.label} <span aria-hidden>↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-page flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>Built with Next.js, Rive and Lottie.</p>
      </div>
    </footer>
  );
}
