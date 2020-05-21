import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"
import grey from "@material-ui/core/colors/grey"

let theme = createMuiTheme({
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
})

theme = responsiveFontSizes(theme)

export { theme }
