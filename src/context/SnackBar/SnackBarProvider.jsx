import React, { useState } from 'react';
import SnackBarContext from './SnackBarContext';

const SnackBarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('info');
  const [message, setMessage] = useState('');

  const value = {
    open,
    message,
    severity,
    setSeverity,
    setOpen,
    setMessage,
  };

  return (
    <SnackBarContext.Provider value={value}>
      {children}
    </SnackBarContext.Provider>
  );
};

export default SnackBarProvider;
