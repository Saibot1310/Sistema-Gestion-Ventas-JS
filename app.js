// Representación mínima de un producto
const nombreProducto = 'Teclado mecánico';
const precioProducto = 1500.5;
const cantidadProducto = 3;
const descuentoProducto = 0.1;

// Cálculos de negocio

function calcularSubtotal(precio, cantidad) {
  return (subtotal = precioProducto * cantidadProducto);
}

function calcularDescuento(subtotal, porcentaje = 0) {
  return subtotal * porcentaje;
}

function calcularTotal(subtotal, descuento) {
  return subtotal - descuento;
}

// Validaciones con funciones
const validarPrecio = (precio) => precio > 0;
const hayStockDisponible = (cantidad) => cantidad > 0;
const determinarDisponibilidad = (precioValido, hayStock) =>
  precioValido && hayStock;

const obtenerEstadoProducto = (disponible) =>
  disponible ? 'Disponible para la venta' : 'No disponible';
function prepararEnvio(nombre, cantidad) {
  console.log('=== Detalle de envio ===');
  for (let unidad = 1; unidad <= cantidadProducto; unidad++) {
    console.log(`Preparando unidad ${unidad} de ${cantidadProducto}...`);
  }
}

// Orquestador
function procesarVenta(nombre, precio, cantidad, descuentoPorcentaje) {
  const precioValido = validarPrecio(precio);
  const stockOk = hayStockDisponible(cantidad);
  const disponible = determinarDisponibilidad(precioValido, stockOk);

  console.log('=== Producto registrado ===');
  console.log('Nombre:', nombre);
  console.log('Precio:', precio);
  console.log('Cantidad:', cantidad);
  console.log('Descuento:', descuentoPorcentaje);

  const subtotal = calcularSubtotal(precio, cantidad);
  const descuento = calcularDescuento(subtotal, descuentoPorcentaje);
  const total = calcularTotal(subtotal, descuento);

  console.log('=== Cálculo ===');
  console.log('Subtotal:', subtotal);
  console.log('Monto descuento:', descuento);
  console.log('Total:', total);
  
  console.log('=== Validaciones ===');
  console.log('¿El precio es válido?:', precioValido);
  console.log('¿Hay stock?:', stockOk);
  console.log("Estado:", obtenerEstadoProducto(disponible));

  console.log("=== Procesamiento ===");
  if (disponible) {
    console.log("Procesando venta...");
    console.log(`Se vendieron ${cantidad} unidades de "${nombre}"`);
    console.log(`Total a cobrar $${total}`);
  }
}

procesarVenta(
  nombreProducto,
  precioProducto,
  cantidadProducto,
  descuentoProducto
);