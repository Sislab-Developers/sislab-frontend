import React from 'react';

const ModalContext = React.createContext({
  isShowing: false,
  setIsShowing: () => {},
  toggle: () => {},
});

export default ModalContext;
