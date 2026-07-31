import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { JewelryCarePage } from "@/features/jewelry-care";

describe("JewelryCarePage", () => {
  it("renders the guide hierarchy, internal navigation and supplied content", () => {
    render(<JewelryCarePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Guía de Cuidados Soluna",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", {
        name: "Índice de la guía de cuidados",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Plata 925" }),
    ).toHaveAttribute("href", "#plata-925");

    for (const material of [
      "Plata 925",
      "Acero inoxidable y acero quirúrgico",
      "Acero blanco",
      "Cobre blanco",
      "Fantasía",
    ]) {
      expect(
        screen.getByRole("heading", { level: 3, name: material }),
      ).toBeInTheDocument();
    }

    expect(screen.getByText(/paño de microfibra limpio y seco/i)).toBeVisible();
  });

  it("uses the configured secure WhatsApp CTA", () => {
    render(<JewelryCarePage />);

    const cta = screen.getAllByRole("link", {
      name: "Consultar por WhatsApp",
    }).at(-1);
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", "noopener noreferrer");
    expect(cta?.getAttribute("href")).toMatch(/^https:\/\/wa\.me\//);
    expect(cta?.getAttribute("href")).toContain(
      encodeURIComponent("cómo cuidar uno de mis accesorios"),
    );
  });
});
