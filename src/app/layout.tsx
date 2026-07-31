import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";

import { siteConfig } from "@/config/site";
import { CartProvider, createCartProduct } from "@/features/cart";
import { getProductPrimaryImage, getVisibleProducts } from "@/features/catalog";
import { cn } from "@/lib/utils";

import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const sansFont = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    locale: siteConfig.ogLocale,
    siteName: siteConfig.name,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cartCatalog = getVisibleProducts().map((product) =>
    createCartProduct(product, getProductPrimaryImage(product)),
  );

  return (
    <html
      lang={siteConfig.locale}
      className={cn(displayFont.variable, sansFont.variable)}
    >
      <body>
        <CartProvider catalog={cartCatalog}>{children}</CartProvider>
      </body>
    </html>
  );
}
