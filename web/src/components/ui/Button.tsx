import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "lime" | "on-dark";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-bg hover:bg-violet",
  secondary: "border border-ink/20 text-ink hover:border-ink",
  lime: "bg-lime text-ink hover:bg-white",
  "on-dark": "border border-white/40 text-white hover:border-white",
};

type Props = { href: string; variant?: Variant; children: ReactNode; external?: boolean } & Omit<ComponentProps<"a">, "href">;

export function Button({ href, variant = "primary", children, className, external, ...rest }: Props) {
  const cls = cn(
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5",
    styles[variant],
    className,
  );
  const arrow = (
    <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
      →
    </span>
  );
  if (external || href.startsWith("mailto:") || href.startsWith("http"))
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
        {arrow}
      </a>
    );
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
      {arrow}
    </Link>
  );
}
