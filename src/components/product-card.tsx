import Image from "next/image";
import Link from "next/link";

import { ProductImagePlaceholder } from "@/components/product-image-placeholder";
import { ProductStockStatus } from "@/components/product-stock-status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { getCategoryByValue } from "@/config/categories";
import {
  calculateDiscountPercentage,
  getProductPrimaryImage,
  getStockStatus,
  isOfferActive,
} from "@/features/catalog";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const image = getProductPrimaryImage(product);
  const stockStatus = getStockStatus(product.stock);
  const hasOffer = isOfferActive(product);
  const discount = calculateDiscountPercentage(product);
  const category = getCategoryByValue(product.category);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-soluna-lg border border-border/85 bg-surface shadow-card transition-all duration-standard ease-soluna hover:-translate-y-1 hover:border-accent-gold/30 hover:shadow-lift focus-within:-translate-y-1 focus-within:border-accent-gold/40 focus-within:shadow-lift">
      <div className="relative aspect-square overflow-hidden bg-surface-muted">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-slow ease-soluna group-hover:scale-[1.035]"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <ProductImagePlaceholder />
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {hasOffer ? (
            <Badge variant="offer">
              {discount ? `${discount}% off` : "Oferta"}
            </Badge>
          ) : null}
          {stockStatus.value === "low-stock" ? (
            <Badge>Últimas unidades</Badge>
          ) : null}
          {stockStatus.value === "out-of-stock" ? (
            <Badge variant="danger">Sin stock</Badge>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-5">
        <div>
          <p className="text-eyebrow font-bold uppercase text-accent-gold">
            {category?.label ?? product.category}
          </p>
          <h3 className="mt-2 text-lg font-semibold leading-snug text-foreground">
            <Link
              className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              href={`/productos/${product.slug}`}
            >
              {product.name}
            </Link>
          </h3>
          {product.material ? (
            <p className="mt-1 text-small text-muted-foreground">
              {product.material}
            </p>
          ) : null}
        </div>
        {product.description ? (
          <p className="line-clamp-2 text-small text-muted-foreground">
            {product.description}
          </p>
        ) : null}
        <div className="mt-auto space-y-3">
          <Price product={product} />
          <ProductStockStatus stock={product.stock} />
        </div>
        <Button
          className="w-full px-3"
          href={`/productos/${product.slug}`}
          variant="secondary"
        >
          Ver producto
        </Button>
      </div>
    </article>
  );
}
