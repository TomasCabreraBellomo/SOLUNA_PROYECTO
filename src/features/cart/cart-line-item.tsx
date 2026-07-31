"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ProductImagePlaceholder } from "@/components/product-image-placeholder";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { formatCurrency } from "@/lib/formatters";

import { useCart } from "./cart-provider";
import type { CartItem } from "./cart.types";
import { getCartItemQuantityLimit, getCartItemSubtotal } from "./cart.utils";

type CartLineItemProps = {
  item: CartItem;
};

export function CartLineItem({ item }: CartLineItemProps) {
  const { decrementItem, incrementItem, removeItem, setItemQuantity } =
    useCart();
  const quantityLimit = getCartItemQuantityLimit(item);

  return (
    <li className="grid gap-5 rounded-soluna-lg border border-border/85 bg-surface p-4 shadow-card sm:grid-cols-[7rem_1fr] sm:p-5">
      <div className="relative aspect-square overflow-hidden rounded-soluna bg-surface-muted">
        {item.image ? (
          <Image
            alt={item.image.alt}
            className="object-cover"
            fill
            sizes="112px"
            src={item.image.src}
          />
        ) : (
          <ProductImagePlaceholder className="min-h-0" />
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Link
              className="font-semibold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              href={`/productos/${item.slug}`}
            >
              {item.name}
            </Link>
            <p className="mt-1 text-small text-muted-foreground">
              SKU: {item.sku}
            </p>
          </div>
          {item.offerActive ? <Badge variant="offer">Oferta</Badge> : null}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-small text-muted-foreground">Precio unitario</p>
            <p className="mt-1 font-semibold text-foreground">
              {formatCurrency(item.effectivePrice)}
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-small text-muted-foreground">Subtotal</p>
            <p className="mt-1 font-semibold text-foreground">
              {formatCurrency(getCartItemSubtotal(item))}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-4">
          <div className="flex items-center gap-2">
            <IconButton
              aria-label={`Disminuir cantidad de ${item.name}`}
              disabled={item.quantity === 1}
              onClick={() => decrementItem(item.sku)}
            >
              <Minus aria-hidden="true" size={18} />
            </IconButton>
            <label className="sr-only" htmlFor={`quantity-${item.sku}`}>
              Cantidad de {item.name}
            </label>
            <input
              className="h-12 w-16 rounded-soluna border border-border bg-background text-center font-semibold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              id={`quantity-${item.sku}`}
              inputMode="numeric"
              max={quantityLimit}
              min={1}
              onChange={(event) =>
                setItemQuantity(item.sku, Number(event.currentTarget.value))
              }
              type="number"
              value={item.quantity}
            />
            <IconButton
              aria-label={`Aumentar cantidad de ${item.name}`}
              disabled={item.quantity >= quantityLimit}
              onClick={() => incrementItem(item.sku)}
            >
              <Plus aria-hidden="true" size={18} />
            </IconButton>
          </div>

          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-bold text-destructive transition-colors hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            onClick={() => removeItem(item.sku)}
            type="button"
          >
            <Trash2 aria-hidden="true" size={17} />
            Eliminar
          </button>
        </div>
      </div>
    </li>
  );
}
