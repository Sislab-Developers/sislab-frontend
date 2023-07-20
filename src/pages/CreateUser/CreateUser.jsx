import { Box, Typography } from "@mui/material";

import { UserForm } from "./UserForm";

import { TextEmphasis } from "../../components/TextEmphasis";

export const CreateUser = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Typography variant="h1">
        Crear <TextEmphasis>nuevo usuario</TextEmphasis>
      </Typography>
      <UserForm />
    </Box>
  );
};
