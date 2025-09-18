import { tv } from 'tailwind-variants';

export const configFormVariant = tv({
  slots: {
    wrapper: 'w-full max-w-lg mx-auto p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-6',
    title: 'text-2xl font-bold text-center text-gray-800 dark:text-white',
    form: 'space-y-4',
    fieldGroup: 'flex flex-col space-y-2',
    label: 'text-sm font-medium text-gray-700 dark:text-gray-300',
    message: 'text-center text-sm min-h-[1.25rem]', // 20px
  },
  variants: {
    messageType: {
      error: {
        message: 'text-red-500',
      },
      success: {
        message: 'text-green-500',
      },
    },
  },
});
