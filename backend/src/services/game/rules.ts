import crypto from 'crypto';
import { createGameInDb, findGameByIdInDb, updateGameInDb } from '@/utils/database';
import { auditLog } from '@/utils/logger';
import * as configService from '@/services/config';
import { Game, GuessResult } from './types';
import { BadRequestError, NotFoundError } from '@/utils/errors';

/**
 * @summary Inicia um novo jogo de adivinhação.
 * @description Obtém a configuração, gera um número aleatório seguro, salva o novo jogo e o retorna.
 * @returns {Promise<Game>} O objeto do novo jogo criado.
 * @throws {Error} Se o intervalo configurado for inválido.
 */
export async function startGame(): Promise<Game> {
  const { minRange, maxRange } = await configService.getConfig();

  if (minRange >= maxRange) {
    throw new Error('Falha na geração do número: O intervalo configurado é inválido (mínimo maior ou igual ao máximo).');
  }

  // Utiliza um gerador de números pseudoaleatórios criptograficamente seguro (CSPRNG)
  const secretNumber = crypto.randomInt(minRange, maxRange + 1);

  const newGame = await createGameInDb(secretNumber);

  // Registra a geração do número em um log de auditoria
  auditLog({
    sessionId: newGame.id,
    secretNumber: newGame.secretNumber,
    timestamp: newGame.createdAt.toISOString(),
  });

  return newGame;
}

/**
 * @summary Processa la tentativa de um usuário em um jogo existente.
 * @param {object} params - Os parâmetros para a tentativa.
 * @param {string} params.gameId - O ID do jogo.
 * @param {number} params.userGuess - O palpite do usuário.
 * @returns {Promise<GuessResult>} O resultado da tentativa.
 * @throws {NotFoundError} Se o jogo não for encontrado.
 * @throws {BadRequestError} Se o jogo já estiver finalizado ou o palpite for inválido.
 */
export async function makeGuess({ gameId, userGuess }: { gameId: string; userGuess: number }): Promise<GuessResult> {
  const game = await findGameByIdInDb(gameId);

  if (!game) {
    throw new NotFoundError('Jogo não encontrado.');
  }

  if (game.status === 'finished') {
    throw new BadRequestError('Este jogo já foi finalizado.');
  }

  // Validação de intervalo
  const { minRange, maxRange } = await configService.getConfig();
  if (userGuess < minRange || userGuess > maxRange) {
    throw new BadRequestError(`O número deve estar entre ${minRange} e ${maxRange}.`);
  }

  // A tentativa é válida, então processamos
  game.attempts += 1;
  game.guessHistory.push(userGuess);

  let feedback: 'maior' | 'menor' | 'correto';

  if (userGuess < game.secretNumber) {
    feedback = 'maior';
  } else if (userGuess > game.secretNumber) {
    feedback = 'menor';
  } else {
    feedback = 'correto';
    game.status = 'finished';
  }

  await updateGameInDb(game);

  return {
    feedback,
    attempts: game.attempts,
    status: game.status,
    guessHistory: game.guessHistory,
  };
}
