import { MainRoutes } from './routes/MainRoutes';
import { AppContextProvider } from './context/AppContext';
import { Loading } from './components/UI/Loading/Loading';
import { AuthContextProvider } from './context/AuthContext';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from './utils/Theme';

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContextProvider>
        <AuthContextProvider>
          <MainComponent />
        </AuthContextProvider>
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
