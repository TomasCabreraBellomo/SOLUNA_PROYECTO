# Arquitectura

## Organización General

La aplicación se organiza por responsabilidad:

- `src/app`: rutas, metadata, layout raíz y estilos globales.
- `src/components`: componentes reutilizables. `layout` contiene estructura pública y `ui` contiene primitivas visuales.
- `src/features`: módulos de negocio. `catalog` expone funciones de acceso a productos.
- `src/config`: configuración tipada de marca, navegación y comercio.
- `src/data`: fuente temporal de datos.
- `src/lib`: utilidades compartidas.
- `src/types`: contratos de dominio.
- `public/images`: assets públicos.

## Layout Público

La estructura común vive en `PublicLayout` y compone:

- `TopBar`
- `SiteHeader`
- contenido de página
- `SiteFooter`

El menú mobile es un Client Component porque necesita estado local. El resto del layout se mantiene como Server Component.

## Catálogo

Los productos viven temporalmente en `src/data/products.ts` porque esta etapa no incluye backend, API, Prisma ni PostgreSQL.

Usar TypeScript permite validar el contrato `Product`, tener autocompletado y mantener refactors seguros. Los componentes no importan `products.ts`; acceden mediante `src/features/catalog`.

## Imágenes

El objeto `Product` no guarda nombres de imágenes. La ruta se infiere desde el SKU:

```ts
getProductImagePath("SOL-CHA-0001");
```

Resultado:

```txt
/images/products/SOL-CHA-0001/1.webp
```

## Migración A PostgreSQL

Cuando se incorpore persistencia:

1. Definir modelos con Prisma.
2. Mapear entidades de base de datos al contrato usado por UI.
3. Reemplazar la implementación interna de `catalog.service.ts`.
4. Mantener estable la interfaz pública del catálogo.
5. Agregar API routes o server actions solo cuando el panel o flujos dinámicos lo requieran.

La intención es que `ProductCard`, Home y páginas públicas no cambien por el origen de datos.
