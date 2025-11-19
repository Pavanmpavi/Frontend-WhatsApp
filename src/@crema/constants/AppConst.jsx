export const authRole = {
  SuperAdmin:['superadmin'],
  Admin: ['admin'],
  User: ['user'],
  Default : ['default']
};

export const defaultUser = {
  name: 'John Alex',
  email: 'demo@example.com',
  token: 'access-token',
  role: 'user',
  photoURL: '/assets/images/avatar/A11.jpg',
};
export const getInitialUrlByRole = (role) => {
  switch (role) {
    case 'admin':
      return '/dashboards/crypto';
   
    case 'user':
      return '/dashboards/e-commerce';
    default:
      return '/dashboards/e-commerce';
  }
};
export const allowMultiLanguage = import.meta.env.VITE__MULTILINGUAL === 'true';
export const fileStackKey = import.meta.env.VITE__FILESTACK_KEY;
export const initialUrl = import.meta.env.VITE__INITIAL_URL; // this url will open after login
export const adminInitialUrl = import.meta.env.VITE__INITIAL_URL;


export const baseUrl = "http://localhost:3001/"
export const mediaUrl = "http://localhost:3500"


