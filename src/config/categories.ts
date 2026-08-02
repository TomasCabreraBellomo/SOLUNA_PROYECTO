import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Gem,
  Gift,
  Heart,
  Ribbon,
  Sparkles,
  Star,
} from "lucide-react";

export const productCategories = [
  {
    value: "charms",
    label: "Charms",
    slug: "charms",
    description: "Charms compatibles con pulseras tipo Pandora.",
    order: 10,
    icon: Sparkles,
  },
  {
    value: "pulseras-para-charms",
    label: "Pulseras para charms",
    slug: "pulseras-para-charms",
    description: "Bases y pulseras para combinar con charms.",
    order: 20,
    icon: Gem,
  },
  {
    value: "pulseras",
    label: "Pulseras",
    slug: "pulseras",
    description: "Pulseras delicadas para uso diario.",
    order: 30,
    icon: Heart,
  },
  {
    value: "aros",
    label: "Aros",
    slug: "aros",
    description: "Aros y detalles para completar tu look.",
    order: 40,
    icon: Star,
  },
  {
    value: "anillos",
    label: "Anillos",
    slug: "anillos",
    description: "Anillos seleccionados con terminaciones sutiles.",
    order: 50,
    icon: BadgeCheck,
  },
  {
    value: "brazaletes",
    label: "Brazaletes",
    slug: "brazaletes",
    description: "Brazaletes con presencia elegante.",
    order: 60,
    icon: Ribbon,
  },
  {
    value: "cadenas",
    label: "Cadenas",
    slug: "cadenas",
    description: "Cadenas para usar solas o combinar en capas.",
    order: 70,
    icon: Gem,
  },
  {
    value: "tobilleras",
    label: "Tobilleras",
    slug: "tobilleras",
    description: "Accesorios delicados para temporada.",
    order: 80,
    icon: Sparkles,
  },
  {
    value: "gorras",
    label: "Gorras",
    slug: "gorras",
    description: "Accesorios urbanos para completar el outfit.",
    order: 90,
    icon: Gift,
  },
  {
    value: "accesorios",
    label: "Accesorios",
    slug: "accesorios",
    description: "Complementos seleccionados por Soluna.",
    order: 100,
    icon: Gift,
  },
  {
    value: "combos",
    label: "Combos",
    slug: "combos",
    description: "Selecciones de accesorios reunidas en un solo producto.",
    order: 110,
    icon: Gift,
  },
] as const satisfies readonly {
  value: string;
  label: string;
  slug: string;
  description?: string;
  order: number;
  icon: LucideIcon;
}[];

export type ProductCategory = (typeof productCategories)[number]["value"];

export function getCategoryByValue(value: ProductCategory) {
  return productCategories.find((category) => category.value === value);
}

export function getCategoryBySlug(slug: string) {
  return productCategories.find((category) => category.slug === slug);
}
