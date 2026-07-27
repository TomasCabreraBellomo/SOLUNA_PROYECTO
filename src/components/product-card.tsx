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
  isValidOffer,
} from "@/features/catalog";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const image = getProductPrimaryImage(product);
  const stockStatus = getStockStatus(product.stock);
  const hasOffer = isValidOffer(product);
  const discount = calculateDiscountPercentage(product);
  const category = getCategoryByValue(product.category);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-soluna border border-border bg-surface shadow-sm transition hover:-translate-y-0.5 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden bg-surface-muted">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <ProductImagePlaceholder />
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {hasOffer ? (
            <Badge>{discount ? `${discount}% off` : "Oferta"}</Badge>
          ) : null}
          {stockStatus.value === "low-stock" ? (
            <Badge>Últimas unidades</Badge>
          ) : null}
          {stockStatus.value === "out-of-stock" ? (
            <Badge className="border-destructive/30 text-destructive">
              Sin stock
            </Badge>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <p className="text-eyebrow font-bold uppercase text-accent-gold">
            {category?.label ?? product.category}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            <Link
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
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
        <p className="line-clamp-2 text-small text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-auto space-y-3">
          <Price price={product.price} offerPrice={product.offerPrice} />
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
