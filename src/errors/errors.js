export class ErrorDominio extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = this.constructor.name;
  }
}

export class ProductoNoEncontradoError extends ErrorDominio {
  constructor(nombreProducto) {
    super(`No se encontró ningún producto con el nombre ${nombreProducto}`);
    this.nombreProducto = nombreProducto;
  }
}

export class ProductoInvalidoError extends ErrorDominio {
  constructor(mensaje, campo) {
    super(mensaje);
    this.campo = campo;
  }
}

export class StockInsuficienteError extends ErrorDominio {
  constructor(nombreProducto, disponible, solicitado) {
    super(
      `Stock insuficiente para ${nombreProducto}: disponible ${disponible}, solicitado: ${solicitado}`,
    );
    this.disponible = disponible;
    this.solicitado = solicitado;
  }
}