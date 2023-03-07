import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Modal = ({ isShowing, hide, children }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div>
            <Dialog
              open={isShowing}
              TransitionComponent={Transition}
              keepMounted
              onClose={hide}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogContent>{children}</DialogContent>
            </Dialog>
          </div>
        </>,
        document.body
      )
    : null;
