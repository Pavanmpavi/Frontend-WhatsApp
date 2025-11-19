// import React, { createContext, useContext, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import jwtAxios, { setAuthToken } from './index';
// import { useInfoViewActionsContext } from '../../../context/AppContextProvider/InfoViewContextProvider';

// const JWTAuthContext = createContext();
// const JWTAuthActionsContext = createContext();

// export const useJWTAuth = () => useContext(JWTAuthContext);

// export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

// const JWTAuthAuthProvider = ({ children }) => {
//   const { fetchStart, fetchSuccess, fetchError } = useInfoViewActionsContext();
//   const [authData, setJWTAuthData] = useState({
//     user: null,
//     isAuthenticated: false,
//     isLoading: true,
//   });
//  const updateAuthUser = (updatedUser) => {
//     setJWTAuthData(prev => ({
//       ...prev,
//       user: { ...prev.user, ...updatedUser }
//     }));
//   };

//   useEffect(() => {
//     const getAuthUser = () => {
//       fetchStart();
//       const token = localStorage.getItem('token');

//       if (!token) {
//         fetchSuccess();
//         setJWTAuthData({
//           user: undefined,
//           isLoading: false,
//           isAuthenticated: false,
//         });
//         return;
//       }
//       setAuthToken(token);
//       jwtAxios
//         .get('/auth') // Updated to match your backend route
//         .then(({ data }) => {
//           fetchSuccess();
//           setJWTAuthData({
//             user: data,
//             isLoading: false,
//             isAuthenticated: true,
//           });
//         })
//         .catch((error) => {
//           console.error('Auth check failed:', error);
//           localStorage.removeItem('token');
//           setJWTAuthData({
//             user: undefined,
//             isLoading: false,
//             isAuthenticated: false,
//           });
//           fetchSuccess();
//         });
//     };

//     getAuthUser();
//   }, []);

//   const signInUser = async ({ email, password }) => {
//     fetchStart();
//     try {
//       const { data } = await jwtAxios.post('/auth/login', { email, password }); // Updated endpoint
//       console.log('Login API response:', data);
//       // Assuming your backend returns data in this format
//       const { user, tokens } = data;
//       localStorage.setItem('token', tokens.access.token);
//       setAuthToken(tokens.access.token);
      
//       setJWTAuthData({
//         user: user,
//         isAuthenticated: true,
//         isLoading: false,
//       });
//       fetchSuccess();
//       return { success: true, data };
//     } catch (error) {
//       setJWTAuthData({
//         ...authData,
//         isAuthenticated: false,
//         isLoading: false,
//       });
//       const errorMessage = error?.response?.data?.message || 'Something went wrong';
//       fetchError(errorMessage);
//       return { success: false, error: errorMessage };
//     }
//   };

//   const signUpUser = async ({ name, email, password }) => {
//     fetchStart();
//     try {
//       const { data } = await jwtAxios.post('/auth/register', { name, email, password }); // Updated endpoint
      
//       // Assuming your backend returns data in this format
//       const { user, tokens } = data;
//       localStorage.setItem('token', tokens.access.token);
//       setAuthToken(tokens.access.token);
      
//       setJWTAuthData({
//         user: user,
//         isAuthenticated: true,
//         isLoading: false,
//       });
//       fetchSuccess();
//       return { success: true, data };
//     } catch (error) {
//       setJWTAuthData({
//         ...authData,
//         isAuthenticated: false,
//         isLoading: false,
//       });
//       const errorMessage = error?.response?.data?.message || 'Something went wrong';
//       console.log('error:', errorMessage);
//       fetchError(errorMessage);
//       return { success: false, error: errorMessage };
//     }
//   };

//   const logout = async () => {
//     try {
//       // Call logout endpoint if needed
//       await jwtAxios.post('/auth/logout');
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       localStorage.removeItem('token');
//       setAuthToken();
//       setJWTAuthData({
//         user: null,
//         isLoading: false,
//         isAuthenticated: false,
//       });
//     }
//   };

//   return (
//     <JWTAuthContext.Provider
//       value={{
//         ...authData,
//         updateAuthUser
//       }}
//     >
//       <JWTAuthActionsContext.Provider
//         value={{
//           signUpUser,
//           signInUser,
//           logout,
//           updateAuthUser  
//         }}
//       >
//         {children}
//       </JWTAuthActionsContext.Provider>
//     </JWTAuthContext.Provider>
//   );
// };

// export default JWTAuthAuthProvider;

// JWTAuthAuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import jwtAxios, { setAuthToken } from './index';
import { useInfoViewActionsContext } from '../../../context/AppContextProvider/InfoViewContextProvider';

const JWTAuthContext = createContext();
const JWTAuthActionsContext = createContext();

export const useJWTAuth = () => useContext(JWTAuthContext);
export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

const JWTAuthAuthProvider = ({ children }) => {
  const { fetchStart, fetchSuccess, fetchError } = useInfoViewActionsContext();

  const [authData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const updateAuthUser = (updatedUser) => {
    setJWTAuthData((prev) => ({
      ...prev,
      user: { ...prev.user, ...updatedUser },
    }));
  };

  // ✅ On first load, restore auth from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setAuthToken(token);
      setJWTAuthData({
        user: JSON.parse(user),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setJWTAuthData({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  // ✅ LOGIN
  const signInUser = async ({ email, password }) => {
    fetchStart();
    try {
      const { data } = await jwtAxios.post('api/auth/login', { email, password });
      const { token, user } = data;

      // Store JWT + user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setAuthToken(token);

      setJWTAuthData({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      fetchSuccess();
      return { success: true, data };
    } catch (error) {
      console.error('Login failed:', error);
      setJWTAuthData({
        ...authData,
        isAuthenticated: false,
        isLoading: false,
      });
      const errorMessage =
        error?.response?.data?.error || 'Invalid credentials';
      fetchError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // ✅ REGISTER
  const signUpUser = async ({ display_name, email, password, whatsapp_msisdn }) => {
    fetchStart();
    try {
      const { data } = await jwtAxios.post('api/auth/register', {
        display_name,
        email,
        password,
        whatsapp_msisdn,
      });

      fetchSuccess();
      return { success: true, data };
    } catch (error) {
      console.error('Registration failed:', error);
      const errorMessage =
        error?.response?.data?.error || 'Registration failed';
      fetchError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // ✅ LOGOUT
  const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider value={{ ...authData, updateAuthUser }}>
      <JWTAuthActionsContext.Provider
        value={{ signUpUser, signInUser, logout, updateAuthUser }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};

JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default JWTAuthAuthProvider;

