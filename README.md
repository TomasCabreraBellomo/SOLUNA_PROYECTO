# Soluna Storefront

Storefront público inicial para Soluna Accesorios, una tienda catálogo argentina de joyas y accesorios.

La etapa actual implementa el sistema visual, layout público, Home, navegación y componentes reutilizables. Todavía no incluye catálogo completo, backend, base de datos, carrito funcional, pagos, autenticación ni panel administrador.

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

## Rutas Disponibles

- `/`
- `/productos`
- `/ofertas`
- `/cuida-tus-joyas`
- `/testimonios`
- `/como-comprar`

Las rutas secundarias son placeholders visuales consistentes para evitar enlaces rotos mientras se construyen las próximas etapas.

## Estructura Visual

- Barra comercial superior.
- Header sticky responsive con navegación desktop, menú mobile, búsqueda visual, carrito visual y WhatsApp.
- Home con hero, categorías destacadas, productos destacados, beneficios, ofertas, cuidado de joyas, testimonios y CTA final.
- Footer con navegación, categorías, envíos, pagos, Instagram, WhatsApp y ubicación general.

## Estructura Del Proyecto

```txt
src/
  app/
  components/
    layout/
    ui/
  config/
  data/
  features/
    catalog/
    cart/
    checkout/
    home/
    jewelry-care/
    offers/
    testimonials/
  lib/
  test/
  types/
docs/
public/
  images/
    brand/
    products/
    testimonials/
```

## Datos Comerciales

Los datos críticos viven en archivos tipados:

- `src/config/site.ts`: marca, descripción, frase, ubicación e Instagram.
- `src/config/navigation.ts`: navegación principal y categorías.
- `src/config/commerce.ts`: WhatsApp, envíos, pagos y umbral de envío gratis.

Para modificar WhatsApp, Instagram, medios de pago o envío, cambiar estas configuraciones y no los componentes.

## Productos E Imágenes

Los productos de ejemplo viven temporalmente en `src/data/products.ts`.

Los componentes acceden a ellos mediante `src/features/catalog`, no importando datos directos.

Convención de imágenes:

```txt
public/images/products/{SKU}/{index}.webp
```

El logo real, cuando exista, debe ubicarse en:

```txt
public/images/brand/
```

Mientras no haya logo real, `BrandLogo` muestra una marca temporal basada en texto.

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

## Roadmap

- Catálogo navegable por categorías.
- Página de detalle de producto.
- Búsqueda y filtros.
- Carrito.
- Checkout por WhatsApp.
- Integración con Mercado Pago.
- Panel administrador.
- PostgreSQL y Prisma.
- Importación de productos desde Excel.

## Despliegue

El proyecto está preparado para desplegarse como aplicación Next.js. `NEXT_PUBLIC_SITE_URL` puede configurarse para completar `metadataBase` en producción.
