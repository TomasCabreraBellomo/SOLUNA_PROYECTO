import type { Product } from "@/types/product";

export type OfferProduct = Pick<Product, "offer" | "offerPrice" | "price">;

export function getOfferValidationError(product: OfferProduct): string | null {
  if (product.offer !== true) {
    return null;
  }

  if (typeof product.offerPrice !== "number") {
    return "Precio Oferta es obligatorio cuando Oferta es 1.";
  }

  if (!Number.isFinite(product.offerPrice)) {
    return "Precio Oferta debe ser numérico.";
  }

  if (product.offerPrice <= 0) {
    return "Precio Oferta debe ser mayor que cero cuando Oferta es 1.";
  }

  if (product.offerPrice >= product.price) {
    return "Precio Oferta debe ser menor que Precio cuando Oferta es 1.";
  }

  return null;
}

export function isOfferActive(product: OfferProduct): boolean {
  return product.offer === true && getOfferValidationError(product) === null;
}

export function getEffectivePrice(product: OfferProduct): number {
  return isOfferActive(product) && typeof product.offerPrice === "number"
    ? product.offerPrice
    : product.price;
}

export function getPreviousPrice(product: OfferProduct): number | null {
  return isOfferActive(product) ? product.price : null;
}

export function calculateSavingsAmount(product: OfferProduct): number | null {
  if (!isOfferActive(product) || typeof product.offerPrice !== "number") {
    return null;
  }

  return product.price - product.offerPrice;
}

export function calculateDiscountPercentage(
  product: OfferProduct,
): number | null {
  if (!isOfferActive(product) || typeof product.offerPrice !== "number") {
    return null;
  }

  return Math.round(
    ((product.price - product.offerPrice) / product.price) * 100,
  );
}
