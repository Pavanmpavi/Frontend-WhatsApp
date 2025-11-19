import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useToast } from './UseToast';

// This component can be used for custom toast notifications
const GlobalToast = () => {
  const { hide } = useToast();

  return null; // The actual toast is handled by ToastProvider
};

export default GlobalToast;