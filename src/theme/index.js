import { colors, createTheme } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: '#00bff3',
    },
    text: {
      primary: '#172b4d',
      secondary: '#383a3d'
    }
  },
  shadows,
  typography
});

export default theme;
