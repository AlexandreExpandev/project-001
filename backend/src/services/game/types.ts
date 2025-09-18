/**
 * @summary Representa o estado de um jogo.
 */
export interface Game {
  id: string;
  secretNumber: number;
  attempts: number;
  status: 'in-progress' | 'finished';
  createdAt: Date;
  guessHistory: number[];
}

/**
 * @summary Representa o resultado de uma tentativa.
 */
export interface GuessResult {
  feedback: 'maior' | 'menor' | 'correto';
  attempts: number;
  status: 'in-progress' | 'finished';
  guessHistory: number[];
}
