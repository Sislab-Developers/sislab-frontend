import { createContext, useReducer, useContext } from 'react';

const initialState = {
  loading: false,
  login: false,
  alerts: [],
};

const reducers = (state, action) => {
  switch (action.type) {
    case 'LOADING_RUN':
      return {
        ...state,
        loading: true,
      };
    case 'LOADING_STOP':
      return {
        ...state,
        loading: false,
      };
    case 'LOGGED_IN':
      return {
        ...state,
        logged: true,
      };
    case 'LOGGED_OUT':
      return {
        ...state,
        logged: false,
      };
    default:
      return { ...state };
  }
};

const AppContext = createContext();

const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  return <AppContext.Provider value={{ state, dispatch }} {...props} />;
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
