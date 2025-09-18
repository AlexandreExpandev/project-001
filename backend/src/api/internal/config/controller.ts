import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse } from '@/utils/apiResponse';
import { httpStatus } from '@/constants';
import * as configService from '@/services/config';

const updateConfigSchema = z.object({
  min_range_setting: z.number().int({ message: 'O valor mínimo deve ser um número inteiro.' }),
  max_range_setting: z.number().int({ message: 'O valor máximo deve ser um número inteiro.' }),
});

/**
 * @summary Manipulador para obter a configuração do jogo.
 * @api {get} /api/internal/config/game
 * @apiName GetGameConfig
 * @apiGroup Config
 */
export async function getHandler(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const config = await configService.getConfig();
    // Mapeia para o nome esperado pelo frontend
    const responsePayload = {
      min_range_setting: config.minRange,
      max_range_setting: config.maxRange,
    };
    res.status(httpStatus.OK).json(successResponse(responsePayload));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary Manipulador para atualizar a configuração do jogo.
 * @api {put} /api/internal/config/game
 * @apiName UpdateGameConfig
 * @apiGroup Config
 */
export async function putHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { min_range_setting, max_range_setting } = updateConfigSchema.parse(req.body);

    const updatedConfig = await configService.updateConfig({
      minRange: min_range_setting,
      maxRange: max_range_setting,
    });

    // Mapeia para o nome esperado pelo frontend
    const responsePayload = {
      min_range_setting: updatedConfig.minRange,
      max_range_setting: updatedConfig.maxRange,
    };

    res.status(httpStatus.OK).json(successResponse(responsePayload));
  } catch (error) {
    next(error);
  }
}
