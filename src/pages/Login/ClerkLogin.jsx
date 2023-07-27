import { Box, useTheme } from "@mui/material";

import { SignIn, useAuth } from "@clerk/clerk-react";

import loginBg from "../../assets/img/background.jpg";

export const ClerkLogin = () => {
  const theme = useTheme();
  const { isSignedIn, signOut } = useAuth();
  console.log(isSignedIn);

  // signOut();

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
      <SignIn
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
