import {
  CircleDollarSign,
  MessagesSquare,
  PackageCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

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

          <div className="reveal-visible relative min-h-[22rem] overflow-hidden rounded-soluna-lg border border-border bg-surface-muted p-6 shadow-soft sm:min-h-[28rem] sm:p-8">
            <div className="absolute left-8 top-8 size-28 rounded-full border border-accent-gold/35" />
            <div className="absolute right-10 top-12 size-36 rounded-full bg-secondary" />
            <div className="absolute bottom-10 left-10 size-44 rounded-full border border-accent-silver/50" />
            <div className="absolute bottom-16 right-12 h-28 w-40 rounded-full bg-surface shadow-lift" />
            <div className="relative flex h-full min-h-[19rem] items-center justify-center sm:min-h-[24rem]">
              <div className="grid size-52 place-items-center rounded-full border border-accent-gold/30 bg-background/80 shadow-soft sm:size-64">
                <div className="size-28 rounded-full border-[16px] border-secondary bg-transparent shadow-inner sm:size-36 sm:border-[18px]" />
              </div>
              <Sparkles
                aria-hidden="true"
                className="absolute right-16 top-20 text-accent-gold"
                size={34}
                strokeWidth={1.3}
              />
              <Star
                aria-hidden="true"
                className="absolute bottom-24 left-20 text-accent-silver"
                size={28}
                strokeWidth={1.4}
              />
            </div>
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

      <Section>
        <Container>
          <EmptyState
            actionHref="/ofertas"
            actionLabel="Ver sección de ofertas"
            description="La sección queda preparada para destacar oportunidades reales cuando existan productos con descuento cargados en el catálogo."
            title="Ofertas seleccionadas próximamente"
          />
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
