import Image from "next/image";
import { Eye, ShoppingBag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { getProductImagePath } from "@/features/catalog";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const isSoldOut = product.stock === 0;
  const hasSalePrice =
    typeof product.salePrice === "number" && product.salePrice < product.price;
  const isLowStock = product.stock > 0 && product.stock <= 2;
  const material = product.materials[0] ?? "Material seleccionado";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-soluna border border-border bg-surface shadow-sm transition hover:-translate-y-0.5 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden bg-surface-muted">
        <div className="absolute inset-8 rounded-full border border-accent-gold/25" />
        <div className="absolute bottom-8 left-8 h-16 w-16 rounded-full bg-secondary/80 blur-xl" />
        <Image
          src={getProductImagePath(product.sku)}
          alt={product.name}
          fill
          className="object-cover opacity-80 transition duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.isNew ? <Badge>Nuevo</Badge> : null}
          {hasSalePrice ? <Badge>Oferta</Badge> : null}
          {isLowStock ? <Badge>Últimas unidades</Badge> : null}
          {isSoldOut ? (
            <Badge className="border-destructive/30 text-destructive">
              Sin stock
            </Badge>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <p className="text-eyebrow font-bold uppercase text-accent-gold">
            {product.category}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {product.name}
          </h3>
          <p className="mt-1 text-small text-muted-foreground">{material}</p>
        </div>
        <p className="line-clamp-2 text-small text-muted-foreground">
          {product.description}
        </p>
        <Price
          className="mt-auto"
          currency={product.currency}
          price={product.price}
          salePrice={product.salePrice}
        />
        <div className="grid grid-cols-2 gap-2">
          <Button className="px-3" href="/productos" variant="secondary">
            <Eye aria-hidden="true" size={16} strokeWidth={1.8} />
            Ver
          </Button>
          <Button className="px-3" disabled={isSoldOut} variant="ghost">
            <ShoppingBag aria-hidden="true" size={16} strokeWidth={1.8} />
            Agregar
          </Button>
        </div>
      </div>
    </article>
  );
}
