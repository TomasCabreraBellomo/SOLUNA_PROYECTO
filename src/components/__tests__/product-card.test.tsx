import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductCard } from "@/components/product-card";
import { createCartProduct } from "@/features/cart";
import { getVisibleProducts } from "@/features/catalog";
import { renderWithCart } from "@/test/render-with-cart";
import type { Product } from "@/types/product";

describe("ProductCard", () => {
  function renderProductCard(product: Product) {
    return renderWithCart(<ProductCard product={product} />, [
      createCartProduct(product),
    ]);
  }

  it("renders product information and visual actions", () => {
    const product = getVisibleProducts()[0];

    renderProductCard(product);

    expect(
      screen.getByRole("heading", { name: product.name }),
    ).toBeInTheDocument();
    if (product.material) {
      expect(screen.getByText(product.material)).toBeInTheDocument();
    }

    expect(screen.getByRole("link", { name: /ver producto/i })).toHaveAttribute(
      "href",
      `/productos/${product.slug}`,
    );
  });

  it("does not show an offer badge or crossed price when Oferta is inactive", () => {
    const product: Product = {
      ...getVisibleProducts()[0],
      price: 10000,
      offer: false,
      offerPrice: 8000,
    };

    renderProductCard(product);

    expect(screen.queryByText(/oferta|off/i)).not.toBeInTheDocument();
    expect(screen.getByText(/10.000/)).not.toHaveClass("line-through");
    expect(screen.queryByText(/8.000/)).not.toBeInTheDocument();
  });

  it("shows an offer badge and both prices for an active valid offer", () => {
    const product: Product = {
      ...getVisibleProducts()[0],
      price: 10000,
      offer: true,
      offerPrice: 8000,
    };

    renderProductCard(product);

    expect(screen.getByText(/^oferta$/i)).toBeInTheDocument();
    expect(screen.getByText(/ahorrás.*2\.000/i)).toBeInTheDocument();
    expect(screen.getByText(/8.000/)).toBeInTheDocument();
    expect(screen.getByText(/10.000/)).toHaveClass("line-through");
  });

  it("identifies a combo and lets it use the existing cart action", () => {
    const product: Product = {
      ...getVisibleProducts()[0],
      sku: "SOL-CMB-0001",
      slug: "combo-inicial",
      name: "Combo inicial",
      category: "combos",
      price: 12000,
      offer: true,
      offerPrice: 10000,
      stock: 2,
    };

    renderProductCard(product);

    expect(screen.getByText(/^combo$/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /agregar combo inicial al carrito/i }),
    ).toBeEnabled();
  });
});
