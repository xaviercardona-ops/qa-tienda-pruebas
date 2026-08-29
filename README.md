# QA Tienda Escolar

Aplicación de práctica creada para el curso de **Plan de Pruebas de Software**. Es una tienda escolar sencilla (catálogo, carrito, descuentos, checkout) pensada para que el equipo de estudiantes diseñe un plan de pruebas a partir de los requisitos funcionales, ejecute las pruebas sobre la aplicación en línea y **categorice cada hallazgo como Error, Defecto o Falla**.

🔗 **Demo en línea:** https://qa-tienda-pruebas.vercel.app

## Cómo ejecutar el proyecto localmente

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Alcance funcional

La aplicación simula el flujo de compra de una tienda escolar: catálogo de productos, carrito de compras, código de descuento, cálculo de impuestos y confirmación de pedido. No tiene backend ni base de datos: todo el estado vive en el navegador (React + `localStorage`).

## Requisitos funcionales

| ID | Requisito |
|----|-----------|
| RF-01 | El sistema debe mostrar un catálogo de al menos 6 productos, cada uno con nombre, precio unitario y stock disponible. |
| RF-02 | El usuario debe poder agregar un producto al carrito indicando la cantidad deseada, sin superar el stock disponible de ese producto. |
| RF-03 | El usuario debe poder aumentar o disminuir la cantidad de un producto ya agregado al carrito, respetando el stock disponible y un mínimo de 1 unidad. |
| RF-04 | El usuario debe poder eliminar completamente un producto del carrito. |
| RF-05 | El sistema debe calcular el subtotal del carrito como la suma de (precio unitario × cantidad) de cada producto agregado. |
| RF-06 | El sistema debe permitir ingresar un código de descuento. Los códigos válidos son `DESC10` (10%) y `DESC20` (20%), aplicados sobre el subtotal. Solo se puede aplicar un código a la vez. |
| RF-07 | El sistema debe calcular el IVA (19%) sobre el valor del subtotal **después** de aplicar el descuento. |
| RF-08 | El sistema debe calcular y mostrar el total a pagar como: `subtotal − descuento + IVA`. |
| RF-09 | Antes de confirmar la compra, el sistema debe validar que el nombre, el correo electrónico (formato válido) y la dirección hayan sido diligenciados correctamente. |
| RF-10 | Al confirmar la compra, el sistema debe generar un número de pedido único, mostrar un resumen del pedido y vaciar el carrito para una nueva compra. |

## Ejercicio propuesto

1. A partir de los requisitos anteriores, diseñar un plan de pruebas (casos de prueba, datos de entrada, resultado esperado).
2. Ejecutar las pruebas sobre la demo en línea (o localmente).
3. Documentar cada hallazgo y clasificarlo como **Error**, **Defecto** o **Falla**, sustentando la clasificación.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS. Sin backend: el estado del carrito se persiste en `localStorage`.
