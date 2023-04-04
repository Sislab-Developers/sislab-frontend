import { Outlet } from "react-router-dom";
import MaestroContent from "./UI/MaestroContent";
import MaestroLayout from "./UI/MaestroLayout";

export const Layout = () => {
  return (
    <>
      <MaestroLayout />
      <MaestroContent>
        <Outlet />
      </MaestroContent>
    </>
  );
};
