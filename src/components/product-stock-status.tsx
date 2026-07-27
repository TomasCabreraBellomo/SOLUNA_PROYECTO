import { getStockStatus } from "@/features/catalog";
import { cn } from "@/lib/utils";

type ProductStockStatusProps = {
  stock: number;
  className?: string;
};

export function ProductStockStatus({
  stock,
  className,
}: ProductStockStatusProps) {
  const status = getStockStatus(stock);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-label font-bold",
        status.value === "available" && "bg-surface-muted text-foreground",
        status.value === "low-stock" && "bg-secondary text-foreground",
        status.value === "out-of-stock" && "bg-destructive/10 text-destructive",
        className,
      )}
    >
      {status.label}
    </span>
  );
}
