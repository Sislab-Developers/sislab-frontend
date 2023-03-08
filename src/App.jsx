import { MainRoutes } from './routes/MainRoutes';
import { AppContextProvider } from './context/AppContext';
import { Loading } from './components/UI/Loading/Loading';
import { AuthContextProvider } from './context/AuthContext';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from './utils/Theme';
import SnackbarProvider from './context/SnackBar/SnackBarProvider';

const MainComponent = () => {
  return (
    <>
      <Loading />
      <MainRoutes />
    </>
  );
};

function App() {
  return (
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContextProvider>
          <AuthContextProvider>
            <MainComponent />
          </AuthContextProvider>
        </AppContextProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
