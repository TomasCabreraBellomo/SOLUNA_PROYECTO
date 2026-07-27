import Image from "next/image";
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
      <span className="relative block size-12 overflow-hidden rounded-full border border-accent-gold/30 bg-surface">
        <Image
          src="/images/brand/logo%20soluna.png"
          alt=""
          fill
          className="object-contain p-1"
          sizes="48px"
        />
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
