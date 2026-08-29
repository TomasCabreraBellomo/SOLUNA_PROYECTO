import {
  CircleDollarSign,
  MessagesSquare,
  PackageCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import Image from "next/image";

import { BenefitCard } from "@/components/benefit-card";
import { CategoryCard } from "@/components/category-card";
import { EmptyState } from "@/components/empty-state";
import { HomeCarePreview } from "@/components/jewelry-care/home-care-preview";
import { PublicLayout } from "@/components/layout/public-layout";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/whatsapp-button";
import {
  getCategoriesWithProductCount,
  getFeaturedProducts,
} from "@/features/catalog";

const benefits = [
  {
    icon: Truck,
    title: "Envíos a toda Argentina",
    description: "Opciones coordinadas con correo y operadores nacionales.",
  },
  {
    icon: CircleDollarSign,
    title: "Cuotas mediante link de pago",
    description: "Alternativas de pago claras antes de confirmar la compra.",
  },
  {
    icon: MessagesSquare,
    title: "Atención por WhatsApp",
    description: "Acompañamiento para elegir medida, material o regalo.",
  },
  {
    icon: PackageCheck,
    title: "Unidades seleccionadas",
    description:
      "Piezas elegidas en tandas chicas para conservar exclusividad.",
  },
] as const;

export function HomePage() {
  const featuredProducts = getFeaturedProducts(6);
  const featuredCategories = getCategoriesWithProductCount();

  return (
    <PublicLayout>
      <Section className="overflow-hidden pb-14 pt-8 sm:pb-20 sm:pt-14 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className="reveal-visible">
            <Badge className="shadow-none">Accesorios con intención</Badge>
            <p className="gold-signature mt-5 font-display text-5xl font-semibold uppercase leading-none tracking-[0.14em] sm:text-6xl lg:text-7xl">
              Soluna
            </p>
            <Heading
              as="h1"
              className="mt-5 max-w-2xl text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.9]"
            >
              <span className="block">Joyas que cuentan</span>
              <span className="brand-phrase-accent mt-1 block italic">
                tu historia
              </span>
            </Heading>
            <div
              aria-hidden="true"
              className="hero-gold-line mt-5 flex items-center gap-2"
            >
              <span className="h-px w-24 bg-gradient-to-r from-accent-gold to-accent-gold/15 sm:w-32" />
              <Sparkles
                className="text-accent-gold"
                size={15}
                strokeWidth={1.5}
              />
            </div>
            <p className="mt-5 max-w-lg text-body text-muted-foreground sm:mt-6">
              Charms, pulseras y accesorios seleccionados para acompañar tu
              estilo, regalar con intención y sumar brillo a lo cotidiano.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="sm:min-w-40" href="/productos">
                Ver productos
              </Button>
              <Button
                className="sm:min-w-40"
                href="/ofertas"
                variant="secondary"
              >
                Ver ofertas
              </Button>
            </div>
          </div>

          <div className="reveal-visible relative aspect-[4/5] min-h-0 overflow-hidden rounded-soluna-lg border border-border bg-surface-muted shadow-soft ring-1 ring-inset ring-background/30 sm:aspect-[4/3] lg:aspect-auto lg:min-h-[32rem]">
            <Image
              alt="Pulsera plateada con charms de colores sobre un fondo cálido"
              className="object-cover object-[52%_58%] sm:object-[center_62%] lg:object-[center_58%]"
              fill
              priority
              sizes="(min-width: 1280px) 38vw, (min-width: 1024px) 42vw, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2rem)"
              src="/images/hero/soluna-hero.jpg"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-background/5"
            />
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <SectionHeading
            description="Categorías con productos visibles en el catálogo actual."
            eyebrow="Categorías"
            title="Destacados para empezar a explorar"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCategories.map((category) => (
              <CategoryCard
                key={category.value}
                description={category.description ?? "Explorá esta selección."}
                href={`/productos?category=${category.value}`}
                icon={category.icon}
                label={category.label}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              description="Productos conectados mediante la capa de catálogo."
              eyebrow="Selección"
              title="Productos destacados"
            />
            <Button href="/productos" variant="secondary">
              Ver todos
            </Button>
          </Reveal>
          {featuredProducts.length ? (
            <Reveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.sku} product={product} />
              ))}
            </Reveal>
          ) : (
            <EmptyState
              actionHref="/productos"
              actionLabel="Explorar el catálogo"
              className="mt-10"
              description="La selección destacada se actualizará con los próximos productos elegidos por Soluna."
              title="Nuevos destacados próximamente"
            />
          )}
        </Container>
      </Section>

      <Section className="bg-surface-muted">
        <Container>
          <SectionHeading
            description="Una experiencia de compra pensada para consultar, elegir y coordinar sin vueltas."
            eyebrow="Beneficios"
            title="Detalles que hacen la diferencia"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <BenefitCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </Container>
      </Section>

      <Section
        aria-label="Acceso a ofertas y combos"
        className="py-10 sm:py-14"
      >
        <Container>
          <Reveal className="flex justify-center rounded-soluna-lg border border-accent-gold/25 bg-gradient-to-r from-surface via-background to-secondary/70 px-6 py-8 shadow-card sm:py-10">
            <Button className="w-full sm:w-auto" href="/ofertas">
              <Sparkles aria-hidden="true" size={18} strokeWidth={1.7} />
              Descubrir ofertas y combos
            </Button>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <HomeCarePreview />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            description="Espacio reservado para futuras capturas y reseñas verificadas."
            eyebrow="Testimonios"
            title="Historias de clientas"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              "Captura destacada",
              "Mensaje recibido",
              "Experiencia compartida",
            ].map((item) => (
              <article
                className="rounded-soluna border border-border bg-surface p-6"
                key={item}
              >
                <p className="text-label font-bold uppercase text-accent-gold">
                  Contenido demostrativo
                </p>
                <h3 className="mt-4 font-semibold text-foreground">{item}</h3>
                <p className="mt-3 text-small text-muted-foreground">
                  Aquí se ubicará una reseña real cuando Soluna defina el
                  formato de testimonios.
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-foreground text-primary-foreground">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-eyebrow font-bold uppercase text-accent-gold">
              Consulta personalizada
            </p>
            <h2 className="mt-4 font-display text-h2 font-medium">
              Elegí una pieza para tu próxima historia
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton variant="secondary" />
            <Button href="/productos" variant="ghost">
              Ir al catálogo
            </Button>
          </div>
        </Container>
      </Section>
    </PublicLayout>
  );
}
