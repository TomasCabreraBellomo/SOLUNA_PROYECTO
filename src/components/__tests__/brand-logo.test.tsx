import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BrandLogo } from "@/components/brand-logo";

describe("BrandLogo", () => {
  it("renders the temporary text brand with a home link", () => {
    render(<BrandLogo />);

    expect(
      screen.getByRole("link", { name: /ir al inicio de soluna/i }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByText("SOLUNA")).toBeInTheDocument();
    expect(screen.getByText("Accesorios")).toBeInTheDocument();
  });
});
