import { Box } from "@mui/material";

import { CenteredCard } from "../CenteredCard";

import loginBg from "../../../assets/img/background.jpg";

export const LoginBackground = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: `url(${loginBg})`,
      backgroundSize: "cover",
      minWidth: "100%",
    }}
  >
    <CenteredCard>{children}</CenteredCard>
  </Box>
);
