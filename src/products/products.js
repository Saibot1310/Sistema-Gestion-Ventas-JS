import { ProductoInvalidoError, ProductoNoEncontradoError } from '../errors/errors.js';
import validarProducto from '../validations/validations.js';
import formatearPrecio from '../helpers/formatPrice.js';

export const catalogo = [
  { nombre: 'Teclado mecánico', precio: 1500.5, cantidad: 3, descuento: 0.1 },
  { nombre: 'Mouse inalámbrico', precio: 850, cantidad: 0, descuento: 0 },
  { nombre: 'Monitor 24', precio: 45000, cantidad: 5, descuento: 0.05 },
];

export function calcularTotalCatalogo(catalogo) {
  return catalogo.reduce((acumulado, { precio, cantidad }) => {
    return acumulado + precio * cantidad;
  }, 0);
}

export function mostrarCatalogo(catalogo) {
  console.log('=== Catálogo de productos ===');
  catalogo.forEach(({ nombre, precio, cantidad }) => {
    console.log(
      `${nombre.trim()} | ${formatearPrecio(precio)} | stock: ${cantidad}`,
    );
  });
}

export function buscarProductoPorNombre(catalogo, nombreBuscado) {
  return catalogo.findIndex((producto) => producto.nombre === nombreBuscado);
}

export function obtenerProductosSinStock(catalogo) {
  return catalogo.filter(({ cantidad }) => cantidad === 0);
}

export function productosOrdenadosPorPrecio(catalogo) {
  return [...catalogo].sort((a, b) => a.precio - b.precio);
}

export function obtenerProductoPorNombre(catalogo, nombreBuscado) {
  const producto = catalogo.find(
    (producto) => producto.nombre === nombreBuscado,
  );

  if (!producto) {
    throw new ProductoNoEncontradoError(nombreBuscado);
  }

  return producto;
}

export function agregarProducto(catalogo, nuevoProducto) {
  validarProducto(nuevoProducto);
  return [...catalogo, nuevoProducto];
}

export function deserializarProducto(textoJSON) {
  let producto;

  try {
    producto = JSON.parse(textoJSON);
  } catch (error) {
    throw new ProductoInvalidoError(`El texto recibido no es JSON válido: ${error.message}`, 'json');
  }

  validarProducto(producto);
  return producto;
}