// @vitest-environment node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { runCatalogPipeline, type CatalogPaths } from "./catalog-pipeline";

const header =
  "SKU,Nombre,Categoria,Precio,Stock,Material,Descripcion,Imagen 1,Imagen 2,Visible,Destacado,Oferta,Precio Oferta";
const validRow = "SOL-001,Producto,pulseras,12000,1,Acero,,,,1,0,0,12000";
const invalidRow = "SOL-001,Producto,pulseras,12000,1,Acero,,,,1,0,1,12000";
const temporaryDirectories: string[] = [];

function createFixture(row = validRow): CatalogPaths {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "soluna-catalog-"));
  temporaryDirectories.push(root);
  const imagesDirectory = path.join(root, "images");
  const dataDirectory = path.join(root, "data");
  fs.mkdirSync(imagesDirectory);
  fs.mkdirSync(dataDirectory);
  const paths = {
    csv: path.join(root, "catalog.csv"),
    imagesDirectory,
    products: path.join(dataDirectory, "products.ts"),
    productImages: path.join(dataDirectory, "product-images.ts"),
  };
  fs.writeFileSync(paths.csv, `${header}\n${row}\n`, "utf8");
  return paths;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

describe("catalog pipeline", () => {
  it("does not overwrite generated files when import has blocking errors", () => {
    const paths = createFixture(invalidRow);
    fs.writeFileSync(paths.products, "productos originales", "utf8");
    fs.writeFileSync(paths.productImages, "imágenes originales", "utf8");

    const result = runCatalogPipeline(paths, "import");

    expect(result.blockingErrors).toHaveLength(1);
    expect(result.writtenFiles).toEqual([]);
    expect(fs.readFileSync(paths.products, "utf8")).toBe(
      "productos originales",
    );
    expect(fs.readFileSync(paths.productImages, "utf8")).toBe(
      "imágenes originales",
    );
  });

  it("catalog:check does not write and detects stale generated files", () => {
    const paths = createFixture();
    fs.writeFileSync(paths.products, "desactualizado", "utf8");
    fs.writeFileSync(paths.productImages, "desactualizado", "utf8");

    const result = runCatalogPipeline(paths, "check");

    expect(result.staleFiles).toEqual([paths.products, paths.productImages]);
    expect(result.blockingErrors).toHaveLength(2);
    expect(result.writtenFiles).toEqual([]);
    expect(fs.readFileSync(paths.products, "utf8")).toBe("desactualizado");
    expect(fs.readFileSync(paths.productImages, "utf8")).toBe("desactualizado");
  });

  it("repeated imports generate exactly the same content", () => {
    const paths = createFixture();

    const first = runCatalogPipeline(paths, "import");
    const firstProducts = fs.readFileSync(paths.products, "utf8");
    const firstImages = fs.readFileSync(paths.productImages, "utf8");
    const second = runCatalogPipeline(paths, "import");

    expect(first.blockingErrors).toEqual([]);
    expect(second.blockingErrors).toEqual([]);
    expect(fs.readFileSync(paths.products, "utf8")).toBe(firstProducts);
    expect(fs.readFileSync(paths.productImages, "utf8")).toBe(firstImages);
    expect(runCatalogPipeline(paths, "check").blockingErrors).toEqual([]);
  });
});
