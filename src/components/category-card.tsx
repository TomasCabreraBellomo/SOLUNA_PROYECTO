import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type CategoryCardProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  description: string;
  className?: string;
};

export function CategoryCard({
  href,
  icon: Icon,
  label,
  description,
  className,
}: CategoryCardProps) {
  return (
    <Link
      className={cn(
        "group flex min-h-44 flex-col justify-between rounded-soluna border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:border-accent-gold hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
      href={href}
    >
      <span className="grid size-11 place-items-center rounded-full bg-surface-muted text-accent-gold">
        <Icon aria-hidden="true" size={20} strokeWidth={1.7} />
      </span>
      <span>
        <span className="block font-semibold text-foreground">{label}</span>
        <span className="mt-2 block text-small text-muted-foreground">
          {description}
        </span>
      </span>
    </Link>
  );
}
