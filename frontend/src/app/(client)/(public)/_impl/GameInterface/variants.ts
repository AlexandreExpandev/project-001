import { tv } from 'tailwind-variants';

export const gameInterfaceVariant = tv({
  slots: {
    wrapper: 'w-full max-w-md mx-auto p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-6',
    title: 'text-3xl font-bold text-center text-gray-800 dark:text-white',
    description: 'text-center text-gray-600 dark:text-gray-300',
    gameForm: 'flex flex-col sm:flex-row gap-4',
    results: 'text-center min-h-[6rem] flex flex-col justify-center items-center space-y-2',
    feedback: 'text-lg font-semibold',
    errorMessage: 'text-red-500 text-sm',
    attempts: 'text-gray-500 dark:text-gray-400',
    newGameButton: 'w-full',
  },
  variants: {
    feedback: {
      maior: {
        feedback: 'text-blue-500',
      },
      menor: {
        feedback: 'text-yellow-500',
      },
      correto: {
        feedback: 'text-green-500',
      },
    },
  },
});
