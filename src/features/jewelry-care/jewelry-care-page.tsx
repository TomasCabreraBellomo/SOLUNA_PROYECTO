import {
  Bath,
  Box,
  Droplets,
  FlaskConicalOff,
  Gem,
  Heart,
  Layers3,
  MoonStar,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Wind,
} from "lucide-react";
import Link from "next/link";

import { CareGuideNav } from "@/components/jewelry-care/care-guide-nav";
import { CareTipCard } from "@/components/jewelry-care/care-tip-card";
import { MaterialCareCard } from "@/components/jewelry-care/material-care-card";
import { PublicLayout } from "@/components/layout/public-layout";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";

const generalCareTips = [
  {
    icon: Heart,
    title: "El orden importa",
    description:
      "Tus joyas deben ser lo último que te pongas al salir y lo primero que te quites al llegar.",
  },
  {
    icon: FlaskConicalOff,
    title: "Evitá los químicos",
    description:
      "Aplicá perfumes, cremas corporales y laca para el cabello antes de ponerte tus accesorios.",
  },
  {
    icon: Layers3,
    title: "Guardalas por separado",
    description:
      "Utilizá bolsitas individuales o un joyero con compartimentos para evitar rayaduras y fricción entre los metales.",
  },
  {
    icon: Bath,
    title: "Alejalas de la humedad",
    description:
      "Quitate tus accesorios antes de bañarte, nadar en piscinas o el mar, y al hacer ejercicio.",
  },
] as const;

const materialCare = [
  {
    id: "plata-925",
    icon: MoonStar,
    title: "Plata 925",
    items: [
      {
        title: "Uso constante",
        description:
          "Usala con frecuencia; los aceites naturales de la piel ayudan a prevenir la oxidación.",
      },
      {
        title: "Mantenimiento",
        description:
          "Si se oscurece —es un proceso natural de la plata—, frotala suavemente con un paño especial para pulir metales.",
      },
    ],
  },
  {
    id: "acero-inoxidable-quirurgico",
    icon: ShieldCheck,
    title: "Acero inoxidable y acero quirúrgico",
    items: [
      {
        title: "Alta resistencia",
        description:
          "Son materiales hipoalergénicos y muy duraderos. Soportan bien el uso diario, pero el cloro prolongado puede opacarlos.",
      },
      {
        title: "Limpieza básica",
        description:
          "Si se ensucian, lavalos con un poco de agua tibia y jabón neutro, asegurándote de secarlos perfectamente con un paño suave.",
      },
    ],
  },
  {
    id: "acero-blanco",
    icon: SunMedium,
    title: "Acero blanco",
    items: [
      {
        title: "Capa delicada",
        description:
          "Al tener un baño para lograr su tono característico, requiere más atención que el acero tradicional.",
      },
      {
        title: "Cero líquidos",
        description:
          "Evitá el contacto absoluto con agua, sudor y perfumes para que el baño brillante no se desgaste o cambie de color.",
      },
    ],
  },
  {
    id: "cobre-blanco",
    icon: Wind,
    title: "Cobre blanco",
    items: [
      {
        title: "Mantenelo seco",
        description:
          "Es susceptible a reaccionar con el pH de la piel y la humedad.",
      },
      {
        title: "Limpieza post-uso",
        description:
          "Pasale un paño de algodón seco después de cada uso para eliminar restos de sudor o contaminación antes de guardarlo.",
      },
    ],
  },
  {
    id: "fantasia",
    icon: Sparkles,
    title: "Fantasía",
    items: [
      {
        title: "Cuidado extremo",
        description: "Son las piezas más sensibles a los factores externos.",
      },
      {
        title: "Protección total",
        description:
          "No las mojes bajo ninguna circunstancia. Guardalas en un lugar oscuro y libre de humedad; agregar bolsitas de gel de sílice en tu joyero es una excelente idea.",
      },
    ],
  },
] as const;

const shineSecrets = [
  {
    icon: Sparkles,
    title: "Tu mejor aliado",
    description:
      "Usá siempre un paño de microfibra limpio y seco sobre tus piezas al final del día para eliminar cualquier residuo opaco.",
  },
  {
    icon: PackageCheck,
    title: "Evitá el papel",
    description:
      "Nunca uses servilletas o pañuelos de papel para limpiar tus joyas; sus fibras pueden causar micro-rayaduras y quitarles el brillo natural.",
  },
  {
    icon: Box,
    title: "Almacenamiento hermético",
    description:
      "El contacto constante con el oxígeno oxida los metales. Guardar tus piezas más delicadas en bolsitas herméticas —tipo Ziploc— retrasará considerablemente la pérdida de brillo.",
  },
] as const;

