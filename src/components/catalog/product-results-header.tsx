import { Button } from "@/components/ui/button";

type ProductResultsHeaderProps = {
  count: number;
  hasFilters: boolean;
};

export function ProductResultsHeader({
  count,
  hasFilters,
}: ProductResultsHeaderProps) {
  return (
    <div
      aria-live="polite"
      className="flex flex-col gap-3 rounded-soluna border border-border/85 bg-surface p-4 shadow-card sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-small font-semibold text-foreground">
        {count === 1
          ? "1 producto encontrado"
          : `${count} productos encontrados`}
      </p>
      {hasFilters ? (
        <Button href="/productos" variant="ghost">
          Limpiar filtros
        </Button>
      ) : null}
    </div>
  );
}
