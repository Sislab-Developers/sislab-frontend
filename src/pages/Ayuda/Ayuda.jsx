import * as React from 'react';
import { CustomButton } from '../../components';
import { Link } from 'react-router-dom';
import style from './Ayuda.module.scss';

export const Ayuda = () => {
  const content = (
    <div className={style.fondo}>
      <div className={style.backgroundWhiteSmoke} />
      <div className={style.box}>
        <h2>¿Estás registrado?</h2>

        <p>
          Te recordamos que esta aplicación es sólo para el uso del personal de
          la Universidad de Sonora.
        </p>
        <p>
          El personal del Departamento de Ciencias Químico Biológicas debe de
          otorgarte tus credenciales para poder acceder.
        </p>

        <h2>¿No puedes iniciar sesión?</h2>

        <p>Si necesitas recuperar tu contraseña</p>
        <div id="espacioEnlaceAyuda">
          <Link to="/recuperaracion">haz click aquí</Link>
        </div>
        <p>
          Si presentas problemas para iniciar sesión puedes mandar un correo a
          la siguiente dirección: soporte@sislab.com.mx
        </p>

        <div className={style.botones_recuperar}>
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
