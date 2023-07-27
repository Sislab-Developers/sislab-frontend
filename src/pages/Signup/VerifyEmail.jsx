import { Box, Typography } from "@mui/material";

import { VerifyEmailForm } from "../../components/SignupForm/VerifyEmailForm";

import { CenteredCard } from "../../components/UI/CenteredCard";

import loginBg from "../../assets/img/background.jpg";

export const VerifyEmail = () => {
  return (
    <Box>
      <img
        src={loginBg}
        alt="Fondo de inicio de sesión"
        style={{
          objectFit: "cover",
          display: "block",
          height: "100%",
        }}
      />
      <CenteredCard>
        <Typography sx={{ mb: "0.5rem" }}>
          Enviamos un código de confirmación a tu correo electrónico. Ingrésalo
          aquí:
        </Typography>
        <VerifyEmailForm />
      </CenteredCard>
    </Box>
  );
};
