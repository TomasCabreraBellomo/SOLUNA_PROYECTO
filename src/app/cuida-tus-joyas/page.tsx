import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Cuida tus joyas",
  description: "Recomendaciones de cuidado para accesorios Soluna.",
};

export default function CuidaTusJoyasPage() {
  return (
    <PlaceholderPage
      description="Próximamente reuniremos recomendaciones simples para conservar mejor tus piezas."
      eyebrow="Cuidado"
      title="Cuida tus joyas"
    />
  );
}
