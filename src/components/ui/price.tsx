import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

type PriceProps = {
  price: number;
  offerPrice?: number;
  className?: string;
};

export function Price({ price, offerPrice, className }: PriceProps) {
  const hasOfferPrice = typeof offerPrice === "number" && offerPrice < price;

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className="font-semibold text-foreground">
        {formatCurrency(hasOfferPrice ? offerPrice : price)}
      </span>
      {hasOfferPrice ? (
        <span className="text-small text-muted-foreground line-through">
          {formatCurrency(price)}
        </span>
      ) : null}
    </div>
  );
}
