import { useLocation, useNavigate } from "react-router-dom";

import { useAuth, useUser } from "@clerk/clerk-react";

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

  const { user } = useUser();
  const { signOut } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = (path) => RegExp(path).test(location.pathname);

  const navButtons = (
    <List>
      <ListItemButton
        onClick={() => {
          navigate("/app/mis-grupos");
          onClose();
        }}
        selected={isSelected("mis-grupos")}
      >
        <ListItemIcon>
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
          navigate("/app/nueva-solicitud");
          onClose();
        }}
        selected={isSelected("nueva-solicitud")}
      >
        <ListItemIcon>
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
          navigate("/app/solicitudes-creadas");
          onClose();
        }}
        selected={isSelected("solicitudes-creadas")}
      >
        <ListItemIcon>
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
          navigate("/app/mas-informacion");
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
              {user && `Hola, ${user?.firstName}`}
            </Typography>
            <Box component="nav">{navButtons}</Box>
          </Box>
          <Box>
            <ListItemButton
              onClick={() => {
                signOut();
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
