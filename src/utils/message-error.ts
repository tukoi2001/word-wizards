import { showError } from 'utils/toast';

export const showErrorMessage = (error: App.ErrorResponse): void => {
  if (typeof error === 'object') {
    let message: string = error.message as string;
    if (isArray(error.message)) {
      message = join(error.message, ' ');
    }
    showError(message);
  }
};
