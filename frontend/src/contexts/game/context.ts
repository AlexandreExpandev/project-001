import { createContext, useContext } from 'react';
import type { GameContextType } from './types';

const GameContext = createContext<GameContextType | undefined>(undefined);

/**
 * @hook useGameContext
 * @description Hook para acessar o contexto do jogo. Deve ser usado dentro de um GameProvider.
 * @throws {Error} Se usado fora de um GameProvider.
 * @returns {GameContextType} O valor do contexto do jogo.
 */
export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export const GameProviderInternal = GameContext.Provider;
