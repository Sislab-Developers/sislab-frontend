import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00c795',
      contrastText: '#ffffff',
    },
    typography: {
      fontFamily: ['Nunito', 'sans-serif'].join(','),
    },
  },
});
