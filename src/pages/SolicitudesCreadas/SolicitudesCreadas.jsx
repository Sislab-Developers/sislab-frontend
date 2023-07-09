import { Box, Typography } from "@mui/material";

import { MyRequests } from "../../components/MyRequests/MyRequests";

import { TextEmphasis } from "../../components/TextEmphasis";

export const SolicitudesCreadas = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Typography variant="h1">
        <TextEmphasis>Solicitudes</TextEmphasis> creadas
      </Typography>
      <Typography variant="body1">
        Selecciona un día para ver las <TextEmphasis>solicitudes</TextEmphasis>{" "}
        que has creado:
      </Typography>
      <MyRequests />
    </Box>
  );
};
