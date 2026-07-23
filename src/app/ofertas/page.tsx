import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Ofertas",
  description: "Ofertas seleccionadas de Soluna.",
};

export default function OfertasPage() {
  return (
    <PlaceholderPage
      description="Este espacio queda reservado para descuentos reales y oportunidades destacadas."
      eyebrow="Ofertas"
      title="Selecciones especiales"
    />
  );
}
