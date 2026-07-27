import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductBreadcrumbs } from "@/components/product-breadcrumbs";
import { ProductGallery } from "@/components/product-gallery";
import { ProductStockStatus } from "@/components/product-stock-status";
import { RelatedProducts } from "@/components/related-products";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Price } from "@/components/ui/price";
import { Section } from "@/components/ui/section";
import { commerceConfig, getWhatsAppUrl } from "@/config/commerce";
import { getCategoryByValue } from "@/config/categories";
import { siteConfig } from "@/config/site";
import {
  getProductBySlug,
  getProductImagePaths,
  getProductPrimaryImage,
  getRelatedProducts,
  getVisibleProducts,
  isValidOffer,
} from "@/features/catalog";
import { formatCurrency } from "@/lib/formatters";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getVisibleProducts().map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  const primaryImage = process.env.NEXT_PUBLIC_SITE_URL
    ? getProductPrimaryImage(product)
    : undefined;

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/productos/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | ${siteConfig.shortName}`,
      description: product.description,
      images: primaryImage
        ? [{ url: primaryImage.src, alt: primaryImage.alt }]
        : undefined,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = getCategoryByValue(product.category);
  const images = getProductImagePaths(product.sku);
  const relatedProducts = getRelatedProducts(product, 4);
  const whatsappMessage = `Hola Soluna, quisiera consultar por:\n\n${product.name}\nSKU: ${product.sku}`;

  return (
    <PublicLayout>
      <Section>
        <Container>
          <ProductBreadcrumbs product={product} />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <ProductGallery images={images} productName={product.name} />

            <div className="lg:sticky lg:top-28">
              <p className="text-eyebrow font-bold uppercase text-accent-gold">
                {category?.label ?? product.category}
              </p>
              <Heading as="h1" className="mt-3 text-h1">
                {product.name}
              </Heading>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Price price={product.price} offerPrice={product.offerPrice} />
                {isValidOffer(product) ? (
                  <span className="rounded-full bg-secondary px-3 py-1 text-label font-bold text-foreground">
                    Precio especial
                  </span>
                ) : null}
              </div>

              <div className="mt-6">
                <ProductStockStatus stock={product.stock} />
              </div>

              <dl className="mt-8 grid gap-4 rounded-soluna border border-border bg-surface p-5 text-small">
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-foreground">SKU</dt>
                  <dd className="text-muted-foreground">{product.sku}</dd>
                </div>
                {product.material ? (
                  <div className="flex justify-between gap-4">
                    <dt className="font-semibold text-foreground">Material</dt>
                    <dd className="text-muted-foreground">
                      {product.material}
                    </dd>
                  </div>
                ) : null}
                {product.color ? (
                  <div className="flex justify-between gap-4">
                    <dt className="font-semibold text-foreground">Color</dt>
                    <dd className="text-muted-foreground">{product.color}</dd>
                  </div>
                ) : null}
                {product.measurements ? (
                  <div className="flex justify-between gap-4">
                    <dt className="font-semibold text-foreground">Medidas</dt>
                    <dd className="text-muted-foreground">
                      {product.measurements}
                    </dd>
                  </div>
                ) : null}
              </dl>

              <div className="mt-8 space-y-4 text-body text-muted-foreground">
                <p>{product.description}</p>
                <p>
                  Envíos disponibles por Correo Argentino y Andreani. El retiro
                  se coordina previamente en San Miguel de Tucumán.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Button disabled variant="ghost">
                  Carrito próximamente
                </Button>
                <Button
                  href={getWhatsAppUrl(whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Consultar por WhatsApp
                </Button>
              </div>

              <p className="mt-4 text-small text-muted-foreground">
                Precio actual:{" "}
                {formatCurrency(product.offerPrice ?? product.price)}. Consultas
                y compras se coordinan por {commerceConfig.whatsapp.label}.
              </p>
            </div>
          </div>

          <RelatedProducts products={relatedProducts} />
        </Container>
      </Section>
    </PublicLayout>
  );
}
