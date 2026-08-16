// Representación mínima de un producto
const nombreProducto = "Teclado mecánico";
const precioProducto = 1500.50;
const cantidadProducto = 3;
const descuentoProducto = 0.10;

// Cálculos de negocio
const subtotal = precioProducto * cantidadProducto;
const montoDescuento = subtotal * descuentoProducto;
const total = subtotal - montoDescuento;

// Validaciones como valores booleanos
const precioValido = precioProducto > 0;
const hayStock = cantidadProducto > 0;

// Combinación lógica de validaciones
const productoDisponible = precioValido && hayStock;

// Representación de los datos de un producto
console.log("=== Producto registrado ===");
console.log("Nombre:", nombreProducto);
console.log("Precio:", precioProducto);
console.log("Cantidad:", cantidadProducto);
console.log("Descuento:", descuentoProducto);

// Cálculos realizados
console.log("=== Cálculo ===");
console.log("Subtotal:", subtotal);
console.log("Monto descuento:", montoDescuento);
console.log("Total:", total);

// Validaciones
console.log("=== Validaciones ===");
console.log("¿El precio es válido?:", precioValido);
console.log("¿Hay stock?:", hayStock);

// Validación conjunta
console.log("¿El producto está disponible para la venta?", productoDisponible);

// Mensaje de estado
const estadoProducto = productoDisponible
  ? "Disponible para la venta"
  : "No disponible";
console.log("Estado:", estadoProducto);

// Procesamiento de la venta
if (productoDisponible) {
  console.log("Procesando venta...");
  console.log(`Se vendieron ${cantidadProducto} unidades de "${nombreProducto}"`);
  console.log(`Total a cobrar $${total}}`);
} else {
  console.log("Venta rechazada");
}

if (!precioValido) {
  console.log("Motivo: el precio no es válido");
} else if (!hayStock) {
  console.log("Motivo: no hay stock disponible");
}