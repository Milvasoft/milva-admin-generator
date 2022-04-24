/* eslint-disable @typescript-eslint/ban-ts-comment */
import { store } from '@utils/store';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';
import BackDropUtils from './BackDropUtils';
import ColorModeContextProvider from './ColorModeContextProvider';
import { SnackbarUtilsConfigurator } from './SnackbarUtils';

export default function GeneralProvider({ children }: any) {

  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <SnackbarProvider maxSnack={5}>
        <ColorModeContextProvider>

          <BackDropUtils />

          {children}

          <SnackbarUtilsConfigurator />

        </ColorModeContextProvider>
      </SnackbarProvider>
    </Provider>
  );

}

