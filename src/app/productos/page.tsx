import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Productos",
  description: "Catálogo de joyas y accesorios Soluna.",
};

export default function ProductosPage() {
  return (
    <PlaceholderPage
      description="El catálogo navegable se implementará cuando avance la carga completa de productos."
      eyebrow="Catálogo"
      title="Productos"
    />
  );
}
