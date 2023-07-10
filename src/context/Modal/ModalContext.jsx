/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";

const ModalContext = createContext({
  open: false,
  content: { title: null, body: null },
  onClose: () => {},
  updateContent: (content) => {},
});

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setContent({ title: null, body: null });
  };

  const updateContent = (newContent) => {
    setContent((prev) => ({ ...prev, ...newContent }));
    setOpen(true);
  };

  const value = {
    open,
    content,
    onClose: handleClose,
    updateContent,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalContext;
