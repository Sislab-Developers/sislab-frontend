import React, { useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import ModalContext from '../../context/Modal/ModalContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Modal = ({ children }) => {
  const { isShowing, setIsShowing } = useContext(ModalContext);

  console.log(isShowing);
  const handleClose = () => {
    setIsShowing(false);
  };

  return (
    <>
      <Dialog
        open={isShowing}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
};
