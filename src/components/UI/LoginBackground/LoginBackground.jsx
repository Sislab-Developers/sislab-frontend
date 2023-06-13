import { Box } from "@mui/material";

import classes from "./LoginBackground.module.css";

export const LoginBackground = ({ children }) => {
  return <Box className={classes["login-background"]}>{children}</Box>;
};
