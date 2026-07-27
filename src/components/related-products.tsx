import { ProductGrid } from "@/components/catalog/product-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Product } from "@/types/product";

type RelatedProductsProps = {
  products: Product[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <SectionHeading
        description="Otras piezas que pueden acompañar esta selección."
        eyebrow="Relacionados"
        title="También te puede gustar"
      />
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
