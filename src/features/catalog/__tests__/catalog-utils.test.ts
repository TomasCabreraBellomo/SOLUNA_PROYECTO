import { describe, expect, it } from "vitest";

import { products } from "@/data/products";
import {
  calculateSavingsAmount,
  calculateDiscountPercentage,
  filterProducts,
  getEffectivePrice,
  getPreviousPrice,
  getProductBySlug,
  getRelatedProducts,
  isOfferActive,
  normalizeSearchText,
  sortProducts,
  splitOfferProducts,
  validateCatalogProducts,
} from "@/features/catalog";
import { formatCurrency } from "@/lib/formatters";
import type { Product } from "@/types/product";

describe("catalog utilities", () => {
  it("formats currency consistently for Argentina", () => {
    expect(formatCurrency(35000)).toContain("35.000");
  });

  it("normalizes search text without accents or extra spaces", () => {
    expect(normalizeSearchText("  Quirúrgico   Rosa ")).toBe("quirurgico rosa");
  });

  it("filters real products by category, stock, offer and search", () => {
    expect(filterProducts(products, { category: "charms" })).toEqual(
      products.filter((product) => product.category === "charms"),
    );
    expect(
      filterProducts(products, { inStock: true }).every(
        (product) => product.stock > 0,
      ),
    ).toBe(true);
    expect(
      filterProducts(products, { offers: true }).every((product) =>
        isOfferActive(product),
      ),
    ).toBe(true);
    expect(
      filterProducts(products, { search: "lumiere" }).some((product) =>
        product.name.includes("lumiere"),
      ),
    ).toBe(true);
  });

  it("sorts products by effective price", () => {
    const sortedProducts = sortProducts(products, "price-asc");
    expect(getEffectivePrice(sortedProducts[0])).toBe(
      Math.min(...products.map(getEffectivePrice)),
    );
  });

  it("gets a real product by slug", () => {
    expect(getProductBySlug(products[0].slug)?.sku).toBe(products[0].sku);
  });

  it("returns related products without the current product", () => {
    const product = products[0];
    const relatedProducts = getRelatedProducts(product, 4);
    expect(relatedProducts.some((item) => item.sku === product.sku)).toBe(
      false,
    );
  });

  it("calculates discount percentage only for valid offers", () => {
    const offerProduct: Product = {
      ...products[0],
      price: 12000,
      offer: true,
      offerPrice: 8000,
    };
    const regularProduct: Product = {
      ...offerProduct,
      offer: false,
      offerPrice: 8000,
    };

    expect(calculateDiscountPercentage(offerProduct)).toBe(33);
    expect(calculateSavingsAmount(offerProduct)).toBe(4000);
    expect(calculateSavingsAmount(regularProduct)).toBeNull();
    expect(calculateDiscountPercentage(regularProduct)).toBeNull();
    expect(getEffectivePrice(regularProduct)).toBe(12000);
    expect(getPreviousPrice(regularProduct)).toBeNull();
  });

  it("separates valid offer combos from other offers without duplicates", () => {
    const baseProduct = products[0];
    const comboOffer: Product = {
      ...baseProduct,
      sku: "SOL-CMB-0001",
      slug: "combo-activo",
      category: "combos",
      offer: true,
      offerPrice: baseProduct.price - 1000,
    };
    const comboWithoutOffer: Product = {
      ...comboOffer,
      sku: "SOL-CMB-0002",
      slug: "combo-regular",
      offer: false,
      offerPrice: undefined,
    };
    const regularOffer: Product = {
      ...baseProduct,
      sku: "SOL-PUL-TEST",
      slug: "pulsera-en-oferta",
      category: "pulseras",
      offer: true,
      offerPrice: baseProduct.price - 2000,
    };

    const groups = splitOfferProducts([
      comboOffer,
      comboWithoutOffer,
      regularOffer,
    ]);

    expect(groups.combos.map((product) => product.sku)).toEqual([
      comboOffer.sku,
    ]);
    expect(groups.otherOffers.map((product) => product.sku)).toEqual([
      regularOffer.sku,
    ]);
    expect(
      new Set([...groups.combos, ...groups.otherOffers].map(({ sku }) => sku))
        .size,
    ).toBe(groups.combos.length + groups.otherOffers.length);
  });

  it("does not include a product in offers based only on Precio Oferta", () => {
    const regularProduct: Product = {
      ...products[0],
      price: 12000,
      offer: false,
      offerPrice: 8000,
    };

    expect(isOfferActive(regularProduct)).toBe(false);
    expect(filterProducts([regularProduct], { offers: true })).toEqual([]);
  });

  it("validates duplicate SKUs and slugs", () => {
    const errors = validateCatalogProducts([products[0], { ...products[0] }]);
    expect(errors).toContain(`Duplicated SKU: ${products[0].sku}.`);
    expect(errors).toContain(`Duplicated slug: ${products[0].slug}.`);
  });
});
