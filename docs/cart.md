# Carrito y pedido por WhatsApp

## Arquitectura

La ruta `/carrito` usa una página dedicada para conservar navegación, scroll y
foco nativos en móviles, tablets y desktop. No es un checkout transaccional: no
hay backend, autenticación, pagos ni creación automática de pedidos.

`CartProvider`, montado en el layout raíz, contiene el estado interactivo. El
layout continúa siendo un Server Component y entrega al provider una proyección
serializable del catálogo visible. `ProductCard` y la ficha de producto siguen
siendo Server Components; únicamente los botones de agregar y la página del
carrito son Client Components.

Las utilidades puras viven en `src/features/cart`:

- `cart.utils.ts`: cantidades, subtotales, total y mutaciones inmutables;
- `cart.storage.ts`: formato persistido, validación y reconciliación;
- `cart.whatsapp.ts`: sanitización, mensaje y enlace final;
- `cart.events.ts`: eventos internos sin servicios de analítica;
- `cart-provider.tsx`: estado, hidratación y sincronización.

## Fuente de verdad

El navegador nunca define precios, ofertas, nombres o stock. El carrito recibe
el catálogo actual y usa `getEffectivePrice()` e `isOfferActive()` del dominio
de catálogo.

Al recuperar una sesión se usan únicamente el SKU y la cantidad guardados. Cada
ítem se reconstruye contra el catálogo visible actual. Se eliminan productos
inexistentes o sin stock, se actualizan nombres, imágenes y precios, y la
cantidad se ajusta al stock actual.

## Persistencia

Clave de `localStorage`:

```txt
soluna:cart
```

Formato versión 1:

```json
{
  "version": 1,
  "items": [{ "sku": "SOL-CHA-0001", "quantity": 2 }]
}
```

No se guardan datos personales. JSON inválido, versiones desconocidas e ítems
malformados se ignoran. Si `localStorage` está bloqueado, el carrito funciona
durante la sesión en memoria.

## Cantidades

El máximo general es 10 unidades por SKU y nunca puede superar el stock vigente.
Las cantidades deben ser enteros positivos. Disminuir desde 1 mantiene la
cantidad en 1; para quitar el producto se usa la acción explícita `Eliminar`.

## Datos opcionales

Nombre, localidad y observaciones son opcionales. No se persisten. Los límites
son 80 caracteres para nombre, 80 para localidad y 500 para observaciones.
Caracteres de control se eliminan; las líneas legibles de observaciones se
conservan.

## Mensaje

El mensaje incluye:

- saludo a Sofía;
- productos, SKU, cantidad, precio efectivo y subtotal;
- total estimado;
- campos opcionales no vacíos;
- URL pública;
- aclaración de disponibilidad y envío.

El enlace usa `https://wa.me/<numero>?text=<mensaje>` y codificación
`encodeURIComponent`. WhatsApp se abre en otra pestaña para que la persona
revise y confirme manualmente el envío. La aplicación no envía mensajes.

## Configuración

Variables documentadas en `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=5493874093118
```

El número debe contener únicamente entre 10 y 15 dígitos, con código de país y
sin `+`, espacios ni guiones. En Argentina se usa `54`, y para WhatsApp móvil se
incluye el `9`: `5493874093118`.

Sofía y el fallback público del número están centralizados en
`src/config/commerce.ts`. Para cambiar el número en producción, actualizar
`NEXT_PUBLIC_WHATSAPP_NUMBER` en Vercel y volver a desplegar.

`NEXT_PUBLIC_SITE_URL` debe ser la URL pública real con `https` en Vercel. En
desarrollo puede quedar como `http://localhost:3000`.

## Prueba local

1. Copiar `.env.example` a `.env.local`.
2. Ejecutar `npm run dev`.
3. Agregar dos productos con stock.
4. Cambiar cantidades y recargar para verificar persistencia.
5. Completar nombre, localidad y observaciones.
6. Abrir el enlace de WhatsApp y revisar el mensaje sin enviarlo.

## Prueba en Vercel

1. Configurar ambas variables públicas para todos los entornos necesarios.
2. Desplegar y abrir `/carrito`.
3. Repetir el flujo completo en móvil y desktop.
4. Confirmar que el mensaje usa la URL pública, precios y cantidades actuales.

Antes del lanzamiento, verificar manualmente que `5493874093118` abre la
conversación correcta con Sofía. No asumirlo únicamente por el formato.

## Limitaciones

- Total sin costo de envío.
- Pedido sujeto a confirmación de stock y envío.
- Sin Mercado Pago, backend, Prisma ni WhatsApp Business API.
- Sin envío automático ni almacenamiento de pedidos.
- Los eventos `product_added_to_cart`, `product_removed_from_cart` y
  `whatsapp_checkout_started` son eventos internos del navegador y no salen a
  terceros.
