import { ProductoInvalidoError } from '../errors/errors.js'

export default function validarProducto(producto) {
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