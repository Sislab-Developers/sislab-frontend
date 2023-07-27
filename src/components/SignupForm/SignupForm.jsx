import { Controller, useForm } from "react-hook-form";

import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import csiproLogo from "../../assets/img/logo-csipro.png";
import sislabLogo from "../../assets/img/sislab-logo.png";
import { useSignUp } from "@clerk/clerk-react";
import { useContext } from "react";
import ModalContext from "../../context/Modal/ModalContext";
import { useNavigate } from "react-router-dom";

export const ClerkSignupForm = () => {
  const { updateContent } = useContext(ModalContext);
  const navigate = useNavigate();

  const { isLoaded, signUp, setActive } = useSignUp();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const handleSignup = async (data) => {
    if (!isLoaded) {
      updateContent({
        title: "Error",
        content:
          "Hubo un problema conectando con el servicio de autenticación. Vuelve a intentarlo más tarde.",
      });
      return;
    }

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
        // redirectUrl: "http://localhost:3000/signup/verify",
      });
      navigate("/signup/verify");
    } catch (error) {
      updateContent({
        title: "Error",
        content: `Ocurrió un error al iniciar la verificación. Detalles: ${JSON.stringify(
          error,
          null,
          2
        )}`,
      });
    }
  };

  if (!isLoaded) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <CircularProgress />
        <Typography textAlign="center">
          Conectando con el servicio de autenticación...
        </Typography>
      </Box>
    );
  }

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
        Regístrate
      </Typography>
      {/* <InfoLabel tooltip="SISLAB simplifica el inicio de sesión permitiendo la autenticación por medio de tu cuenta @unison.mx. SISLAB no almacena tus datos.">
        Sobre el inicio de sesión
      </InfoLabel> */}
      <Box
        component="form"
        onSubmit={handleSubmit(handleSignup)}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0.75rem",
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
        {/* <Controller
          name="confirm-password"
          control={control}
          rules={{
            required: "Debes confirmar tu contraseña.",
            validate: (value) =>
              value === watch("password") || "Las contraseñas no coinciden.",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Confirmar contraseña"
              type="password"
              error={!!errors["confirm-password"]}
              helperText={errors["confirm-password"]?.message}
            />
          )}
        /> */}
        <Button type="submit" variant="contained" color="primary">
          Regístrate
        </Button>
      </Box>

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
