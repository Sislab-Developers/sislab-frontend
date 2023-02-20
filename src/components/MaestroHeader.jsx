
import "../styles/MaestroDashBoard.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logowhite.svg";
import Menu from "../assets/img/menu.svg";
import { getToken, removeToken } from "../utils/authServices";
import { useAuth, useLoading } from "../context/hooks";
import AuthContext from "../context/AuthContext";

export const MaestroHeader = (props) => {
  const API_URL = "https://sislab-backend.vercel.app";
  // const API_URL = "http://localhost:8080";
  const authCtx = useContext(AuthContext);


  const { run, stop } = useLoading();
  // const { logout } = useAuth();


  const uid = getToken(authCtx.token, true).uid;
  const [user, setUser] = useState("");


  useEffect(() => {
    run();
    axios.get(`${API_URL}/api/usuarios/${uid}`).then((response) => {
      setUser(response.data);
      stop();
    });

  }, [stop, uid]);

  const [active, setActive] = useState('nav');
  const [activeOverlay, setActiveOverlay] = useState('overlayOff');

  const navToggle = () => {
    active === 'nav' ? setActive('nav nav_active') : setActive('nav');

    activeOverlay === 'overlayOff'
      ? setActiveOverlay('overlayOff overlay')
      : setActiveOverlay('overlayOff');
  };

  const content = (
    <>
      <header className="header">
        <div className="headerWrapper">
          <div className="menu">
            <img
              src={Menu}
              onClick={navToggle}
              alt="Botón para el menú"
              id="toggle"
            ></img>
          </div>
          <div className="logo">
            <img src={Logo} alt="Logo de Sislab"></img>
          </div>
        </div>
      </header>
      <div className={active}>
        <h1 className="userName">Saludos {user.nombre}</h1>
        <ul className="nav-sections">
          <div id={props.colorMisGrupos} className="mis-grupos">
            <Link to="/mis-grupos">
              <li>
                <i className="ri-group-line"></i>Mis grupos
              </li>
            </Link>
          </div>
          <div id={props.colorNuevaSolicitud} className="nueva-solicitud">
            <Link to="/nueva-solicitud">
              <li>
                <i className="ri-add-circle-line"></i>Crear nueva solicitud
              </li>
            </Link>
          </div>
          <div id={props.colorSolicitudes} className="solicitudes">
            <Link to="/solicitudes-creadas">
              <li>
                <i className="ri-checkbox-circle-line"></i>Solicitudes creadas
              </li>
            </Link>
          </div>
          <div id={props.colorInformacion} className="informacion">
            <Link to="/mas-informacion">
              <li>
                <i className="ri-information-line"></i>Más información
              </li>
            </Link>
          </div>
          <ul className="cerrar-sesion">
            <div id="cerrar-sesion">
              <NavLink
                to="/login"
                onClick={() => {
                  authCtx.logout();
                  // removeToken();
                  // logout();
                }}
              >
                <li>
                  <i className="ri-logout-box-line"></i>Cerrar sesión
                </li>
              </NavLink>
            </div>
          </ul>
        </ul>
      </div>
      <div className={activeOverlay} onClick={navToggle}></div>
    </>
  );

  return content;
};
