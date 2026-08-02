export {
  getCatalogProducts,
  getCatalogSort,
  getCategoriesWithProductCount,
  getFeaturedProducts,
  getOfferCombos,
  getOfferProducts,
  getOtherOfferProducts,
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
  splitOfferProducts,
} from "./catalog.service";
export type { OfferProductGroups } from "./catalog.service";
export {
  createProductSlug,
  filterProducts,
  getStockStatus,
  normalizeSearchText,
  sortProducts,
} from "./catalog.utils";
export {
  calculateSavingsAmount,
  calculateDiscountPercentage,
  getEffectivePrice,
  getOfferValidationError,
  getPreviousPrice,
  isOfferActive,
} from "./offer";
export type { OfferProduct } from "./offer";
export { validateCatalogProducts } from "./catalog.validation";
export type { CatalogFilters, CatalogSort, StockStatus } from "./catalog.utils";
