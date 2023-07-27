import { Box } from "@mui/material";

const MainContent = (props) => {
  return (
    <Box
      component="main"
      sx={{
        mt: "48px",
        width: { xs: "100%", sm: "calc(100% - 280px)" },
      }}
    >
      <Box sx={{ mx: { sm: "auto" }, padding: "1rem" }}>{props.children}</Box>
    </Box>
  );
};

export default MainContent;
