# Importación del catálogo

La fuente oficial es `imports/soluna-productos.csv`. Las imágenes se guardan en
`public/images/products/`. El CSV no se publica ni se modifica durante la
importación.

## Columnas y valores

El archivo debe contener `SKU`, `Nombre`, `Categoria`, `Precio`, `Stock`,
`Material`, `Descripcion`, `Imagen 1`, `Imagen 2`, `Visible`, `Destacado` y
`Precio Oferta`. Se toleran espacios en encabezados y valores, campos entre
comillas, comas dentro de campos y columnas vacías al final.

- `SKU`, nombre y categoría son obligatorios; el SKU debe ser único.
- La categoría debe existir en `src/config/categories.ts`.
- `combos` es una categoría válida; `ofertas` no es una categoría.
- Precio debe ser numérico y no negativo; stock debe ser entero y no negativo.
- Visible y Destacado aceptan solamente `0` o `1`.
- Precio Oferta puede quedar vacío; si se informa, debe ser numérico, no
  negativo y menor que Precio.
- Oferta acepta solamente `0` o `1`. Para una promoción activa debe valer `1` y
  Precio Oferta debe ser mayor que cero y menor que Precio.
- Material y descripción pueden quedar vacíos: el importador no inventa datos.
- Las imágenes aceptan `.jpg`, `.jpeg`, `.png` o `.webp`. Indicar solo el nombre
  del archivo, sin rutas, separadores ni `..`.

Una imagen declarada pero ausente produce una advertencia y el sitio usa su
placeholder. Un error de datos descarta esa fila, informa su número y no impide
importar las demás filas válidas.

## Ejecución

```bash
npm run catalog:import
```

El comando valida el CSV, imprime cantidades, errores y advertencias, y genera:

- `src/data/products.ts`
- `src/data/product-images.ts`

Ambos archivos siguen siendo consumidos exclusivamente mediante la capa de
catálogo existente.

## Actualización recomendada

1. Editar precios, stock, descripciones y flags en el CSV.
2. Copiar imágenes nuevas a `public/images/products/` y escribir sus nombres
   exactos en el CSV.
3. Ejecutar la importación.
4. Corregir las filas descartadas y revisar advertencias.
5. Ejecutar lint, typecheck, tests y build antes de publicar.

Para un combo, usar un SKU con prefijo `SOL-CMB`, describir claramente el
contenido y declarar su propio precio, stock y archivos de imagen. Consultar
`docs/offers-and-combos.md` para el ejemplo completo y las limitaciones actuales.

Los slugs se generan desde el nombre. Si se repiten, el segundo incorpora el SKU
para mantener unicidad estable. Los productos con `Visible = 0` permanecen en
los datos, pero no salen públicamente; solo `Destacado = 1` aparece en la
selección de Home. Stock cero muestra “Sin stock”, y las ofertas válidas muestran
precio original tachado y precio promocional.
