import { Box } from "@mui/material";

const MainContent = (props) => {
  return (
    <Box
      component="main"
      sx={{
        width: { xs: "100%", sm: "calc(100% - 280px)" },
        ml: { xs: 0, sm: "280px" },
        padding: "16px",
      }}
    >
      {props.children}
    </Box>
  );
};

export default MainContent;
