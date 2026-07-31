import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "whatsapp";

type ButtonBaseProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
  variant?: ButtonVariant;
};

type ButtonProps = ButtonBaseProps & {
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  rel?: string;
  target?: string;
  type?: "button" | "submit" | "reset";
};

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-card hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lift active:translate-y-0 active:shadow-card",
  secondary:
    "border border-border bg-surface text-foreground shadow-sm hover:-translate-y-0.5 hover:border-accent-gold/70 hover:bg-surface-muted active:translate-y-0",
  outline:
    "border border-foreground/25 bg-transparent text-foreground hover:border-foreground/50 hover:bg-surface",
  ghost: "text-foreground hover:bg-surface-muted active:bg-secondary",
  whatsapp:
    "bg-[#26734f] text-white shadow-card hover:-translate-y-0.5 hover:bg-[#1f6243] hover:shadow-lift active:translate-y-0",
};

export function Button({
  children,
  className,
  disabled,
  href,
  onClick,
  rel,
  target,
  type = "button",
  variant = "primary",
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-2.5 text-sm font-bold tracking-[0.01em] transition-all duration-fast ease-soluna focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none",
    buttonStyles[variant],
    className,
  );

  if (href && disabled) {
    return (
      <span
        aria-disabled="true"
        aria-label={ariaLabel}
        className={classes}
        role="link"
      >
        {children}
      </span>
    );
  }

  if (href) {
    return (
      <Link
        aria-label={ariaLabel}
        className={classes}
        href={href}
        rel={rel}
        target={target}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      aria-label={ariaLabel}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
