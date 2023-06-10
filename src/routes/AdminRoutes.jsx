import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import { MasInformacion } from "../pages";

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
          <Route index path="/solicitudes" element={<p>Solicitudes</p>} />
          <Route index path="/usuarios" element={<p>Usuarios</p>} />
          <Route index path="/notificaciones" element={<p>Notificaciones</p>} />
          <Route index path="/mas-informacion" element={<MasInformacion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
