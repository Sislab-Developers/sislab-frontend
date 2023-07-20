import { useContext } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  CheckCircle,
  CheckCircleOutline,
  Group,
  GroupOutlined,
  Info,
  InfoOutlined,
  Logout,
  // Notifications,
  // NotificationsOutlined,
} from "@mui/icons-material";

import AuthContext from "../../../context/AuthContext.jsx";

const AdminDrawer = (props) => {
  const { variant, open, onClose } = props;

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = (path) => RegExp(path).test(location.pathname);

  const navButtons = (
    <List>
      <ListItemButton
        onClick={() => {
          navigate("/admin/solicitudes");
          onClose();
        }}
        selected={isSelected("solicitudes")}
      >
        <ListItemIcon>
          {isSelected("solicitudes") ? (
            <CheckCircle color="primary" />
          ) : (
            <CheckCircleOutline color="primary" />
          )}
        </ListItemIcon>
        <ListItemText
          primary="Solicitudes"
          primaryTypographyProps={{
            fontWeight: isSelected("solicitudes") ? "bold" : "normal",
            color: isSelected("solicitudes") ? "primary" : "inherit",
          }}
        />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/admin/usuarios");
          onClose();
        }}
        selected={isSelected("usuarios")}
      >
        <ListItemIcon>
          {isSelected("usuarios") ? (
            <Group color="primary" />
          ) : (
            <GroupOutlined color="primary" />
          )}
        </ListItemIcon>
        <ListItemText
          primary="Usuarios"
          primaryTypographyProps={{
            fontWeight: isSelected("usuarios") ? "bold" : "normal",
            color: isSelected("usuarios") ? "primary" : "inherit",
          }}
        />
      </ListItemButton>
      {/* <ListItemButton
        disabled
        onClick={() => {
          navigate("/admin/notificaciones");
          onClose();
        }}
        selected={isSelected("notificaciones")}
      >
        <ListItemIcon>
          {isSelected("notificaciones") ? (
            <Notifications color="primary" />
          ) : (
            <NotificationsOutlined color="primary" />
          )}
        </ListItemIcon>
        <ListItemText
          primary="Notificaciones"
          primaryTypographyProps={{
            fontWeight: isSelected("notificaciones") ? "bold" : "normal",
            color: isSelected("notificaciones") ? "primary" : "inherit",
          }}
        />
      </ListItemButton> */}
      <ListItemButton
        onClick={() => {
          navigate("/admin/mas-informacion");
          onClose();
        }}
        selected={isSelected("mas-informacion")}
      >
        <ListItemIcon>
          {isSelected("mas-informacion") ? (
            <Info color="primary" />
          ) : (
            <InfoOutlined color="primary" />
          )}
        </ListItemIcon>
        <ListItemText
          primary="Más información"
          primaryTypographyProps={{
            fontWeight: isSelected("mas-informacion") ? "bold" : "normal",
            color: isSelected("mas-informacion") ? "primary" : "inherit",
          }}
        />
      </ListItemButton>
    </List>
  );

  return (
    <Box component="div" sx={{ width: { sm: "280px" } }}>
      <Drawer
        variant={variant}
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "255 px", sm: "280px" },
          },
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            mt: "48px",
            mb: { xs: "48px", sm: 0 },
            height: "100%",
          }}
        >
          <Box sx={{ mt: "8px" }}>
            <Typography variant="h6" sx={{ px: "16px" }}>
              {authCtx.user && `Hola ${authCtx.user.nombre}`}
            </Typography>
            <Box component="nav">{navButtons}</Box>
          </Box>
          <Box>
            <ListItemButton
              onClick={() => {
                authCtx.logout();
                navigate("/login");
                onClose();
              }}
            >
              <ListItemIcon>{<Logout color="primary" />}</ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default AdminDrawer;
