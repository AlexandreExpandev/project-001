import { apiClient } from '@/utils/api';
import { API_ENDPOINTS } from '@/constants';
import type { GameConfig } from '@/types';

/**
 * @service getConfig
 * @description Busca a configuração atual do jogo no backend.
 * @returns {Promise<GameConfig>} Uma promessa que resolve com a configuração do jogo.
 */
export const getConfig = async (): Promise<GameConfig> => {
  const response = await apiClient.get<GameConfig>(API_ENDPOINTS.CONFIG_GAME);
  return response.data;
};

/**
 * @service updateConfig
 * @description Atualiza a configuração do jogo no backend.
 * @param {GameConfig} config - O objeto de configuração com os novos valores.
 * @returns {Promise<GameConfig>} Uma promessa que resolve com a configuração atualizada.
 */
export const updateConfig = async (config: GameConfig): Promise<GameConfig> => {
  const response = await apiClient.put<GameConfig>(API_ENDPOINTS.CONFIG_GAME, config);
  return response.data;
};
