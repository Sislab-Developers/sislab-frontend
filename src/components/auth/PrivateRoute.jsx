import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";
import { Navigate, Route } from "react-router-dom";

export const PrivateRoute = (props) => {
  const { children, ...rest } = props;
  const authCtx = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() =>
        authCtx.user.rol === "ADMIN" ? children : <Navigate to="/" />
      }
    />
  );
};
