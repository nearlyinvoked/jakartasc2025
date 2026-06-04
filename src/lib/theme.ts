import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4a6da7",
      dark: "#2c4b8a",
      light: "#6b8ec4",
    },
    secondary: {
      main: "#292929",
    },
    background: {
      default: "#f4f6fb",
      paper: "#ffffff",
    },
    divider: "rgba(0,0,0,0.08)",
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: "#f4f6fb" },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          "&:hover": { backgroundColor: "rgba(74, 109, 167, 0.06)" },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: { borderRadius: 10, textTransform: "none", fontWeight: 600 },
        root: { borderRadius: 10, textTransform: "none" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
  },
});

export default theme;
