import { describe, expect, it } from "vitest";

import { commerceConfig } from "@/config/commerce";
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppOrderUrl,
  sanitizeObservations,
} from "@/features/cart";
import type { CartItem } from "@/features/cart";

const items: CartItem[] = [
  {
    sku: "SOL-Ñ-001",
    slug: "corazon",
    name: "Dije corazón ✨",
    regularPrice: 12000,
    effectivePrice: 8000,
    offerActive: true,
    stock: 4,
    quantity: 2,
  },
];

describe("WhatsApp order message", () => {
  it("includes products, effective prices, quantities and total", () => {
    const message = buildWhatsAppOrderMessage(items);

    expect(message).toContain("Hola Sofía 👋");
    expect(message).toContain("Dije corazón ✨");
    expect(message).toContain("SKU: SOL-Ñ-001");
    expect(message).toContain("Cantidad: 2");
    expect(message).toMatch(/Precio unitario:.*8\.000/);
    expect(message).toMatch(/Subtotal:.*16\.000/);
    expect(message).toMatch(/Total estimado:.*16\.000/);
    expect(message).toContain(commerceConfig.publicSiteUrl);
  });

  it("omits empty optional fields", () => {
    const message = buildWhatsAppOrderMessage(items, {
      name: " ",
      locality: "",
      observations: "\n",
    });

    expect(message).not.toContain("Nombre:");
    expect(message).not.toContain("Localidad:");
    expect(message).not.toContain("Observaciones:");
  });

  it("preserves safe observation lines and removes control characters", () => {
    expect(sanitizeObservations("Primera línea\r\nSegunda\u0000 línea")).toBe(
      "Primera línea\nSegunda línea",
    );
    expect(
      buildWhatsAppOrderMessage(items, {
        observations: "Primera línea\nSegunda línea",
      }),
    ).toContain("Observaciones: Primera línea\nSegunda línea");
  });

  it("encodes accents and emoji in the final official WhatsApp link", () => {
    const url = buildWhatsAppOrderUrl(items, { name: "María" });
    const parsedUrl = new URL(url);

    expect(parsedUrl.origin).toBe("https://wa.me");
    expect(parsedUrl.pathname).toBe(`/${commerceConfig.whatsapp.phone}`);
    expect(url).toContain("%F0%9F");
    expect(parsedUrl.searchParams.get("text")).toContain("María");
    expect(parsedUrl.searchParams.get("text")).toContain("corazón");
  });

  it("uses the centrally configured international number", () => {
    expect(commerceConfig.whatsapp.phone).toBe("5493874093118");
    expect(commerceConfig.whatsapp.phone).toMatch(/^\d+$/);
  });
});
