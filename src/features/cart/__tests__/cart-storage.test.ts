import { describe, expect, it } from "vitest";

import {
  CART_STORAGE_VERSION,
  parsePersistedCart,
  reconcilePersistedCart,
  serializeCart,
} from "@/features/cart";
import type { CartItem, CartProduct } from "@/features/cart";

const currentProduct: CartProduct = {
  sku: "SOL-001",
  slug: "producto-actual",
  name: "Nombre actual",
  regularPrice: 15000,
  effectivePrice: 15000,
  offerActive: false,
  stock: 3,
};

describe("cart persistence", () => {
  it("serializes only the version, SKU and quantity", () => {
    const item: CartItem = { ...currentProduct, quantity: 2 };
    const serialized = serializeCart([item]);

    expect(JSON.parse(serialized)).toEqual({
      version: CART_STORAGE_VERSION,
      items: [{ sku: "SOL-001", quantity: 2 }],
    });
    expect(serialized).not.toContain("Nombre actual");
    expect(serialized).not.toContain("15000");
  });

  it.each([
    "not-json",
    JSON.stringify({ version: 99, items: [] }),
    JSON.stringify({ version: 1, items: "invalid" }),
  ])("ignores corrupt or unsupported data: %s", (value) => {
    expect(parsePersistedCart(value)).toEqual([]);
  });

  it("ignores invalid entries within a valid persisted cart", () => {
    const value = JSON.stringify({
      version: 1,
      items: [
        { sku: "SOL-001", quantity: 2 },
        { sku: "", quantity: 1 },
        { sku: "SOL-002", quantity: -1 },
      ],
    });

    expect(parsePersistedCart(value)).toEqual([
      { sku: "SOL-001", quantity: 2 },
    ]);
  });

  it("drops a product removed from the current catalog", () => {
    expect(
      reconcilePersistedCart(
        [{ sku: "REMOVED", quantity: 2 }],
        [currentProduct],
      ),
    ).toEqual([]);
  });

  it("uses current catalog data and current price when recovering", () => {
    expect(
      reconcilePersistedCart(
        [{ sku: "SOL-001", quantity: 2 }],
        [currentProduct],
      ),
    ).toEqual([{ ...currentProduct, quantity: 2 }]);
  });

  it("clamps recovered quantities to current stock", () => {
    expect(
      reconcilePersistedCart(
        [{ sku: "SOL-001", quantity: 20 }],
        [currentProduct],
      )[0].quantity,
    ).toBe(3);
  });
});
