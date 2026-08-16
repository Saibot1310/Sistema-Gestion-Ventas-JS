// Representación mínima de un producto
const nombreProducto = "Teclado mecánico";
const precioProducto = 1500.50;
const cantidadProducto = 3;
const descuentoProducto = 0.10;

// Cálculos de negocio
const subtotal = precioProducto * cantidadProducto;
const montoDescuento = subtotal * descuentoProducto;
const total = subtotal - montoDescuento;

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
console.log("Total a pagar:", total);