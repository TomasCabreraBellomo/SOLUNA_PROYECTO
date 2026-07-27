import type { Product } from "@/types/product";

import { isProductCategory, isValidOffer } from "./catalog.utils";

export function validateCatalogProducts(products: Product[]): string[] {
  const errors: string[] = [];
  const skuCounts = new Map<string, number>();
  const slugCounts = new Map<string, number>();

  for (const product of products) {
    skuCounts.set(product.sku, (skuCounts.get(product.sku) ?? 0) + 1);
    slugCounts.set(product.slug, (slugCounts.get(product.slug) ?? 0) + 1);

    if (!product.name.trim()) {
      errors.push(`Product ${product.sku} has an empty name.`);
    }

    if (!isProductCategory(product.category)) {
      errors.push(
        `Product ${product.sku} has an invalid category: ${product.category}.`,
      );
    }

    if (product.price < 0) {
      errors.push(`Product ${product.sku} has a negative price.`);
    }

    if (product.stock < 0) {
      errors.push(`Product ${product.sku} has negative stock.`);
    }

    if (
      typeof product.offerPrice === "number" &&
      product.offerPrice >= product.price
    ) {
      errors.push(`Product ${product.sku} has an invalid offerPrice.`);
    }

    if (
      typeof product.offerPrice === "number" &&
      product.offerPrice > 0 &&
      !isValidOffer(product)
    ) {
      errors.push(
        `Product ${product.sku} offerPrice must be lower than price.`,
      );
    }
  }

  for (const [sku, count] of skuCounts.entries()) {
    if (count > 1) {
      errors.push(`Duplicated SKU: ${sku}.`);
    }
  }

  for (const [slug, count] of slugCounts.entries()) {
    if (count > 1) {
      errors.push(`Duplicated slug: ${slug}.`);
    }
  }

  return errors;
}
