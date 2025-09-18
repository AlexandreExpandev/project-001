import { tv } from 'tailwind-variants';

export const cardVariant = tv({
  slots: {
    wrapper:
      'rounded-lg border bg-card text-card-foreground shadow-sm',
  },
});
