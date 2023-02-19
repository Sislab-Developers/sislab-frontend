import { useContext, useEffect, useState } from "react";

import { useLoading } from "../../context/hooks";
import AuthContext from "../../context/AuthContext";

import { getToken } from "../../utils";
import axios from "axios";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AddCircle,
  AddCircleOutline,
  CheckCircle,
  CheckCircleOutline,
  Group,
  GroupOutlined,
  Info,
  InfoOutlined,
  Logout,
} from "@mui/icons-material";

const MaestroDrawer = (props) => {
  const { variant, open, onClose } = props;

  // const API_URL = "https://sislab-backend.vercel.app";
  const API_URL = "http://localhost:8080";

  const theme = useTheme();
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { run, stop } = useLoading();
  const uid = getToken(authCtx.token, true).uid;

  useEffect(() => {
    run();
    axios.get(`${API_URL}/api/usuarios/${uid}`).then((res) => {
      setUser(res.data);
      stop();
    });
  }, [run, stop, uid]);

  const isSelected = (path) => RegExp(path).test(location.pathname);

  const navButtons = (
    <List>
      <ListItemButton
        onClick={() => {
          navigate("/mis-grupos");
          onClose();
        }}
        selected={isSelected("mis-grupos")}
      >
        <ListItemIcon>
          {/* <i className="ri-group-line" /> */}
          {isSelected("mis-grupos") ? (
            <Group color="primary" />
          ) : (
            <GroupOutlined color="primary" />
          )}
        </ListItemIcon>
        <ListItemText
          primary="Mis grupos"
          primaryTypographyProps={{
            fontWeight: isSelected("mis-grupos") ? "bold" : "normal",
            color: isSelected("mis-grupos") ? "primary" : "inherit",
          }}
        />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/nueva-solicitud");
          onClose();
        }}
        selected={isSelected("nueva-solicitud")}
      >
        <ListItemIcon>
          {/* <i className="ri-add-circle-line" /> */}
          {isSelected("nueva-solicitud") ? (
            <AddCircle color="primary" />
          ) : (
            <AddCircleOutline color="primary" />
          )}
        </ListItemIcon>
        <ListItemText
          primary="Crear nueva solicitud"
          primaryTypographyProps={{
            fontWeight: isSelected("nueva-solicitud") ? "bold" : "normal",
            color: isSelected("nueva-solicitud") ? "primary" : "inherit",
          }}
        />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/solicitudes-creadas");
          onClose();
        }}
        selected={isSelected("solicitudes-creadas")}
      >
        <ListItemIcon>
          {/* <i className="ri-checkbox-circle-line" /> */}
          {isSelected("solicitudes-creadas") ? (
            <CheckCircle color="primary" />
          ) : (
            <CheckCircleOutline color="primary" />
          )}
        </ListItemIcon>
        <ListItemText
          primary="Solicitudes creadas"
          primaryTypographyProps={{
            fontWeight: isSelected("solicitudes-creadas") ? "bold" : "normal",
            color: isSelected("solicitudes-creadas") ? "primary" : "inherit",
          }}
        />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/mas-informacion");
          onClose();
        }}
        selected={isSelected("mas-informacion")}
      >
        <ListItemIcon>
          {/* <i className="ri-information-line" /> */}
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
              {user && `Saludos, ${user.nombre}`}
            </Typography>
            <Box component="nav">{navButtons}</Box>
          </Box>
          <Box>
            <ListItemButton
              // startIcon={<i className="ri-logout-box-line" />}
              // startIcon={<Logout color="primary" />}
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

export default MaestroDrawer;
