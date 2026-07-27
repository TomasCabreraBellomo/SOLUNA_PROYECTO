import Link from "next/link";

import type { Product } from "@/types/product";

type ProductBreadcrumbsProps = {
  product?: Product;
  currentLabel?: string;
};

export function ProductBreadcrumbs({
  currentLabel,
  product,
}: ProductBreadcrumbsProps) {
  const label = currentLabel ?? product?.name;

  return (
    <nav aria-label="Breadcrumb" className="text-small text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link className="hover:text-foreground" href="/">
            Inicio
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link className="hover:text-foreground" href="/productos">
            Productos
          </Link>
        </li>
        {label ? (
          <>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {label}
            </li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}
