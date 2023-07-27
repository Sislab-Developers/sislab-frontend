import { Box, useTheme } from "@mui/material";

import { ClerkSignupForm } from "../../components/SignupForm/SignupForm";
import { CenteredCard } from "../../components/UI/CenteredCard";

import loginBg from "../../assets/img/background.jpg";
import { SignUp } from "@clerk/clerk-react";

export const ClerkSignup = () => {
  const theme = useTheme();

  return (
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
      <SignUp
        appearance={{
          variables: {
            colorPrimary: theme.palette.primary.main,
            fontSize: "1.2em",
          },
          elements: {
            card: {
              "& *": {
                fontFamily: theme.typography.fontFamily,
              },
            },
          },
        }}
      />
    </Box>
  );
};
