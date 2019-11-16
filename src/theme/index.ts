import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, red } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: { main: deepPurple[900] },
    secondary: { main: red.A200 }
  },
  typography: {
    h3: {
      color: deepPurple[900]
    },
    h6: {
      color: deepPurple[900]
    },
    subtitle1: {
      color: red.A200
    },
    subtitle2: {
      color: red.A200
    }
  }
});
