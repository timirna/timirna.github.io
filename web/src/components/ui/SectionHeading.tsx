import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  eyebrow,
  title,
  action,
  className,
  id,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  action?: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("mb-10 grid gap-6 border-t border-line pt-6 md:mb-14 md:grid-cols-[1fr_auto] md:items-end", className)}>
      <div>
        <p className="eyebrow mb-4">
          {index && <span className="mr-3 text-ink">{index}</span>}
          {eyebrow}
        </p>
        <h2 id={id} className="display max-w-3xl text-[clamp(2.25rem,5vw,4.5rem)]">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
