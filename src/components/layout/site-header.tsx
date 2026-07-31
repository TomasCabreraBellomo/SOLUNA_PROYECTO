import { Search } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { Container } from "@/components/ui/container";
import { IconButton } from "@/components/ui/icon-button";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { mainNavigation } from "@/config/navigation";
import { CartButton } from "@/features/cart";

import { MobileMenu } from "./mobile-menu";
import { NavigationLink } from "./navigation-link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 shadow-[0_1px_18px_hsl(var(--foreground)/0.035)] backdrop-blur-xl">
      <Container className="flex min-h-[4.75rem] items-center justify-between gap-4 lg:min-h-20">
        <BrandLogo />

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <NavigationLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <IconButton aria-label="Buscar productos">
            <Search aria-hidden="true" size={19} />
          </IconButton>
          <CartButton />
          <WhatsAppButton />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <CartButton />
          <MobileMenu navigation={mainNavigation} />
        </div>
      </Container>
    </header>
  );
}
