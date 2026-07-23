import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  withDescriptor?: boolean;
};

export function BrandLogo({
  className,
  withDescriptor = true,
}: BrandLogoProps) {
  return (
    <Link
      aria-label="Ir al inicio de Soluna"
      className={cn(
        "inline-flex items-center gap-3 text-foreground",
        className,
      )}
      href="/"
    >
      <span className="grid size-11 place-items-center rounded-full border border-accent-gold/50 bg-secondary font-display text-xl font-semibold">
        S
      </span>
      <span className="leading-none">
        <span className="block font-display text-2xl font-semibold uppercase">
          SOLUNA
        </span>
        {withDescriptor ? (
          <span className="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Accesorios
          </span>
        ) : null}
      </span>
      <span className="sr-only">{siteConfig.name}</span>
    </Link>
  );
}
