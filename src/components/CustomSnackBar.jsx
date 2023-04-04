import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContext from '../context/SnackBar/SnackBarContext';
import { Alert } from '@mui/material';

const CustomSnackbar = () => {
  const { open, message, setOpen, severity } = useContext(SnackbarContext);

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
      <Alert severity={severity} sx={{ fontSize: 2, maxWidth: '60%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
