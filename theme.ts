'use client';

import { createTheme } from '@mui/material';
import { blue, deepPurple, purple, teal } from '@mui/material/colors';

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
    primary: blue,
    secondary: purple,
    primaryHighlight: {
      main: '#FFDE82',
    },
  },
});
