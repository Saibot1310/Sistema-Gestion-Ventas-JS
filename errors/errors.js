export class ProductoNoEncontradoError extends Error {
  constructor(nombreProducto) {
    super(`No se encontró ningún producto con el nombre ${nombreProducto}`);
    this.name = 'ProductoNoEncontradorError';
    this.nombreProducto = nombreProducto;
  }
}

export class ProductoInvalidoError extends Error {
  constructor(mensaje, campo) {
    super(mensaje);
    this.name = 'ProductoInvalidoError';
    this.campo = campo;
  }
}

export class StockInsuficienteError extends Error {
  constructor(nombreProducto, disponible, solicitado) {
    super(
      `Stock insuficiente para ${nombreProducto}: disponible ${disponible}, solicitado: ${solicitado}`,
    );
    this.name = 'StockInsuficienteError';
    this.disponible = disponible;
    this.solicitado = solicitado;
  }
}