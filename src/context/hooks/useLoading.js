import { useMemo } from "react";
import { useAppContext } from "../AppContext";

export const useLoading = () => {
  const { dispatch } = useAppContext();

  const loading = useMemo(
    () => ({
      run: () => dispatch({ type: "LOADING_RUN" }),
      stop: () => dispatch({ type: "LOADING_STOP" }),
    }),
    [dispatch]
  );

  return loading;
};
