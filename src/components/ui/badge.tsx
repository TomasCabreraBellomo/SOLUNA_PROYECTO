import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "offer" | "danger";
};

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.09em] shadow-sm",
        variant === "default" &&
          "border-accent-gold/35 bg-secondary text-foreground",
        variant === "offer" &&
          "border-primary/10 bg-primary text-primary-foreground",
        variant === "danger" &&
          "border-destructive/20 bg-surface text-destructive",
        className,
      )}
    >
      {children}
    </span>
  );
}
