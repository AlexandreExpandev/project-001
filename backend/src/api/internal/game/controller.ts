import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/utils/apiResponse';
import { httpStatus } from '@/constants';
import * as gameService from '@/services/game';

/**
 * @summary Manipulador para criar um novo jogo.
 * @description Inicia um novo jogo e retorna seu ID.
 * @api {post} /api/internal/game
 * @apiName CreateGame
 * @apiGroup Game
 */
export async function postHandler(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const newGame = await gameService.startGame();
    res.status(httpStatus.CREATED).json(successResponse({ gameId: newGame.id }));
  } catch (error) {
    next(error);
  }
}
