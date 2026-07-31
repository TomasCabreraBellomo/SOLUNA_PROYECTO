import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import {
  getEffectivePrice,
  getPreviousPrice,
  type OfferProduct,
} from "@/features/catalog";

type PriceProps = {
  product: OfferProduct;
  className?: string;
};

export function Price({ product, className }: PriceProps) {
  const effectivePrice = getEffectivePrice(product);
  const previousPrice = getPreviousPrice(product);

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className="font-semibold text-foreground">
        {formatCurrency(effectivePrice)}
      </span>
      {previousPrice !== null ? (
        <span className="text-small text-muted-foreground line-through">
          {formatCurrency(previousPrice)}
        </span>
      ) : null}
    </div>
  );
}
