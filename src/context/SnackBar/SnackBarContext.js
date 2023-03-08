import React from 'react';

const SnackbarContext = React.createContext({
  open: false,
  message: '',
  setOpen: () => {},
  setMessage: () => {},
});

export default SnackbarContext;
