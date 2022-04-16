/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext, 
  useEffect, 
  useMemo,
  useState 
} from 'react';
import { ThemeProvider, createTheme, CssBaseline, } from '@mui/material';
import lightThemeOptions from '@styles/theme/lightThemeOptions';
import darkThemeOptions from '@styles/theme/darkThemeOptions';

type ColorMode = string | 'light' | 'dark';

interface IColorModeContext {
  mode: ColorMode | undefined;
  toggleColorMode: (nextMode: string) => void;
}

export const ColorModeContext = createContext<IColorModeContext>({ toggleColorMode: () => {}, mode: 'light' });

export default function ColorModeContextProvider({ children }: any) {

  const [mode, setMode] = useState<ColorMode>('light');

  useEffect(() => {

    let mode = 'ligth';

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDark) mode = 'dark';

    setMode(mode);
  
  }, []);

  const colorMode = useMemo(() => ({

    toggleColorMode: (nextMode: string) => {
      
      setMode(nextMode);
    
    },
    mode 
  }), [mode]);

  const theme = useMemo(() => (mode === 'light' ? createTheme(lightThemeOptions) : createTheme(darkThemeOptions)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );

}

export const useColorMode = () => React.useContext(ColorModeContext);
