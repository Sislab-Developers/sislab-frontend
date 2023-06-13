import { Box, TextField, Typography } from "@mui/material";

import { CenteredCard } from "../../components/UI/CenteredCard";
import { LinkButton } from "../../components/UI/LinkButton";
import { LoginBackground } from "../../components/UI/LoginBackground";

export const Recuperacion = () => {
  return (
    <LoginBackground>
      <CenteredCard>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <LinkButton to="/login">Atrás</LinkButton>
            <LinkButton to="/vista-maestro/crear-nueva-solicitud">
              Siguiente
            </LinkButton>
          </Box>
        </Box>
      </CenteredCard>
    </LoginBackground>
  );
};
