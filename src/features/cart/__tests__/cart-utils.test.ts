import { describe, expect, it } from "vitest";

import {
  addProductToCart,
  clearCart,
  createCartProduct,
  decrementCartItem,
  getCartItemSubtotal,
  getCartTotal,
  getCartTotalQuantity,
  incrementCartItem,
  removeCartItem,
  setCartItemQuantity,
} from "@/features/cart";
import type { CartItem, CartProduct } from "@/features/cart";
import type { Product } from "@/types/product";

const product: CartProduct = {
  sku: "SOL-TEST-0001",
  slug: "producto",
  name: "Producto",
  regularPrice: 12000,
  effectivePrice: 12000,
  offerActive: false,
  stock: 5,
};

function item(quantity = 1): CartItem {
  return { ...product, quantity };
}

describe("cart utilities", () => {
  it("adds a new product", () => {
    expect(addProductToCart([], product)).toEqual([item()]);
  });

  it("adding the same product twice increments quantity", () => {
    const once = addProductToCart([], product);
    expect(addProductToCart(once, product)[0].quantity).toBe(2);
  });

  it("changes, increments and decrements quantity without going below one", () => {
    expect(setCartItemQuantity([item()], product.sku, 4)[0].quantity).toBe(4);
    expect(incrementCartItem([item(2)], product.sku)[0].quantity).toBe(3);
    expect(decrementCartItem([item(2)], product.sku)[0].quantity).toBe(1);
    expect(decrementCartItem([item()], product.sku)[0].quantity).toBe(1);
    expect(setCartItemQuantity([item()], product.sku, 0)[0].quantity).toBe(1);
  });

  it("removes a product and clears the cart", () => {
    expect(removeCartItem([item()], product.sku)).toEqual([]);
    expect(clearCart()).toEqual([]);
  });

  it("does not add an out-of-stock product", () => {
    expect(addProductToCart([], { ...product, stock: 0 })).toEqual([]);
  });

  it("calculates subtotal, total quantity and total", () => {
    const items = [item(2), { ...item(3), sku: "SOL-TEST-0002" }];

    expect(getCartItemSubtotal(items[0])).toBe(24000);
    expect(getCartTotalQuantity(items)).toBe(5);
    expect(getCartTotal(items)).toBe(60000);
  });

  it("uses the normal price when Oferta is 0", () => {
    const catalogProduct: Product = {
      sku: product.sku,
      slug: product.slug,
      name: product.name,
      category: "pulseras",
      description: "",
      price: 12000,
      offer: false,
      offerPrice: 8000,
      stock: 2,
    };

    expect(createCartProduct(catalogProduct)).toMatchObject({
      regularPrice: 12000,
      effectivePrice: 12000,
      offerActive: false,
    });
  });

  it("uses a valid promotional price only when Oferta is 1", () => {
    const catalogProduct: Product = {
      sku: product.sku,
      slug: product.slug,
      name: product.name,
      category: "pulseras",
      description: "",
      price: 12000,
      offer: true,
      offerPrice: 8000,
      stock: 2,
    };

    expect(createCartProduct(catalogProduct)).toMatchObject({
      regularPrice: 12000,
      effectivePrice: 8000,
      offerActive: true,
    });
  });

  it("adds a combo as one catalog product with its own stock and price", () => {
    const combo: Product = {
      sku: "SOL-CMB-0001",
      slug: "combo-inicial",
      name: "Combo inicial",
      category: "combos",
      description: "Incluye pulsera y charm.",
      price: 65000,
      offer: true,
      offerPrice: 55000,
      stock: 3,
    };
    const cartCombo = createCartProduct(combo);

    expect(addProductToCart([], cartCombo)).toEqual([
      expect.objectContaining({
        sku: combo.sku,
        effectivePrice: 55000,
        quantity: 1,
      }),
    ]);
  });
});
