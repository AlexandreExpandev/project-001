/**
 * @summary Classe base para erros customizados da aplicação.
 */
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

/**
 * @summary Erro para requisições inválidas (HTTP 400).
 */
export class BadRequestError extends AppError {
  constructor(message: string = 'Requisição inválida.') {
    super(message, 400);
  }
}

/**
 * @summary Erro para recursos não encontrados (HTTP 404).
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Recurso não encontrado.') {
    super(message, 404);
  }
}
