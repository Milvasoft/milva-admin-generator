import { ThemeOptions } from '@mui/material/styles';
import './CustomThemeOptions';

const lightThemeOptions: ThemeOptions = {
  palette: {

    mode: 'light',

    primary: {
      main: '#5f4b8b',
      light: '#7F6FA2',
      dark: '#423461',
      contrastText: 'rgba(0, 0, 0, 0.87)'
    },
    
    secondary: {
      main: '#00adb5',
      light: '#33BDC3',
      dark: '#00797E',
      contrastText: 'rgba(0, 0, 0, 0.87)'
    },

    layoutMainBg: 'rgba(127, 111, 162, 0.1)',
    layoutAppBar: '#FFF',

  },

  typography: {
    fontFamily: 'Open Sans, sans-serif',
  },
  
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
};

export default lightThemeOptions;
