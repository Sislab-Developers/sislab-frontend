import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components';
import { getToken } from '../utils';

import {
  CrearNuevaSolicitud,
  MisGrupos,
  SolicitudesCreadas,
  MasInformacion,
  Recuperacion,
  Ayuda,
  Login,
  MaestroDashBoard,
} from '../pages';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export const MainRoutes = () => {
  const logToken = getToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={logToken ? <Layout /> : <Navigate to="/login" />}>
          <Route index path="/*" element={<Navigate to="/" />} />
          <Route index path="/" element={<MaestroDashBoard />} />
          <Route
            index
            path="/nueva-solicitud"
            element={<CrearNuevaSolicitud />}
          />
          <Route index path="/mis-grupos" element={<MisGrupos />} />
          <Route
            index
            path="/solicitudes-creadas"
            element={<SolicitudesCreadas />}
          />
          <Route index path="/mas-informacion" element={<MasInformacion />} />
        </Route>

        <Route path="/">
          <Route exact path="login" element={<Login />} />
          <Route exact path="/recuperacion" element={<Recuperacion />} />
          <Route index path="/ayuda" element={<Ayuda />} />
        </Route>

        <Route path="/*">
          <Route element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
