export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  USERS: '/user',
  PRODUCTS: '/products',
  ORDERS: '/orders',
  CATEGORIES: '/categories',
  UPLOAD: '/upload',
  ORDERS:'/orders',
  // Dynamic endpoints helper functions
  userById: (userId) => `/user/${userId}`,
  userProfile: (userId) => `/user/${userId}/profile`,
  userAvatar: (userId) => `/user/${userId}/avatar`,
};