import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"
import grey from "@material-ui/core/colors/grey"

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#019CAE",
      contrastText: grey[50],
    },
    secondary: {
      main: "#E6433F",
      contrastText: grey[100],
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  spacing: 4,
  typography: {
    fontFamily: ["Raleway", "sans-serif"].join(","),
    fontSize: 18,
  },
})

const theme = Object.assign({}, muiTheme, {
  colors: {
    primary: muiTheme.palette.primary.main,
    secondary: muiTheme.palette.secondary.main,
    bg: grey[200],
    bgLight: grey[100],
    bgDark: grey[700],
  },
})

export { theme }
