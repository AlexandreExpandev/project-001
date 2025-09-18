import { tv } from 'tailwind-variants';

export const buttonVariant = tv({
  slots: {
    wrapper:
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 py-2 px-4',
  },
  variants: {
    variant: {
      primary:
        'bg-blue-600 text-white hover:bg-blue-700/90',
      secondary:
        'bg-gray-600 text-white hover:bg-gray-700/90',
      destructive:
        'bg-red-500 text-destructive-foreground hover:bg-red-500/90',
      outline:
        'border border-input hover:bg-accent hover:text-accent-foreground',
      ghost:
        'hover:bg-accent hover:text-accent-foreground',
      link: 'underline-offset-4 hover:underline text-primary',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
