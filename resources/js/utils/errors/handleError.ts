import { useToast } from '@/hooks/useToast';
import { AppError } from './AppError';

export const handleError = (error: unknown, message: string = '') => {
  const toast = useToast();
  const isAppError = error instanceof AppError;

  let title =
    'Was not possible to complete the operation. Please, try again later.';
  if (isAppError) title = error.message;
  if (message) title = message;

  toast.error(title);
};
