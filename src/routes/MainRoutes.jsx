import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "../utils/authServices";
import { Layout } from "../components";
import { useEffect } from "react";

import {
  CrearNuevaSolicitud,
  MisGrupos,
  SolicitudesCreadas,
  MasInformacion,
  Recuperacion,
  Ayuda,
  Login,
  MaestroDashBoard,
} from "../pages";

export const MainRoutes = () => {

  const logged = getToken();
   
  return (
    <BrowserRouter>
      <Routes>
        <Route element={logged ? <Layout /> : <Navigate to="/login" />}>
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
