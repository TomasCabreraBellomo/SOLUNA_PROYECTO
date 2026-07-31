import fs from "node:fs";
import path from "node:path";

import {
  productCategories,
  type ProductCategory,
} from "../src/config/categories.ts";
import { getOfferValidationError } from "../src/features/catalog/offer.ts";
import type { Product, ProductImage } from "../src/types/product.ts";

export const REQUIRED_HEADERS = [
  "SKU",
  "Nombre",
  "Categoria",
  "Precio",
  "Stock",
  "Material",
  "Descripcion",
  "Imagen 1",
  "Imagen 2",
  "Visible",
  "Destacado",
  "Oferta",
  "Precio Oferta",
] as const;

type RequiredHeader = (typeof REQUIRED_HEADERS)[number];
type CsvRecord = Record<RequiredHeader, string>;

export type CatalogImportResult = {
  totalRows: number;
  products: Product[];
  imagesBySku: Record<string, ProductImage[]>;
  warnings: string[];
  errors: string[];
  discardedRows: { row: number; reason: string }[];
  ignoredOfferPriceRows: number[];
  foundImages: number;
  missingImages: number;
};

export type CatalogImportOptions = {
  imagesDirectory: string;
  imageExists?: (absolutePath: string) => boolean;
  imageNames?: readonly string[];
};

