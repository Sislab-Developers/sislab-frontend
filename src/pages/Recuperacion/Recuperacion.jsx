import { Box, TextField, Typography } from "@mui/material";

import { SafeArea } from "../../components/UI/SafeArea";
import { LinkButton } from "../../components/UI/LinkButton/LinkButton";

export const Recuperacion = () => {
  return (
    <SafeArea
      sx={{
        display: "flex",
        flexDirection: "column",
        jusitfyContent: "flex-start",
        alignItems: "flex-start",
        gap: "1rem",
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        Recuperar contraseña
      </Typography>
      <Box>
        <Typography variant="body1">
          Ingresa el correo con el que estás registrado en el sistema
        </Typography>
        <TextField
          name="Inpt_email"
          type="email"
          label="Correo electrónico"
          id="Inpt_email"
          fullWidth
          required
        />
      </Box>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <LinkButton to="/login">Atrás</LinkButton>
        <LinkButton to="/vista-maestro/crear-nueva-solicitud">
          Siguiente
        </LinkButton>
      </Box>
      {/* <Link to="/"></Link> */}
      {/* <Link to="/vista-maestro/crear-nueva-solicitud"></Link> */}
    </SafeArea>
  );
};
