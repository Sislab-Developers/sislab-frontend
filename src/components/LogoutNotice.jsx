import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Modal,
  Typography,
} from "@mui/material";
import { useLoading } from "../context/hooks";

import instance from "../utils/axiosConfig";

const LogoutNotice = (props) => {
  const { open, onClose, onLogin: relog, onLogout: logout } = props;
  const { run: startLoading, stop: stopLoading } = useLoading();

  const revalidateToken = () => {
    instance
      .post("/auth/refresh", {
        refreshToken: localStorage.getItem("refreshToken"),
      })
      .then((response) => {
        const { accessToken, refreshToken, expiresIn } = response;

        const expirationDate = new Date(
          new Date().getTime() + expiresIn * 1000
        );

        relog(accessToken, refreshToken, expirationDate, false);
        startLoading();

        setTimeout(stopLoading, 1500);
      });

    onClose();
  };

  const logOut = () => {
    logout();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "35%", md: "350px" },
          outline: 0,
        }}
      >
        <Card>
          <CardHeader title="Sesión expirada" />
          <CardContent>
            <Typography variant="body1">
              Tu sesión ha expirado. Puedes revalidarla o volver a iniciar
              sesión manualmente.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={logOut}
              color="error"
              sx={{ textTransform: "none" }}
            >
              Salir
            </Button>
            <Button
              variant="contained"
              onClick={revalidateToken}
              color="primary"
              sx={{ textTransform: "none" }}
            >
              Revalidar
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
};

export default LogoutNotice;
