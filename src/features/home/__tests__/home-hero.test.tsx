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

    const heroImage = screen.getByRole("img", {
      name: /pulsera plateada con charms de colores/i,
    });
    expect(heroImage).toHaveAttribute("src", "/images/hero/soluna-hero.jpg");
    expect(heroImage).toHaveClass("object-cover");
    expect(heroImage).toHaveAttribute("data-priority", "true");
    expect(heroImage).toHaveAttribute(
      "sizes",
      expect.stringContaining("100vw"),
    );
  });
});
