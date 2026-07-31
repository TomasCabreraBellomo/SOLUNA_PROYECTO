import { getEffectivePrice, isOfferActive } from "@/features/catalog/offer";
import type { Product, ProductImage } from "@/types/product";

import type { CartItem, CartProduct } from "./cart.types";

export const MAX_CART_ITEM_QUANTITY = 10;

export function createCartProduct(
  product: Product,
  image?: ProductImage,
): CartProduct {
  return {
    sku: product.sku,
    slug: product.slug,
    name: product.name,
    ...(image ? { image: { src: image.src, alt: image.alt } } : {}),
    regularPrice: product.price,
    effectivePrice: getEffectivePrice(product),
    offerActive: isOfferActive(product),
    stock: product.stock,
  };
}

export function getCartItemQuantityLimit(product: CartProduct): number {
  if (!Number.isInteger(product.stock) || product.stock <= 0) {
    return 0;
  }

  return Math.min(product.stock, MAX_CART_ITEM_QUANTITY);
}

export function getCartItemSubtotal(item: CartItem): number {
  return item.effectivePrice * item.quantity;
}

export function getCartTotalQuantity(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + getCartItemSubtotal(item), 0);
}

export function addProductToCart(
  items: CartItem[],
  product: CartProduct,
): CartItem[] {
  const limit = getCartItemQuantityLimit(product);
  if (limit === 0) {
    return items;
  }

  const existingItem = items.find((item) => item.sku === product.sku);
  if (!existingItem) {
    return [...items, { ...product, quantity: 1 }];
  }

  if (existingItem.quantity >= limit) {
    return items;
  }

  return items.map((item) =>
    item.sku === product.sku ? { ...item, quantity: item.quantity + 1 } : item,
  );
}

export function setCartItemQuantity(
  items: CartItem[],
  sku: string,
  quantity: number,
): CartItem[] {
  if (!Number.isInteger(quantity) || quantity < 1) {
    return items;
  }

  return items.map((item) => {
    if (item.sku !== sku) {
      return item;
    }

    const limit = getCartItemQuantityLimit(item);
    if (limit === 0) {
      return item;
    }

    return { ...item, quantity: Math.min(quantity, limit) };
  });
}

export function incrementCartItem(items: CartItem[], sku: string): CartItem[] {
  const item = items.find((candidate) => candidate.sku === sku);
  return item ? setCartItemQuantity(items, sku, item.quantity + 1) : items;
}

export function decrementCartItem(items: CartItem[], sku: string): CartItem[] {
  const item = items.find((candidate) => candidate.sku === sku);
  if (!item || item.quantity === 1) {
    return items;
  }

  return setCartItemQuantity(items, sku, item.quantity - 1);
}

export function removeCartItem(items: CartItem[], sku: string): CartItem[] {
  return items.filter((item) => item.sku !== sku);
}

export function clearCart(): CartItem[] {
  return [];
}
