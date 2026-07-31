"use client";

import { ShoppingBag } from "lucide-react";
import { useState } from "react";

import { Button, type ButtonVariant } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useCart } from "./cart-provider";

type AddToCartButtonProps = {
  sku: string;
  productName: string;
  disabled?: boolean;
  className?: string;
  variant?: ButtonVariant;
};

export function AddToCartButton({
  sku,
  productName,
  disabled = false,
  className,
  variant = "primary",
}: AddToCartButtonProps) {
  const { addProduct } = useCart();
  const [feedback, setFeedback] = useState("");

  function handleAdd() {
    const result = addProduct(sku);
    if (result.ok) {
      setFeedback(
        `${productName} agregado al carrito. Cantidad: ${result.item.quantity}.`,
      );
      return;
    }

    setFeedback(
      result.reason === "quantity-limit"
        ? `Alcanzaste el límite disponible para ${productName}.`
        : `${productName} no está disponible para agregar al carrito.`,
    );
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Button
        aria-label={
          disabled
            ? `${productName} sin stock`
            : `Agregar ${productName} al carrito`
        }
        className="w-full px-4"
        disabled={disabled}
        onClick={handleAdd}
        variant={variant}
      >
        <ShoppingBag aria-hidden="true" size={18} />
        {disabled ? "Sin stock" : "Agregar al carrito"}
      </Button>
      <span aria-live="polite" className="sr-only" role="status">
        {feedback}
      </span>
    </div>
  );
}
