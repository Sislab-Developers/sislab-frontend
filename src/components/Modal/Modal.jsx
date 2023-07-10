import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Modal = ({ isShowing, toggle, children }) => {
  return (
    <Dialog
      open={isShowing}
      TransitionComponent={Transition}
      onClose={toggle}
      sx={{ maxWidth: { xs: "90%", sm: "50%" }, mx: "auto" }}
    >
      {children}
    </Dialog>
  );
};
