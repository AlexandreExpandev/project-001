import React from 'react';
import { cn } from '@/utils/cn';
import { type InputProps } from './types';
import { inputVariant } from './variants';

/**
 * @component Input
 * @description Um componente de input de texto reutilizável.
 *
 * @param {InputProps} props - As propriedades do componente.
 * @param {string} [props.className] - Classes CSS adicionais.
 * @param {React.ComponentProps<'input'>} [props.nativeProps] - Propriedades nativas do elemento input.
 *
 * @returns {JSX.Element} O componente de input renderizado.
 */
export const Input = (props: InputProps) => {
  // #region Styles
  const styles = inputVariant();
  // #endregion

  return (
    <input // wrapper
      {...props.nativeProps}
      className={cn(styles.wrapper(), props.className, props.nativeProps?.className)}
    />
  );
};
