import { tv } from 'tailwind-variants';

export const guessHistoryVariant = tv({
  slots: {
    wrapper: 'w-full space-y-2 text-center',
    title: 'text-md font-semibold text-gray-700 dark:text-gray-300',
    list: 'flex flex-wrap justify-center gap-2',
    item: 'flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 text-sm font-medium text-gray-800 dark:text-gray-200',
  },
});
