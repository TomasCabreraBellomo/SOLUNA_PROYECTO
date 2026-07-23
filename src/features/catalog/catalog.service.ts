import { products } from "@/data/products";
import type { Product, ProductCategory } from "@/types/product";

const PRODUCT_IMAGE_EXTENSION = "webp";

export function getProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.isFeatured);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((product) => product.category === category);
}

export function getProductBySku(sku: string): Product | undefined {
  return products.find((product) => product.sku === sku);
}

export function getProductImagePath(
  sku: Product["sku"],
  imageIndex = 1,
): string {
  return `/images/products/${sku}/${imageIndex}.${PRODUCT_IMAGE_EXTENSION}`;
}
