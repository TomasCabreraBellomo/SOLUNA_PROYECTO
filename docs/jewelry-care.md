# Guía de cuidados de joyas

## Estructura

La ruta estática `/cuida-tus-joyas` presenta una guía editorial organizada en:

1. Hero compacto con breadcrumb, introducción y composición decorativa.
2. Índice accesible con anchors para cada sección.
3. Cuidados generales en cuatro tarjetas.
4. Cuidados específicos para Plata 925, acero inoxidable y quirúrgico, acero
   blanco, cobre blanco y fantasía.
5. Bloque destacado sobre cómo conservar el brillo.
6. Aviso contextual para piezas con acabados o indicaciones particulares.
7. CTA final conectado a la configuración central de WhatsApp.

## Componentes

- `CareGuideNav`: índice horizontal desplazable en mobile y multilínea en
  desktop.
- `CareTipCard`: consejo general con icono, título y explicación.
- `MaterialCareCard`: bloque editorial con recomendaciones por material.
- `HomeCarePreview`: resumen de cuatro pautas y acceso desde Home.
- Componentes compartidos: `PublicLayout`, `Container`, `Section`,
  `SectionHeading`, `Reveal` y `WhatsAppButton`.

La página permanece mayormente como Server Component. Solo `Reveal` usa
JavaScript para observar la entrada al viewport.

## Actualización del contenido

Los consejos viven en arreglos tipados dentro de
`src/features/jewelry-care/jewelry-care-page.tsx`. Para actualizarlos:

- conservar los IDs porque forman parte de la navegación interna;
- no agregar recomendaciones, productos o garantías sin una fuente aprobada;
- mantener títulos breves y explicaciones completas;
- verificar que Home siga siendo un resumen y no duplique la guía.

## Criterio visual y accesibilidad

La guía usa fondos crema y rosados suaves, bordes dorados moderados y tipografía
display para la jerarquía editorial. Hay un único `h1`; los iconos decorativos
se ocultan a lectores de pantalla; los enlaces internos tienen foco visible y
los destinos usan `scroll-margin` para el header sticky. `Reveal` respeta
`prefers-reduced-motion`.

## SEO

La ruta define título y descripción propios, continúa siendo prerenderizable y
mantiene el contenido completo disponible en HTML.
