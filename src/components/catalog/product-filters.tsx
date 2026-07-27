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
        <input
          className="mt-2 h-11 w-full rounded-soluna border border-border bg-surface px-3 text-small outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
          defaultValue={filters.search}
          id="search"
          name="search"
          placeholder="Nombre, SKU o material"
          type="search"
        />
      </div>

      <div>
        <label
          className="text-label font-bold uppercase text-foreground"
          htmlFor="category"
        >
          Categoría
        </label>
        <select
          className="mt-2 h-11 w-full rounded-soluna border border-border bg-surface px-3 text-small outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
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
            className="mt-2 h-11 w-full rounded-soluna border border-border bg-surface px-3 text-small outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
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
            className="mt-2 h-11 w-full rounded-soluna border border-border bg-surface px-3 text-small outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
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
            className="mt-2 h-11 w-full rounded-soluna border border-border bg-surface px-3 text-small outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
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
            className="mt-2 h-11 w-full rounded-soluna border border-border bg-surface px-3 text-small outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
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
        <label className="flex items-center gap-3 text-small text-foreground">
          <input
            className="size-4 accent-current"
            defaultChecked={filters.inStock}
            name="inStock"
            type="checkbox"
            value="true"
          />
          Solo disponibles
        </label>
        <label className="flex items-center gap-3 text-small text-foreground">
          <input
            className="size-4 accent-current"
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
          className="mt-2 h-11 w-full rounded-soluna border border-border bg-surface px-3 text-small outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
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

      <button
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        type="submit"
      >
        Aplicar filtros
      </button>
    </form>
  );
}
