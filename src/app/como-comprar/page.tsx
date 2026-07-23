import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Cómo comprar",
  description: "Información para comprar y coordinar pedidos en Soluna.",
};

export default function ComoComprarPage() {
  return (
    <PlaceholderPage
      description="La guía completa de compra se incorporará junto con el flujo comercial definitivo."
      eyebrow="Compras"
      title="Cómo comprar"
    />
  );
}
