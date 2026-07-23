"use client";

import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { IconButton } from "@/components/ui/icon-button";
import { WhatsAppButton } from "@/components/whatsapp-button";
import type { NavigationItem } from "@/config/navigation";

type MobileMenuProps = {
  navigation: NavigationItem[];
};

export function MobileMenu({ navigation }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="lg:hidden">
      <IconButton
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Cerrar navegación" : "Abrir navegación"}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? (
          <X aria-hidden="true" size={20} />
        ) : (
          <Menu aria-hidden="true" size={20} />
        )}
      </IconButton>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm">
          <div
            className="ml-auto flex h-full w-full max-w-sm flex-col border-l border-border bg-background p-5 shadow-soft"
            id="mobile-navigation"
          >
            <div className="flex items-center justify-between gap-4">
              <BrandLogo />
              <IconButton aria-label="Cerrar navegación" onClick={closeMenu}>
                <X aria-hidden="true" size={20} />
              </IconButton>
            </div>

            <nav aria-label="Navegación principal mobile" className="mt-8">
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      className="block rounded-soluna px-3 py-3 text-base font-semibold text-foreground transition hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                      href={item.href}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto grid gap-3 pt-8">
              <div className="flex gap-3">
                <IconButton aria-label="Buscar productos">
                  <Search aria-hidden="true" size={19} />
                </IconButton>
                <IconButton aria-label="Ver carrito, 0 productos">
                  <ShoppingBag aria-hidden="true" size={19} />
                  <span className="sr-only">0 productos</span>
                </IconButton>
              </div>
              <WhatsAppButton />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
