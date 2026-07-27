export type NavigationItem = {
  href: string;
  label: string;
};

export const mainNavigation: NavigationItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/ofertas", label: "Ofertas" },
  { href: "/cuida-tus-joyas", label: "Cuida tus joyas" },
  { href: "/testimonios", label: "Testimonios" },
  { href: "/como-comprar", label: "Cómo comprar" },
];

export const categoryNavigation: NavigationItem[] = [
  { href: "/productos?category=charms", label: "Charms" },
  {
    href: "/productos?category=pulseras-para-charms",
    label: "Pulseras para charms",
  },
  { href: "/productos?category=pulseras", label: "Pulseras" },
  { href: "/productos?category=aros", label: "Aros" },
  { href: "/productos?category=anillos", label: "Anillos" },
  { href: "/productos?category=brazaletes", label: "Brazaletes" },
  { href: "/productos?category=cadenas", label: "Cadenas" },
];
