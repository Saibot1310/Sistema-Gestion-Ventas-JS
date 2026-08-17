import { ProductoNoEncontradoError, StockInsuficienteError } from '../errors/errors.js';
import { obtenerProductoPorNombre } from '../products/products.js';
import formatearPrecio from '../helpers/formatPrice.js';

function calcularSubtotal(precio, cantidad) {
  return precio * cantidad;
}

function calcularDescuento(subtotal, porcentaje = 0) {
  return subtotal * porcentaje;
}

function calcularTotal(subtotal, descuento) {
  return subtotal - descuento;
}

function procesarVenta(catalogo, nombreProducto, cantidadVendida) {
  const producto = obtenerProductoPorNombre(catalogo, nombreProducto);

  if (cantidadVendida > producto.cantidad) {
    throw new StockInsuficienteError(
      nombreProducto,
      producto.cantidad,
      cantidadVendida,
    );
  }

  const subtotal = calcularSubtotal(producto.precio, cantidadVendida);
  const descuento = calcularDescuento(subtotal, producto.descuento);
  const total = calcularTotal(subtotal, descuento);

  const venta = {
    producto: producto.nombre,
    cantidadVendida,
    subtotal,
    descuento,
    total,
  };

  const catalogoActualizado = catalogo.map((producto) => 
    producto.nombre === nombreProducto
      ? { ...producto, cantidad: producto.cantidad - cantidadVendida }
      : producto
  );
  return { venta, catalogoActualizado };
}

export function manejarVenta(catalogo, nombreProducto, cantidadVendida) {
  try {
    const { venta, catalogoActualizado } = procesarVenta(
      catalogo,
      nombreProducto,
      cantidadVendida,
    );
    console.log(
      `Venta registrada: ${venta.producto} x ${venta.cantidadVendida} -> ${formatearPrecio(venta.total)}`,
    );
    return catalogoActualizado;
  } catch (error) {
    if (error instanceof ProductoNoEncontradoError) {
      console.log(`No se pudo vender: ${error.message}`);
    } else if (error instanceof StockInsuficienteError) {
      console.log(`No se pudo vender: ${error.message}`);
    } else {
      console.log('Ocurrió un error inesperado al procesar la venta.');
      throw error;
    }
    return catalogo;
  } finally {
    console.log('Intento de venta finalizado');
  }
}