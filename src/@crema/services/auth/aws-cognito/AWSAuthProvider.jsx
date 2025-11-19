import React, { createContext, useContext, useState } from 'react';
import { signIn, signOut, signUp, confirmSignUp, signInWithRedirect, fetchUserAttributes } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import PropTypes from 'prop-types';
import { awsConfig } from './aws-exports';
import { useNavigate } from 'react-router-dom';
import { useInfoViewActionsContext } from '../../../context/AppContextProvider/InfoViewContextProvider';

const AwsCognitoContext = createContext();
const AwsCognitoActionsContext = createContext();

export const useAwsCognito = () => useContext(AwsCognitoContext);

export const useAwsCognitoActions = () => useContext(AwsCognitoActionsContext);

Amplify.configure(awsConfig);

const AwsAuthProvider = ({ children }) => {
  const { fetchStart, fetchSuccess, fetchError, showMessage } = useInfoViewActionsContext();
  const [awsCognitoData, setAwsCognitoData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchStart();
  //   auth
  //     .currentAuthenticatedUser()
  //     .then((user) => {
  //       setAwsCognitoData({
  //         user,
  //         isAuthenticated: true,
  //         isLoading: false,
  //       });
  //       fetchSuccess();
  //     })
  //     .catch(() => {
  //       fetchSuccess();
  //       setAwsCognitoData({
  //         user: undefined,
  //         isAuthenticated: false,
  //         isLoading: false,
  //       });
  //     });
  // }, [auth]);

  const signInUser = async ({ email, password }) => {
    fetchStart();
    try {
      const user = await signIn({
        username: email,
        password: password,
      });
      if (user.isSignedIn) {
        const userData = await fetchUserAttributes();
        fetchSuccess();
        setAwsCognitoData({
          user: userData,
          isLoading: false,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      fetchError(error.message);
    }
  };
  const signUpCognitoUser = async ({ email, password, name }) => {
    fetchStart();
    try {
      await signUp({
        username: email,
        password,
        attributes: {
          name,
        },
      });
      fetchSuccess();
      showMessage(
        'A code has been sent to your registered email address, Enter the code to complete the signup process!',
      );
      navigate('/confirm-signup', { state: email });
    } catch (error) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      fetchError(error.message);
    }
  };
  const confirmCognitoUserSignup = async (username, code) => {
    fetchStart();
    try {
      await confirmSignUp({
        username: username,
        confirmationCode: code,
      })
      navigate('/signin', {
        replace: true,
      });
      showMessage('Congratulations, Signup process is complete, You can now Sign in by entering correct credentials!');
    } catch (error) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      fetchError(error.message);
    }
  };
  const forgotPassword = async (username, code) => {
    fetchStart();
    try {
      await confirmSignUp({
        username: username,
        confirmationCode: code,
      })
      navigate('/signin', {
        replace: true,
      });
      showMessage('Congratulations, Signup process is complete, You can now Sign in by entering correct credentials!');
    } catch (error) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      fetchError(error.message);
    }
  };

  const logout = async () => {
    setAwsCognitoData({ ...awsCognitoData, isLoading: true });
    try {
      await signOut();
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  return (
    <AwsCognitoContext.Provider
      value={{
        ...awsCognitoData,
      }}
    >
      <AwsCognitoActionsContext.Provider
        value={{
          logout,
          signIn: signInUser,
          signUpCognitoUser,
          confirmCognitoUserSignup,
          forgotPassword,
          signInWithRedirect,
        }}
      >
        {children}
      </AwsCognitoActionsContext.Provider>
    </AwsCognitoContext.Provider>
  );
};

export default AwsAuthProvider;

AwsAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  showMessage: PropTypes.func,
  fetchStart: PropTypes.func,
  fetchSuccess: PropTypes.func,
  fetchError: PropTypes.func,
};
