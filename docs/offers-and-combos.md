# Ofertas y combos

## Categoría y condición comercial

`combos` es una categoría del catálogo. Una oferta, en cambio, es una condición
comercial válida únicamente cuando:

- `Oferta` vale `1`;
- `Precio Oferta` es numérico y mayor que cero;
- `Precio Oferta` es menor que `Precio`.

Pertenecer a `combos` no activa una promoción. `/ofertas` separa los combos con
oferta válida de las demás piezas promocionadas, sin duplicar productos. El
ahorro se calcula como `Precio - Precio Oferta`; no se carga manualmente.

## Cómo crear un combo

Cada combo se administra como un producto independiente:

- SKU recomendado: `SOL-CMB-{NUMERO}`;
- categoría: `combos`;
- precio normal, precio especial y stock propios;
- una descripción que enumere solamente el contenido real;
- una o dos imágenes en `public/images/products/`;
- flags de visibilidad, destacado y oferta definidos explícitamente.

Ejemplo válido:

```txt
SKU: SOL-CMB-0001
Nombre: Combo Inicial para Charms
Categoria: combos
Precio: 65000
Stock: 3
Material: Mixto
Descripcion: Incluye joyero, pulsera para charms bañada en plata y un charm seleccionado.
Imagen 1: SOL-CMB-0001-01.jpg
Visible: 1
Destacado: 1
Oferta: 1
Precio Oferta: 55000
```

La imagen correspondiente debe existir en:

```txt
public/images/products/SOL-CMB-0001-01.jpg
```

No usar el ejemplo para crear datos automáticamente: precio, stock, contenido e
imágenes deben ser confirmados por el negocio y cargados en el CSV oficial.

## Importación y comprobación

1. Completar la fila en `imports/soluna-productos.csv`.
2. Copiar las imágenes con el nombre exacto declarado.
3. Ejecutar `npm run catalog:check`.
4. Ejecutar `npm run catalog:import`.
5. Repetir `npm run catalog:check`.
6. Revisar `/ofertas`, `/productos?category=combos` y la ficha generada.

El importador valida `combos` mediante la configuración tipada compartida. No
inventa descripciones, precios, promociones ni asociaciones de imágenes.

## Carrito y WhatsApp

El combo se agrega al carrito mediante su SKU, igual que cualquier producto. En
el pedido a Sofía aparece como una única línea con nombre, SKU, cantidad, precio
efectivo y subtotal. Su contenido no se descompone en otros artículos.

## Limitación actual

El combo mantiene stock independiente. Agregarlo o venderlo no descuenta stock
de las piezas individuales descritas en su contenido. Una futura migración a
base de datos podrá modelar componentes, variantes y relaciones de inventario;
esa relación no existe en la versión actual.
