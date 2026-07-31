import type { Metadata } from "next";

import { CatalogEmptyState } from "@/components/catalog/catalog-empty-state";
import { ProductGrid } from "@/components/catalog/product-grid";
import { PublicLayout } from "@/components/layout/public-layout";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getOfferProducts } from "@/features/catalog";

export const metadata: Metadata = {
  title: "Ofertas",
  description: "Ofertas reales disponibles en Soluna.",
};

export default function OfertasPage() {
  const products = getOfferProducts();

  return (
    <PublicLayout>
      <Section className="pt-10 sm:pt-14 lg:pt-16">
        <Container>
          <SectionHeading
            description="Productos con precio especial cargado en el catálogo. Si no hay ofertas visibles, no mostramos descuentos inventados."
            eyebrow="Ofertas"
            title="Selecciones especiales"
          />
          <div className="mt-10">
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <CatalogEmptyState />
            )}
          </div>
        </Container>
      </Section>
    </PublicLayout>
  );
}
