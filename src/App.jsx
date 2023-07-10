import { MainRoutes } from "./routes/MainRoutes";
import { AppContextProvider } from "./context/AppContext.jsx";
import { Loading } from "./components/UI/Loading/Loading";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import {
  Button,
  CssBaseline,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ThemeProvider,
} from "@mui/material";

import { theme } from "./utils/Theme";
import SnackBarProvider from "./context/SnackBar/SnackBarProvider.jsx";
import ModalContext, { ModalProvider } from "./context/Modal/ModalContext.jsx";
import { useContext } from "react";
import { Modal } from "./components/Modal/Modal";

const MainComponent = () => {
  const { open, content, onClose } = useContext(ModalContext);

  return (
    <>
      <Loading />
      <MainRoutes />
      <Modal isShowing={open} toggle={onClose}>
        <DialogTitle>{content?.title || "Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content?.body || "Ocurrió un error inesperado"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={onClose}>
            Cerrar
          </Button>
        </DialogActions>
      </Modal>
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <AuthContextProvider>
          <ModalProvider>
            <SnackBarProvider>
              <CssBaseline />
              <MainComponent />
            </SnackBarProvider>
          </ModalProvider>
        </AuthContextProvider>
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
