import React from 'react';

const ModalContext = React.createContext({
  isShowing: false,
  setIsShowing: () => {},
});

export default ModalContext;
