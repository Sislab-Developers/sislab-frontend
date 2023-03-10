import React, { useState } from 'react';
import ModalContext from './ModalContext';

const ModalProvider = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  const value = {
    isShowing,
    setIsShowing,
    toggle,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
