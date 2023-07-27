import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import MainAppBar from "./MainAppBar";
import MaestroDrawer from "./MaestroDrawer";

const MaestroLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <MainAppBar onToggleDrawer={drawerOpen ? closeDrawer : openDrawer} />
      <MaestroDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={drawerOpen}
        onClose={closeDrawer}
      />
    </>
  );
};

export default MaestroLayout;
