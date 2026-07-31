import { commerceConfig, getWhatsAppUrl } from "@/config/commerce";
import { formatCurrency } from "@/lib/formatters";

import type { CartCustomerDetails, CartItem } from "./cart.types";
import { getCartItemSubtotal, getCartTotal } from "./cart.utils";

export const CART_CUSTOMER_NAME_MAX_LENGTH = 80;
export const CART_CUSTOMER_LOCALITY_MAX_LENGTH = 80;
export const CART_CUSTOMER_OBSERVATIONS_MAX_LENGTH = 500;

export type WhatsAppOrderConfig = {
  recipientName: string;
  storeName: string;
  siteUrl: string;
};

const defaultOrderConfig: WhatsAppOrderConfig = {
  recipientName: commerceConfig.orderRecipientName,
  storeName: commerceConfig.storeName,
  siteUrl: commerceConfig.publicSiteUrl,
};

function sanitizeSingleLine(value: string | undefined, limit: number): string {
  return (value ?? "")
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

export function sanitizeObservations(value: string | undefined): string {
  return (value ?? "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .trim()
    .slice(0, CART_CUSTOMER_OBSERVATIONS_MAX_LENGTH);
}

export function buildWhatsAppOrderMessage(
  items: CartItem[],
  customer: CartCustomerDetails = {},
  config: WhatsAppOrderConfig = defaultOrderConfig,
): string {
  const recipientName = sanitizeSingleLine(config.recipientName, 80);
  const storeName = sanitizeSingleLine(config.storeName, 80);
  const siteUrl = sanitizeSingleLine(config.siteUrl, 300);
  const name = sanitizeSingleLine(customer.name, CART_CUSTOMER_NAME_MAX_LENGTH);
  const locality = sanitizeSingleLine(
    customer.locality,
    CART_CUSTOMER_LOCALITY_MAX_LENGTH,
  );
  const observations = sanitizeObservations(customer.observations);
  const productLines = items.map((item, index) => {
    const productName = sanitizeSingleLine(item.name, 160);
    const sku = sanitizeSingleLine(item.sku, 80);

    return [
      `${index + 1}. ${productName}`,
      `   SKU: ${sku}`,
      `   Cantidad: ${item.quantity}`,
      `   Precio unitario: ${formatCurrency(item.effectivePrice)}`,
      `   Subtotal: ${formatCurrency(getCartItemSubtotal(item))}`,
    ].join("\n");
  });
  const lines = [
    `Hola ${recipientName} 👋`,
    "",
    `Quiero realizar un pedido en ${storeName}.`,
    "",
    "Productos:",
    "",
    productLines.join("\n\n"),
    "",
    `Total estimado: ${formatCurrency(getCartTotal(items))}`,
  ];

  if (name) {
    lines.push("", `Nombre: ${name}`);
  }
  if (locality) {
    lines.push(`Localidad: ${locality}`);
  }
  if (observations) {
    lines.push(`Observaciones: ${observations}`);
  }

  lines.push(
    "",
    `Enlace del sitio: ${siteUrl}`,
    "",
    "Aclaración: pedido sujeto a confirmación de disponibilidad y envío.",
  );

  return lines.join("\n");
}

export function buildWhatsAppOrderUrl(
  items: CartItem[],
  customer: CartCustomerDetails = {},
): string {
  return getWhatsAppUrl(buildWhatsAppOrderMessage(items, customer));
}
