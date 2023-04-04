import { useState } from "react";

import { useMediaQuery, useTheme } from "@mui/material";

import MainAppBar from "../MainAppBar";
import AdminDrawer from "./AdminDrawer";

export const AdminLayout = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);

  const closeDrawer = () => setDrawerOpen(false);

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
