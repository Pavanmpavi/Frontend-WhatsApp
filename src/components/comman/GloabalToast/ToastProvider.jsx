import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../../../redux/slices/toastSlice';

const ToastProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { open, message, type } = useSelector((state) => state.toast);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    dispatch(hideToast());
  };

  return (
    <>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleClose} 
          severity={type} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ToastProvider;