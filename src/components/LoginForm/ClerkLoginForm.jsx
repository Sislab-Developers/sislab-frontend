import { Link } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";

import { Box, Button, TextField, Typography } from "@mui/material";

import csiproLogo from "../../assets/img/logo-csipro.png";
import sislabLogo from "../../assets/img/sislab-logo.png";

export const ClerkLoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        gap: "0.5rem",
      }}
    >
      <img src={sislabLogo} alt="Logotipo de SISLAB: Sistema de Laboratorios" />
      <Typography
        variant="h1"
        fontWeight="normal"
        color="primary"
        textAlign="center"
      >
        Iniciar sesión
      </Typography>
      {/* <InfoLabel tooltip="SISLAB simplifica el inicio de sesión permitiendo la autenticación por medio de tu cuenta @unison.mx. SISLAB no almacena tus datos.">
        Sobre el inicio de sesión
      </InfoLabel> */}
      <Box
        component="form"
        onSubmit={handleSubmit(handleLogin)}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Debes ingresar tu correo electrónico.",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              label="Correo electrónico"
              placeholder="nombre@ejemplo.com"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Debes ingresar tu contraseña.",
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres.",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Contraseña"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Iniciar sesión
        </Button>
      </Box>

      <Typography>
        ¿No tienes cuenta? <Link to="/signup">Regístrate</Link>
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "1rem",
        }}
      >
        <img
          src={csiproLogo}
          alt="Logo de CSI Pro"
          style={{ width: "2.5em" }}
        />
        <Typography fontSize="0.8em">
          Desarrollado por CSI PRO&trade; 2023
        </Typography>
      </Box>
    </Box>
  );
};
