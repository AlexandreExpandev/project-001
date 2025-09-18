import { apiClient } from '@/utils/api';
import { API_ENDPOINTS } from '@/constants';
import type { StartGameResponse, GuessResult } from '@/types/game';

/**
 * @service startGame
 * @description Inicia um novo jogo no backend.
 * @returns {Promise<StartGameResponse>} Uma promessa que resolve com o ID do novo jogo.
 */
export const startGame = async (): Promise<StartGameResponse> => {
  const response = await apiClient.post<StartGameResponse>(API_ENDPOINTS.GAME);
  return response.data;
};

/**
 * @service makeGuess
 * @description Envia um palpite para um jogo existente.
 * @param {string} gameId - O ID do jogo.
 * @param {number} guess - O número do palpite.
 * @returns {Promise<GuessResult>} Uma promessa que resolve com o resultado do palpite.
 */
export const makeGuess = async (gameId: string, guess: number): Promise<GuessResult> => {
  const response = await apiClient.post<GuessResult>(API_ENDPOINTS.GUESS(gameId), { guess });
  return response.data;
};
