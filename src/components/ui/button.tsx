import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

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
    "bg-soluna-ink text-white shadow-soft hover:bg-soluna-graphite focus-visible:outline-soluna-gold",
  secondary:
    "border border-soluna-silver/70 bg-white/80 text-soluna-ink hover:border-soluna-gold focus-visible:outline-soluna-gold",
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
    "inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    buttonStyles[variant],
    className,
  );

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
