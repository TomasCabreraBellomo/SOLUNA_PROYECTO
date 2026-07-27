import { EmptyState } from "@/components/empty-state";

type CatalogEmptyStateProps = {
  hasFilters?: boolean;
};

export function CatalogEmptyState({
  hasFilters = false,
}: CatalogEmptyStateProps) {
  return (
    <EmptyState
      actionHref={hasFilters ? "/productos" : undefined}
      actionLabel={hasFilters ? "Limpiar filtros" : undefined}
      description={
        hasFilters
          ? "No encontramos productos que coincidan con esa búsqueda. Probá limpiar filtros o cambiar los términos."
          : "El catálogo visible todavía no tiene productos cargados."
      }
      title={hasFilters ? "Sin resultados" : "Catálogo en preparación"}
    />
  );
}
