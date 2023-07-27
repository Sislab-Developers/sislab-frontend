import { AppBar, Icon, IconButton, Toolbar, useTheme } from "@mui/material";
import { Menu } from "@mui/icons-material";

import sislabLogo from "../../assets/img/logowhite.svg";

const MainAppBar = (props) => {
  const theme = useTheme();

  return (
    <AppBar
      elevation={0}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          onClick={props.onToggleDrawer}
          sx={{ color: "white", display: { xs: "inline-flex", sm: "none" } }}
        >
          <Menu />
        </IconButton>
        <Icon
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img src={sislabLogo} alt="Logo de Sislab" />
        </Icon>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
