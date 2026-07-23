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
  { href: "/productos?categoria=charms", label: "Charms" },
  { href: "/productos?categoria=pulseras", label: "Pulseras" },
  { href: "/productos?categoria=aros", label: "Aros" },
  { href: "/productos?categoria=anillos", label: "Anillos" },
  { href: "/productos?categoria=brazaletes", label: "Brazaletes" },
  { href: "/productos?categoria=cadenas", label: "Cadenas" },
  { href: "/productos?categoria=gorras", label: "Gorras" },
];
