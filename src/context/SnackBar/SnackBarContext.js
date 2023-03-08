import React from 'react';

const SnackbarContext = React.createContext({
  open: false,
  message: '',
  severity: 'info',
  setSeverity: () => {},
  setOpen: () => {},
  setMessage: () => {},
});

export default SnackbarContext;
