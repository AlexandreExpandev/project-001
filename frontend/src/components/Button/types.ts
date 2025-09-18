import type { VariantProps } from 'tailwind-variants';
import { buttonVariant } from './variants';

export type ButtonVariant = VariantProps<typeof buttonVariant>;

export type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant['variant'];
  className?: string;
  nativeProps?: React.ComponentProps<'button'>;
};
