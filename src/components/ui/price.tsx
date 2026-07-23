import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

type PriceProps = {
  currency: Product["currency"];
  price: number;
  salePrice?: number;
  className?: string;
};

export function Price({ currency, price, salePrice, className }: PriceProps) {
  const hasSalePrice = typeof salePrice === "number" && salePrice < price;

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className="font-semibold text-foreground">
        {formatCurrency(hasSalePrice ? salePrice : price, currency)}
      </span>
      {hasSalePrice ? (
        <span className="text-small text-muted-foreground line-through">
          {formatCurrency(price, currency)}
        </span>
      ) : null}
    </div>
  );
}
