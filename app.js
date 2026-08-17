const catalogo = [
  { nombre: 'Teclado mecánico', precio: 1500.5, cantidad: 3, descuento: 0.1 },
  { nombre: 'Mouse inalámbrico', precio: 850, cantidad: 0, descuento: 0 },
  { nombre: 'Monitor 24', precio: 45000, cantidad: 5, descuento: 0.05 },
];

// Errores personalizados
class ProductoNoEncontradoError extends Error {
  constructor(nombreProducto) {
    super(`No se encontró ningún producto con el nombre ${nombreProducto}`);
    this.name = 'ProductoNoEncontradorError';
    this.nombreProducto = nombreProducto;
  }
}

class ProductoInvalidoError extends Error {
  constructor(mensaje, campo) {
    super(mensaje);
    this.name = 'ProductoInvalidoError';
    this.campo = campo;
  }
}

class StockInsuficienteError extends Error {
  constructor(nombreProducto, disponible, solicitado) {
    super(
      `Stock insuficiente para ${nombreProducto}: disponible ${disponible}, solicitado: ${solicitado}`,
    );
    this.name = 'StockInsuficienteError';
    this.disponible = disponible;
    this.solicitado = solicitado;
  }
}

function calcularTotalCatalogo(catalogo) {
  return catalogo.reduce((acumulado, { precio, cantidad }) => {
    return acumulado + precio * cantidad;
  }, 0);
}

function mostrarCatalogo(catalogo) {
  console.log('=== Catálogo de productos ===');
  catalogo.forEach(({ nombre, precio, cantidad }) => {
    console.log(
      `${nombre.trim()} | ${formatearPrecio(precio)} | stock: ${cantidad}`,
    );
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

function obtenerProductoPorNombre(catalogo, nombreBuscado) {
  const producto = catalogo.find(
    (producto) => producto.nombre === nombreBuscado,
  );

  if (!producto) {
    throw new ProductoNoEncontradoError(nombreBuscado);
  }

  return producto;
}

function validarProducto(producto) {
  const nombreValido =
    typeof producto?.nombre === 'string' && /\S/.test(producto.nombre);

  if (!nombreValido) {
    throw new ProductoInvalidoError(
      'El producto debe tener un nombre no vacío',
      'nombre',
    );
  }

  if (typeof producto.precio !== 'number' || producto.precio <= 0) {
    throw new ProductoInvalidoError(
      'El precio debe ser un número mayor a 0',
      'precio',
    );
  }

  if (!Number.isInteger(producto.cantidad) || producto.cantidad < 0) {
    throw new ProductoInvalidoError(
      'La cantidad debe ser un entero mayor o igual a 0',
      'cantidad',
    );
  }

  if (
    typeof producto.descuento !== 'number' ||
    producto.descuento < 0 ||
    producto.descuento > 1
  ) {
    throw new ProductoInvalidoError(
      'El descuento debe ser un número entre 0 y 1',
      'descuento',
    );
  }
}

function agregarProducto(catalogo, nuevoProducto) {
  validarProducto(nuevoProducto);
  return [...catalogo, nuevoProducto];
}

function eliminarProducto(catalogo, nombreBuscado) {
  return catalogo.filter((producto) => producto.nombre !== nombreBuscado);
}

function actualizarPrecio(catalogo, nombreBuscado, nuevoPrecio) {
  obtenerProductoPorNombre(catalogo, nombreBuscado);
  return catalogo.map((producto) =>
    producto.nombre === nombreBuscado
      ? { ...producto, precio: nuevoPrecio }
      : producto,
  );
}

function calcularSubtotal(precio, cantidad) {
  return precio * cantidad;
}

function calcularDescuento(subtotal, porcentaje = 0) {
  return subtotal * porcentaje;
}

function calcularTotal(subtotal, descuento) {
  return subtotal - descuento;
}

function formatearPrecio(valor) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(valor);
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

function manejarVenta(catalogo, nombreProducto, cantidadVendida) {
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
