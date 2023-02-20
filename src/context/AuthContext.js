import { createContext, useState } from "react";

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
  login: (token, expirationDate) => {},
  logout: () => {},
});

const calcRemainingTime = (expirationDate) => {
  const current = new Date().getTime();
  const expirationTime = new Date(expirationDate).getTime();

  return expirationTime - current;
};

const retrieveAuthData = () => {
  const storedToken = localStorage.getItem("token");
  const storedTimer = localStorage.getItem("expiresIn");

  const remaining = calcRemainingTime(storedTimer);

  if (remaining <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");

    return {
      token: null,
      duration: null,
    };
  }

  return {
    token: storedToken,
    duration: remaining,
  };
};

export const AuthContextProvider = (props) => {
  const authData = retrieveAuthData();
  const [token, setToken] = useState(authData.token);
  const isLoggedIn = !!token;

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    setToken(null);

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const loginHandler = (token, expirationDate, keepLoggedIn, userData) => {
    if (keepLoggedIn) localStorage.setItem("token", token);

    localStorage.setItem("expiresIn", expirationDate);
    setToken(token);

    const remaining = calcRemainingTime(expirationDate);
    console.log(remaining);
    logoutTimer = setTimeout(logoutHandler, remaining);
  };

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  if (authData.duration) {
    logoutTimer = setTimeout(logoutHandler, authData.duration);
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
