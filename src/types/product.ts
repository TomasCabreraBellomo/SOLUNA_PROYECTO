export type ProductCategory =
  | "charms"
  | "pulseras"
  | "aros"
  | "anillos"
  | "brazaletes"
  | "cadenas"
  | "tobilleras"
  | "gorras"
  | "accesorios";

export type Product = {
  sku: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  salePrice?: number;
  currency: "ARS";
  materials: string[];
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
};
