const catalogo = [
  { nombre: 'Teclado mecánico', precio: 1500.5, cantidad: 3, descuento: 0.1 },
  { nombre: 'Mouse inalámbrico', precio: 850, cantidad: 0, descuento: 0 },
  { nombre: 'Monitor 24', precio: 45000, cantidad: 5, descuento: 0.05 },
];

function calcularTotalCatalogo(catalogo) {
  return catalogo.reduce((acumulado, { precio, cantidad }) => {
    return acumulado + precio * cantidad;
  }, 0);
}

function mostrarCatalogo(catalogo) {
  console.log('=== Catálogo de productos ===');
  catalogo.forEach(({ nombre, precio, cantidad }) => {
    console.log(`${nombre} | $${precio} | stock: ${cantidad}`);
  });
}

function buscarProductoPorNombre(catalogo, nombreBuscado) {
  return catalogo.findIndex((producto) => producto.nombre === nombreBuscado);
}

function obtenerProductosSinStock(catalogo) {
  return catalogo.filter(({ cantidad }) => cantidad === 0);
}

function productosOrdenadosPorPrecio(catalogo) {
  return [...catalogo].sort((a, b) => a.precio - b.precio);
}

function agregarProducto(catalogo, nuevoProducto) {
  return [...catalogo, nuevoProducto];
}

function eliminarProducto(catalogo, nombreBuscado) {
  return catalogo.filter((producto) => producto.nombre !== nombreBuscado);
}

function actualizarPrecio(catalogo, nombreBuscado, nuevoPrecio) {
  return catalogo.map((producto) =>
    producto.nombre === nombreBuscado
      ? { ...producto, precio: nuevoPrecio }
      : producto,
  );
}

function calcularSubtotal(precio, cantidad) {
  return (subtotal = precioProducto * cantidadProducto);
}

function calcularDescuento(subtotal, porcentaje = 0) {
  return subtotal * porcentaje;
}

function calcularTotal(subtotal, descuento) {
  return subtotal - descuento;
}

console.log(calcularTotalCatalogo(catalogo));
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
console.log(catalogo.length);
