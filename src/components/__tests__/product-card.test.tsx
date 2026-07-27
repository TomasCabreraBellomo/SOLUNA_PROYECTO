import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductCard } from "@/components/product-card";
import { getVisibleProducts } from "@/features/catalog";

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
});
