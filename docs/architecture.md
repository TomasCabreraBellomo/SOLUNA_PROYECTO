# Arquitectura

## Organización General

- `src/app`: rutas, metadata y layouts de Next.js App Router.
- `src/components`: componentes reutilizables de UI, layout y catálogo.
- `src/features/catalog`: capa de acceso, filtros, ordenamiento, validación y utilidades de catálogo.
- `src/features/cart`: modelo, utilidades, persistencia, estado y pedido por WhatsApp.
- `src/config`: configuración tipada de sitio, comercio, navegación y categorías.
- `src/data`: fuente temporal de productos e imágenes.
- `src/types`: contratos de dominio.
- `public/images`: assets públicos.

## Separación Entre Datos Y Componentes

Los productos viven en `src/data/products.ts`, pero los componentes visuales no importan ese archivo. El acceso pasa por `src/features/catalog`, que expone funciones síncronas preparadas para convertirse en asíncronas cuando exista base de datos.

Esta separación permite migrar luego a PostgreSQL/Prisma reemplazando la implementación interna del catálogo sin cambiar `ProductCard`, Home o las páginas públicas.

## Filtros Por URL

`/productos` lee filtros desde search params:

- `search`
- `category`
- `material`
- `color`
- `minPrice`
- `maxPrice`
- `inStock`
- `offers`
- `sort`

Los formularios usan método GET. La URL se puede compartir, recargar y navegar hacia atrás sin estado global.

## Imágenes

La inspección real mostró una carpeta plana con fotos `.jpg` y `.heif`, más carpetas SKU heredadas con `1.webp`.

No se infieren imágenes por nombre en runtime. Se usa `src/data/product-images.ts` como mapa tipado por SKU para asociar únicamente archivos confirmados y evitar rutas rotas.

## Producto Individual

`/productos/[slug]` usa:

- `generateStaticParams()` desde productos visibles;
- `generateMetadata()` por producto;
- `notFound()` para slugs inexistentes;
- galería con Client Component solo para cambiar imagen principal;
- relacionados derivados por categoría, material y fallback visible.

## Carrito

El layout raíz proyecta el catálogo visible a un modelo serializable y lo
entrega a `CartProvider`. La persistencia guarda solo SKU y cantidad; durante la
hidratación se reconcilia cada entrada contra el catálogo vigente para impedir
precios, stock o nombres obsoletos.

La interfaz vive en `/carrito`, con Client Components acotados. La elección de
una página dedicada conserva comportamiento nativo de foco, teclado y scroll y
evita sumar un diálogo modal a la navegación mobile.

## Migración Futura A PostgreSQL

1. Modelar productos, categorías e imágenes en Prisma.
2. Mantener DTOs compatibles con `Product`.
3. Reemplazar funciones internas de `src/features/catalog`.
4. Mantener filtros de URL como contrato público.
5. Agregar APIs o Server Actions solo cuando existan panel/admin/persistencia.
