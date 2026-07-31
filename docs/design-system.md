# Design System Soluna

## Colores

Los colores se definen como variables CSS semánticas en `src/app/globals.css` y se consumen desde Tailwind.

- `background`: blanco cálido.
- `foreground`: negro cálido para texto.
- `surface`: superficies principales.
- `surface-muted`: fondos suaves.
- `primary`: acciones principales.
- `primary-hover`: estado hover de acciones principales.
- `primary-foreground`: texto sobre fondo primario.
- `secondary`: rosa empolvado.
- `accent-gold`: dorado tenue.
- `accent-silver`: plateado suave.
- `muted`: gris cálido claro.
- `muted-foreground`: texto secundario.
- `border`: bordes suaves.
- `ring`: foco accesible.
- `destructive`: estados negativos.

## Tipografías

Se usan fuentes oficiales mediante `next/font`:

- Display: `Cormorant Garamond`.
- Sans: `Nunito Sans`.

Las fuentes se exponen como variables CSS y se conectan a Tailwind mediante `font-display` y `font-sans`.

## Jerarquía

- `display`: usos expresivos puntuales.
- `h1`: héroes y títulos principales.
- `h2`: títulos de sección.
- `h3`: títulos internos y cards.
- `body`: párrafos.
- `small`: textos secundarios.
- `label`: labels compactos.
- `eyebrow`: textos introductorios en mayúscula.

## Espaciado, Bordes Y Sombras

El layout usa mucho espacio en blanco, secciones amplias y cards con radio máximo de `8px`. Las sombras son suaves y se reservan para elevación mínima.

## Componentes Base

- `Button`: acciones principales, secundarias y ghost.
- `IconButton`: acciones compactas con nombre accesible.
- `Container`: ancho máximo consistente.
- `Section`: espaciado vertical responsive.
- `SectionHeading`: encabezados de sección.
- `Badge`: etiquetas pequeñas.
- `BrandLogo`: logo temporal de texto hasta incorporar archivo real.
- `ProductCard`: tarjeta preparada para imagen, precio, oferta, stock y acciones visuales.
- `CategoryCard`, `BenefitCard`, `EmptyState`, `Price`, `WhatsAppButton`.

## Responsive

El diseño se valida desde mobile angosto hasta desktop amplio. La navegación desktop aparece en `lg`; mobile usa menú accesible sin dependencias pesadas.

## Accesibilidad

- Landmarks semánticos.
- Botones reales para acciones.
- Links para navegación.
- `aria-label` en icon buttons.
- Foco visible con `ring`.
- Contraste moderado y legible.
- Respeto por `prefers-reduced-motion`.

## Evolución visual

La escala vigente de radios, sombras, transiciones, variantes de botones y las
reglas de movimiento se documentan en `docs/visual-experience.md`. Los valores
se centralizan en variables CSS y configuración de Tailwind. `Reveal` permite
entradas progresivas y respeta `prefers-reduced-motion`.

## Logo

Si existe un archivo real en `public/images/brand`, debe usarse con `next/image`, sin deformar, recortar ni modificar el original. Mientras no exista, `BrandLogo` muestra “SOLUNA” y “Accesorios” como marca temporal de texto.
