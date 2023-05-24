import { createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#24aae1",
    },
    secondary: {
      main: "#24aae1",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
