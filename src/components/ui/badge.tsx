import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-soluna-gold/40 bg-soluna-blush/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-soluna-graphite",
        className,
      )}
    >
      {children}
    </span>
  );
}
