import React from 'react';
import { setDefaultProps } from '@/utils/shared';
import { cn } from '@/utils/cn';
import { type ButtonProps } from './types';
import { buttonVariant } from './variants';

/**
 * @component Button
 * @description Um componente de botão reutilizável com variantes de estilo.
 *
 * @param {ButtonProps} props - As propriedades do componente.
 * @param {React.ReactNode} props.children - O conteúdo do botão.
 * @param {'primary' | 'secondary'} [props.variant='primary'] - A variante de estilo do botão.
 * @param {string} [props.className] - Classes CSS adicionais.
 * @param {React.ComponentProps<'button'>} [props.nativeProps] - Propriedades nativas do elemento button.
 *
 * @example
 * <Button variant="primary" nativeProps={{ onClick: () => alert('Clicked!') }}>
 *   Click Me
 * </Button>
 *
 * @returns {JSX.Element} O componente de botão renderizado.
 */
export const Button = (_props: ButtonProps) => {
  // #region Initialization
  const props = setDefaultProps(_props, {
    variant: 'primary',
  });
  // #endregion

  // #region Styles
  const styles = buttonVariant({ variant: props.variant });
  // #endregion

  return (
    <button // wrapper
      {...props.nativeProps}
      className={cn(styles.wrapper(), props.className, props.nativeProps?.className)}
    >
      {props.children}
    </button>
  );
};
