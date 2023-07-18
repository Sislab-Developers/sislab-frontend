import { Box, Typography } from "@mui/material";

import { InfoLabel } from "../../components/InfoLabel";
import { TextEmphasis } from "../../components/TextEmphasis";
import { PendingRequests } from "../../components/PendingRequests";

export const AdminRequests = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Typography variant="h1">
        <TextEmphasis>Solicitudes</TextEmphasis> creadas
      </Typography>
      <InfoLabel tooltip="Solo se pueden seleccionar los días de hace un mes en adelante. Los días inhabilitados no tienen solicitudes.">
        Selecciona un día para ver las <TextEmphasis>solicitudes</TextEmphasis>{" "}
        recibidas:
      </InfoLabel>
      <PendingRequests />
    </Box>
  );
};
