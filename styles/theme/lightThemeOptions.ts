import { ThemeOptions } from '@mui/material/styles';

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#5f4b8b',
    },
    secondary: {
      main: '#00adb5',
    },
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
