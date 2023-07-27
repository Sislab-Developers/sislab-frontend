import { useState } from "react";

import { useMediaQuery, useTheme } from "@mui/material";

import MainAppBar from "../MainAppBar";
import AdminDrawer from "./AdminDrawer";
import { useLocation, useNavigate } from "react-router-dom";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);

  const closeDrawer = () => setDrawerOpen(false);

  if (!/app\/admin/i.test(location.pathname)) {
    navigate("/app/admin");
  }

  return (
    <>
      <MainAppBar onToggleDrawer={drawerOpen ? closeDrawer : openDrawer} />
      <AdminDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={drawerOpen}
        onClose={closeDrawer}
      />
    </>
  );
};