export function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];

    if (quoted) {
      if (character === '"' && input[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n" || character === "\r") {
      if (character === "\r" && input[index + 1] === "\n") index += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (quoted) throw new Error("CSV inválido: campo entre comillas sin cerrar.");
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function normalizeHeader(value: string): string {
  return value
    .replace(/^\uFEFF/, "")
    .trim()
    .toLocaleLowerCase("es-AR");
}

function createSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseNonNegativeNumber(value: string, label: string): number {
  if (!value || !/^(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(value)) {
    throw new Error(`${label} debe ser numérico.`);
  }
  const number = Number(value.replace(",", "."));
  if (number < 0) throw new Error(`${label} debe ser mayor o igual a cero.`);
  return number;
}

function parseFlag(value: string, label: string): boolean {
  if (value !== "0" && value !== "1") {
    throw new Error(`${label} debe ser 0 o 1.`);
  }
  return value === "1";
}

function validateImageName(value: string): void {
  if (!value) return;
  if (
    path.isAbsolute(value) ||
    value.includes("/") ||
    value.includes("\\") ||
    value === ".." ||
    value.includes("../") ||
    value.includes("..\\")
  ) {
    throw new Error(`nombre de imagen inseguro: "${value}".`);
  }
  if (!/\.(?:jpe?g|png|webp)$/i.test(value)) {
    throw new Error(`extensión de imagen no permitida: "${value}".`);
  }
}

export function importCatalogCsv(
  input: string,
  options: CatalogImportOptions,
): CatalogImportResult {
  const parsedRows = parseCsv(input);
  const nonEmptyRows = parsedRows.filter((cells) =>
    cells.some((cell) => cell.trim()),
  );
  if (!nonEmptyRows.length) throw new Error("El CSV está vacío.");

  const headers = nonEmptyRows[0].map(normalizeHeader);
  const headerIndexes = new Map(
    headers.map((header, index) => [header, index]),
  );
  const missingHeaders = REQUIRED_HEADERS.filter(
    (header) => !headerIndexes.has(normalizeHeader(header)),
  );
  if (missingHeaders.length) {
    throw new Error(
      `Faltan columnas requeridas: ${missingHeaders.join(", ")}.`,
    );
  }

  const result: CatalogImportResult = {
    totalRows: nonEmptyRows.length - 1,
    products: [],
    imagesBySku: {},
    warnings: [],
    errors: [],
    discardedRows: [],
    ignoredOfferPriceRows: [],
    foundImages: 0,
    missingImages: 0,
  };
  const seenSkus = new Set<string>();
  const usedSlugs = new Set<string>();
  const validCategories = new Set<string>(
    productCategories.map((category) => category.value),
  );
  const imageExists = options.imageExists ?? fs.existsSync;
  const availableImageNames =
    options.imageNames ??
    (fs.existsSync(options.imagesDirectory)
      ? fs
          .readdirSync(options.imagesDirectory, { withFileTypes: true })
          .filter((entry) => entry.isFile())
          .map((entry) => entry.name)
      : []);

  nonEmptyRows.slice(1).forEach((cells, rowIndex) => {
    const csvRowNumber = rowIndex + 2;
    const record = Object.fromEntries(
      REQUIRED_HEADERS.map((header) => [
        header,
        (cells[headerIndexes.get(normalizeHeader(header))!] ?? "").trim(),
      ]),
    ) as CsvRecord;
    const imageNames = [record["Imagen 1"], record["Imagen 2"]].filter(Boolean);
    const existingImageNames = new Set<string>();

    for (const imageName of imageNames) {
      try {
        validateImageName(imageName);
      } catch {
        continue;
      }

      const absolutePath = path.resolve(options.imagesDirectory, imageName);
      if (imageExists(absolutePath)) {
        result.foundImages += 1;
        existingImageNames.add(imageName);
        continue;
      }

      result.missingImages += 1;
      const expectedStem = path.parse(imageName).name;
      const closeMatches = availableImageNames.filter((candidate) => {
        const candidateStem = path
          .parse(candidate)
          .name.toLocaleLowerCase("es-AR");
        const normalizedExpectedStem = expectedStem
          .toLocaleLowerCase("es-AR")
          .replace(/-0?1$/, "");
        const normalizedCandidateStem = candidateStem.replace(/-0?1$/, "");
        return (
          candidateStem === expectedStem.toLocaleLowerCase("es-AR") ||
          normalizedCandidateStem === normalizedExpectedStem
        );
      });
      const closeMatchMessage = closeMatches.length
        ? ` Coincidencia por nombre base: ${closeMatches.join(", ")}.`
        : "";
      result.warnings.push(
        `Fila ${csvRowNumber} (${record.SKU}): no existe exactamente "${imageName}" en "${options.imagesDirectory}"; se usará el placeholder.${closeMatchMessage}`,
      );
    }

    try {
      if (!record.SKU) throw new Error("SKU obligatorio.");
      if (seenSkus.has(record.SKU))
        throw new Error(`SKU duplicado: ${record.SKU}.`);
      seenSkus.add(record.SKU);
      if (!record.Nombre) throw new Error("Nombre obligatorio.");
      if (!record.Categoria) throw new Error("Categoría obligatoria.");
      if (!validCategories.has(record.Categoria)) {
        throw new Error(`Categoría inválida: ${record.Categoria}.`);
      }

      const price = parseNonNegativeNumber(record.Precio, "Precio");
      const stock = parseNonNegativeNumber(record.Stock, "Stock");
      if (!Number.isInteger(stock)) throw new Error("Stock debe ser entero.");
      const visible = parseFlag(record.Visible, "Visible");
      const featured = parseFlag(record.Destacado, "Destacado");
      const offer = parseFlag(record.Oferta, "Oferta");
      let offerPrice: number | undefined;

      if (offer) {
        offerPrice = record["Precio Oferta"]
          ? parseNonNegativeNumber(record["Precio Oferta"], "Precio Oferta")
          : undefined;
        const offerError = getOfferValidationError({
          offer,
          offerPrice,
          price,
        });
        if (offerError) throw new Error(offerError);
      } else if (record["Precio Oferta"]) {
        result.ignoredOfferPriceRows.push(csvRowNumber);
        result.warnings.push(
          `Fila ${csvRowNumber} (${record.SKU}): Oferta es 0; se ignora Precio Oferta "${record["Precio Oferta"]}".`,
        );
      }

      imageNames.forEach(validateImageName);

      const baseSlug = createSlug(record.Nombre) || createSlug(record.SKU);
      let slug = baseSlug;
      if (usedSlugs.has(slug)) slug = `${baseSlug}-${createSlug(record.SKU)}`;
      usedSlugs.add(slug);

      const product: Product = {
        sku: record.SKU,
        slug,
        name: record.Nombre,
        category: record.Categoria as ProductCategory,
        ...(record.Material ? { material: record.Material } : {}),
        description: record.Descripcion,
        price,
        offer,
        ...(typeof offerPrice === "number" ? { offerPrice } : {}),
        stock,
        featured,
        visible,
      };

      const images: ProductImage[] = [];
      for (const imageName of imageNames) {
        if (!existingImageNames.has(imageName)) {
          continue;
        }
        images.push({
          src: `/images/products/${encodeURIComponent(imageName)}`,
          alt: `${record.Nombre} de Soluna`,
        });
      }

      result.products.push(product);
      if (images.length) result.imagesBySku[product.sku] = images;
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      const rowLabel = record.SKU
        ? `Fila ${csvRowNumber} (${record.SKU})`
        : `Fila ${csvRowNumber}`;
      result.errors.push(`${rowLabel}: ${reason}`);
      result.discardedRows.push({ row: csvRowNumber, reason });
    }
  });

  return result;
}

function serialize(value: unknown): string {
  return JSON.stringify(value, null, 2)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function generateProductsModule(products: Product[]): string {
  return `// Generado por npm run catalog:import. No editar manualmente.\nimport type { Product } from "@/types/product";\n\nexport const products: Product[] = ${serialize(products)};\n`;
}

export function generateImagesModule(
  imagesBySku: Record<string, ProductImage[]>,
): string {
  return `// Generado por npm run catalog:import. No editar manualmente.\nimport type { ProductImage } from "@/types/product";\n\nexport const productImagesBySku = ${serialize(imagesBySku)} as const satisfies Record<string, ProductImage[]>;\n`;
}
