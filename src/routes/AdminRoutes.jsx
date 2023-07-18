import { useContext } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { MasInformacion } from "../pages";
import { AdminRequests } from "../pages/AdminRequests/AdminRequests.jsx";

import { Layout } from "../components";

import AuthContext from "../context/AuthContext.jsx";

export const AdminRoutes = () => {
  const authCtx = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            authCtx.isLoggedIn && authCtx.user.rol === "ADMIN" ? (
              <Layout />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index path="/*" element={<Navigate to="/" />} />
          <Route index path="/" element={<Navigate to="/solicitudes" />} />
          <Route index path="/solicitudes" element={<AdminRequests />} />
          <Route index path="/usuarios" element={<p>Usuarios</p>} />
          <Route index path="/notificaciones" element={<p>Notificaciones</p>} />
          <Route index path="/mas-informacion" element={<MasInformacion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
