"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { emitCartEvent } from "./cart.events";
import {
  CART_STORAGE_KEY,
  parsePersistedCart,
  reconcilePersistedCart,
  serializeCart,
} from "./cart.storage";
import type {
  CartItem,
  CartMutationResult,
  CartProduct,
  PersistedCartItem,
} from "./cart.types";
import {
  addProductToCart,
  clearCart,
  decrementCartItem,
  getCartItemQuantityLimit,
  getCartTotal,
  getCartTotalQuantity,
  incrementCartItem,
  removeCartItem,
  setCartItemQuantity,
} from "./cart.utils";

type CartContextValue = {
  items: CartItem[];
  totalQuantity: number;
  total: number;
  hydrated: boolean;
  addProduct: (sku: string) => CartMutationResult;
  incrementItem: (sku: string) => void;
  decrementItem: (sku: string) => void;
  setItemQuantity: (sku: string, quantity: number) => void;
  removeItem: (sku: string) => void;
  clear: () => void;
};

type CartProviderProps = {
  catalog: CartProduct[];
  children: ReactNode;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ catalog, children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const itemsRef = useRef(items);
  const catalogBySku = useMemo(
    () => new Map(catalog.map((product) => [product.sku, product])),
    [catalog],
  );

  const commitItems = useCallback((nextItems: CartItem[]) => {
    itemsRef.current = nextItems;
    setItems(nextItems);
  }, []);

  useEffect(() => {
    let persistedItems: PersistedCartItem[] = [];
    try {
      persistedItems = parsePersistedCart(
        window.localStorage.getItem(CART_STORAGE_KEY),
      );
    } catch {
      persistedItems = [];
    }

    commitItems(reconcilePersistedCart(persistedItems, catalog));
    setHydrated(true);
  }, [catalog, commitItems]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, serializeCart(items));
    } catch {
      // El carrito sigue funcionando en memoria si localStorage no está disponible.
    }
  }, [hydrated, items]);

  useEffect(() => {
    function syncCart(event: StorageEvent) {
      if (event.key !== CART_STORAGE_KEY) {
        return;
      }

      commitItems(
        reconcilePersistedCart(parsePersistedCart(event.newValue), catalog),
      );
    }

    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, [catalog, commitItems]);

  const addProduct = useCallback(
    (sku: string): CartMutationResult => {
      const product = catalogBySku.get(sku);
      if (!product) {
        return { ok: false, reason: "not-found" };
      }

      const limit = getCartItemQuantityLimit(product);
      if (limit === 0) {
        return { ok: false, reason: "out-of-stock" };
      }

      const currentItems = itemsRef.current;
      const currentItem = currentItems.find((item) => item.sku === sku);
      if (currentItem && currentItem.quantity >= limit) {
        return { ok: false, reason: "quantity-limit" };
      }

      const nextItems = addProductToCart(currentItems, product);
      const nextItem = nextItems.find((item) => item.sku === sku);
      if (!nextItem) {
        return { ok: false, reason: "out-of-stock" };
      }

      commitItems(nextItems);
      emitCartEvent("product_added_to_cart", {
        sku,
        quantity: nextItem.quantity,
      });
      return { ok: true, item: nextItem };
    },
    [catalogBySku, commitItems],
  );

  const incrementItem = useCallback(
    (sku: string) => {
      commitItems(incrementCartItem(itemsRef.current, sku));
    },
    [commitItems],
  );

  const decrementItem = useCallback(
    (sku: string) => {
      commitItems(decrementCartItem(itemsRef.current, sku));
    },
    [commitItems],
  );

  const setItemQuantity = useCallback(
    (sku: string, quantity: number) => {
      commitItems(setCartItemQuantity(itemsRef.current, sku, quantity));
    },
    [commitItems],
  );

  const removeItem = useCallback(
    (sku: string) => {
      if (!itemsRef.current.some((item) => item.sku === sku)) {
        return;
      }
      commitItems(removeCartItem(itemsRef.current, sku));
      emitCartEvent("product_removed_from_cart", { sku });
    },
    [commitItems],
  );

  const clear = useCallback(() => {
    commitItems(clearCart());
  }, [commitItems]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalQuantity: getCartTotalQuantity(items),
      total: getCartTotal(items),
      hydrated,
      addProduct,
      incrementItem,
      decrementItem,
      setItemQuantity,
      removeItem,
      clear,
    }),
    [
      addProduct,
      clear,
      decrementItem,
      hydrated,
      incrementItem,
      items,
      removeItem,
      setItemQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe utilizarse dentro de CartProvider.");
  }

  return context;
}
