import { productCategories, type ProductCategory } from "@/config/categories";
import { productImagesBySku } from "@/data/product-images";
import { products } from "@/data/products";
import type { LucideIcon } from "lucide-react";
import type { Product, ProductImage } from "@/types/product";

import {
  type CatalogFilters,
  type CatalogSort,
  filterProducts,
  isProductCategory,
  sortProducts,
} from "./catalog.utils";
import { getEffectivePrice, isOfferActive } from "./offer";

export type CategoryWithProductCount = {
  value: ProductCategory;
  label: string;
  slug: string;
  description?: string;
  order: number;
  icon: LucideIcon;
  count: number;
};

export function getProducts(): Product[] {
  return [...products];
}

export function getVisibleProducts(): Product[] {
  return products.filter((product) => product.visible !== false);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getVisibleProducts().find((product) => product.slug === slug);
}

export function getProductBySku(sku: string): Product | undefined {
  return getVisibleProducts().find((product) => product.sku === sku);
}

export function getFeaturedProducts(limit?: number): Product[] {
  const featuredProducts = getVisibleProducts().filter(
    (product) => product.featured,
  );

  return typeof limit === "number"
    ? featuredProducts.slice(0, limit)
    : featuredProducts;
}

export function getOfferProducts(limit?: number): Product[] {
  const offerProducts = getVisibleProducts().filter(isOfferActive);

  return typeof limit === "number"
    ? offerProducts.slice(0, limit)
    : offerProducts;
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return getVisibleProducts().filter(
    (product) => product.category === category,
  );
}

export function getCatalogProducts(filters: CatalogFilters = {}): Product[] {
  return sortProducts(
    filterProducts(getVisibleProducts(), filters),
    filters.sort,
  );
}

export function getCategoriesWithProductCount(): CategoryWithProductCount[] {
  return productCategories
    .map((category) => ({
      ...category,
      count: getVisibleProducts().filter(
        (product) => product.category === category.value,
      ).length,
    }))
    .filter((category) => category.count > 0)
    .sort((first, second) => first.order - second.order);
}

export function getProductMaterials(): string[] {
  return Array.from(
    new Set(
      getVisibleProducts()
        .map((product) => product.material)
        .filter((material): material is string => Boolean(material)),
    ),
  ).sort((first, second) => first.localeCompare(second, "es-AR"));
}

export function getProductColors(): string[] {
  return Array.from(
    new Set(
      getVisibleProducts()
        .map((product) => product.color)
        .filter((color): color is string => Boolean(color)),
    ),
  ).sort((first, second) => first.localeCompare(second, "es-AR"));
}

export function getProductPriceRange(): { min: number; max: number } {
  const prices = getVisibleProducts().map(getEffectivePrice);

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

export function getProductImagePaths(sku: Product["sku"]): ProductImage[] {
  return productImagesBySku[sku as keyof typeof productImagesBySku] ?? [];
}

export function getProductPrimaryImage(
  product: Product,
): ProductImage | undefined {
  return getProductImagePaths(product.sku)[0];
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const visibleProducts = getVisibleProducts().filter(
    (item) => item.sku !== product.sku,
  );
  const relatedProducts = [
    ...visibleProducts.filter((item) => item.category === product.category),
    ...visibleProducts.filter(
      (item) =>
        product.material &&
        item.material === product.material &&
        item.category !== product.category,
    ),
    ...visibleProducts,
  ];
  const uniqueProducts = Array.from(
    new Map(relatedProducts.map((item) => [item.sku, item])).values(),
  );

  return uniqueProducts.slice(0, limit);
}

export function hasNewestSort(): boolean {
  return getVisibleProducts().every((product) => Boolean(product.createdAt));
}

export function normalizeCatalogFilters(
  filters: CatalogFilters,
): CatalogFilters {
  return {
    ...filters,
    category:
      filters.category && isProductCategory(filters.category)
        ? filters.category
        : undefined,
    sort: getCatalogSort(filters.sort),
  };
}

export function getCatalogSort(sort?: string): CatalogSort {
  const allowedSorts: CatalogSort[] = [
    "featured",
    "price-asc",
    "price-desc",
    "name-asc",
    "name-desc",
    "newest",
  ];

  if (sort && allowedSorts.includes(sort as CatalogSort)) {
    return sort as CatalogSort;
  }

  return "featured";
}
