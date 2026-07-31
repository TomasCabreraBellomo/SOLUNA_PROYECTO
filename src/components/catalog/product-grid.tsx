import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/ui/reveal";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.sku} product={product} />
      ))}
    </Reveal>
  );
}
