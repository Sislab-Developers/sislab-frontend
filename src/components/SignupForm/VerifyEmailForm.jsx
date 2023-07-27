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
import { useNavigate } from "react-router-dom";
import ModalContext from "../../context/Modal/ModalContext";
import { useContext } from "react";

export const VerifyEmailForm = () => {
  const { updateContent } = useContext(ModalContext);
  const navigate = useNavigate();

  const { isLoaded, signUp, setActive } = useSignUp();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleVerify = async (data) => {
    if (!isLoaded) {
      updateContent({
        title: "Error",
        content:
          "Hubo un problema conectando con el servicio de autenticación. Vuelve a intentarlo más tarde.",
      });
      return;
    }

    try {
      const completeSignup = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (completeSignup.status !== "complete") {
        updateContent({
          title: "Error",
          content: `Ocurrió un error al iniciar la verificación. Detalles: ${JSON.stringify(
            completeSignup,
            null,
            2
          )}`,
        });
        return;
      }

      if (completeSignup.status === "complete") {
        await setActive({ session: completeSignup.createdSessionId });

        navigate("/");
      }
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
      {/* <img src={sislabLogo} alt="Logotipo de SISLAB: Sistema de Laboratorios" /> */}
      {/* <Typography
        variant="h1"
        fontWeight="normal"
        color="primary"
        textAlign="center"
      >
        Verificar correo
      </Typography> */}
      {/* <InfoLabel tooltip="SISLAB simplifica el inicio de sesión permitiendo la autenticación por medio de tu cuenta @unison.mx. SISLAB no almacena tus datos.">
        Sobre el inicio de sesión
      </InfoLabel> */}
      <Box
        component="form"
        onSubmit={handleSubmit(handleVerify)}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Controller
          name="code"
          control={control}
          rules={{
            required: "Debes ingresar el código de verificación.",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              label="Código de verificación"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Verificar
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
