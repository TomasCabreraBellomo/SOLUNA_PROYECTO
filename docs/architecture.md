# Arquitectura

## Organizacion general

La aplicacion esta organizada por responsabilidad:

- `src/app`: rutas, metadata, layout global y estilos base de Next.js App Router.
- `src/components`: componentes reutilizables y neutrales del dominio, como `Button`, `Container`, `Section`, `Heading`, `Badge` y `ProductCard`.
- `src/features`: modulos por area de negocio. `catalog` contiene la interfaz publica para consultar productos e inferir imagenes.
- `src/config`: configuracion estable de la marca y del sitio.
- `src/lib`: utilidades compartidas sin dependencia de UI.
- `src/types`: contratos de dominio reutilizables.
- `src/data`: fuentes temporales de datos.
- `public/images`: assets publicos agrupados por tipo.

## Catalogo

Los productos viven temporalmente en `src/data/products.ts` porque esta primera version no incluye backend, API, Prisma ni PostgreSQL. Usar TypeScript en vez de JSON permite:

- validar la estructura con `Product`;
- evitar datos incompletos durante el desarrollo;
- mantener autocompletado y refactors seguros;
- preparar una migracion posterior sin cambiar componentes.

Los componentes no importan `src/data/products.ts`. La unica capa que conoce esa fuente es `src/features/catalog/catalog.service.ts`.

## Imagenes de producto

El objeto `Product` no guarda nombres de imagenes. La ruta se infiere desde el SKU:

```ts
getProductImagePath("SOL-CHA-0001");
```

Resultado:

```txt
/images/products/SOL-CHA-0001/1.webp
```

Esta convencion evita duplicar datos y facilita migrar luego a un origen centralizado de assets.

## Migracion futura a PostgreSQL

En la segunda etapa, `src/data/products.ts` sera reemplazado por una fuente persistente:

1. Crear modelos en PostgreSQL con Prisma.
2. Mover `Product` hacia contratos derivados o alineados con el schema.
3. Cambiar la implementacion interna de `src/features/catalog/catalog.service.ts`.
4. Mantener estable la interfaz publica del catalogo para no modificar componentes.
5. Agregar API routes o server actions segun las necesidades del panel administrador.

La meta es que `ProductCard`, paginas y componentes de UI sigan recibiendo `Product` o DTOs equivalentes sin saber si los datos vienen de TypeScript, PostgreSQL o una API.
