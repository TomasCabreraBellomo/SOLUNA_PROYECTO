import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { CART_STORAGE_KEY, CartProvider } from "@/features/cart";
import { CartPage } from "@/features/cart/cart-page";
import type { CartProduct } from "@/features/cart";

const product: CartProduct = {
  sku: "SOL-001",
  slug: "producto",
  name: "Producto disponible",
  regularPrice: 12000,
  effectivePrice: 8000,
  offerActive: true,
  stock: 4,
};

beforeEach(() => {
  window.localStorage.clear();
});

describe("CartPage", () => {
  it("renders a comprehensible empty state", async () => {
    render(
      <CartProvider catalog={[product]}>
        <CartPage />
      </CartProvider>,
    );

    expect(
      await screen.findByRole("heading", { name: /carrito está vacío/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /ver productos/i }),
    ).toHaveAttribute("href", "/productos");
  });

  it("provides accessible cart controls and optional customer fields", async () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        items: [{ sku: product.sku, quantity: 2 }],
      }),
    );

    render(
      <CartProvider catalog={[product]}>
        <CartPage />
      </CartProvider>,
    );

    expect(
      await screen.findByRole("link", { name: product.name }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: `Disminuir cantidad de ${product.name}`,
      }),
    ).toBeEnabled();
    expect(
      screen.getByRole("button", {
        name: `Aumentar cantidad de ${product.name}`,
      }),
    ).toBeEnabled();
    expect(
      screen.getByRole("spinbutton", {
        name: `Cantidad de ${product.name}`,
      }),
    ).toHaveValue(2);
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Localidad")).toBeInTheDocument();
    expect(screen.getByLabelText("Observaciones")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "María" },
    });
    fireEvent.change(screen.getByLabelText("Localidad"), {
      target: { value: "Tafí Viejo" },
    });

    const checkoutLink = screen.getByRole("link", {
      name: /enviar pedido por whatsapp/i,
    });
    expect(checkoutLink).toHaveAttribute("target", "_blank");
    expect(checkoutLink).toHaveAttribute("rel", "noopener noreferrer");
    await waitFor(() =>
      expect(
        decodeURIComponent(checkoutLink.getAttribute("href") ?? ""),
      ).toContain("María"),
    );
  });

  it("keeps quantity at one when decreasing and removes only explicitly", async () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        items: [{ sku: product.sku, quantity: 1 }],
      }),
    );
    render(
      <CartProvider catalog={[product]}>
        <CartPage />
      </CartProvider>,
    );

    const decreaseButton = await screen.findByRole("button", {
      name: `Disminuir cantidad de ${product.name}`,
    });
    expect(decreaseButton).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(
      await screen.findByRole("heading", { name: /carrito está vacío/i }),
    ).toBeInTheDocument();
  });
});
