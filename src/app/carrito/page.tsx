import type { Metadata } from "next";

import { PublicLayout } from "@/components/layout/public-layout";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CartPage } from "@/features/cart/cart-page";

export const metadata: Metadata = {
  title: "Carrito",
  description:
    "Revisá tus productos y prepará tu pedido de Soluna por WhatsApp.",
};

export default function CarritoPage() {
  return (
    <PublicLayout>
      <Section className="pt-10 sm:pt-14 lg:pt-16">
        <Container>
          <SectionHeading
            description="Revisá productos y cantidades antes de abrir el pedido en WhatsApp."
            eyebrow="Tu selección"
            title="Carrito"
          />
          <div className="mt-10">
            <CartPage />
          </div>
        </Container>
      </Section>
    </PublicLayout>
  );
}
