import { snackActions } from '@src/providers/SnackbarUtils';

export const showToast = (message?: string, variant?: 'default' | 'error' | 'success' | 'warning' | 'info', autoHideDuration?: number) => message 
&& snackActions.toast(message, variant, autoHideDuration);

export const successToast = (message?: string) => showToast(message, 'success');
export const errorToast = (message?: string) => showToast(message, 'error');
export const warningToast = (message?: string) => showToast(message, 'warning');
export const infoToast = (message?: string) => showToast(message, 'info');


