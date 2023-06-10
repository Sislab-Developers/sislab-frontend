import { createContext, useState } from "react";
import LogoutNotice from "../components/LogoutNotice";

let logoutTimer;

const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  user: {
    uid: null,
    rol: null,
    nombre: null,
    apellidoPaterno: null,
    apellidoMaterno: null,
    correo: null,
    createdAt: null,
    updatedAt: null,
    estado: false,
  },
  login: (
    accessToken,
    refreshToken,
    expirationDate,
    keepLoggedIn,
    userData
  ) => {},
  logout: () => {},
});

const calcRemainingTime = (expirationDate) => {
  const current = new Date().getTime();
  const expirationTime = new Date(expirationDate).getTime();

  return expirationTime - current;
};

export const AuthContextProvider = (props) => {
  // const authData = retrieveAuthData();

  const [showNotice, setShowNotice] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const isLoggedIn = !!token;

  const loggedOutNotice = () => {
    setShowNotice(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiresIn");
    setToken(null);
    setShowNotice(false);

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const loginHandler = (
    accessToken,
    refreshToken,
    expirationDate,
    keepLoggedIn,
    userData
  ) => {
    if (keepLoggedIn) localStorage.setItem("token", accessToken);

    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("expiresIn", expirationDate);
    setToken(accessToken);
    setUser(userData);

    const remaining = calcRemainingTime(expirationDate);
    // console.log(remaining);
    logoutTimer = setTimeout(loggedOutNotice, remaining);
  };

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    user: user,
  };

  // if (authData.duration) {
  //   logoutTimer = setTimeout(loggedOutNotice, authData.duration);
  // }

  return (
    <AuthContext.Provider value={contextValue}>
      <LogoutNotice
        open={showNotice}
        onClose={() => setShowNotice(false)}
        onLogin={loginHandler}
        onLogout={logoutHandler}
      />
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
