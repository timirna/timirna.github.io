import Link from "next/link";
import { nav, site } from "@/data/site";

const more = [
  { href: "/work/", label: "Rive characters" },
  { href: "/work/", label: "Lottie animation" },
  { href: "/work/sohopay-launch-films/", label: "SohoPay films" },
  { href: "/about/#process", label: "Process" },
  { href: "/resume/", label: "Résumé" },
];

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1000px] px-4 pb-16 pt-24 text-[13px] text-[#808080] md:px-12">
      <ul className="mb-6 flex gap-6 text-sm text-white">
        {site.socials.map((s) => (
          <li key={s.href}>
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {s.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
      <ul className="grid grid-cols-2 gap-y-3 sm:grid-cols-4">
        {[...nav, ...more].map((n) => (
          <li key={n.label}>
            <Link href={n.href} className="hover:underline">
              {n.label}
            </Link>
          </li>
        ))}
        <li className="col-span-2">
          <a href={`mailto:${site.email}`} className="hover:underline">
            {site.email}
          </a>
        </li>
      </ul>
      <p className="mt-8 text-[11px]">
        © {new Date().getFullYear()} {site.name}. Motion design for products, brands and the web.
      </p>
    </footer>
  );
}
