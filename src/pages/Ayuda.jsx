import * as React from "react";
import { CustomButton } from "../components";
import { Link } from "react-router-dom";
import "../styles/Login.css";

export const Ayuda = () => {
  const content = (
    <div className="fondo">
      <div className="backgroundWhiteSmoke"></div>
      <div className="box">
        <h2>¿Estás registrado?</h2>
        <div className="espacioTexto">
          <p>
            Te recordamos que esta aplicación es sólo para el uso del personal
            de la Universidad de Sonora.
          </p>
          <p>
            El personal del Departamento de Ciencias Químico Biológicas debe de
            otorgarte tus credenciales para poder acceder.
          </p>
        </div>
        <h2>¿No puedes iniciar sesión?</h2>
        <div className="espacioTexto">
          <p>Si necesitas recuperar tu contraseña</p>
          <div id="espacioEnlaceAyuda">
            <Link to="/recuperaracion">haz click aquí</Link>
          </div>
          <p>
            Si presentas problemas para iniciar sesión puedes mandar un correo a
            la siguiente dirección: soporte@sislab.com.mx
          </p>
        </div>
        <div className="botonesRecuperar">
          <div className="Volver">
            <Link to="/">
              <CustomButton text="Volver"></CustomButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  return content;
};
