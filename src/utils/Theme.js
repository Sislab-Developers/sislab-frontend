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
          backgroundColor: "#00c795",
          borderRadius: "12px",
          fontSize: "1.2em",
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
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: "1px solid #ccc",
          borderRadius: "12px",
          "&::before": {
            content: "none",
          },
          "&:first-of-type": {
            borderRadius: "12px",
          },
          "&:last-of-type": {
            borderRadius: "12px",
          }
        }
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          fontVariantNumeric: "tabular-nums",
        }
      }
    },
  },
});
