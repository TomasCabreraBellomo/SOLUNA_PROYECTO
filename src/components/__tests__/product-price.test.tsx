import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Price } from "@/components/ui/price";

describe("Price", () => {
  it("renders a valid offer price with the original price crossed out", () => {
    render(<Price product={{ price: 10000, offer: true, offerPrice: 8000 }} />);

    expect(screen.getByText(/8.000/)).toBeInTheDocument();
    expect(screen.getByText(/10.000/)).toHaveClass("line-through");
  });

  it("ignores Precio Oferta when Oferta is not active", () => {
    render(
      <Price product={{ price: 10000, offer: false, offerPrice: 8000 }} />,
    );

    expect(screen.getByText(/10.000/)).not.toHaveClass("line-through");
    expect(screen.queryByText(/8.000/)).not.toBeInTheDocument();
  });
});
