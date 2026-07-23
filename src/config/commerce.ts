export const commerceConfig = {
  freeShippingThreshold: 120000,
  whatsapp: {
    phone: "5493874093118",
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
) {
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${commerceConfig.whatsapp.phone}?text=${encodedMessage}`;
}
