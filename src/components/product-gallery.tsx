"use client";

import Image from "next/image";
import { useState } from "react";

import { ProductImagePlaceholder } from "@/components/product-image-placeholder";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/product";

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  return (
    <div className="grid gap-4">
      <div className="relative aspect-square overflow-hidden rounded-soluna border border-border bg-surface-muted">
        {activeImage ? (
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            className="object-cover"
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        ) : (
          <ProductImagePlaceholder />
        )}
      </div>

      {images.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              aria-label={`Ver imagen ${index + 1} de ${productName}`}
              className={cn(
                "relative size-20 shrink-0 overflow-hidden rounded-soluna border bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring",
                activeIndex === index ? "border-accent-gold" : "border-border",
              )}
              key={image.src}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <Image
                src={image.src}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
