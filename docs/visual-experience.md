# Experiencia visual de Soluna

## Principios

La interfaz mantiene una estética clara, femenina y minimalista. El espacio en
blanco, la tipografía display y los acentos rosados y dorados construyen
jerarquía; las sombras y el movimiento solo aportan profundidad y feedback.

## Tokens

Los tokens viven en `src/app/globals.css` y se exponen a Tailwind:

- Radios: `soluna-sm` (8 px), `soluna` (14 px) y `soluna-lg` (24 px).
- Sombras: `shadow-card`, `shadow-soft` y `shadow-lift`.
- Duraciones: `fast` (180 ms), `standard` (300 ms) y `slow` (520 ms).
- Easing: `ease-soluna`, sin rebotes.
- El foco usa siempre un contorno visible basado en `--ring`.

## Botones

- `primary`: acción principal, fondo oscuro y elevación delicada.
- `secondary`: superficie clara con borde, para acciones complementarias.
- `outline`: menor énfasis sobre fondos variados.
- `ghost`: navegación o acciones terciarias.
- `whatsapp`: acción de contacto reconocible y con contraste accesible.
- `IconButton`: objetivo táctil circular de 48 px.

Todos tienen estados hover, active, focus-visible y disabled. Un botón con
destino y estado disabled no genera un enlace navegable.

## Movimiento

`Reveal` utiliza Intersection Observer una sola vez y anima únicamente opacity y
transform. El contenido se entrega visible desde el servidor y permanece visible
si JavaScript falla. Se aplica a bloques completos, no a cada fragmento de
texto.

`prefers-reduced-motion: reduce` elimina desplazamientos, animaciones y scroll
suave globalmente.

## Componentes

Las tarjetas usan radio grande, sombra progresiva y elevación máxima de 4 px.
Los badges distinguen estados normales, ofertas y alertas. Los formularios usan
controles de 48 px, labels visibles y focus ring. `EmptyState`, placeholder,
galería, precio y stock comparten los mismos tokens.

## Reglas para futuras secciones

- Reutilizar variantes y tokens antes de agregar clases nuevas.
- Mantener targets táctiles de al menos 44 px.
- No esconder información esencial detrás de hover.
- Animar bloques con moderación y evitar width, height, top o left.
- Probar teclado, 320 px, tablet y desktop, además de reduced motion.
- No agregar skeletons a contenido estático.

## Firma premium y frases de marca

En el hero, `SOLUNA` funciona como firma tipográfica en mayúsculas. El gradiente
combina dorado profundo, champagne y marrón dorado; siempre conserva un color de
respaldo con contraste antes de aplicar `background-clip`.

La frase “Joyas que cuentan tu historia” es el `h1`. Solo “tu historia” recibe
cursiva y dorado, acompañada por una línea breve. Los efectos metálicos deben:

- reservarse para una pieza dominante por sección;
- evitar amarillo saturado, neón, brillos continuos y sombras duras;
- conservar texto legible sin depender del gradiente;
- limitar el movimiento a una entrada breve y respetar reduced motion.
