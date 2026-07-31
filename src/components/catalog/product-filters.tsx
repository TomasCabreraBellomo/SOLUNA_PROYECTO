import type { CategoryWithProductCount } from "@/features/catalog/catalog.service";
import type { CatalogFilters, CatalogSort } from "@/features/catalog";
import { formatCurrency } from "@/lib/formatters";

type ProductFiltersProps = {
  categories: CategoryWithProductCount[];
  colors: string[];
  filters: CatalogFilters;
  materials: string[];
  priceRange: {
    min: number;
    max: number;
  };
  showNewestSort: boolean;
};

const sortOptions: { value: CatalogSort; label: string }[] = [
  { value: "featured", label: "Destacados" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "name-asc", label: "Nombre A-Z" },
  { value: "name-desc", label: "Nombre Z-A" },
  { value: "newest", label: "Más recientes" },
];

const fieldStyles =
  "mt-2 min-h-12 w-full rounded-soluna border border-border bg-surface px-4 text-small text-foreground outline-none transition-all duration-fast placeholder:text-muted-foreground/75 hover:border-foreground/25 focus:border-ring focus:ring-4 focus:ring-ring/10";

export function ProductFilters({
  categories,
  colors,
  filters,
  materials,
  priceRange,
  showNewestSort,
}: ProductFiltersProps) {
  return (
    <form action="/productos" className="grid gap-5">
      <div>
        <label
          className="text-label font-bold uppercase text-foreground"
          htmlFor="search"
        >
          Buscar
        </label>
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 mt-1 text-muted-foreground"
            size={17}
          />
          <input
            className={`${fieldStyles} pl-11`}
            defaultValue={filters.search}
            id="search"
            name="search"
            placeholder="Nombre, SKU o material"
            type="search"
          />
        </div>
      </div>

      <div>
        <label
          className="text-label font-bold uppercase text-foreground"
          htmlFor="category"
        >
          Categoría
        </label>
        <select
          className={fieldStyles}
          defaultValue={filters.category ?? ""}
          id="category"
          name="category"
        >
          <option value="">Todas</option>
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label} ({category.count})
            </option>
          ))}
        </select>
      </div>

      {materials.length > 0 ? (
        <div>
          <label
            className="text-label font-bold uppercase text-foreground"
            htmlFor="material"
          >
            Material
          </label>
          <select
            className={fieldStyles}
            defaultValue={filters.material ?? ""}
            id="material"
            name="material"
          >
            <option value="">Todos</option>
            {materials.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {colors.length > 0 ? (
        <div>
          <label
            className="text-label font-bold uppercase text-foreground"
            htmlFor="color"
          >
            Color
          </label>
          <select
            className={fieldStyles}
            defaultValue={filters.color ?? ""}
            id="color"
            name="color"
          >
            <option value="">Todos</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            className="text-label font-bold uppercase text-foreground"
            htmlFor="minPrice"
          >
            Desde
          </label>
          <input
            className={fieldStyles}
            defaultValue={filters.minPrice}
            id="minPrice"
            min={0}
            name="minPrice"
            placeholder={formatCurrency(priceRange.min)}
            type="number"
          />
        </div>
        <div>
          <label
            className="text-label font-bold uppercase text-foreground"
            htmlFor="maxPrice"
          >
            Hasta
          </label>
          <input
            className={fieldStyles}
            defaultValue={filters.maxPrice}
            id="maxPrice"
            min={0}
            name="maxPrice"
            placeholder={formatCurrency(priceRange.max)}
            type="number"
          />
        </div>
      </div>

      <div className="grid gap-3">
        <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-soluna-sm px-1 text-small text-foreground transition-colors hover:bg-surface-muted">
          <input
            className="size-5 accent-current"
            defaultChecked={filters.inStock}
            name="inStock"
            type="checkbox"
            value="true"
          />
          Solo disponibles
        </label>
        <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-soluna-sm px-1 text-small text-foreground transition-colors hover:bg-surface-muted">
          <input
            className="size-5 accent-current"
            defaultChecked={filters.offers}
            name="offers"
            type="checkbox"
            value="true"
          />
          Solo ofertas
        </label>
      </div>

      <div>
        <label
          className="text-label font-bold uppercase text-foreground"
          htmlFor="sort"
        >
          Orden
        </label>
        <select
          className={fieldStyles}
          defaultValue={filters.sort ?? "featured"}
          id="sort"
          name="sort"
        >
          {sortOptions
            .filter((option) => showNewestSort || option.value !== "newest")
            .map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      </div>

      <Button className="w-full" type="submit">
        Aplicar filtros
      </Button>
    </form>
  );
}
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
