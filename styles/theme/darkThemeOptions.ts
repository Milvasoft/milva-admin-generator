import { ThemeOptions } from '@mui/material/styles';
import './CustomThemeOptions';

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#5f4b8b',
    },
    secondary: {
      main: '#00adb5',
    },
    background: {
      default: '#292929',
      paper: '#1F1F1F'
    },
    
    layoutMainBg: '#121212',
    layoutAppBar: '#1F1F1F',
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

export default darkThemeOptions;
