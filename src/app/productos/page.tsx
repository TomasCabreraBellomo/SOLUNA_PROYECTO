import type { Metadata } from "next";

import { CatalogEmptyState } from "@/components/catalog/catalog-empty-state";
import { ProductFilters } from "@/components/catalog/product-filters";
import { ProductGrid } from "@/components/catalog/product-grid";
import { ProductResultsHeader } from "@/components/catalog/product-results-header";
import { PublicLayout } from "@/components/layout/public-layout";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getCatalogProducts,
  getCategoriesWithProductCount,
  getProductColors,
  getProductMaterials,
  getProductPriceRange,
  hasNewestSort,
  normalizeCatalogFilters,
} from "@/features/catalog";
import {
  hasActiveCatalogFilters,
  parseCatalogSearchParams,
  type CatalogSearchParams,
} from "@/features/catalog/search-params";

export const metadata: Metadata = {
  title: "Productos",
  description: "Catálogo de joyas y accesorios Soluna.",
};

type ProductosPageProps = {
  searchParams: Promise<CatalogSearchParams>;
};

export default async function ProductosPage({
  searchParams,
}: ProductosPageProps) {
  const parsedSearchParams = await searchParams;
  const filters = normalizeCatalogFilters(
    parseCatalogSearchParams(parsedSearchParams),
  );
  const products = getCatalogProducts(filters);
  const hasFilters = hasActiveCatalogFilters(filters);

  return (
    <PublicLayout>
      <Section>
        <Container>
          <SectionHeading
            description="Explorá la selección inicial de joyas y accesorios Soluna. Podés buscar, filtrar y compartir la URL con tus preferencias."
            eyebrow="Catálogo"
            title="Productos"
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[18rem_1fr] lg:items-start">
            <aside className="hidden rounded-soluna border border-border bg-surface p-5 lg:block">
              <ProductFilters
                categories={getCategoriesWithProductCount()}
                colors={getProductColors()}
                filters={filters}
                materials={getProductMaterials()}
                priceRange={getProductPriceRange()}
                showNewestSort={hasNewestSort()}
              />
            </aside>

            <div className="grid gap-6">
              <details className="rounded-soluna border border-border bg-surface p-4 lg:hidden">
                <summary className="cursor-pointer text-sm font-semibold text-foreground">
                  Filtros y ordenamiento
                </summary>
                <div className="mt-5">
                  <ProductFilters
                    categories={getCategoriesWithProductCount()}
                    colors={getProductColors()}
                    filters={filters}
                    materials={getProductMaterials()}
                    priceRange={getProductPriceRange()}
                    showNewestSort={hasNewestSort()}
                  />
                </div>
              </details>

              <ProductResultsHeader
                count={products.length}
                hasFilters={hasFilters}
              />
              {products.length > 0 ? (
                <ProductGrid products={products} />
              ) : (
                <CatalogEmptyState hasFilters={hasFilters} />
              )}
            </div>
          </div>
        </Container>
      </Section>
    </PublicLayout>
  );
}
