export type GameStatus = 'in-progress' | 'finished';

/**
 * @type StartGameResponse
 * @description A resposta da API ao iniciar um novo jogo.
 */
export type StartGameResponse = {
  gameId: string;
};

/**
 * @type GuessResult
 * @description O resultado de uma tentativa, retornado pela API.
 */
export type GuessResult = {
  feedback: 'maior' | 'menor' | 'correto';
  attempts: number;
  status: GameStatus;
  guessHistory: number[];
};
