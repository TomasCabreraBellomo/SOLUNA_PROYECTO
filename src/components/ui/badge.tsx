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
        "inline-flex items-center rounded-full border border-accent-gold/40 bg-secondary px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
