/**
 * @summary Interface para uma resposta de sucesso padronizada.
 */
interface SuccessResponse<T> {
  success: true;
  data: T;
  metadata?: Record<string, unknown>;
}

/**
 * @summary Interface para uma resposta de erro padronizada.
 */
interface ErrorResponse {
  success: false;
  error: {
    message: string;
    details?: unknown;
  };
}

/**
 * @summary Cria um objeto de resposta de sucesso padronizado.
 * @param data Os dados a serem enviados na resposta.
 * @param metadata Metadados adicionais (opcional).
 * @returns Um objeto de resposta de sucesso.
 */
export function successResponse<T>(data: T, metadata?: Record<string, unknown>): SuccessResponse<T> {
  return {
    success: true,
    data,
    ...(metadata && { metadata }),
  };
}

/**
 * @summary Cria um objeto de resposta de erro padronizado.
 * @param message A mensagem de erro principal.
 * @param details Detalhes adicionais sobre o erro (opcional).
 * @returns Um objeto de resposta de erro.
 */
export function errorResponse(message: string, details?: unknown): ErrorResponse {
  return {
    success: false,
    error: {
      message,
      ...(details && { details }),
    },
  };
}
