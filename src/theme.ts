import { Roboto } from '@next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';


declare module "@mui/material/styles" {
  interface Theme {
    breakpoints: {
      values: {
        xs: number,
        sm: number,
        md: number,
        lg: number,
        xl: number,
        b550: number;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    breakpoints: {
      values: {
        xs: number,
        sm: number,
        md: number,
        lg: number,
        xl: number,
        b550: number;
      };
    };
  }
}

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      b550: 550,
    }
  }
});

export default theme;