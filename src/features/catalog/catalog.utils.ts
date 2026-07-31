import { productCategories, type ProductCategory } from "@/config/categories";
import type { Product } from "@/types/product";

import { getEffectivePrice, isOfferActive } from "./offer";

export type CatalogSort =
  "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc" | "newest";

export type CatalogFilters = {
  search?: string;
  category?: string;
  material?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  offers?: boolean;
  sort?: CatalogSort;
};

export type StockStatus = {
  value: "available" | "low-stock" | "out-of-stock";
  label: string;
};

export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

export function createProductSlug(value: string): string {
  return normalizeSearchText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) {
    return { value: "out-of-stock", label: "Sin stock" };
  }

  if (stock <= 3) {
    return { value: "low-stock", label: "Últimas unidades" };
  }

  return { value: "available", label: "Disponible" };
}

export function isProductCategory(value: string): value is ProductCategory {
  return productCategories.some((category) => category.value === value);
}

export function filterProducts(
  products: Product[],
  filters: CatalogFilters,
): Product[] {
  const normalizedSearch = filters.search
    ? normalizeSearchText(filters.search)
    : "";

  return products.filter((product) => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    if (filters.material && product.material !== filters.material) {
      return false;
    }

    if (filters.color && product.color !== filters.color) {
      return false;
    }

    if (filters.inStock && product.stock <= 0) {
      return false;
    }

    if (filters.offers && !isOfferActive(product)) {
      return false;
    }

    const effectivePrice = getEffectivePrice(product);

    if (
      typeof filters.minPrice === "number" &&
      effectivePrice < filters.minPrice
    ) {
      return false;
    }

    if (
      typeof filters.maxPrice === "number" &&
      effectivePrice > filters.maxPrice
    ) {
      return false;
    }

    if (!normalizedSearch) {
      return true;
    }

    const searchableText = normalizeSearchText(
      [product.name, product.sku, product.description, product.material]
        .filter(Boolean)
        .join(" "),
    );

    return searchableText.includes(normalizedSearch);
  });
}

export function sortProducts(
  products: Product[],
  sort: CatalogSort = "featured",
): Product[] {
  const sortedProducts = [...products];

  return sortedProducts.sort((first, second) => {
    if (sort === "price-asc") {
      return getEffectivePrice(first) - getEffectivePrice(second);
    }

    if (sort === "price-desc") {
      return getEffectivePrice(second) - getEffectivePrice(first);
    }

    if (sort === "name-asc") {
      return first.name.localeCompare(second.name, "es-AR");
    }

    if (sort === "name-desc") {
      return second.name.localeCompare(first.name, "es-AR");
    }

    if (sort === "newest") {
      return (second.createdAt ?? "").localeCompare(first.createdAt ?? "");
    }

    const featuredDifference =
      Number(Boolean(second.featured)) - Number(Boolean(first.featured));

    if (featuredDifference !== 0) {
      return featuredDifference;
    }

    return first.name.localeCompare(second.name, "es-AR");
  });
}
