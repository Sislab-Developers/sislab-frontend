import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import Logo from "../assets/img/logoLogin.svg";
import { Link } from "react-router-dom";
import { FormControlLabel, Checkbox, Button } from "@mui/material";

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
      <div className="fondo">
        <div className="backgroundWhiteSmoke"></div>
        <div className="box">
          <div className="logoLogin">
            <img src={Logo} alt="Logo de sislab" />
          </div>
          <h1>Sislab</h1>
          <div id="espacioIniciarSesion">
            <h2>Iniciar sesión</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="inputCorreo">
              <TextField
                name="Inpt_email"
                inputRef={correoRef}
                type="email"
                autoFocus
                autoComplete="new-password"
                placeholder="correo@email.com"
                label="Correo electrónico"
                required
                id="email"
                margin="dense"
                error={error}
                style={{ width: 340 }}
              />
            </div>

            <div className="inputPass">
              <FormControl variant="outlined">
                <InputLabel
                  sx={{
                    "&.Mui-focused": {
                      color: "#00C795",
                    },
                  }}
                  htmlFor="outlined-adornment- password"
                ></InputLabel>
                <TextField
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#00C795",
                    },
                  }}
                  style={{ width: 340 }}
                  margin="dense"
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  inputRef={passwordRef}
                  label="Contraseña"
                  variant="outlined"
                  error={error}
                  required
                  helperText={errorMessage}
                  placeholder="123unison123"
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
            </div>
            <div className="checkBox">
              <FormControlLabel
                label={
                  <span style={{ fontSize: "14px", color: "#333333" }}>
                    {"Mantener sesión iniciada"}
                  </span>
                }
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 18, color: "#00C795" },
                }}
                control={<Checkbox />}
              />
            </div>
            <div className="recuperar">
              <Link to="/recuperacion">¿Olvidaste tu contraseña?</Link>
            </div>
            <div className="confirmarDatos">
              <Button
                style={{
                  borderRadius: 13,
                  backgroundColor: "#00C795",
                  padding: "10px 42px",
                  fontSize: "18px",
                  textTransform: "none",
                  fontWeight: "regular",
                  width: 150,
                  height: 50,
                }}
                variant="contained"
                size="large"
                id="Btn_login"
                type="submit"
              >
                {"Siguiente"}
              </Button>
            </div>
            <div className="ayuda">
              <Link to="/ayuda">¿Problemas para iniciar sesión?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
