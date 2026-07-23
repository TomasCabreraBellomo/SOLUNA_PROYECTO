import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { getProductImagePath } from "@/features/catalog";
import { formatCurrency } from "@/lib/formatters";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-lg border border-soluna-silver/35 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-square bg-soluna-blush/50">
        <Image
          src={getProductImagePath(product.sku)}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        {product.isNew ? <Badge className="absolute left-3 top-3">Nuevo</Badge> : null}
      </div>
      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-soluna-gold">
            {product.category}
          </p>
          <h3 className="mt-1 text-base font-semibold text-soluna-ink">{product.name}</h3>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-soluna-graphite">
          {product.description}
        </p>
        <p className="text-sm font-semibold text-soluna-ink">
          {formatCurrency(product.price, product.currency)}
        </p>
      </div>
    </article>
  );
}
