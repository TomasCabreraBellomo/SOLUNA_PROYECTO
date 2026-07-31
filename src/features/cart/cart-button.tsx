"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

import { useCart } from "./cart-provider";

type CartButtonProps = {
  onClick?: () => void;
};

export function CartButton({ onClick }: CartButtonProps) {
  const { totalQuantity } = useCart();
  const unitLabel = totalQuantity === 1 ? "unidad" : "unidades";

  return (
    <Link
      aria-label={`Ver carrito, ${totalQuantity} ${unitLabel}`}
      className="relative inline-grid size-12 shrink-0 place-items-center rounded-full border border-border bg-surface text-foreground shadow-sm transition-all duration-fast ease-soluna hover:-translate-y-0.5 hover:border-accent-gold/70 hover:bg-surface-muted active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      href="/carrito"
      onClick={onClick}
    >
      <ShoppingBag aria-hidden="true" size={19} />
      <span
        aria-hidden="true"
        className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-primary text-[0.68rem] font-bold text-primary-foreground"
      >
        {totalQuantity > 99 ? "99+" : totalQuantity}
      </span>
      <span aria-live="polite" className="sr-only">
        El carrito tiene {totalQuantity} {unitLabel}.
      </span>
    </Link>
  );
}
