import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// project import
import Loader from 'components/Loader';
import axios from 'utils/axios';
import { persister } from 'store';

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded = jwtDecode(serviceToken);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (access_token) => {
  if (access_token) {
    localStorage.setItem('access_token', access_token);
    axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
  } else {
    localStorage.removeItem('access_token');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const refreshAccessToken = async (refresh_token) => {
    try {
      const { data } = await axios.post('/auth/refresh_token/', { refresh_token });
      const { access_token } = data;
      setSession(access_token);
      const response = await axios.get('/auth/getprofile/');
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: response.data
        }
      });
    } catch (error) {
      console.error('Failed to refresh token:', error);
      logout();
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = window.localStorage.getItem('access_token');
        const refreshToken = window.localStorage.getItem('refresh_token');

        if (accessToken && verifyToken(accessToken)) {
          setSession(accessToken);
          const response = await axios.get('/auth/getprofile/');
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: response.data
            }
          });
        } else if (refreshToken && verifyToken(refreshToken)) {
          await refreshAccessToken(refreshToken);
        } else {
          logout();
        }
      } catch (err) {
        console.error(err);
        logout();
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/auth/login/', { email, password });
    const { access_token, refresh_token, user_data } = response.data;
    setSession(access_token);
    localStorage.setItem('refresh_token', refresh_token);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user: user_data
      }
    });
    return user_data;
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem('refresh_token');
    // localStorage.removeItem('persist:root');
    dispatch({ type: LOGOUT });
    persister.purge();
  };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout }}>{children}</JWTContext.Provider>;
};

JWTProvider.propTypes = {
  children: PropTypes.node
};

export default JWTContext;
