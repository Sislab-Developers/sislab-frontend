import { Box, useTheme } from "@mui/material";

const MainContent = (props) => {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        width: {xs: "100%", sm: "calc(100% - 280px)"},
        ml: {xs: 0, sm: "280px"},
      }}
    >
      <Box sx={{
        margin: {sm: "0 auto"},
        maxWidth: theme.maxWidth,
        padding: "1rem",
      }}>
        {props.children}
      </Box>
    </Box>
  );
};

export default MainContent;
