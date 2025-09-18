import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse } from '@/utils/apiResponse';
import { httpStatus } from '@/constants';
import * as gameService from '@/services/game';

const guessSchema = z.object({
  guess: z.number().int(),
});

const paramsSchema = z.object({
  id: z.string(),
});

/**
 * @summary Manipulador para submeter uma tentativa (palpite).
 * @description Valida o palpite e o ID do jogo, processa a tentativa e retorna o feedback.
 * @api {post} /api/internal/game/:id/guess
 * @apiName MakeGuess
 * @apiGroup Game
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = paramsSchema.parse(req.params);
    const { guess } = guessSchema.parse(req.body);

    const result = await gameService.makeGuess({ gameId: id, userGuess: guess });

    res.status(httpStatus.OK).json(successResponse(result));
  } catch (error) {
    next(error);
  }
}
