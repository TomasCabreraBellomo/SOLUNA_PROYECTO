# Catálogo

## Modelo Product

```ts
type Product = {
  sku: string;
  slug: string;
  name: string;
  category: ProductCategory;
  material?: string;
  color?: string;
  measurements?: string;
  description: string;
  price: number;
  offer?: boolean;
  offerPrice?: number;
  stock: number;
  featured?: boolean;
  visible?: boolean;
  createdAt?: string;
};
```

## Categorías

Las categorías viven en `src/config/categories.ts` y tienen `value`, `label`, `slug`, `description`, `order` e `icon`.

Categorías iniciales:

- `charms`
- `pulseras-para-charms`
- `pulseras`
- `aros`
- `anillos`
- `brazaletes`
- `cadenas`
- `tobilleras`
- `gorras`
- `accesorios`
- `combos`

## Productos Normalizados

- `SOL-CHA-0001`: `charm-corazon-brilloso`
- `SOL-PUL-0001`: `pulsera-con-charms-mariposa`
- `SOL-ANI-0001`: `anillos-de-acero-quirurgico`
- `SOL-CAD-0001`: `cadenita-acero-dorado`

## SKU

Formato recomendado:

```txt
SOL-{CATEGORIA}-{NUMERO}
```

Ejemplos:

- `SOL-CHA-0001`
- `SOL-PUL-0001`
- `SOL-ANI-0001`
- `SOL-CAD-0001`
- `SOL-CMB-0001`

## Slug

Debe ser estable, en minúsculas, sin tildes ni caracteres especiales, y con guiones.

Ejemplo:

```txt
charm-corazon-brilloso
```

## Imágenes

La estructura real usada es una carpeta plana:

```txt
public/images/products/Charm corazón brilloso.jpg
public/images/products/Pulsera con charms de acero Mariposa.jpg
public/images/products/Anillos de acero quirúrgico.jpg
public/images/products/Cadenita acero dorado.jpg
```

La asociación vive en:

```txt
src/data/product-images.ts
```

Archivos pendientes de alta como producto:

- `Brazalete acero dorado.jpg`
- `Cadenita acero quirurgico rosa.jpg`
- `Cadenita acero quirúrgico Rosa.jpg`
- `Cadenitas de acero dorado inoxidable.jpg`
- `Cadenitas de acero dorado inoxidable (1).jpg`
- `Charm Angel .jpg`
- `Charm el extraño mundo de Jack.jpg`
- `Charm gato Alicia en el país de las Maravillas.heif`
- `Charm Hello Kitty acero.jpg`
- `Charm luciérnaga.jpg`
- `Charm Lumiére La Bella y la Bestia .jpg`
- `Charm Marciano Toy Story.heif`
- `Charm Miles Morales.heif`
- `Charm Olaf.jpg`
- `Charm Pascal.jpg`
- `Charm Ratatouille.jpg`
- `Charm Spiderman.jpg`
- `Charm Stitch.jpg`
- `Pulsera con charms acero.jpg`

## Stock

- `stock > 3`: Disponible.
- `stock` entre `1` y `3`: Últimas unidades.
- `stock === 0`: Sin stock.

## Ofertas

`Oferta` es la única activación comercial. Con `offer: false`, `offerPrice` se
ignora. Con `offer: true`, `offerPrice` debe ser numérico, mayor que cero y menor
que `price`. La aplicación usa las utilidades de `src/features/catalog/offer.ts`
para precio efectivo, precio anterior y estado de oferta.

La categoría `combos` no activa una oferta por sí sola. Un combo aparece en
`/ofertas` únicamente cuando cumple la misma regla comercial que cualquier otro
producto. El ahorro visible se calcula en runtime como `price - offerPrice`; no
se guarda como un dato independiente.

## Visibilidad Y Destacados

- `visible: false` oculta el producto del catálogo público.
- `featured: true` prioriza el producto en Home.

## Errores Comunes

- SKU duplicado.
- Slug duplicado.
- Categoría inexistente.
- Precio negativo.
- Stock negativo.
- Oferta mayor o igual al precio base.
- Producto visible sin descripción.
- Producto visible sin mapa de imagen confirmado.
