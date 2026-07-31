import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  AddToCartButton,
  CART_STORAGE_KEY,
  CartButton,
  CartProvider,
  useCart,
} from "@/features/cart";
import type { CartProduct } from "@/features/cart";

const product: CartProduct = {
  sku: "SOL-001",
  slug: "producto",
  name: "Producto disponible",
  regularPrice: 12000,
  effectivePrice: 12000,
  offerActive: false,
  stock: 4,
};

function CartControls() {
  const { addProduct, clear, hydrated, items, removeItem } = useCart();

  return (
    <>
      <span>{hydrated ? "hidratado" : "pendiente"}</span>
      <output aria-label="Cantidad">{items[0]?.quantity ?? 0}</output>
      <button onClick={() => addProduct(product.sku)} type="button">
        Agregar
      </button>
      <button onClick={() => removeItem(product.sku)} type="button">
        Eliminar
      </button>
      <button onClick={clear} type="button">
        Vaciar
      </button>
    </>
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("CartProvider", () => {
  it("adds twice, removes and clears products", async () => {
    render(
      <CartProvider catalog={[product]}>
        <CartControls />
      </CartProvider>,
    );
    await screen.findByText("hidratado");

    fireEvent.click(screen.getByRole("button", { name: "Agregar" }));
    fireEvent.click(screen.getByRole("button", { name: "Agregar" }));
    expect(screen.getByLabelText("Cantidad")).toHaveTextContent("2");

    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(screen.getByLabelText("Cantidad")).toHaveTextContent("0");

    fireEvent.click(screen.getByRole("button", { name: "Agregar" }));
    fireEvent.click(screen.getByRole("button", { name: "Vaciar" }));
    expect(screen.getByLabelText("Cantidad")).toHaveTextContent("0");
  });

  it("persists and restores a versioned cart from localStorage", async () => {
    const firstRender = render(
      <CartProvider catalog={[product]}>
        <CartControls />
      </CartProvider>,
    );
    await screen.findByText("hidratado");
    fireEvent.click(screen.getByRole("button", { name: "Agregar" }));

    await waitFor(() =>
      expect(window.localStorage.getItem(CART_STORAGE_KEY)).toContain(
        '"quantity":1',
      ),
    );
    firstRender.unmount();

    render(
      <CartProvider catalog={[product]}>
        <CartControls />
      </CartProvider>,
    );
    await screen.findByText("hidratado");
    expect(screen.getByLabelText("Cantidad")).toHaveTextContent("1");
  });

  it("ignores corrupt localStorage data", async () => {
    window.localStorage.setItem(CART_STORAGE_KEY, "{broken");

    render(
      <CartProvider catalog={[product]}>
        <CartControls />
      </CartProvider>,
    );

    await screen.findByText("hidratado");
    expect(screen.getByLabelText("Cantidad")).toHaveTextContent("0");
  });

  it("keeps working in memory when localStorage is unavailable", async () => {
    const storageSpy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("Storage disabled");
      });

    render(
      <CartProvider catalog={[product]}>
        <CartControls />
      </CartProvider>,
    );
    await screen.findByText("hidratado");
    fireEvent.click(screen.getByRole("button", { name: "Agregar" }));

    expect(screen.getByLabelText("Cantidad")).toHaveTextContent("1");
    storageSpy.mockRestore();
  });

  it("updates the accessible header counter", async () => {
    render(
      <CartProvider catalog={[product]}>
        <CartButton />
        <AddToCartButton productName={product.name} sku={product.sku} />
      </CartProvider>,
    );

    await waitFor(() =>
      expect(
        screen.getByRole("link", { name: /ver carrito, 0 unidades/i }),
      ).toBeInTheDocument(),
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: `Agregar ${product.name} al carrito`,
      }),
    );

    expect(
      screen.getByRole("link", { name: /ver carrito, 1 unidad/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      /agregado al carrito/i,
    );
  });

  it("disables adding an out-of-stock product", async () => {
    render(
      <CartProvider catalog={[{ ...product, stock: 0 }]}>
        <AddToCartButton
          disabled
          productName={product.name}
          sku={product.sku}
        />
      </CartProvider>,
    );

    expect(screen.getByRole("button", { name: /sin stock/i })).toBeDisabled();
  });
});
