'use client';

import { createTheme } from '@mui/material';
import colors from './colors';
declare module '@mui/material/styles' {
  interface Palette {
    primaryHighlight: Palette['primary'];
  }

  interface PaletteOptions {
    primaryHighlight?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: { main: colors.secondary },
    primaryHighlight: {
      main: '#FFDE82',
    },
  },
});
