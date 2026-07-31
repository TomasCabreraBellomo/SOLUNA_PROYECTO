import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductCard } from "@/components/product-card";
import { getVisibleProducts } from "@/features/catalog";
import type { Product } from "@/types/product";

describe("ProductCard", () => {
  it("renders product information and visual actions", () => {
    const product = getVisibleProducts()[0];

    render(<ProductCard product={product} />);

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

    render(<ProductCard product={product} />);

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

    render(<ProductCard product={product} />);

    expect(screen.getByText(/20% off/i)).toBeInTheDocument();
    expect(screen.getByText(/8.000/)).toBeInTheDocument();
    expect(screen.getByText(/10.000/)).toHaveClass("line-through");
  });
});
