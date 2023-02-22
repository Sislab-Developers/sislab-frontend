import { CustomButton } from '../../components';
import { Link } from 'react-router-dom';
import '../../pages/Login/Login.scss';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CssTextField = styled(TextField)({
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
});

export const Recuperacion = () => {
  const content = (
    <div className="fondo">
      <div className="backgroundWhiteSmoke"></div>
      <div className="box">
        <h2>Recuperar contraseña</h2>
        <div className="espacioTexto">
          <p>Ingresa el correo con el que estás registrado en el sistema</p>
        </div>
        <div className="inputCorreo">
          <CssTextField
            // html input attribute
            name="Inpt_email"
            type="email"
            placeholder="correo@email.com"
            // pass down to FormLabel as children
            label="Correo electrónico"
            id="Inpt_email"
            style={{ width: 340 }}
            required
          />
        </div>
        <div className="botonesRecuperar">
          <div className="Volver">
            <Link to="/">
              <CustomButton text="Volver"></CustomButton>
            </Link>
          </div>
          <div className="confirmarCorreoRecuperar">
            <Link to="/vista-maestro/crear-nueva-solicitud">
              <CustomButton text="Siguiente"></CustomButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  return content;
};
