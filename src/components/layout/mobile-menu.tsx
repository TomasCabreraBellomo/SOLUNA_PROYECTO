"use client";

import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { IconButton } from "@/components/ui/icon-button";
import { WhatsAppButton } from "@/components/whatsapp-button";
import type { NavigationItem } from "@/config/navigation";

import { NavigationLink } from "./navigation-link";
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
            aria-modal="true"
            className="ml-auto flex h-full w-full max-w-sm flex-col border-l border-border bg-background p-5 shadow-soft"
            id="mobile-navigation"
            role="dialog"
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
                    <NavigationLink
                      href={item.href}
                      label={item.label}
                      mobile
                      onClick={closeMenu}
                    />
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto grid gap-3 pt-8">
              <IconButton aria-label="Buscar productos">
                <Search aria-hidden="true" size={19} />
              </IconButton>
              <WhatsAppButton />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
