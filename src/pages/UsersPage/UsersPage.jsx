import { Box, Typography } from "@mui/material";

import { TextEmphasis } from "../../components/TextEmphasis";
import { Users } from "../../components/Users/Users";

export const UsersPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Typography variant="h1">
        <TextEmphasis>Usuarios</TextEmphasis>
      </Typography>
      <Users />
    </Box>
  );
};
