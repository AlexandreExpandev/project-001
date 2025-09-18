/**
 * @type ApiResponse
 * @description Estrutura genérica para respostas da API, baseada no backend.
 */
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: {
    message: string;
    details?: unknown;
  };
};
