import { useDispatch } from 'react-redux';
import { showToast as showToastAction, hideToast } from '../../../redux/slices/toastSlice';

export const useToast = () => {
  const dispatch = useDispatch();

  const show = (message, type = 'info') => {
    dispatch(showToastAction({ message, type }));
  };

  const success = (message) => {
    show(message, 'success');
  };

  const error = (message) => {
    show(message, 'error');
  };

  const warning = (message) => {
    show(message, 'warning');
  };

  const info = (message) => {
    show(message, 'info');
  };

  const hide = () => {
    dispatch(hideToast());
  };

  return {
    show,
    success,
    error,
    warning,
    info,
    hide,
  };
};

// Direct export functions for use outside React components
// Renamed to avoid conflict with the action creator
export const showGlobalToast = (message, type = 'info') => {
  // This will be used by interceptors
  if (typeof window !== 'undefined' && window.store) {
    window.store.dispatch(showToastAction({ message, type }));
  }
};

export const hideGlobalToast = () => {
  if (typeof window !== 'undefined' && window.store) {
    window.store.dispatch(hideToast());
  }
};