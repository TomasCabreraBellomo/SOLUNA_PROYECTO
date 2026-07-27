import { getCatalogSort, type CatalogFilters } from "@/features/catalog";

type SearchParamsValue = string | string[] | undefined;

export type CatalogSearchParams = Record<string, SearchParamsValue>;

function getParamValue(value: SearchParamsValue): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function getNumberParam(value: SearchParamsValue): number | undefined {
  const rawValue = getParamValue(value);
  const parsedValue = rawValue ? Number(rawValue) : Number.NaN;

  return Number.isFinite(parsedValue) ? parsedValue : undefined;
}

export function parseCatalogSearchParams(
  searchParams: CatalogSearchParams,
): CatalogFilters {
  return {
    search: getParamValue(searchParams.search),
    category: getParamValue(searchParams.category),
    material: getParamValue(searchParams.material),
    color: getParamValue(searchParams.color),
    minPrice: getNumberParam(searchParams.minPrice),
    maxPrice: getNumberParam(searchParams.maxPrice),
    inStock: getParamValue(searchParams.inStock) === "true",
    offers: getParamValue(searchParams.offers) === "true",
    sort: getCatalogSort(getParamValue(searchParams.sort)),
  };
}

export function hasActiveCatalogFilters(filters: CatalogFilters): boolean {
  return Boolean(
    filters.search ||
    filters.category ||
    filters.material ||
    filters.color ||
    typeof filters.minPrice === "number" ||
    typeof filters.maxPrice === "number" ||
    filters.inStock ||
    filters.offers ||
    (filters.sort && filters.sort !== "featured"),
  );
}
