import { Box, Typography } from "@mui/material";

import { RequestForm } from "../../components/NewRequest/RequestForm";
import { TextEmphasis } from "../../components/TextEmphasis";

export const CrearNuevaSolicitud = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Typography variant="h1">
        Crear <TextEmphasis>nueva solicitud</TextEmphasis>
      </Typography>
      <Typography variant="body1">
        Para crear una <TextEmphasis>nueva solicitud</TextEmphasis>, llena los
        siguientes campos:
      </Typography>

      <RequestForm />
    </Box>
  );
};
