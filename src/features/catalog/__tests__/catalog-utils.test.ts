import { describe, expect, it } from "vitest";

import { products } from "@/data/products";
import {
  calculateDiscountPercentage,
  filterProducts,
  getProductBySlug,
  getRelatedProducts,
  normalizeSearchText,
  sortProducts,
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
      filterProducts(products, { offers: true }).every(
        (product) =>
          typeof product.offerPrice === "number" &&
          product.offerPrice < product.price,
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
    expect(sortedProducts[0].offerPrice ?? sortedProducts[0].price).toBe(
      Math.min(
        ...products.map((product) => product.offerPrice ?? product.price),
      ),
    );
  });

  it("gets a real product by slug", () => {
    expect(getProductBySlug(products[0].slug)?.sku).toBe(products[0].sku);
  });

  it("returns related products without the current product", () => {
    const product = products[0];
    const relatedProducts = getRelatedProducts(product, 4);
    expect(relatedProducts.some((item) => item.sku === product.sku)).toBe(false);
  });

  it("calculates discount percentage only for valid offers", () => {
    const offerProduct: Product = {
      ...products[0],
      price: 12000,
      offerPrice: 8000,
    };
    const regularProduct: Product = { ...offerProduct, offerPrice: undefined };

    expect(calculateDiscountPercentage(offerProduct)).toBe(33);
    expect(calculateDiscountPercentage(regularProduct)).toBeNull();
  });

  it("validates duplicate SKUs and slugs", () => {
    const errors = validateCatalogProducts([products[0], { ...products[0] }]);
    expect(errors).toContain(`Duplicated SKU: ${products[0].sku}.`);
    expect(errors).toContain(`Duplicated slug: ${products[0].slug}.`);
  });
});
