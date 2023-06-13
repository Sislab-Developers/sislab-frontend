import { Card, CardContent } from "@mui/material";

import classes from "./CenteredCard.module.css";

export const CenteredCard = ({ children }) => {
  return (
    <Card
      variant="filled"
      sx={{ width: { xs: "95%", sm: "380px" }, borderRadius: "32px" }}
      className={classes["card"]}
    >
      <CardContent sx={{ padding: "1.5rem" }}>{children}</CardContent>
    </Card>
  );
};
