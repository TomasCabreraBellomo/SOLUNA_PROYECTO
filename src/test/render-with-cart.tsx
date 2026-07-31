import { render, type RenderOptions } from "@testing-library/react";
import type { ReactNode } from "react";

import { CartProvider, type CartProduct } from "@/features/cart";

export function renderWithCart(
  ui: ReactNode,
  catalog: CartProduct[] = [],
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(<CartProvider catalog={catalog}>{ui}</CartProvider>, options);
}
