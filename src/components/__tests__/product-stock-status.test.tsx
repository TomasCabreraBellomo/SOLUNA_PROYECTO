import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductStockStatus } from "@/components/product-stock-status";

describe("ProductStockStatus", () => {
  it("renders low stock and out of stock labels", () => {
    const { rerender } = render(<ProductStockStatus stock={2} />);

    expect(screen.getByText("Últimas unidades")).toBeInTheDocument();

    rerender(<ProductStockStatus stock={0} />);
    expect(screen.getByText("Sin stock")).toBeInTheDocument();
  });
});
