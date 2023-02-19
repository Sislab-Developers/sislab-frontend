import "./index.css";
import { MainRoutes } from "./routes/MainRoutes";
import { AppContextProvider } from "./context/AppContext";
import { Loading } from "./components/UI/Loading";
import { AuthContextProvider } from "./context/AuthContext";
//import { Loading } from './components/UI/Loading';
//import { ToastContainer } from 'react-toastify';

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
    <AppContextProvider>
      <AuthContextProvider>
        <MainComponent />
      </AuthContextProvider>
    </AppContextProvider>
  );
}

export default App;
