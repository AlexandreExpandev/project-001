import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { errorResponse } from '@/utils/apiResponse';
import { httpStatus } from '@/constants';
import { AppError } from '@/utils/errors';

/**
 * @summary Middleware global para tratamento de erros.
 * Captura erros lançados na aplicação e envia uma resposta padronizada.
 */
export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error(err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json(errorResponse(err.message));
    return;
  }

  if (err instanceof ZodError) {
    res.status(httpStatus.BAD_REQUEST).json(errorResponse('Erro de validação.', { details: err.errors }));
    return;
  }

  // Erro genérico
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errorResponse('Ocorreu um erro interno no servidor.'));
}
