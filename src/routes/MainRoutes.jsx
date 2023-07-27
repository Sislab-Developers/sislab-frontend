import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { LayoutWrapper } from "../components";

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
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { ClerkLogin } from "../pages/Login/ClerkLogin.jsx";
import { ClerkSignup } from "../pages/Signup/ClerkSignup.jsx";
import { esES } from "@clerk/localizations";

if (!import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing publishable key!");
}

const clerkPubKey = import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY;

export const MainRoutes = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
      localization={esES}
      signInUrl="/login"
      signUpUrl="/signup"
    >
      <Routes>
        <Route path="/" element={<Navigate to="/app" />} />
        <Route path="/login" element={<ClerkLogin />} />
        <Route path="/signup" element={<ClerkSignup />} />
        <Route
          path="/app/*"
          element={
            <>
              <SignedIn>
                <Routes>
                  <Route path="/" element={<LayoutWrapper />}>
                    <Route index element={<CrearNuevaSolicitud />} />
                    <Route
                      path="/nueva-solicitud"
                      element={<CrearNuevaSolicitud />}
                    />
                    <Route path="/mis-grupos" element={<MisGrupos />} />
                    <Route
                      path="/solicitudes-creadas"
                      element={<SolicitudesCreadas />}
                    />
                    <Route
                      path="/mas-informacion"
                      element={<MasInformacion />}
                    />
                    <Route
                      path="/admin/*"
                      element={
                        <Routes>
                          <Route index element={<AdminRequests />} />
                          <Route
                            path="/solicitudes"
                            element={<AdminRequests />}
                          />
                          <Route path="/usuarios" element={<UsersPage />} />
                          <Route
                            path="/mas-informacion"
                            element={<MasInformacion />}
                          />
                        </Routes>
                      }
                    ></Route>
                  </Route>
                </Routes>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* <Route
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
          <Route path="/admin/crear-usuario" element={<CreateUser />} />
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
        </Route> */}
      </Routes>
    </ClerkProvider>
  );
};
