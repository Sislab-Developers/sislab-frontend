import React, { useState } from 'react';
import ModalContext from './ModalContext';

const ModalProvider = ({ children }) => {
  const [isShowing, setIsShowing] = useState(true);

  const value = {
    isShowing,
    setIsShowing,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
