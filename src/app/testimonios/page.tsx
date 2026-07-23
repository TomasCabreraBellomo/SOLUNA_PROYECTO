import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Testimonios",
  description: "Experiencias y mensajes de la comunidad Soluna.",
};

export default function TestimoniosPage() {
  return (
    <PlaceholderPage
      description="Más adelante se sumarán reseñas verificadas y capturas autorizadas."
      eyebrow="Testimonios"
      title="Historias de clientas"
    />
  );
}
