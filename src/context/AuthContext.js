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
  login: (accessToken, refreshToken, expirationDate) => {},
  logout: () => {},
});

const calcRemainingTime = (expirationDate) => {
  const current = new Date().getTime();
  const expirationTime = new Date(expirationDate).getTime();

  return expirationTime - current;
};

// const retrieveAuthData = () => {
//   const storedToken = localStorage.getItem("token");
//   const storedTimer = localStorage.getItem("expiresIn");

//   const remaining = calcRemainingTime(storedTimer);

//   if (remaining <= 60000) {
//     localStorage.removeItem("token");
//     localStorage.removeItem("expiresIn");

//     return {
//       token: null,
//       duration: null,
//     };
//   }

//   return {
//     token: storedToken,
//     duration: 10000,
//   };
// };

export const AuthContextProvider = (props) => {
  // const authData = retrieveAuthData();

  const [showNotice, setShowNotice] = useState(false);
  const [token, setToken] = useState(null);
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

    const remaining = calcRemainingTime(expirationDate);
    // console.log(remaining);
    logoutTimer = setTimeout(loggedOutNotice, remaining);
  };

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
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
