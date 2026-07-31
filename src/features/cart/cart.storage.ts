import type {
  CartItem,
  CartProduct,
  PersistedCart,
  PersistedCartItem,
} from "./cart.types";
import { getCartItemQuantityLimit } from "./cart.utils";

export const CART_STORAGE_KEY = "soluna:cart";
export const CART_STORAGE_VERSION = 1 as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isPersistedCartItem(value: unknown): value is PersistedCartItem {
  return (
    isRecord(value) &&
    typeof value.sku === "string" &&
    value.sku.trim().length > 0 &&
    typeof value.quantity === "number" &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0
  );
}

export function parsePersistedCart(value: string | null): PersistedCartItem[] {
  if (!value) {
    return [];
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    return [];
  }

  if (
    !isRecord(parsed) ||
    parsed.version !== CART_STORAGE_VERSION ||
    !Array.isArray(parsed.items)
  ) {
    return [];
  }

  return parsed.items.filter(isPersistedCartItem);
}

export function serializeCart(items: CartItem[]): string {
  const persistedCart: PersistedCart = {
    version: CART_STORAGE_VERSION,
    items: items.map((item) => ({
      sku: item.sku,
      quantity: item.quantity,
    })),
  };

  return JSON.stringify(persistedCart);
}

export function reconcilePersistedCart(
  persistedItems: PersistedCartItem[],
  catalog: CartProduct[],
): CartItem[] {
  const catalogBySku = new Map(
    catalog.map((product) => [product.sku, product]),
  );
  const reconciledItems = new Map<string, CartItem>();

  for (const persistedItem of persistedItems) {
    const product = catalogBySku.get(persistedItem.sku);
    if (!product) {
      continue;
    }

    const limit = getCartItemQuantityLimit(product);
    if (limit === 0) {
      continue;
    }

    const currentQuantity = reconciledItems.get(product.sku)?.quantity ?? 0;
    const quantity = Math.min(currentQuantity + persistedItem.quantity, limit);
    reconciledItems.set(product.sku, { ...product, quantity });
  }

  return [...reconciledItems.values()];
}
