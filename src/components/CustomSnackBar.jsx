import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContext from '../context/SnackBar/SnackBarContext';
import { Alert } from '@mui/material';
import { fontSize } from '@mui/system';

const CustomSnackbar = () => {
  const { open, message, setOpen } = useContext(SnackbarContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ fontSize: 2 }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
