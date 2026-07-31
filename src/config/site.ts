function getPublicSiteUrl(): string {
  const value =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL debe ser una URL pública válida con http o https.",
    );
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL debe usar el protocolo http o https.",
    );
  }

  return url.toString().replace(/\/$/, "");
}

export const siteConfig = {
  name: "Soluna Accesorios",
  shortName: "Soluna",
  url: getPublicSiteUrl(),
  description: "Joyas que cuentan tu historia.",
  tagline: "Joyas que cuentan tu historia",
  locale: "es-AR",
  ogLocale: "es_AR",
  catalogPath: "/productos",
  location: "San Miguel de Tucumán, Argentina",
  instagramUrl: "https://www.instagram.com/solunaccs.tuc/",
} as const;
