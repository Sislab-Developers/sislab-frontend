import { useContext } from "react";

import { Outlet } from "react-router-dom";

import AuthContext from "../context/AuthContext.jsx";

import MainContent from "./UI/MainContent";
import MaestroLayout from "./UI/MaestroLayout";
import { AdminLayout } from "./UI/Admin/AdminLayout";
import { Toaster } from "react-hot-toast";

export const Layout = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      {authCtx.user.rol === "MAESTRO" && <MaestroLayout />}
      {authCtx.user.rol === "ADMIN" && <AdminLayout />}
      <MainContent>
        <Toaster toastOptions={{ position: "bottom-center" }} />
        <Outlet />
      </MainContent>
    </>
  );
};
