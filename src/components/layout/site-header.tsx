import { Search, ShoppingBag } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { Container } from "@/components/ui/container";
import { IconButton } from "@/components/ui/icon-button";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { mainNavigation } from "@/config/navigation";

import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
      <Container className="flex min-h-20 items-center justify-between gap-4">
        <BrandLogo />

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-surface-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <IconButton aria-label="Buscar productos">
            <Search aria-hidden="true" size={19} />
          </IconButton>
          <IconButton
            aria-label="Ver carrito, 0 productos"
            className="relative"
          >
            <ShoppingBag aria-hidden="true" size={19} />
            <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-primary text-[0.68rem] font-bold text-primary-foreground">
              0
            </span>
          </IconButton>
          <WhatsAppButton />
        </div>

        <MobileMenu navigation={mainNavigation} />
      </Container>
    </header>
  );
}
