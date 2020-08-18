import { createMuiTheme } from "@material-ui/core/styles"
import grey from "@material-ui/core/colors/grey"

// 1. start with Material UI theme, overrides the themeOptions
// so that Mui components share same default theme with Bellhop components.
const muiTheme = createMuiTheme({
  palette: {
    primary: {
      light: grey[200],
      main: grey[300],
      dark: grey[400],
      contrastText: grey[900],
    },
    secondary: {
      light: grey[500],
      main: grey[600],
      dark: grey[700],
      contrastText: grey[200],
    },
    contrastThreshold: 3,
    tonalOffset: 0.5,
  },
  typography: {
    fontFamily: ["-apple-system", "Arial"].join(","),
  },
})

// 2. build a theme with extended parameters, inherite values from default theme.
// write styled components with the components using these theme vars.
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
