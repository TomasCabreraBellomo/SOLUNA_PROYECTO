import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomePage } from "@/features/home/home-page";
import { renderWithCart } from "@/test/render-with-cart";

describe("premium home hero", () => {
  it("keeps a single semantic brand message and the care guide entry point", () => {
    renderWithCart(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /joyas que cuentan tu historia/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Soluna", { selector: "p" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /ver guía de cuidados/i }),
    ).toHaveAttribute("href", "/cuida-tus-joyas");
  });
});
