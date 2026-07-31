import path from "node:path";
import { fileURLToPath } from "node:url";

import { isOfferActive } from "../src/features/catalog/offer.ts";
import { runCatalogPipeline, type CatalogMode } from "./catalog-pipeline.ts";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const mode: CatalogMode = process.argv.includes("--check") ? "check" : "import";
const paths = {
  csv: path.join(repositoryRoot, "imports", "soluna-productos.csv"),
  imagesDirectory: path.join(repositoryRoot, "public", "images", "products"),
  products: path.join(repositoryRoot, "src", "data", "products.ts"),
  productImages: path.join(repositoryRoot, "src", "data", "product-images.ts"),
};

try {
  const pipeline = runCatalogPipeline(paths, mode);
  const result = pipeline.catalog;
  const visibleProducts = result.products.filter((product) => product.visible);
  const summary = {
    Modo: mode === "check" ? "validación" : "importación",
    "Filas leídas": result.totalRows,
    "Productos válidos": result.products.length,
    "Productos rechazados": result.discardedRows.length,
    "Productos visibles": visibleProducts.length,
    "Ofertas activas": visibleProducts.filter(isOfferActive).length,
    "Oferta 0 con Precio Oferta": result.ignoredOfferPriceRows.length,
    "Imágenes encontradas": result.foundImages,
    "Imágenes faltantes": result.missingImages,
    Destacados: visibleProducts.filter((product) => product.featured).length,
    "Sin stock": visibleProducts.filter((product) => product.stock === 0)
      .length,
    Advertencias: result.warnings.length,
    "Errores bloqueantes": pipeline.blockingErrors.length,
    "Archivos desactualizados": pipeline.staleFiles.length,
  };

  console.table(summary);
  for (const warning of result.warnings) {
    console.warn(`ADVERTENCIA: ${warning}`);
  }
  for (const error of pipeline.blockingErrors) {
    console.error(`ERROR: ${error}`);
  }

  if (pipeline.writtenFiles.length) {
    console.log(
      `Generados atómicamente: ${pipeline.writtenFiles
        .map((filePath) => path.relative(repositoryRoot, filePath))
        .join(", ")}`,
    );
  } else if (mode === "import" && pipeline.blockingErrors.length) {
    console.error("No se escribió ningún archivo generado.");
  } else if (mode === "check" && pipeline.blockingErrors.length === 0) {
    console.log("Catálogo válido y archivos generados actualizados.");
  }

  if (pipeline.blockingErrors.length) {
    process.exitCode = 1;
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
}
