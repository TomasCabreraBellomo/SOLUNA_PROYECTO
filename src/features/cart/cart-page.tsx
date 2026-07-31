"use client";

import { MessageCircle, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";

import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";

import { CartLineItem } from "./cart-line-item";
import { emitCartEvent } from "./cart.events";
import { useCart } from "./cart-provider";
import {
  buildWhatsAppOrderUrl,
  CART_CUSTOMER_LOCALITY_MAX_LENGTH,
  CART_CUSTOMER_NAME_MAX_LENGTH,
  CART_CUSTOMER_OBSERVATIONS_MAX_LENGTH,
} from "./cart.whatsapp";

const fieldStyles =
  "mt-2 min-h-12 w-full rounded-soluna border border-border bg-background px-4 py-3 text-foreground shadow-sm placeholder:text-muted-foreground/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function CartPage() {
  const { clear, hydrated, items, total, totalQuantity } = useCart();
  const [name, setName] = useState("");
  const [locality, setLocality] = useState("");
  const [observations, setObservations] = useState("");

  if (!hydrated) {
    return (
      <div
        aria-live="polite"
        className="rounded-soluna-lg border border-border bg-surface p-8 text-center text-muted-foreground shadow-card"
        role="status"
      >
        Recuperando tu carrito…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        actionHref="/productos"
        actionLabel="Ver productos"
        description="Agregá productos del catálogo para preparar tu pedido y enviarlo por WhatsApp cuando quieras."
        title="Tu carrito está vacío"
      />
    );
  }

  const checkoutUrl = buildWhatsAppOrderUrl(items, {
    name,
    locality,
    observations,
  });
  const unitLabel = totalQuantity === 1 ? "unidad" : "unidades";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-start">
      <section aria-labelledby="cart-products-title">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2
              className="font-display text-3xl font-medium text-foreground"
              id="cart-products-title"
            >
              Productos seleccionados
            </h2>
            <p className="mt-1 text-small text-muted-foreground">
              {totalQuantity} {unitLabel} en el carrito
            </p>
          </div>
          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold text-destructive transition-colors hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            onClick={clear}
            type="button"
          >
            <Trash2 aria-hidden="true" size={17} />
            Vaciar carrito
          </button>
        </div>

        <ul className="mt-6 grid gap-4">
          {items.map((item) => (
            <CartLineItem item={item} key={item.sku} />
          ))}
        </ul>

        <Button className="mt-6" href="/productos" variant="secondary">
          <ShoppingBag aria-hidden="true" size={18} />
          Continuar viendo productos
        </Button>
      </section>

      <aside className="rounded-soluna-lg border border-border/85 bg-surface p-6 shadow-card lg:sticky lg:top-28">
        <h2 className="font-display text-3xl font-medium text-foreground">
          Resumen del pedido
        </h2>

        <div className="mt-5 flex items-center justify-between gap-4 border-y border-border py-4">
          <span className="font-semibold text-foreground">Total estimado</span>
          <strong className="text-lg text-foreground">
            {formatCurrency(total)}
          </strong>
        </div>

        <p
          className="mt-4 text-small text-muted-foreground"
          id="cart-total-note"
        >
          El total es estimado y está sujeto a confirmación de disponibilidad y
          envío por parte de Soluna.
        </p>

        <fieldset className="mt-7 grid gap-4">
          <legend className="font-semibold text-foreground">
            Tus datos (opcionales)
          </legend>

          <label className="text-small font-semibold text-foreground">
            Nombre
            <input
              autoComplete="name"
              className={fieldStyles}
              maxLength={CART_CUSTOMER_NAME_MAX_LENGTH}
              onChange={(event) => setName(event.currentTarget.value)}
              placeholder="¿Cómo te llamás?"
              type="text"
              value={name}
            />
          </label>

          <label className="text-small font-semibold text-foreground">
            Localidad
            <input
              autoComplete="address-level2"
              className={fieldStyles}
              maxLength={CART_CUSTOMER_LOCALITY_MAX_LENGTH}
              onChange={(event) => setLocality(event.currentTarget.value)}
              placeholder="Tu ciudad o localidad"
              type="text"
              value={locality}
            />
          </label>

          <label className="text-small font-semibold text-foreground">
            Observaciones
            <textarea
              className={fieldStyles}
              maxLength={CART_CUSTOMER_OBSERVATIONS_MAX_LENGTH}
              onChange={(event) => setObservations(event.currentTarget.value)}
              placeholder="Medidas, colores u otra consulta"
              rows={4}
              value={observations}
            />
          </label>
        </fieldset>

        <Button
          aria-label="Enviar pedido por WhatsApp"
          className="mt-7 w-full px-4"
          href={checkoutUrl}
          onClick={() =>
            emitCartEvent("whatsapp_checkout_started", {
              itemCount: totalQuantity,
              total,
            })
          }
          rel="noopener noreferrer"
          target="_blank"
          variant="whatsapp"
        >
          <MessageCircle aria-hidden="true" size={19} />
          Enviar pedido por WhatsApp
        </Button>
        <p className="mt-3 text-center text-small text-muted-foreground">
          El mensaje se abrirá para que lo revises y confirmes manualmente.
        </p>
      </aside>
    </div>
  );
}
