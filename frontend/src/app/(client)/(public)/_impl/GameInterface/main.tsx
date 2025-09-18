'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { useGameContext } from '@/contexts/game';
import { GuessHistory } from '../GuessHistory';
import { gameInterfaceVariant } from './variants';

/**
 * @component GameInterface
 * @description A interface principal para o jogo de adivinhação de números.
 *
 * @returns {JSX.Element} A interface do jogo renderizada.
 */
export const GameInterface = () => {
  // #region Contexts
  const {
    gameState,
    startGame,
    makeGuess,
    isLoading,
  } = useGameContext();
  // #endregion

  // #region States
  const [currentGuess, setCurrentGuess] = useState('');
  const [clientError, setClientError] = useState<string | null>(null);
  // #endregion
  
  // #region Memos
  const isGameFinished = gameState.status === 'finished';
  const isGameInProgress = gameState.status === 'in-progress';
  const displayError = clientError || gameState.error;
  const descriptionText = `Eu escolhi um número entre ${gameState.minRange} e ${gameState.maxRange}. Tente adivinhar!`;
  // #endregion

  // #region Handlers
  const handleGuessChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Limpa erros ao digitar
    if (clientError) setClientError(null);
    
    // Permite apenas números inteiros no input
    if (/^\d*$/.test(value)) {
      setCurrentGuess(value);
    }
  }, [clientError]);

  const handleSubmitGuess = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setClientError(null);

    const guessNumber = parseInt(currentGuess, 10);
    if (isNaN(guessNumber)) {
      setClientError('Entrada inválida. Por favor, insira um número inteiro.');
      return;
    }

    if (guessNumber < gameState.minRange || guessNumber > gameState.maxRange) {
      setClientError(`O número deve estar entre ${gameState.minRange} e ${gameState.maxRange}.`);
      return;
    }

    await makeGuess(guessNumber);
    setCurrentGuess('');
  }, [currentGuess, makeGuess, gameState.minRange, gameState.maxRange]);

  const handleStartNewGame = useCallback(async () => {
    await startGame();
    setCurrentGuess('');
    setClientError(null);
  }, [startGame]);
  // #endregion

  // #region Effects
  // Limpa o erro do cliente se um erro de API aparecer
  useEffect(() => {
    if (gameState.error && clientError) {
      setClientError(null);
    }
  }, [gameState.error, clientError]);
  // #endregion

  // #region Styles
  const styles = gameInterfaceVariant();
  // #endregion

  // #region Renderers
  const renderFeedback = () => {
    if (!gameState.feedback || displayError) return null;

    let message = '';
    if (gameState.feedback === 'maior') message = 'O número secreto é MAIOR!';
    if (gameState.feedback === 'menor') message = 'O número secreto é MENOR!';
    if (gameState.feedback === 'correto') message = `Parabéns! Você acertou em ${gameState.attempts} tentativas!`;

    return <p className={styles.feedback({ feedback: gameState.feedback })}>{message}</p>;
  };
  // #endregion

  return (
    <Card // wrapper
      className={styles.wrapper()}
    >
      <h1 // title
        className={styles.title()}
      >
        Adivinhe o Número
      </h1>
      <p // description
        className={styles.description()}
      >
        {isLoading && !gameState.gameId ? 'Carregando configurações...' : descriptionText}
      </p>

      {isGameInProgress && (
        <form // gameForm
          onSubmit={handleSubmitGuess} 
          className={styles.gameForm()}
        >
          <Input // guessInput
            nativeProps={{
              type: 'number',
              placeholder: 'Seu palpite',
              value: currentGuess,
              onChange: handleGuessChange,
              disabled: isLoading,
              autoFocus: true,
              min: gameState.minRange,
              max: gameState.maxRange,
            }}
          />
          <Button // submitButton
            nativeProps={{
              type: 'submit',
              disabled: isLoading || !currentGuess,
            }}
            variant="primary"
          >
            {isLoading ? 'Enviando...' : 'Adivinhar'}
          </Button>
        </form>
      )}

      <div // results
        className={styles.results()}
      >
        {displayError && <p className={styles.errorMessage()}>{displayError}</p>}
        {renderFeedback()}
        {isGameInProgress && gameState.attempts > 0 && !displayError && (
          <p // attempts
            className={styles.attempts()}
          >
            Tentativas: {gameState.attempts}
          </p>
        )}
      </div>

      <GuessHistory history={gameState.guessHistory} />

      {(isGameFinished || !gameState.gameId) && (
        <Button // newGameButton
          onClick={handleStartNewGame}
          disabled={isLoading}
          variant="secondary"
          className={styles.newGameButton()}
        >
          {isLoading && !gameState.gameId ? 'Aguarde...' : 'Novo Jogo'}
        </Button>
      )}
    </Card>
  );
};
