export type CartEventName =
  | "product_added_to_cart"
  | "product_removed_from_cart"
  | "whatsapp_checkout_started";

export function emitCartEvent(
  name: CartEventName,
  detail: Record<string, string | number>,
): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(`soluna:${name}`, {
      detail,
    }),
  );
}
