import { GuessResult, GameStatus } from '@/types/game';

export type GameState = {
  gameId: string | null;
  attempts: number;
  status: GameStatus;
  feedback: GuessResult['feedback'] | null;
  guessHistory: number[];
  error: string | null;
  minRange: number;
  maxRange: number;
};

export type GameContextType = {
  gameState: GameState;
  isLoading: boolean;
  startGame: () => Promise<void>;
  makeGuess: (guess: number) => Promise<void>;
};

export type GameProviderProps = {
  children: React.ReactNode;
};
