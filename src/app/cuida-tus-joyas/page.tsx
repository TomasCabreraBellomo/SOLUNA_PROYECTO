import type { Metadata } from "next";

import { JewelryCarePage } from "@/features/jewelry-care";

export const metadata: Metadata = {
  title: {
    absolute: "Cuida tus joyas | Guía de cuidados Soluna",
  },
  description:
    "Consejos prácticos para limpiar, guardar y conservar tus accesorios de Plata 925, acero, cobre blanco y fantasía.",
};

export default function CuidaTusJoyasPage() {
  return <JewelryCarePage />;
}
