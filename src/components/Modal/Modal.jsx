import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Modal = ({ isShowing, toggle, children }) => {
  return (
    <>
      <Dialog
        open={isShowing}
        TransitionComponent={Transition}
        keepMounted
        onClose={toggle}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
};