export function JewelryCarePage() {
  return (
    <PublicLayout>
      <section className="overflow-hidden border-b border-border/70 bg-[linear-gradient(135deg,hsl(var(--secondary)/0.82),hsl(var(--background))_62%,hsl(42_46%_92%/0.65))] py-10 sm:py-14 lg:py-16">
        <Container>
          <nav aria-label="Breadcrumb" className="text-small text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link
                  className="rounded-sm transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                  href="/"
                >
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">
                Cuida tus joyas
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid items-center gap-9 lg:grid-cols-[1fr_0.55fr] lg:gap-16">
            <div className="reveal-visible max-w-3xl">
              <p className="text-eyebrow font-bold uppercase text-accent-gold">
                Cuidados Soluna
              </p>
              <h1 className="mt-4 font-display text-h1 font-medium text-foreground">
                Guía de Cuidados Soluna
              </h1>
              <p className="mt-6 max-w-2xl text-body text-muted-foreground sm:text-lg sm:leading-8">
                Para que tus accesorios te acompañen por mucho más tiempo y
                luzcan siempre como el primer día, hemos preparado esta guía
                rápida.
              </p>
            </div>

            <div
              aria-hidden="true"
              className="relative mx-auto grid size-48 place-items-center rounded-full border border-accent-gold/25 bg-surface/70 shadow-soft sm:size-56"
            >
              <div className="absolute inset-6 rounded-full border border-accent-gold/15" />
              <Gem className="text-accent-gold" size={58} strokeWidth={1.2} />
              <Sparkles
                className="absolute right-5 top-7 text-accent-gold"
                size={27}
                strokeWidth={1.4}
              />
              <span className="absolute bottom-5 left-7 text-2xl">✨</span>
            </div>
          </div>
        </Container>
      </section>

      <Section className="pb-6 pt-8 sm:pb-8 sm:pt-10">
        <Container>
          <CareGuideNav />
        </Container>
      </Section>

      <Section className="scroll-mt-32 pt-10 sm:pt-14" id="cuidados-generales">
        <Container>
          <Reveal>
            <SectionHeading
              description="Cuatro hábitos simples ayudan a proteger todos tus accesorios, sin importar su material."
              eyebrow="Primero, lo esencial"
              title="Cuidados Generales para Todas tus Joyas"
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {generalCareTips.map((tip) => (
                <CareTipCard key={tip.title} {...tip} />
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-surface-muted/60">
        <Container>
          <Reveal>
            <SectionHeading
              description="Cada material responde de forma diferente al uso, la humedad y la limpieza."
              eyebrow="Una guía para cada pieza"
              title="Cuidados Específicos por Material"
            />
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {materialCare.map((material) => (
              <Reveal key={material.id}>
                <MaterialCareCard {...material} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="scroll-mt-32" id="mantener-el-brillo">
        <Container>
          <Reveal className="overflow-hidden rounded-soluna-lg border border-accent-gold/35 bg-[linear-gradient(135deg,hsl(42_55%_93%),hsl(var(--surface))_72%)] p-6 shadow-soft sm:p-10 lg:p-12">
            <div className="flex items-start gap-4">
              <span aria-hidden="true" className="text-3xl">
                💎
              </span>
              <div>
                <p className="text-eyebrow font-bold uppercase text-accent-gold">
                  Ritual de todos los días
                </p>
                <h2 className="mt-3 font-display text-h2 font-medium text-foreground">
                  El Secreto para Mantener el Brillo
                </h2>
              </div>
            </div>
            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {shineSecrets.map(({ icon: Icon, title, description }) => (
                <article
                  className="rounded-soluna border border-accent-gold/20 bg-background/75 p-5"
                  key={title}
                >
                  <Icon
                    aria-hidden="true"
                    className="text-accent-gold"
                    size={23}
                    strokeWidth={1.6}
                  />
                  <h3 className="mt-4 font-bold text-foreground">{title}</h3>
                  <p className="mt-2 text-small text-muted-foreground">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <Reveal className="flex gap-4 rounded-soluna border border-border bg-surface p-5 shadow-card sm:p-6">
            <Droplets
              aria-hidden="true"
              className="mt-1 shrink-0 text-accent-gold"
              size={22}
              strokeWidth={1.6}
            />
            <p className="text-body text-muted-foreground">
              Si una pieza incluye piedras, adhesivos, baños especiales o
              indicaciones particulares, priorizá siempre las recomendaciones
              específicas del producto.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-foreground text-primary-foreground">
        <Container>
          <Reveal className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-h2 font-medium">
                ¿Tenés dudas sobre el cuidado de una pieza?
              </h2>
              <p className="mt-4 text-body text-primary-foreground/75">
                Escribinos y te ayudamos a encontrar la mejor forma de
                conservarla.
              </p>
            </div>
            <WhatsAppButton
              className="w-full sm:w-auto"
              label="Consultar por WhatsApp"
              message="Hola Soluna, quisiera consultar cómo cuidar uno de mis accesorios."
            />
          </Reveal>
        </Container>
      </Section>
    </PublicLayout>
  );
}
