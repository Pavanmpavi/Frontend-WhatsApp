import { showGlobalToast } from '../../components/comman/GloabalToast/UseToast';
import { store } from '../../redux/store';
// import { logout } from '../../redux/slices/authSlice';

export const setupInterceptors = (axiosInstance) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // Try to get token from multiple sources
      let token = null;
      
      // 1. First try Redux store
      const state = store.getState();
      token = state?.auth?.token;
      
      // 2. If not in Redux, try localStorage (for JWT context)
      if (!token) {
        token = localStorage.getItem('token');
      }
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn('⚠️ No auth token found for API request');
        delete config.headers.Authorization;
      }
      
      console.log('🔐 API Request with token:', !!token);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const { response } = error;
      
      if (response) {
        switch (response.status) {
          case 401:
            // Clear both systems on 401
            const token = localStorage.getItem('token');
            if (token) {
              // Only logout if we actually had a token
              // store.dispatch(logout());
              localStorage.removeItem('token');
              showGlobalToast('Session expired. Please login again.', 'error');
            }
            break;
          case 403:
            showGlobalToast('You do not have permission to perform this action.', 'error');
            break;
          case 404:
            showGlobalToast('Requested resource not found.', 'error');
            break;
          case 500:
            showGlobalToast('Server error. Please try again later.', 'error');
            break;
          default:
            showGlobalToast(response.data?.message || 'Something went wrong!', 'error');
        }
      } else {
        showGlobalToast('Network error. Please check your connection.', 'error');
      }
      
      return Promise.reject(error);
    }
  );
};