import { getGameConfigFromDb, updateGameConfigInDb } from '@/utils/database';
import { GameConfig } from './types';

// Simulação de um cache em memória para a configuração.
let configCache: GameConfig | null = null;
const CACHE_TTL = 60000; // 1 minuto
let cacheTimestamp: number = 0;

/**
 * @summary Obtém a configuração atual do intervalo do jogo.
 * @description Utiliza um cache em memória para otimizar a leitura.
 * @returns {Promise<GameConfig>} A configuração do jogo.
 */
export async function getConfig(): Promise<GameConfig> {
  const now = Date.now();
  if (configCache && (now - cacheTimestamp < CACHE_TTL)) {
    return configCache;
  }

  const configFromDb = await getGameConfigFromDb();
  configCache = configFromDb;
  cacheTimestamp = now;
  return configCache;
}

/**
 * @summary Atualiza a configuração do intervalo do jogo.
 * @param {object} params - Os parâmetros para a atualização.
 * @param {number} params.minRange - O novo valor mínimo.
 * @param {number} params.maxRange - O novo valor máximo.
 * @returns {Promise<GameConfig>} A configuração atualizada.
 * @throws {Error} Se a validação falhar (ex: min >= max).
 */
export async function updateConfig({ minRange, maxRange }: { minRange: number; maxRange: number }): Promise<GameConfig> {
  if (minRange >= maxRange) {
    throw new Error('Intervalo inválido: O valor mínimo deve ser menor que o valor máximo.');
  }

  const updatedConfig = await updateGameConfigInDb({ minRange, maxRange });

  // Invalida o cache
  configCache = updatedConfig;
  cacheTimestamp = Date.now();

  return updatedConfig;
}
