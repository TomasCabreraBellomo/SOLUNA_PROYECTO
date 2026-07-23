import { commerceConfig } from "@/config/commerce";
import { formatCurrency } from "@/lib/formatters";

export function TopBar() {
  return (
    <div className="bg-foreground text-primary-foreground">
      <div className="mx-auto flex min-h-9 max-w-7xl flex-col items-center justify-center gap-1 px-5 py-2 text-center text-[0.78rem] font-semibold sm:flex-row sm:gap-6">
        <span>Envíos a toda Argentina</span>
        <span className="hidden h-1 w-1 rounded-full bg-primary-foreground/50 sm:block" />
        <span>
          Envío gratis a sucursal desde{" "}
          {formatCurrency(commerceConfig.freeShippingThreshold, "ARS")}
        </span>
      </div>
    </div>
  );
}
