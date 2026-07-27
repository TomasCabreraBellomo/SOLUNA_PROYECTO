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
  calculateDiscountPercentage,
  createProductSlug,
  filterProducts,
  getStockStatus,
  isValidOffer,
  normalizeSearchText,
  sortProducts,
} from "./catalog.utils";
export { validateCatalogProducts } from "./catalog.validation";
export type { CatalogFilters, CatalogSort, StockStatus } from "./catalog.utils";
