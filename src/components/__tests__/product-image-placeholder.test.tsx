import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductImagePlaceholder } from "@/components/product-image-placeholder";

describe("ProductImagePlaceholder", () => {
  it("renders an accessible placeholder for products without image", () => {
    render(<ProductImagePlaceholder />);

    expect(
      screen.getByRole("img", { name: /producto sin imagen disponible/i }),
    ).toBeInTheDocument();
  });
});
