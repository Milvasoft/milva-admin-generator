import { backdropActions } from '@src/providers/BackDropUtils';

export const openGeneralLoading = () => backdropActions.open();

export const closeGeneralLoading = () => backdropActions.close();
