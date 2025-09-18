import { Request, Response } from 'express';
import { errorResponse } from '@/utils/apiResponse';
import { httpStatus } from '@/constants';

/**
 * @summary Middleware para tratar requisições a rotas não encontradas (404).
 */
export function notFoundMiddleware(_req: Request, res: Response): void {
  res.status(httpStatus.NOT_FOUND).json(errorResponse('A rota solicitada não foi encontrada.'));
}
