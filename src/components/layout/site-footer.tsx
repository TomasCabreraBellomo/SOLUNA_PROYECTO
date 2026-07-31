import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { Container } from "@/components/ui/container";
import { commerceConfig, getWhatsAppUrl } from "@/config/commerce";
import { categoryNavigation, mainNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div>
      <h2 className="text-label font-bold uppercase text-foreground">
        {title}
      </h2>
      <ul className="mt-4 space-y-2 text-small text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-12 py-14 lg:grid-cols-[1.05fr_2fr] lg:gap-16 lg:py-20">
        <div>
          <BrandLogo />
          <p className="mt-5 max-w-sm text-body text-muted-foreground">
            {siteConfig.tagline}. Piezas seleccionadas para combinar, regalar y
            usar todos los días.
          </p>
          <p className="mt-4 text-small text-muted-foreground">
            {siteConfig.location}
          </p>
          <p className="mt-2 text-small text-muted-foreground">
            El retiro de compras se coordina previamente.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-label font-bold uppercase text-foreground">
              Navegación
            </h2>
            <ul className="mt-4 space-y-2">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="inline-flex min-h-9 items-center text-small text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-label font-bold uppercase text-foreground">
              Categorías
            </h2>
            <ul className="mt-4 space-y-2">
              {categoryNavigation.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    className="inline-flex min-h-9 items-center text-small text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn items={commerceConfig.shippingMethods} title="Envíos" />
          <FooterColumn items={commerceConfig.paymentMethods} title="Pagos" />
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-3 py-5 text-small text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              className="rounded-sm py-1 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </Link>
            <Link
              className="rounded-sm py-1 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
