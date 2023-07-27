import { useContext } from "react";

import { Outlet } from "react-router-dom";

import { useAuth, useUser } from "@clerk/clerk-react";

import { Toaster } from "react-hot-toast";

import { Box, Button, CircularProgress, Typography } from "@mui/material";

import AuthContext, { AuthContextProvider } from "../context/AuthContext.jsx";

import MainContent from "./UI/MainContent";
import MaestroLayout from "./UI/MaestroLayout";
import { AdminLayout } from "./UI/Admin/AdminLayout";
import { LoginBackground } from "./UI/LoginBackground/LoginBackground.jsx";
import { TextEmphasis } from "./TextEmphasis/TextEmphasis.jsx";
import instance from "../utils/axiosConfig.js";

const Layout = () => {
  const { getToken, signOut } = useAuth();
  const {
    user,
    isQueryError,
    isQueryLoading,
    refetch,
    isMutationLoading,
    isMutationError,
  } = useContext(AuthContext);

  instance.interceptors.request.use(
    async (config) => {
      config.headers.Authorization = `Bearer ${await getToken()}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  if (isMutationLoading) {
    return (
      <LoginBackground>
        <CircularProgress />
        <Typography textAlign="center">
          Conectando al servicio de autenticación
        </Typography>
      </LoginBackground>
    );
  }

  if (isQueryLoading) {
    return (
      <LoginBackground>
        <CircularProgress />
        <Typography textAlign="center">Obteniendo datos de usuario</Typography>
      </LoginBackground>
    );
  }

  if (isMutationError) {
    return (
      <LoginBackground>
        <Typography>
          Ocurrió un error al crear tu usuario. Por favor, contacta a un
          administrador.
        </Typography>
        <Button variant="contained" onClick={signOut}>
          Cerrar sesión
        </Button>
      </LoginBackground>
    );
  }

  if (isQueryError) {
    return (
      <LoginBackground>
        <Typography>Ocurrió un error al obtener tus datos</Typography>
        <Button variant="contained" onClick={refetch}>
          Reintentar
        </Button>
      </LoginBackground>
    );
  }

  if (user && (!user.status || user.role.name === "Sin asignar")) {
    return (
      <LoginBackground>
        <Typography variant="h1">No autorizado</Typography>
        <Typography>
          Tu cuenta está inactiva o no tienes un rol asignado. Si acabas de
          crear tu cuenta, por favor espera a que un administrador la active y
          te asigne un rol.
        </Typography>
        <Typography>
          Si ya se te ha asignado un rol, refresca la página o haz clic en{" "}
          <TextEmphasis>Reintentar</TextEmphasis>.
        </Typography>
        <Typography>
          Si crees que esto se trata de un error, por favor contacta con uno de
          los administradores.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "0.5rem",
            width: "100%",
          }}
        >
          <Button variant="contained" onClick={refetch}>
            Reintentar
          </Button>
          <Button variant="contained" onClick={signOut}>
            Cerrar sesión
          </Button>
        </Box>
      </LoginBackground>
    );
  }

  return (
    <>
      {user.role.name === "Profesor" && <MaestroLayout />}
      {user.role.name === "Administrador" && <AdminLayout />}
      <MainContent>
        <Toaster toastOptions={{ position: "bottom-center" }} />
        <Outlet />
      </MainContent>
    </>
  );
};

export const LayoutWrapper = () => {
  const { signOut } = useAuth();
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return (
      <LoginBackground>
        <CircularProgress />
        <Typography textAlign="center">
          Conectando con el servicio de autenticación
        </Typography>
      </LoginBackground>
    );
  }

  if (!user) {
    return (
      <LoginBackground>
        <Typography textAlign="center">
          Ocurrió un error al conectar con el servicio de autenticación. Vuelve
          a intentarlo más tarde
        </Typography>
        <Button variant="contained" onClick={signOut}>
          Cerrar sesión
        </Button>
      </LoginBackground>
    );
  }

  return (
    <AuthContextProvider>
      <Layout />
    </AuthContextProvider>
  );
};
