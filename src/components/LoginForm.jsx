import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Logo from '../assets/img/logoLogin.svg';
import LogoCSIPRO from '../assets/img/logo-csipro.png';

import { Link } from 'react-router-dom';
import { Button, Box, Typography, Card, CardContent } from '@mui/material';

export const LoginForm = ({
  handleSubmit,
  correoRef,
  passwordRef,
  error,
  errorMessage,
}) => {
  const [values, setValues] = useState({
    password: '',
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
        <Box className="backgroundWhiteSmoke">
          <Box className="copyright-box">
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
            position: 'absolute',
            width: { xs: '100%', sm: '380px' },
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            borderRadius: { xs: '48px 48px 0 0', sm: '32px' },
            boxShadow: { xs: 'none', sm: 'rgba(0, 0, 0, 0.24) 0 10px 20px' },
          }}
        >
          <CardContent>
            <Box className="card__logo">
              <img src={Logo} alt="Logo de Sislab" />
              <h1>Sislab</h1>
            </Box>

            <div id="espacioIniciarSesion">
              <h2>Iniciar sesión</h2>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
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
                sx={{
                  '& label.Mui-focused': {
                    color: '#00C795',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#00C795',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'light',
                    },
                    '&:hover fieldset': {
                      borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00C795',
                    },
                  },
                }}
              />

              <FormControl variant="outlined">
                <TextField
                  style={{ width: 340 }}
                  sx={{
                    '& label.Mui-focused': {
                      color: '#00C795',
                    },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#00C795',
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'light',
                      },
                      '&:hover fieldset': {
                        borderColor: 'black',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#00C795',
                      },
                    },
                  }}
                  margin="dense"
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
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

              <Button
                sx={{
                  borderRadius: '13px',
                  backgroundColor: '#00C795',
                  padding: '10px 32px',
                  fontSize: '16px',
                  textTransform: 'none',
                  fontWeight: 'regular',
                  margin: 'auto',
                  width: 140,
                  height: 45,
                }}
                variant="contained"
                size="large"
                id="Btn_login"
                type="submit"
              >
                Siguiente
              </Button>

              <Link className="recuperar" to="/recuperacion">
                ¿Olvidaste tu contraseña?
              </Link>

              <Link className="ayuda" to="/ayuda">
                ¿Problemas para iniciar sesión?
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
