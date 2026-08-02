// @vitest-environment node
import { describe, expect, it } from "vitest";

import { importCatalogCsv } from "./catalog-import-lib";

const header =
  "SKU,Nombre,Categoria,Precio,Stock,Material,Descripcion,Imagen 1,Imagen 2,Visible,Destacado,Oferta,Precio Oferta";

type Row = {
  SKU: string;
  Nombre: string;
  Categoria: string;
  Precio: string;
  Stock: string;
  Material: string;
  Descripcion: string;
  Imagen1: string;
  Imagen2: string;
  Visible: string;
  Destacado: string;
  Oferta: string;
  PrecioOferta: string;
};

const baseRow: Row = {
  SKU: "SOL-001",
  Nombre: "Pulsera corazón",
  Categoria: "pulseras",
  Precio: "12000",
  Stock: "2",
  Material: "Acero",
  Descripcion: "Texto, con coma",
  Imagen1: "foto.jpg",
  Imagen2: "",
  Visible: "1",
  Destacado: "1",
  Oferta: "0",
  PrecioOferta: "",
};

function escapeCsv(value: string): string {
  return value.includes(",") || value.includes('"')
    ? `"${value.replace(/"/g, '""')}"`
    : value;
}

function toCsvRow(overrides: Partial<Row> = {}): string {
  const row = { ...baseRow, ...overrides };
  return [
    row.SKU,
    row.Nombre,
    row.Categoria,
    row.Precio,
    row.Stock,
    row.Material,
    row.Descripcion,
    row.Imagen1,
    row.Imagen2,
    row.Visible,
    row.Destacado,
    row.Oferta,
    row.PrecioOferta,
  ]
    .map(escapeCsv)
    .join(",");
}

function run(overrides: Partial<Row> = {}, imageExists = true) {
  return importCatalogCsv(`${header}\n${toCsvRow(overrides)}\n`, {
    imagesDirectory: "C:/repo/public/images/products",
    imageExists: () => imageExists,
    imageNames: [],
  });
}

describe("catalog importer", () => {
  it("imports UTF-8, quoted commas, accents and trimmed headers", () => {
    const result = importCatalogCsv(
      ` SKU , Nombre , Categoria , Precio , Stock , Material , Descripcion , Imagen 1 , Imagen 2 , Visible , Destacado , Oferta , Precio Oferta ,,,\n${toCsvRow(
        { Oferta: "1", PrecioOferta: "10000" },
      )}`,
      {
        imagesDirectory: "C:/repo/public/images/products",
        imageExists: () => true,
        imageNames: [],
      },
    );

    expect(result.products).toHaveLength(1);
    expect(result.products[0]).toMatchObject({
      name: "Pulsera corazón",
      description: "Texto, con coma",
      slug: "pulsera-corazon",
      featured: true,
      visible: true,
      offer: true,
      offerPrice: 10000,
    });
  });

  it.each([
    ["vacío", ""],
    ["menor que Precio", "8000"],
    ["igual a Precio", "12000"],
    ["mayor que Precio", "14000"],
    ["no numérico", "ignorar"],
  ])(
    "imports Oferta = 0 with Precio Oferta %s and normalizes it away",
    (_case, precioOferta) => {
      const result = run({ Oferta: "0", PrecioOferta: precioOferta });

      expect(result.errors).toEqual([]);
      expect(result.products).toHaveLength(1);
      expect(result.products[0]).toMatchObject({
        offer: false,
        price: 12000,
      });
      expect(result.products[0]).not.toHaveProperty("offerPrice");
      expect(result.warnings).toHaveLength(precioOferta ? 1 : 0);
    },
  );

  it("imports Oferta = 1 with a valid Precio Oferta", () => {
    const result = run({ Oferta: "1", PrecioOferta: "8000" });

    expect(result.errors).toEqual([]);
    expect(result.products[0]).toMatchObject({
      offer: true,
      offerPrice: 8000,
    });
  });

  it("accepts combos as a typed catalog category", () => {
    const result = run({
      SKU: "SOL-CMB-0001",
      Nombre: "Combo inicial",
      Categoria: "combos",
      Oferta: "1",
      PrecioOferta: "8000",
    });

    expect(result.errors).toEqual([]);
    expect(result.products[0]).toMatchObject({
      sku: "SOL-CMB-0001",
      category: "combos",
      offer: true,
      offerPrice: 8000,
    });
  });

  it.each([
    ["vacío", ""],
    ["no numérico", "inválido"],
    ["igual a Precio", "12000"],
    ["mayor que Precio", "14000"],
    ["igual a 0", "0"],
  ])("rejects Oferta = 1 with Precio Oferta %s", (_case, precioOferta) => {
    const result = run({ Oferta: "1", PrecioOferta: precioOferta });

    expect(result.products).toHaveLength(0);
    expect(result.errors).toHaveLength(1);
  });

  it("rejects Oferta values other than 0 or 1", () => {
    const result = run({ Oferta: "2", PrecioOferta: "8000" });

    expect(result.products).toHaveLength(0);
    expect(result.errors[0]).toMatch(/Oferta debe ser 0 o 1/);
  });

  it.each([
    ["SKU vacío", { SKU: "" }],
    ["nombre vacío", { Nombre: "" }],
    ["categoría inválida", { Categoria: "nueva" }],
    ["precio inválido", { Precio: "no" }],
    ["stock inválido", { Stock: "1.5" }],
    ["Visible inválido", { Visible: "2" }],
    ["Destacado inválido", { Destacado: "x" }],
  ])("discards a row with %s", (_case, overrides) => {
    const result = run(overrides);
    expect(result.products).toHaveLength(0);
    expect(result.errors).toHaveLength(1);
  });

  it("detects duplicate SKUs", () => {
    const row = toCsvRow();
    const result = importCatalogCsv(`${header}\n${row}\n${row}`, {
      imagesDirectory: "C:/repo/public/images/products",
      imageExists: () => true,
      imageNames: [],
    });
    expect(result.products).toHaveLength(1);
    expect(result.errors.join(" ")).toMatch(/duplicado/i);
  });

  it("warns and falls back when an image does not exist", () => {
    const result = run({}, false);
    expect(result.products).toHaveLength(1);
    expect(result.imagesBySku).toEqual({});
    expect(result.missingImages).toBe(1);
    expect(result.warnings).toHaveLength(1);
  });

  it("rejects unsafe image paths and unsupported extensions", () => {
    expect(run({ Imagen1: "../foto.jpg" }).errors[0]).toMatch(/inseguro/i);
    expect(run({ Imagen1: "foto.heif" }).errors[0]).toMatch(/extensión/i);
  });

  it("generates stable unique slugs and preserves visibility and stock", () => {
    const first = toCsvRow({
      SKU: "SOL-1",
      Nombre: "Mismo nombre",
      Stock: "0",
      Imagen1: "",
      Visible: "0",
      Destacado: "0",
    });
    const second = toCsvRow({
      SKU: "SOL-2",
      Nombre: "Mismo nombre",
      Stock: "1",
      Imagen1: "",
      Visible: "1",
      Destacado: "1",
    });
    const result = importCatalogCsv(`${header}\n${first}\n${second}`, {
      imagesDirectory: "C:/images",
      imageExists: () => false,
      imageNames: [],
    });

    expect(result.products.map((product) => product.slug)).toEqual([
      "mismo-nombre",
      "mismo-nombre-sol-2",
    ]);
    expect(result.products[0]).toMatchObject({ visible: false, stock: 0 });
    expect(result.products[1]).toMatchObject({ visible: true, featured: true });
  });
});
