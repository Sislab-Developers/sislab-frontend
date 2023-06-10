import { MainRoutes } from './routes/MainRoutes';
import { AppContextProvider } from './context/AppContext.jsx';
import { Loading } from './components/UI/Loading/Loading';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from './utils/Theme';
import SnackBarProvider from './context/SnackBar/SnackBarProvider.jsx';
import ModalProvider from './context/Modal/ModalProvider.jsx';

const MainComponent = () => {
  return (
    <>
      <Loading/>
      <MainRoutes/>
    </>
  );
};

function App() {
  return (
    <ModalProvider>
      <SnackBarProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <AppContextProvider>
            <AuthContextProvider>
              <MainComponent/>
            </AuthContextProvider>
          </AppContextProvider>
        </ThemeProvider>
      </SnackBarProvider>
    </ModalProvider>
  );
}

export default App;
