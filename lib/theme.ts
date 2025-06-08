"use client"

import { createTheme } from "@mui/material/styles"
import { red } from "@mui/material/colors"

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#4a6da7",
    },
    secondary: {
      main: "#292929",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f5f5f5",
        },
      },
    },
  },
})

export default theme
