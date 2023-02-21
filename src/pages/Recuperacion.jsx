import { CustomButton } from "../components";
import { Link } from "react-router-dom";
import classes from "../styles/Login.module.css";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const CssTextField = styled(TextField)({
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
});

export const Recuperacion = () => {
  const content = (
    <div className={classes["fondo"]}>
      <div className={classes["backgroundWhiteSmoke"]}></div>
      <div className={classes["box"]}>
        <h2>Recuperar contraseña</h2>
        <div className={classes["espacioTexto"]}>
          <p>Ingresa el correo con el que estás registrado en el sistema</p>
        </div>
        <div className={classes["inputCorreo"]}>
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
        <div className={classes["botonesRecuperar"]}>
          <div className={classes["Volver"]}>
            <Link to="/">
              <CustomButton text="Volver"></CustomButton>
            </Link>
          </div>
          <div className={classes["confirmarCorreoRecuperar"]}>
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
