/* eslint-disable no-unused-vars */
import { createContext, useCallback, useState } from "react";

const ModalContext = createContext({
  open: false,
  content: { title: null, content: null },
  onClose: () => {},
  updateContent: (content) => {},
});

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);

  const handleClose = useCallback(() => {
    setOpen(false);
    setContent({ title: null, content: null });
  }, []);

  const updateContent = useCallback((newContent) => {
    setContent((prev) => ({ ...prev, ...newContent }));
    setOpen(true);
  }, []);

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
