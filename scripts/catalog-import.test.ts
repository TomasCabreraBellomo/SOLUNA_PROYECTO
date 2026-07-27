// @vitest-environment node
import { describe, expect, it } from "vitest";

import { importCatalogCsv } from "./catalog-import-lib";

const header =
  "SKU,Nombre,Categoria,Precio,Stock,Material,Descripcion,Imagen 1,Imagen 2,Visible,Destacado,Precio Oferta,,";

function run(row: string, imageExists = true) {
  return importCatalogCsv(`${header}\n${row}\n`, {
    imagesDirectory: "C:/repo/public/images/products",
    imageExists: () => imageExists,
  });
}

const validRow =
  'SOL-001,Pulsera corazón,pulseras,12000,2,Acero,"Texto, con coma",foto.jpg,,1,1,10000,,';

describe("catalog importer", () => {
  it("imports UTF-8, quoted commas, accents, trimmed headers and trailing columns", () => {
    const result = importCatalogCsv(
      ` SKU , Nombre , Categoria , Precio , Stock , Material , Descripcion , Imagen 1 , Imagen 2 , Visible , Destacado , Precio Oferta ,,,\n${validRow}`,
      {
        imagesDirectory: "C:/repo/public/images/products",
        imageExists: () => true,
      },
    );

    expect(result.products).toHaveLength(1);
    expect(result.products[0]).toMatchObject({
      name: "Pulsera corazón",
      description: "Texto, con coma",
      slug: "pulsera-corazon",
      featured: true,
      visible: true,
      offerPrice: 10000,
    });
  });

  it.each([
    ["SKU vacío", ",Nombre,pulseras,1,1,,,foto.jpg,,1,0,"],
    ["nombre vacío", "SOL-001,,pulseras,1,1,,,foto.jpg,,1,0,"],
    ["categoría inválida", "SOL-001,Nombre,nueva,1,1,,,foto.jpg,,1,0,"],
    ["precio inválido", "SOL-001,Nombre,pulseras,no,1,,,foto.jpg,,1,0,"],
    ["stock inválido", "SOL-001,Nombre,pulseras,1,1.5,,,foto.jpg,,1,0,"],
    ["Visible inválido", "SOL-001,Nombre,pulseras,1,1,,,foto.jpg,,2,0,"],
    ["Destacado inválido", "SOL-001,Nombre,pulseras,1,1,,,foto.jpg,,1,x,"],
    ["oferta igual", "SOL-001,Nombre,pulseras,10,1,,,foto.jpg,,1,0,10"],
    ["oferta mayor", "SOL-001,Nombre,pulseras,10,1,,,foto.jpg,,1,0,11"],
  ])("discards a row with %s", (_case, row) => {
    const result = run(row);
    expect(result.products).toHaveLength(0);
    expect(result.errors).toHaveLength(1);
  });

  it("detects duplicate SKUs", () => {
    const result = importCatalogCsv(`${header}\n${validRow}\n${validRow}`, {
      imagesDirectory: "C:/repo/public/images/products",
      imageExists: () => true,
    });
    expect(result.products).toHaveLength(1);
    expect(result.errors.join(" ")).toMatch(/duplicado/i);
  });

  it("warns and falls back when an image does not exist", () => {
    const result = run(validRow, false);
    expect(result.products).toHaveLength(1);
    expect(result.imagesBySku).toEqual({});
    expect(result.warnings).toHaveLength(1);
  });

  it("rejects unsafe image paths and unsupported extensions", () => {
    expect(
      run("SOL-001,Nombre,pulseras,1,1,,,../foto.jpg,,1,0,").errors[0],
    ).toMatch(/inseguro/i);
    expect(
      run("SOL-001,Nombre,pulseras,1,1,,,foto.heif,,1,0,").errors[0],
    ).toMatch(/extensión/i);
  });

  it("generates stable unique slugs and preserves visibility and stock", () => {
    const result = importCatalogCsv(
      `${header}\nSOL-1,Mismo nombre,pulseras,2,0,,,,,0,0,\nSOL-2,Mismo nombre,pulseras,2,1,,,,,1,1,`,
      { imagesDirectory: "C:/images", imageExists: () => false },
    );
    expect(result.products.map((product) => product.slug)).toEqual([
      "mismo-nombre",
      "mismo-nombre-sol-2",
    ]);
    expect(result.products[0]).toMatchObject({ visible: false, stock: 0 });
    expect(result.products[1]).toMatchObject({ visible: true, featured: true });
  });
});
