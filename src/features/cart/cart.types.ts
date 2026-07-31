export type CartProductImage = {
  src: string;
  alt: string;
};

export type CartProduct = {
  sku: string;
  slug: string;
  name: string;
  image?: CartProductImage;
  regularPrice: number;
  effectivePrice: number;
  offerActive: boolean;
  stock: number;
};

export type CartItem = CartProduct & {
  quantity: number;
};

export type PersistedCartItem = {
  sku: string;
  quantity: number;
};

export type PersistedCart = {
  version: 1;
  items: PersistedCartItem[];
};

export type CartCustomerDetails = {
  name?: string;
  locality?: string;
  observations?: string;
};

export type CartMutationResult =
  | { ok: true; item: CartItem }
  | {
      ok: false;
      reason: "not-found" | "out-of-stock" | "quantity-limit";
    };
