import { Gem } from "lucide-react";

import { cn } from "@/lib/utils";

type ProductImagePlaceholderProps = {
  className?: string;
};

export function ProductImagePlaceholder({
  className,
}: ProductImagePlaceholderProps) {
  return (
    <div
      aria-label="Producto sin imagen disponible"
      className={cn(
        "flex h-full min-h-64 w-full items-center justify-center bg-[radial-gradient(circle_at_center,hsl(var(--surface))_0,hsl(var(--surface-muted))_72%)]",
        className,
      )}
      role="img"
    >
      <div className="grid size-24 place-items-center rounded-full border border-accent-gold/25 bg-background/90 text-accent-gold shadow-card">
        <Gem aria-hidden="true" size={32} strokeWidth={1.4} />
      </div>
    </div>
  );
}
