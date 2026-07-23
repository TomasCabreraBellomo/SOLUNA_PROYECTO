# Soluna Storefront

Base inicial para el catalogo web de Soluna Accesorios, una joyeria moderna enfocada en charms compatibles con pulseras tipo Pandora, pulseras, aros, anillos, brazaletes, cadenas, tobilleras, gorras y accesorios.

Esta primera version no implementa e-commerce completo. El objetivo es dejar una arquitectura profesional, simple de mantener y preparada para crecer hacia catalogo completo, carrito, checkout, panel administrador y pagos.

## Stack

- Next.js App Router
- React
- TypeScript strict
- Tailwind CSS
- ESLint
- Prettier
- npm
- next/image
- lucide-react

## Estructura

```txt
src/
  app/
  components/
  features/
    catalog/
    cart/
    checkout/
    home/
    offers/
    testimonials/
    jewelry-care/
  config/
  lib/
  types/
  data/
public/
  images/
    brand/
    products/
    testimonials/
docs/
```

## Productos

Los productos iniciales viven en `src/data/products.ts` como datos TypeScript tipados. Los componentes no consumen ese archivo directamente: acceden mediante funciones expuestas por `src/features/catalog`.

Las imagenes de producto siguen esta convencion:

```txt
public/images/products/{SKU}/{index}.webp
```

Ejemplo:

```txt
public/images/products/SOL-CHA-0001/1.webp
```

## Comandos

```bash
npm install
npm run lint
npm run build
npm run dev
```

## Roadmap

- Catalogo navegable por categorias.
- Pagina de detalle de producto.
- Busqueda y filtros.
- Carrito.
- Checkout.
- Integracion con Mercado Pago.
- Panel administrador.
- PostgreSQL y Prisma.
- Autenticacion para administracion.
- Gestion real de stock, precios e imagenes.

## Despliegue

El proyecto esta preparado para desplegarse como aplicacion Next.js en Vercel u otra plataforma compatible con Node.js. En esta etapa no requiere variables de entorno ni servicios externos.
