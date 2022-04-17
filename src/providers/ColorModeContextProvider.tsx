/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext, 
  useEffect, 
  useMemo,
  useState 
} from 'react';
import { ThemeProvider, createTheme, } from '@mui/material/styles';
import lightThemeOptions from '@styles/theme/lightThemeOptions';
import darkThemeOptions from '@styles/theme/darkThemeOptions';
import { CssBaseline } from '@mui/material';


type ColorMode = string | 'light' | 'dark';

interface IColorModeContext {
  mode: ColorMode | undefined;
  toggleColorMode: (nextMode: string) => void;
}

export const ColorModeContext = createContext<IColorModeContext>({ toggleColorMode: () => {}, mode: 'light' });

export default function ColorModeContextProvider({ children }: any) {

  const [mode, setMode] = useState<ColorMode>('light');

  useEffect(() => {

    const getCurrentTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

    let temp = window.localStorage.getItem('mode');

    if (temp !== 'light' && temp !== 'dark') {

      temp = getCurrentTheme() ? 'dark' : 'light';

      window.localStorage.setItem('mode', temp);
    
    }

    setMode(temp);
  
  }, []);

  const colorMode = useMemo(() => ({

    toggleColorMode: (nextMode: string) => {
      
      setMode(nextMode);
    
      window.localStorage.setItem('mode', nextMode);
    
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
