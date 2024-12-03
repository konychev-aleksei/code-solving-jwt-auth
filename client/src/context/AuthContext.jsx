import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import inMemoryJWT from '../services/inMemoryJWT';
import config from '../config';
import showErrorMessage from '../utils/showErrorMessage';
import { Preloader } from '../ui/Preloader/Preloader';

export const ResourceClient = axios.create({
  baseURL: `${config.API_URL}/`,
});

export const AuthClient = axios.create({
  baseURL: `${config.API_URL}/auth`,
  withCredentials: true,
});

ResourceClient.interceptors.request.use(
  (config) => {
    const accessToken = inMemoryJWT.getToken();

    if (!accessToken) {
      return config;
    }

    config.headers['Authorization'] = 'Bearer ' + accessToken;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAppReady, setIsAppReady] = useState(false);

  const handleLogOut = () => {
    AuthClient.post('/logout')
      .then(() => {
        setUser(null);
        inMemoryJWT.deleteToken();

        setData();
      })
      .catch(showErrorMessage);
  };

  const handleSignUp = (data) => {
    AuthClient.post('/sign-up', data)
      .then((res) => {
        const { userId, userName, role, accessToken, accessTokenExpiration } =
          res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);

        setUser({ userId, userName, role });
      })
      .catch(showErrorMessage);
  };

  const handleSignIn = (data) => {
    AuthClient.post('/sign-in', data)
      .then((res) => {
        const { userId, userName, role, accessToken, accessTokenExpiration } =
          res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);

        setUser({ userId, userName, role });
      })
      .catch(showErrorMessage);
  };

  useEffect(() => {
    AuthClient.post('/refresh')
      .then((res) => {
        const { userId, userName, role, accessToken, accessTokenExpiration } =
          res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);

        setIsAppReady(true);
        setUser({ userId, userName, role });
      })
      .catch(() => {
        setIsAppReady(true);
        setUser(null);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleSignUp,
        handleSignIn,
        handleLogOut,
        user,
      }}
    >
      {isAppReady ? children : <Preloader />}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
