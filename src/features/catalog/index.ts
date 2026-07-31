export {
  getCatalogProducts,
  getCatalogSort,
  getCategoriesWithProductCount,
  getFeaturedProducts,
  getOfferProducts,
  getProductBySku,
  getProductBySlug,
  getProductColors,
  getProductImagePaths,
  getProductMaterials,
  getProductPriceRange,
  getProductPrimaryImage,
  getProducts,
  getProductsByCategory,
  getRelatedProducts,
  getVisibleProducts,
  hasNewestSort,
  normalizeCatalogFilters,
} from "./catalog.service";
export {
  createProductSlug,
  filterProducts,
  getStockStatus,
  normalizeSearchText,
  sortProducts,
} from "./catalog.utils";
export {
  calculateDiscountPercentage,
  getEffectivePrice,
  getOfferValidationError,
  getPreviousPrice,
  isOfferActive,
} from "./offer";
export type { OfferProduct } from "./offer";
export { validateCatalogProducts } from "./catalog.validation";
export type { CatalogFilters, CatalogSort, StockStatus } from "./catalog.utils";
