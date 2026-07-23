import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/features/catalog";

describe("ProductCard", () => {
  it("renders product information and visual actions", () => {
    const product = getFeaturedProducts()[0];

    render(<ProductCard product={product} />);

    expect(screen.getByRole("img", { name: product.name })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: product.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(product.materials[0])).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ver/i })).toHaveAttribute(
      "href",
      "/productos",
    );
    expect(screen.getByRole("button", { name: /agregar/i })).toBeEnabled();
  });
});
