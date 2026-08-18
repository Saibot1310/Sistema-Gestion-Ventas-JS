import {
  catalogo,
  calcularTotalCatalogo,
  mostrarCatalogo,
  buscarProductoPorNombre,
  obtenerProductosSinStock,
  productosOrdenadosPorPrecio,
  agregarProducto,
  deserializarProducto
} from './products/products.js';

import { manejarVenta } from './sales/sales.js';
import formatearPrecio from './helpers/formatPrice.js';

console.log(formatearPrecio(calcularTotalCatalogo(catalogo)));
mostrarCatalogo(catalogo);
console.log(buscarProductoPorNombre(catalogo, 'Mouse inalámbrico'));
console.log(obtenerProductosSinStock(catalogo));
console.log(productosOrdenadosPorPrecio(catalogo));

const catalogoConNuevo = agregarProducto(catalogo, {
  nombre: 'Auriculares',
  precio: 3000,
  cantidad: 2,
  descuento: 0,
});
console.log(catalogoConNuevo.length === catalogo.length + 1);

// Ejemplo: agregar un producto inválido (se captura el error)
try {
  agregarProducto(catalogo, {
    nombre: '',
    precio: -10,
    cantidad: 1.5,
    descuento: 2,
  });
} catch (error) {
  console.log(`No se pudo agregar el producto: ${error.message}`);
}

// Ejemplo: venta exitosa
const catalogoTrasVenta = manejarVenta(catalogo, 'Teclado mecánico', 2);
mostrarCatalogo(catalogoTrasVenta);

// Ejemplo: venta fallida por stock insuficiente
manejarVenta(catalogo, 'Mouse inalámbrico', 1);

// Ejemplo: venta fallida por producto inexistente
manejarVenta(catalogo, 'Webcam', 1);

// Ejemplo: recibir un producto externo como JSON e incorporarlo
const productoExternoJSON = '{"nombre":"Webcam HD","precio":8500,"cantidad":4,"descuento":0}';
try {
  const productoExterno = deserializarProducto(productoExternoJSON);
  const catalogoConExterno = agregarProducto(catalogo, productoExterno);
  console.log(`Producto incorporado desde JSON. Catálogo ahora tiene ${catalogoConExterno.length} productos.`);
} catch (error) {
  console.log(`No se pudo incorporar el producto externo: ${error.message}`);
}