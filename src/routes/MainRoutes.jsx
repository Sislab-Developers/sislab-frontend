import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { Layout } from "../components";

import {
  CrearNuevaSolicitud,
  MisGrupos,
  SolicitudesCreadas,
  MasInformacion,
  Recuperacion,
  Ayuda,
  Login,
} from "../pages";
import { AdminRequests } from "../pages/AdminRequests/AdminRequests.jsx";
import { UsersPage } from "../pages/UsersPage/UsersPage.jsx";

export const MainRoutes = () => {
  const authCtx = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            authCtx.isLoggedIn && authCtx.user.rol === "MAESTRO" ? (
              <Layout />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index path="/*" element={<Navigate to="/" />} />
          <Route index path="/" element={<CrearNuevaSolicitud />} />
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

        <Route
          path="/admin"
          element={
            authCtx.isLoggedIn && authCtx.user.rol === "ADMIN" ? (
              <Layout />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index path="/admin/*" element={<Navigate to="/" />} />
          <Route
            index
            path="/admin/"
            element={<Navigate to="/solicitudes" />}
          />
          <Route index path="/admin/solicitudes" element={<AdminRequests />} />
          <Route index path="/admin/usuarios" element={<UsersPage />} />
          <Route
            index
            path="/admin/notificaciones"
            element={<p>Notificaciones</p>}
          />
          <Route
            index
            path="/admin/mas-informacion"
            element={<MasInformacion />}
          />
        </Route>

        <Route path="/">
          <Route exact path="/login" element={<Login />} />
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
