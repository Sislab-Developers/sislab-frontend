import { useContext } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "../../../context/AuthContext";

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

const AdminDrawer = (props) => {
  const { variant, open, onClose } = props;

  const theme = useTheme();
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
            <i
              className="ri-checkbox-circle-fill"
              style={{ color: theme.palette.primary.main }}
            />
          ) : (
            <i
              className="ri-checkbox-circle-line"
              style={{ color: theme.palette.primary.main }}
            />
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
            <i
              className="ri-group-fill"
              style={{ color: theme.palette.primary.main }}
            />
          ) : (
            <i
              className="ri-group-line"
              style={{ color: theme.palette.primary.main }}
            />
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
      <ListItemButton
        onClick={() => {
          navigate("/admin/notificaciones");
          onClose();
        }}
        selected={isSelected("notificaciones")}
      >
        <ListItemIcon>
          {isSelected("notificaciones") ? (
            <i
              className="ri-notification-fill"
              style={{ color: theme.palette.primary.main }}
            />
          ) : (
            <i
              className="ri-notification-line"
              style={{ color: theme.palette.primary.main }}
            />
          )}
        </ListItemIcon>
        <ListItemText
          primary="Notificaciones"
          primaryTypographyProps={{
            fontWeight: isSelected("notificaciones") ? "bold" : "normal",
            color: isSelected("notificaciones") ? "primary" : "inherit",
          }}
        />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/admin/mas-informacion");
          onClose();
        }}
        selected={isSelected("mas-informacion")}
      >
        <ListItemIcon>
          {isSelected("mas-informacion") ? (
            <i
              className="ri-information-fill"
              style={{ color: theme.palette.primary.main }}
            />
          ) : (
            <i
              className="ri-information-line"
              style={{ color: theme.palette.primary.main }}
            />
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
              <ListItemIcon>
                {
                  <i
                    className="ri-logout-box-line"
                    style={{ color: theme.palette.primary.main }}
                  />
                }
              </ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default AdminDrawer;
