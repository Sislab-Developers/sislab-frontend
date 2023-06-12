import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import Logo from "../../assets/img/logoLogin.svg";
import LogoCSIPRO from "../../assets/img/logo-csipro.png";

import classes from "./LoginForm.module.css";

export const LoginForm = ({
  handleSubmit,
  correoRef,
  passwordRef,
  error,
  errorMessage,
}) => {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <Card
      variant="filled"
      sx={{ width: { xs: "95%", sm: "380px" }, borderRadius: "32px" }}
      className={classes["card"]}
    >
      <CardContent sx={{ padding: "1rem" }}>
        <Box className={classes["card-logo"]}>
          <img src={Logo} alt="Logo de Sislab" />
          <Typography variant="h1" color="primary" fontWeight="bold">
            Sislab
          </Typography>
        </Box>

        <form className={classes["login-form"]} onSubmit={handleSubmit}>
          <Typography variant="h2" fontWeight="medium">
            Iniciar sesión
          </Typography>
          <TextField
            name="Input_email"
            inputRef={correoRef}
            type="email"
            autoFocus
            autoComplete="new-password"
            placeholder="correo@email.com"
            label="Correo electrónico"
            required
            id="email-input"
            margin="dense"
            error={error}
          />

          <TextField
            margin="dense"
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            inputRef={passwordRef}
            label="Contraseña"
            error={error}
            required
            helperText={errorMessage}
            placeholder="Contraseña"
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Link className={classes["forgot-password"]} to="/recuperacion">
            <Typography color="primary">¿Olvidaste tu contraseña?</Typography>
          </Link>

          <Button
            variant="contained"
            size="large"
            type="submit"
            className={classes["login-button"]}
          >
            Siguiente
          </Button>

          <Link className={classes["trouble-signing"]} to="/ayuda">
            <Typography color="primary">
              ¿Problemas para iniciar sesión?
            </Typography>
          </Link>
        </form>
        <Box className={classes["copyright-box"]}>
          <img src={LogoCSIPRO} alt="Logo de CSI Pro" />
          <Typography variant="body1">
            <small>Desarrollado por &copy; CSI PRO 2023</small>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
