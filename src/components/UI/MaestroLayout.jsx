import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import MaestroAppBar from "./MaestroAppBar";
import MaestroDrawer from "./MaestroDrawer";

const MaestroLayout = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <MaestroAppBar onToggleDrawer={drawerOpen ? closeDrawer : openDrawer} />
      <MaestroDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={drawerOpen}
        onClose={closeDrawer}
      />
    </>
  );
};

export default MaestroLayout;
