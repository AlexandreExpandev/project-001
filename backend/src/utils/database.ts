import { Game } from '@/services/game/types';
import { GameConfig } from '@/services/config/types';

/**
 * @summary Simulação de um banco de dados em memória para o jogo.
 * Em uma aplicação real, isso seria substituído por uma conexão com o SQL Server.
 */
const games: Map<string, Game> = new Map();
let gameIdCounter = 0;

// Simulação do armazenamento de configuração
let gameConfig: GameConfig = {
  minRange: 1,
  maxRange: 100,
};

/**
 * @summary Simula a criação de um novo jogo no banco de dados.
 * @param secretNumber O número secreto do jogo.
 * @returns O objeto do jogo criado.
 */
export async function createGameInDb(secretNumber: number): Promise<Game> {
  gameIdCounter++;
  const newGame: Game = {
    id: gameIdCounter.toString(),
    secretNumber,
    attempts: 0,
    status: 'in-progress',
    createdAt: new Date(),
    guessHistory: [],
  };
  games.set(newGame.id, newGame);
  return newGame;
}

/**
 * @summary Simula a busca de um jogo pelo ID no banco de dados.
 * @param id O ID do jogo.
 * @returns O objeto do jogo ou null se não encontrado.
 */
export async function findGameByIdInDb(id: string): Promise<Game | null> {
  const game = games.get(id);
  return game || null;
}

/**
 * @summary Simula a atualização de um jogo no banco de dados.
 * @param game O objeto do jogo com os dados atualizados.
 * @returns O objeto do jogo atualizado.
 */
export async function updateGameInDb(game: Game): Promise<Game> {
  if (!games.has(game.id)) {
    throw new Error('Jogo não encontrado para atualização.');
  }
  games.set(game.id, game);
  return game;
}

/**
 * @summary Simula a obtenção da configuração do jogo do banco de dados.
 * @returns A configuração atual do jogo.
 */
export async function getGameConfigFromDb(): Promise<GameConfig> {
  // Em um sistema real, isso leria de uma tabela 'config' ou arquivo.
  // O cache seria implementado no serviço que chama esta função.
  return Promise.resolve(gameConfig);
}

/**
 * @summary Simula a atualização da configuração do jogo no banco de dados.
 * @param newConfig A nova configuração a ser salva.
 * @returns A configuração atualizada.
 */
export async function updateGameConfigInDb(newConfig: GameConfig): Promise<GameConfig> {
  // Em um sistema real, isso atualizaria uma tabela 'config'.
  gameConfig = newConfig;
  return Promise.resolve(gameConfig);
}
