import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import Logo from "../assets/img/logoLogin.svg";
import LogoCSIPRO from "../assets/img/logo-csipro.png";

import { Link } from "react-router-dom";
import { Button, Box, Typography, Card, CardContent } from "@mui/material";

import classes from "../styles/Login.module.css";

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
    <>
      <div className={classes.fondo}>
        <Box className={classes.backgroundWhiteSmoke}>
          <Box className={classes["copyright-box"]}>
            {/* ¿Tal vez el Copyright se ve mejor con el logo encima del texto? */}
            <Typography variant="h1">
              Desarrollado por &copy; CSI PRO 2023
            </Typography>
            <img src={LogoCSIPRO} alt="Logo de CSI Pro" />
          </Box>
        </Box>

        <Card
          variant="outlined"
          sx={{
            position: "absolute",
            width: { xs: "100%", sm: "380px" },
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            borderRadius: { xs: "48px 48px 0 0", sm: "32px" },
            boxShadow: { xs: "none", sm: "rgba(0, 0, 0, 0.24) 0 10px 20px" },
          }}
        >
          <CardContent>
            <Box className={classes["card__logo"]}>
              <img src={Logo} alt="Logo de Sislab" />
              <Typography variant="h1">Sislab</Typography>
            </Box>

            <form className={classes["login-form"]} onSubmit={handleSubmit}>
              <Typography variant="h2">Iniciar sesión</Typography>
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
                style={{ width: 340 }}
                sx={{
                  "& label.Mui-focused": {
                    color: "#00C795",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#00C795",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "light",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#00C795",
                    },
                  },
                  pb: "8px",
                }}
              />

              <FormControl variant="outlined">
                <TextField
                  style={{ width: 340 }}
                  sx={{
                    "& label.Mui-focused": {
                      color: "#00C795",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#00C795",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "light",
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#00C795",
                      },
                    },
                    pb: "4px",
                  }}
                  margin="dense"
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  inputRef={passwordRef}
                  label="Contraseña"
                  variant="outlined"
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
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <Link className={classes["recuperar"]} to="/recuperacion">
                ¿Olvidaste tu contraseña?
              </Link>

              <Button
                className={classes["login-btn"]}
                variant="contained"
                size="large"
                id="Btn_login"
                type="submit"
              >
                Siguiente
              </Button>

              <Link className={classes["ayuda"]} to="/ayuda">
                ¿Problemas para iniciar sesión?
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
