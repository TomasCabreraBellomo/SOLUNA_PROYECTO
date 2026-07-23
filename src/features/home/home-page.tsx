import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";

export function HomePage() {
  return (
    <div className="min-h-screen bg-soluna-white text-soluna-ink">
      <header className="border-b border-soluna-silver/25 bg-white/75 backdrop-blur">
        <Container className="flex min-h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Soluna inicio">
            <span className="grid size-11 place-items-center rounded-full border border-soluna-gold/60 bg-soluna-blush font-display text-xl text-soluna-ink">
              S
            </span>
            <span className="font-display text-2xl text-soluna-ink">Soluna</span>
          </Link>
        </Container>
      </header>

      <main>
        <Section className="relative overflow-hidden py-20 sm:py-28">
          <div className="absolute inset-x-0 top-0 h-48 bg-soluna-blush/60" aria-hidden="true" />
          <Container className="relative">
            <div className="max-w-3xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-wide text-soluna-gold">
                Soluna Accesorios
              </p>
              <Heading as="h1" className="text-5xl sm:text-7xl">
                Joyas que cuentan tu historia
              </Heading>
              <p className="mt-6 max-w-xl text-base leading-8 text-soluna-graphite sm:text-lg">
                Charms, pulseras y accesorios elegidos para acompanar tus momentos
                favoritos.
              </p>
              <Button href={siteConfig.catalogPath} className="mt-9 gap-2">
                Ver catalogo
                <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
              </Button>
            </div>
          </Container>
        </Section>
      </main>

      <footer className="border-t border-soluna-silver/25 bg-white">
        <Container className="flex min-h-20 flex-col justify-center gap-2 py-5 text-sm text-soluna-graphite sm:flex-row sm:items-center sm:justify-between">
          <p>{siteConfig.name}</p>
          <p>{siteConfig.description}</p>
        </Container>
      </footer>
    </div>
  );
}
