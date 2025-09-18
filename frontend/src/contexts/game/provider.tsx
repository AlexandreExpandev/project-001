'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import * as gameService from '@/services/game';
import * as configService from '@/services/config';
import { GameProviderInternal } from './context';
import type { GameProviderProps, GameState } from './types';

const INITIAL_GAME_STATE: GameState = {
  gameId: null,
  attempts: 0,
  status: 'finished',
  feedback: null,
  guessHistory: [],
  error: null,
  minRange: 1, // Default value
  maxRange: 100, // Default value
};

/**
 * @provider GameProvider
 * @description Provedor de estado para o jogo GuessNumber.
 */
export const GameProvider = ({ children }: GameProviderProps) => {
  // #region States
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [isLoading, setIsLoading] = useState(true); // True on initial load for config fetching
  // #endregion

  // #region Effects
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await configService.getConfig();
        setGameState(prevState => ({
          ...prevState,
          minRange: config.min_range_setting,
          maxRange: config.max_range_setting,
          error: null,
        }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Falha ao carregar a configuração do jogo.';
        setGameState(prevState => ({ ...prevState, error: errorMessage }));
        console.error('Failed to fetch config:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);
  // #endregion

  // #region Callbacks
  const startGame = useCallback(async () => {
    setIsLoading(true);
    try {
      const { gameId } = await gameService.startGame();
      setGameState(prevState => ({
        ...prevState, // Keep minRange and maxRange
        gameId,
        attempts: 0,
        status: 'in-progress',
        feedback: null,
        guessHistory: [],
        error: null,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Falha ao iniciar um novo jogo.';
      setGameState(prevState => ({ ...prevState, error: errorMessage }));
      console.error('Failed to start game:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const makeGuess = useCallback(async (guess: number) => {
    if (!gameState.gameId) return;

    setIsLoading(true);
    try {
      const result = await gameService.makeGuess(gameState.gameId, guess);
      setGameState(prevState => ({
        ...prevState,
        attempts: result.attempts,
        status: result.status,
        feedback: result.feedback,
        guessHistory: result.guessHistory,
        error: null, // Clear previous errors on success
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro ao enviar o palpite.';
      setGameState(prevState => ({ ...prevState, error: errorMessage }));
      console.error('Failed to make guess:', error);
    } finally {
      setIsLoading(false);
    }
  }, [gameState.gameId]);
  // #endregion

  // #region Memos
  const contextValue = useMemo(() => ({
    gameState,
    isLoading,
    startGame,
    makeGuess,
  }), [gameState, isLoading, startGame, makeGuess]);
  // #endregion

  return (
    <GameProviderInternal value={contextValue}>
      {children}
    </GameProviderInternal>
  );
};
