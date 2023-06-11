import { Link } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { TextEmphasis } from "../../components/TextEmphasis";
import { LinkButton } from "../../components/UI/LinkButton/LinkButton";
import { SafeArea } from "../../components/UI/SafeArea";

export const Ayuda = () => (
  <SafeArea
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: "1rem",
    }}
  >
    <Typography variant="h5" fontWeight="bold">
      ¿Estás registrado?
    </Typography>
    <Box>
      <Typography variant="body1">
        Te recordamos que esta aplicación es sólo para el uso del personal de la
        Universidad de Sonora.
      </Typography>
      <Typography variant="body1">
        El personal del Departamento de Ciencias Químico Biológicas debe de
        otorgarte tus credenciales para poder acceder.
      </Typography>
    </Box>

    <Typography variant="h5" fontWeight="bold">
      ¿No puedes iniciar sesión?
    </Typography>
    <Box>
      <Typography variant="body1">
        Si necesitas recuperar tu contraseña{" "}
        <Link to="/recuperaracion">haz click aquí</Link>.
      </Typography>
      <Typography variant="body1">
        Si presentas problemas para iniciar sesión puedes mandar un correo a la
        siguiente dirección: <TextEmphasis>soporte@sislab.com.mx</TextEmphasis>
      </Typography>
    </Box>

    <LinkButton to="/login" sx={{ margin: "0 auto" }}>
      Atrás
    </LinkButton>
  </SafeArea>
);
