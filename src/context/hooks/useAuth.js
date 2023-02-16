import { useMemo } from "react";
import { useAppContext } from "../AppContext";

export const useAuth = () => {
  const { dispatch } = useAppContext();

  const loading = useMemo(
    () => ({
      login: () => dispatch({ type: "LOGGED_IN" }),
      logout: () => dispatch({ type: "LOGGED_OUT" }),
    }),
    [dispatch]
  );

  return loading;
};
