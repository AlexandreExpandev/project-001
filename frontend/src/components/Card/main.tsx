import React from 'react';
import { cn } from '@/utils/cn';
import { type CardProps } from './types';
import { cardVariant } from './variants';

/**
 * @component Card
 * @description Um componente de contêiner para agrupar conteúdo relacionado.
 *
 * @param {CardProps} props - As propriedades do componente.
 * @param {React.ReactNode} props.children - O conteúdo do card.
 * @param {string} [props.className] - Classes CSS adicionais.
 * @param {React.ComponentProps<'div'>} [props.nativeProps] - Propriedades nativas do elemento div.
 *
 * @returns {JSX.Element} O componente de card renderizado.
 */
export const Card = (props: CardProps) => {
  // #region Styles
  const styles = cardVariant();
  // #endregion

  return (
    <div // wrapper
      {...props.nativeProps}
      className={cn(styles.wrapper(), props.className, props.nativeProps?.className)}
    >
      {props.children}
    </div>
  );
};
