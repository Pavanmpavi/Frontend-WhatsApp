import axios from 'axios';
import { setupInterceptors } from './interceptors';
import { API_BASE_URL } from './config';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Setup interceptors
setupInterceptors(axiosClient);

export default axiosClient;