import type { Metadata } from "next";

import { PublicLayout } from "@/components/layout/public-layout";
import { getOfferCombos, getOtherOfferProducts } from "@/features/catalog";
import { OffersPageContent } from "@/features/offers/offers-page";

export const metadata: Metadata = {
  title: {
    absolute: "Ofertas y combos | Soluna Accesorios",
  },
  description:
    "Descubrí combos de accesorios y productos seleccionados con precios especiales en Soluna.",
  alternates: {
    canonical: "/ofertas",
  },
};

export default function OfertasPage() {
  return (
    <PublicLayout>
      <OffersPageContent
        combos={getOfferCombos()}
        otherOffers={getOtherOfferProducts()}
      />
    </PublicLayout>
  );
}
