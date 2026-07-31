import { siteConfig } from "@/config/site";

function getWhatsAppNumber(): string {
  const number =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "5493874093118";

  if (!/^\d{10,15}$/.test(number)) {
    throw new Error(
      "NEXT_PUBLIC_WHATSAPP_NUMBER debe contener entre 10 y 15 dígitos, sin espacios ni símbolos.",
    );
  }

  return number;
}

export const commerceConfig = {
  storeName: siteConfig.shortName,
  orderRecipientName: "Sofía",
  publicSiteUrl: siteConfig.url,
  freeShippingThreshold: 120000,
  whatsapp: {
    phone: getWhatsAppNumber(),
    label: "Consultar por WhatsApp",
    message: "Hola Soluna, quiero hacer una consulta.",
  },
  shippingMethods: [
    "Correo Argentino",
    "Andreani",
    "Retiro coordinado previamente",
    "Cadetería o Uber en Tucumán",
  ],
  paymentMethods: [
    "Efectivo",
    "Transferencia",
    "Débito",
    "Link de pago",
    "Tarjetas y cuotas con interés",
  ],
} as const;

export function getWhatsAppUrl(
  message: string = commerceConfig.whatsapp.message,
): string {
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${commerceConfig.whatsapp.phone}?text=${encodedMessage}`;
}
