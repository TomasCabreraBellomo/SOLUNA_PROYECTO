"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type NavigationLinkProps = {
  href: string;
  label: string;
  mobile?: boolean;
  onClick?: () => void;
};

export function NavigationLink({
  href,
  label,
  mobile = false,
  onClick,
}: NavigationLinkProps) {
  const pathname = usePathname();
  const active =
    pathname === href ||
    (href !== "/" && Boolean(pathname?.startsWith(`${href}/`)));

  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative font-semibold transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        mobile
          ? "block min-h-12 rounded-soluna px-4 py-3 text-base"
          : "rounded-full px-4 py-3 text-sm",
        active
          ? "bg-surface-muted text-foreground"
          : "text-muted-foreground hover:bg-surface-muted/70 hover:text-foreground",
        !mobile &&
          active &&
          "after:absolute after:inset-x-5 after:-bottom-0.5 after:h-px after:bg-accent-gold",
      )}
      href={href}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
