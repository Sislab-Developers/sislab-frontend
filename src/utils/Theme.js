import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00c795",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
  },
  maxWidth: "600px",
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          backgroundColor: "#00C795",
          borderRadius: "12px",
        },
      },
    },
    MuiInputBase: {
      defaultProps: {
        style: {
          borderRadius: "12px",
        },
      },
      styleOverrides: {
        root: {
          backgroundColor: "#F5F5F5 ",
        },
      },
    },
  },
});
