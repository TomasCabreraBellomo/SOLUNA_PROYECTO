import fs from "node:fs";
import path from "node:path";

import {
  generateImagesModule,
  generateProductsModule,
  importCatalogCsv,
  type CatalogImportResult,
} from "./catalog-import-lib.ts";

export type CatalogMode = "check" | "import";

export type CatalogPaths = {
  csv: string;
  imagesDirectory: string;
  products: string;
  productImages: string;
};

export type CatalogPipelineResult = {
  catalog: CatalogImportResult;
  staleFiles: string[];
  writtenFiles: string[];
  blockingErrors: string[];
};

type GeneratedFile = {
  path: string;
  content: string;
};

function getGeneratedFiles(
  paths: CatalogPaths,
  catalog: CatalogImportResult,
): GeneratedFile[] {
  return [
    {
      path: paths.products,
      content: generateProductsModule(catalog.products),
    },
    {
      path: paths.productImages,
      content: generateImagesModule(catalog.imagesBySku),
    },
  ];
}

function findStaleFiles(files: GeneratedFile[]): string[] {
  return files
    .filter(
      (file) =>
        !fs.existsSync(file.path) ||
        fs.readFileSync(file.path, "utf8") !== file.content,
    )
    .map((file) => file.path);
}

function removeFileIfPresent(filePath: string): void {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

export function writeCatalogAtomically(files: GeneratedFile[]): void {
  const transactionId = `${process.pid}-${Date.now()}`;
  const stagedFiles = files.map((file) => ({
    ...file,
    temporaryPath: `${file.path}.${transactionId}.tmp`,
    backupPath: `${file.path}.${transactionId}.bak`,
    hadOriginal: fs.existsSync(file.path),
    committed: false,
  }));

  try {
    for (const file of stagedFiles) {
      fs.mkdirSync(path.dirname(file.path), { recursive: true });
      fs.writeFileSync(file.temporaryPath, file.content, {
        encoding: "utf8",
        flag: "wx",
      });
    }

    for (const file of stagedFiles) {
      if (file.hadOriginal) {
        fs.renameSync(file.path, file.backupPath);
      }
      fs.renameSync(file.temporaryPath, file.path);
      file.committed = true;
    }

    for (const file of stagedFiles) {
      removeFileIfPresent(file.backupPath);
    }
  } catch (error) {
    for (const file of [...stagedFiles].reverse()) {
      if (file.committed) {
        removeFileIfPresent(file.path);
      }
      if (fs.existsSync(file.backupPath)) {
        fs.renameSync(file.backupPath, file.path);
      }
      removeFileIfPresent(file.temporaryPath);
    }
    throw error;
  }
}

export function runCatalogPipeline(
  paths: CatalogPaths,
  mode: CatalogMode,
): CatalogPipelineResult {
  const csv = fs.readFileSync(paths.csv, "utf8");
  const catalog = importCatalogCsv(csv, {
    imagesDirectory: paths.imagesDirectory,
  });
  const generatedFiles = getGeneratedFiles(paths, catalog);
  const staleFiles = findStaleFiles(generatedFiles);
  const staleErrors =
    mode === "check"
      ? staleFiles.map(
          (filePath) =>
            `Catálogo generado desactualizado: ${path.relative(process.cwd(), filePath)}.`,
        )
      : [];
  const blockingErrors = [...catalog.errors, ...staleErrors];
  const writtenFiles: string[] = [];

  if (mode === "import" && blockingErrors.length === 0) {
    writeCatalogAtomically(generatedFiles);
    writtenFiles.push(...generatedFiles.map((file) => file.path));
  }

  return {
    catalog,
    staleFiles,
    writtenFiles,
    blockingErrors,
  };
}
