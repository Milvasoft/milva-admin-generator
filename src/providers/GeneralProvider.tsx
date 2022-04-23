/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SnackbarProvider } from 'notistack';
import React from 'react';
import BackDropUtils from './BackDropUtils';
import ColorModeContextProvider from './ColorModeContextProvider';
import { SnackbarUtilsConfigurator } from './SnackbarUtils';

export default function GeneralProvider({ children }: any) {

  return (
    // @ts-ignore
    <SnackbarProvider maxSnack={5}>
      <ColorModeContextProvider>

        <BackDropUtils />

        {children}

        <SnackbarUtilsConfigurator />

      </ColorModeContextProvider>
    </SnackbarProvider>
  );

}

