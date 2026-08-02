import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { metadata } from "@/app/ofertas/page";
import { createCartProduct } from "@/features/cart";
import { OffersPageContent } from "@/features/offers/offers-page";
import { renderWithCart } from "@/test/render-with-cart";
import type { Product } from "@/types/product";

const comboOffer: Product = {
  sku: "SOL-CMB-0001",
  slug: "combo-inicial",
  name: "Combo inicial para charms",
  category: "combos",
  material: "Mixto",
  description: "Incluye joyero, pulsera para charms y un charm seleccionado.",
  price: 65000,
  offer: true,
  offerPrice: 55000,
  stock: 3,
  visible: true,
};

const regularOffer: Product = {
  sku: "SOL-PUL-0001",
  slug: "pulsera-especial",
  name: "Pulsera especial",
  category: "pulseras",
  material: "Acero",
  description: "Pulsera seleccionada.",
  price: 30000,
  offer: true,
  offerPrice: 25000,
  stock: 4,
  visible: true,
};

function renderOffersPage(combos: Product[] = [], otherOffers: Product[] = []) {
  return renderWithCart(
    <OffersPageContent combos={combos} otherOffers={otherOffers} />,
    [...combos, ...otherOffers].map((product) => createCartProduct(product)),
  );
}

describe("offers and combos page", () => {
  it("uses one h1 and accessible in-page navigation anchors", () => {
    renderOffersPage([comboOffer], [regularOffer]);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: "Selecciones especiales" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver ofertas" })).toHaveAttribute(
      "href",
      "#ofertas",
    );
    expect(screen.getByRole("link", { name: "Ver combos" })).toHaveAttribute(
      "href",
      "#combos",
    );
  });

  it("keeps combos and other offers in separate sections", () => {
    renderOffersPage([comboOffer], [regularOffer]);

    const combosSection = screen
      .getByRole("heading", { name: "Combos exclusivos" })
      .closest("section");
    const offersSection = screen
      .getByRole("heading", { name: "Piezas con precio especial" })
      .closest("section");

    expect(combosSection).not.toBeNull();
    expect(offersSection).not.toBeNull();
    expect(
      within(combosSection!).getByText(comboOffer.name),
    ).toBeInTheDocument();
    expect(
      within(combosSection!).queryByText(regularOffer.name),
    ).not.toBeInTheDocument();
    expect(
      within(offersSection!).getByText(regularOffer.name),
    ).toBeInTheDocument();
    expect(
      within(offersSection!).queryByText(comboOffer.name),
    ).not.toBeInTheDocument();
  });

  it("shows the global empty state when there are no valid offers", () => {
    renderOffersPage();

    expect(
      screen.getByRole("heading", {
        name: "No hay promociones activas por el momento",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver productos" })).toHaveAttribute(
      "href",
      "/productos",
    );
    expect(
      screen.getByRole("link", { name: "Consultar por WhatsApp" }),
    ).toHaveAttribute("href", expect.stringMatching(/^https:\/\/wa\.me\//));
  });

  it("shows normal offers and a discrete state when no combos exist", () => {
    renderOffersPage([], [regularOffer]);

    expect(screen.getByText(regularOffer.name)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Próximamente, nuevos combos" }),
    ).toBeInTheDocument();
  });

  it("shows combos and the remaining-section state when no other offers exist", () => {
    renderOffersPage([comboOffer], []);

    expect(screen.getByText(comboOffer.name)).toBeInTheDocument();
    expect(screen.getByText("Combo")).toBeInTheDocument();
    expect(screen.getByText(/ahorrás.*10\.000/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "No hay otras piezas en oferta" }),
    ).toBeInTheDocument();
  });

  it("publishes canonical offers metadata", () => {
    expect(metadata).toMatchObject({
      title: { absolute: "Ofertas y combos | Soluna Accesorios" },
      description:
        "Descubrí combos de accesorios y productos seleccionados con precios especiales en Soluna.",
      alternates: { canonical: "/ofertas" },
    });
  });
});
