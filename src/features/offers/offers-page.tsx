import {
  BadgeDollarSign,
  MessageCircle,
  PackageCheck,
  Truck,
} from "lucide-react";

import { BenefitCard } from "@/components/benefit-card";
import { ProductGrid } from "@/components/catalog/product-grid";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import type { Product } from "@/types/product";

type OffersPageContentProps = {
  combos: Product[];
  otherOffers: Product[];
};

const commercialBenefits = [
  {
    icon: BadgeDollarSign,
    title: "Precios especiales reales",
    description: "Solo mostramos promociones activas cargadas en el catálogo.",
  },
  {
    icon: PackageCheck,
    title: "Unidades limitadas",
    description: "La disponibilidad se actualiza según el stock de cada pieza.",
  },
  {
    icon: MessageCircle,
    title: "Compra por WhatsApp",
    description: "Armá tu carrito y coordiná el pedido directamente con Sofía.",
  },
  {
    icon: Truck,
    title: "Envíos a toda Argentina",
    description: "Coordinamos la alternativa de envío adecuada para tu pedido.",
  },
] as const;

function NoActiveOffers() {
  return (
    <Section className="scroll-mt-28 pt-8 sm:pt-12" id="ofertas">
      <Container>
        <div className="scroll-mt-28" id="combos">
          <Reveal>
            <div className="rounded-soluna-lg border border-dashed border-accent-gold/35 bg-gradient-to-b from-surface-muted to-surface px-6 py-12 text-center shadow-card sm:px-12 sm:py-16">
              <Heading as="h2">
                No hay promociones activas por el momento
              </Heading>
              <p className="mx-auto mt-4 max-w-xl text-body text-muted-foreground">
                Muy pronto vas a encontrar nuevas selecciones especiales.
              </p>
              <div className="mx-auto mt-7 flex max-w-lg flex-col justify-center gap-3 sm:flex-row">
                <Button className="w-full sm:w-auto" href="/productos">
                  Ver productos
                </Button>
                <WhatsAppButton
                  className="w-full sm:w-auto"
                  label="Consultar por WhatsApp"
                  message="Hola Soluna, quisiera consultar por próximas ofertas y combos."
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export function OffersPageContent({
  combos,
  otherOffers,
}: OffersPageContentProps) {
  const hasOffers = combos.length > 0 || otherOffers.length > 0;

  return (
    <>
      <Section className="overflow-hidden pb-12 pt-8 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-16">
        <Container>
          <Reveal className="relative overflow-hidden rounded-soluna-lg border border-border/80 bg-gradient-to-br from-surface via-background to-secondary px-6 py-10 shadow-soft sm:px-10 sm:py-14 lg:px-16 lg:py-20">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-20 size-64 rounded-full border border-accent-gold/20 bg-secondary/50"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 right-1/4 size-48 rounded-full bg-background/70 shadow-soft"
            />
            <div className="relative max-w-4xl">
              <p className="text-eyebrow font-bold uppercase text-accent-gold">
                Ofertas y combos
              </p>
              <Heading as="h1" className="mt-4 max-w-3xl text-h1">
                Selecciones especiales
              </Heading>
              <p className="mt-6 max-w-2xl text-body text-muted-foreground sm:text-lg">
                Descubrí combos exclusivos y piezas seleccionadas con precios
                especiales. La disponibilidad es limitada y las promociones se
                actualizan según el stock.
              </p>
              <div className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
                <Button className="w-full sm:w-auto" href="#ofertas">
                  Ver ofertas
                </Button>
                <Button
                  className="w-full sm:w-auto"
                  href="#combos"
                  variant="secondary"
                >
                  Ver combos
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section
        aria-labelledby="beneficios-comerciales"
        className="border-y border-border/70 bg-background py-8 sm:py-10"
      >
        <Container>
          <h2 className="sr-only" id="beneficios-comerciales">
            Beneficios comerciales
          </h2>
          <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {commercialBenefits.map((benefit) => (
              <BenefitCard key={benefit.title} {...benefit} />
            ))}
          </Reveal>
        </Container>
      </Section>

      {!hasOffers ? (
        <NoActiveOffers />
      ) : (
        <>
          <Section className="scroll-mt-28" id="combos">
            <Container>
              <SectionHeading
                description="Combinaciones pensadas para regalar o comenzar tu colección de accesorios."
                eyebrow="Selecciones especiales"
                title="Combos exclusivos"
              />
              <div className="mt-10">
                {combos.length > 0 ? (
                  <ProductGrid products={combos} />
                ) : (
                  <EmptyState
                    actionHref="/productos"
                    actionLabel="Explorar productos"
                    description="Todavía no hay combos con una oferta activa. Podés seguir explorando las piezas con precio especial."
                    title="Próximamente, nuevos combos"
                  />
                )}
              </div>
            </Container>
          </Section>

          <Section
            className="scroll-mt-28 border-t border-border/70 bg-surface-muted/45"
            id="ofertas"
          >
            <Container>
              <SectionHeading
                description="Piezas seleccionadas del catálogo con una promoción activa y válida."
                eyebrow="Ofertas activas"
                title="Piezas con precio especial"
              />
              <div className="mt-10">
                {otherOffers.length > 0 ? (
                  <ProductGrid products={otherOffers} />
                ) : (
                  <EmptyState
                    actionHref="/productos"
                    actionLabel="Ver todos los productos"
                    description="Los combos disponibles concentran las promociones activas en este momento."
                    title="No hay otras piezas en oferta"
                  />
                )}
              </div>
            </Container>
          </Section>
        </>
      )}
    </>
  );
}
