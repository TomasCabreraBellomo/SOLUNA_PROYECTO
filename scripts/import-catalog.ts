import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  generateImagesModule,
  generateProductsModule,
  importCatalogCsv,
} from "./catalog-import-lib.ts";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const csvPath = path.join(repositoryRoot, "imports", "soluna-productos.csv");
const imagesDirectory = path.join(repositoryRoot, "public", "images", "products");
const productsPath = path.join(repositoryRoot, "src", "data", "products.ts");
const productImagesPath = path.join(
  repositoryRoot,
  "src",
  "data",
  "product-images.ts",
);

const csv = fs.readFileSync(csvPath, "utf8");
const result = importCatalogCsv(csv, { imagesDirectory });

fs.writeFileSync(productsPath, generateProductsModule(result.products), "utf8");
fs.writeFileSync(
  productImagesPath,
  generateImagesModule(result.imagesBySku),
  "utf8",
);

const visibleProducts = result.products.filter((product) => product.visible);
const summary = {
  "Filas leídas": result.totalRows,
  "Productos importados": result.products.length,
  "Productos visibles": visibleProducts.length,
  Destacados: visibleProducts.filter((product) => product.featured).length,
  "Ofertas válidas": visibleProducts.filter(
    (product) =>
      typeof product.offerPrice === "number" &&
      product.offerPrice < product.price,
  ).length,
  "Sin stock": visibleProducts.filter((product) => product.stock === 0).length,
  "Sin imagen": visibleProducts.filter(
    (product) => !(product.sku in result.imagesBySku),
  ).length,
  Advertencias: result.warnings.length,
  Errores: result.errors.length,
  "Filas descartadas": result.discardedRows.length,
};

console.table(summary);
for (const warning of result.warnings) console.warn(`ADVERTENCIA: ${warning}`);
for (const error of result.errors) console.error(`ERROR: ${error}`);
console.log("Generados: src/data/products.ts, src/data/product-images.ts");
