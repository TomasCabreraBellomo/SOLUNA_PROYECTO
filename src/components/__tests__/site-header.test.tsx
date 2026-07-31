import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "@/components/layout/site-header";
import { mainNavigation } from "@/config/navigation";
import { renderWithCart } from "@/test/render-with-cart";

describe("SiteHeader", () => {
  it("renders desktop navigation links and primary actions", () => {
    renderWithCart(<SiteHeader />);

    for (const item of mainNavigation) {
      expect(
        screen.getAllByRole("link", { name: item.label })[0],
      ).toHaveAttribute("href", item.href);
    }

    expect(
      screen.getByRole("button", { name: /buscar productos/i }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /ver carrito, 0 unidades/i }),
    ).toHaveLength(2);
    expect(
      screen.getByRole("link", { name: /consultar por whatsapp/i }),
    ).toBeInTheDocument();
  });
});
