import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function IconButton({
  children,
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        "inline-grid size-12 shrink-0 place-items-center rounded-full border border-border bg-surface text-foreground shadow-sm transition-all duration-fast ease-soluna hover:-translate-y-0.5 hover:border-accent-gold/70 hover:bg-surface-muted active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
