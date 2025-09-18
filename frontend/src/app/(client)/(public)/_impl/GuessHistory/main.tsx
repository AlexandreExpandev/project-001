import React from 'react';
import { cn } from '@/utils/cn';
import { type GuessHistoryProps } from './types';
import { guessHistoryVariant } from './variants';

/**
 * @component GuessHistory
 * @description Exibe o histórico de palpites do jogo.
 *
 * @param {GuessHistoryProps} props - As propriedades do componente.
 * @returns {JSX.Element | null} O histórico de palpites ou nulo se não houver histórico.
 */
export const GuessHistory = (props: GuessHistoryProps) => {
  // #region Styles
  const styles = guessHistoryVariant();
  // #endregion

  if (props.history.length === 0) {
    return null;
  }

  return (
    <div // wrapper
      className={cn(styles.wrapper(), props.className)}
    >
      <h2 // title
        className={styles.title()}
      >
        Seus Palpites
      </h2>
      <div // list
        className={styles.list()}
      >
        {props.history.map((guess, index) => (
          <span // item
            key={`guess-${index}-${guess}`}
            className={styles.item()}
          >
            {guess}
          </span>
        ))}
      </div>
    </div>
  );
};
