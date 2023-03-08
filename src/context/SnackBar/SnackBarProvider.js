import React, { useState } from 'react';
import SnackBarContext from './SnackBarContext';

const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const value = {
    open,
    message,
    setOpen,
    setMessage,
  };

  return (
    <SnackBarContext.Provider value={value}>
      {children}
    </SnackBarContext.Provider>
  );
};

export default SnackbarProvider;
