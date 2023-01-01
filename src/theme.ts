import { Roboto } from "@next/font/google";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";
import { red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    b550: true;
  }
}

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});
// Create a theme instance.

const defaultTheme = createTheme();
export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  breakpoints: {
    ...defaultTheme.breakpoints,
    values: {
      ...defaultTheme.breakpoints.values,
      b550: 550,
    },
  },
};
const theme = createTheme(themeOptions);

export default theme;
