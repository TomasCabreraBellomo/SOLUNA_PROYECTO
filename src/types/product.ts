import type { ProductCategory } from "@/config/categories";

export type Product = {
  sku: string;
  slug: string;
  name: string;
  category: ProductCategory;
  material?: string;
  color?: string;
  measurements?: string;
  description: string;
  price: number;
  offer?: boolean;
  offerPrice?: number;
  stock: number;
  featured?: boolean;
  visible?: boolean;
  createdAt?: string;
};

export type ProductImage = {
  src: string;
  alt: string;
};
