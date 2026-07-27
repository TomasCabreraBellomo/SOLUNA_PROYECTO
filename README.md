# Soluna Storefront

Storefront público para Soluna Accesorios, una tienda catálogo argentina de joyas y accesorios ubicada en San Miguel de Tucumán.

La etapa actual implementa catálogo funcional con búsqueda, filtros por URL, ordenamiento, páginas individuales de producto, galería, stock, relacionados y ofertas reales cuando existan. No incluye carrito funcional, checkout, backend, base de datos, pagos, autenticación ni panel administrativo.

## Stack

- Next.js App Router
- React
- TypeScript strict
- Tailwind CSS
- ESLint
- Prettier
- Vitest + Testing Library
- next/image
- next/font
- lucide-react

## Rutas

- `/`
- `/productos`
- `/productos/[slug]`
- `/ofertas`
- `/cuida-tus-joyas`
- `/testimonios`
- `/como-comprar`

## Catálogo

Los productos viven temporalmente en `src/data/products.ts` como TypeScript tipado. Los componentes no importan ese archivo directamente: consumen funciones de `src/features/catalog`.

Funciones principales:

- `getVisibleProducts()`
- `getCatalogProducts(filters)`
- `getProductBySlug(slug)`
- `getFeaturedProducts(limit?)`
- `getOfferProducts(limit?)`
- `getRelatedProducts(product, limit?)`
- `getProductImagePaths(sku)`

## Imágenes

La estructura real actual de `public/images/products` es mixta:

- fotos reales en carpeta plana con `.jpg` y `.heif`;
- carpetas SKU heredadas con `1.webp` mínimos de etapa anterior.

Para evitar rutas rotas y asociaciones ambiguas, el catálogo usa un mapa tipado en `src/data/product-images.ts`.

Para agregar una imagen a un producto existente:

1. Guardar el archivo en `public/images/products`.
2. Preferir formatos web compatibles como `.jpg`, `.png` o `.webp`.
3. Agregar la ruta pública al SKU correspondiente en `productImagesBySku`.
4. Usar un `alt` descriptivo.

## Cómo Agregar Un Producto

1. Crear un SKU estable con formato `SOL-{CATEGORIA}-{NUMERO}`.
2. Crear un `slug` en minúsculas, sin tildes, con guiones.
3. Agregar el producto en `src/data/products.ts`.
4. Usar una categoría definida en `src/config/categories.ts`.
5. Guardar precios como números enteros en pesos argentinos.
6. Definir `stock`.
7. Agregar `offerPrice` solo si es menor que `price`.
8. Usar `visible: false` para ocultarlo.
9. Usar `featured: true` para destacarlo en Home.
10. Asociar imágenes en `src/data/product-images.ts`.

## Comandos

```bash
npm install
npm run format
npm run lint
npm run typecheck
npm run test
npm run build
npm run dev
```

## Datos Comerciales

- `src/config/site.ts`: marca, descripción, ubicación e Instagram.
- `src/config/navigation.ts`: navegación.
- `src/config/commerce.ts`: WhatsApp, envíos, pagos y umbral de envío gratis.
- `src/config/categories.ts`: categorías del catálogo.

`NEXT_PUBLIC_SITE_URL` puede configurarse para completar `metadataBase` en producción.
