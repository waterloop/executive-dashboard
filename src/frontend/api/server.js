import axios from 'axios';
// import { useHistory } from 'react-router-dom';
// import useGoogleAuth from 'frontend/hooks/google-auth';
import { useGoogleLogout } from 'react-google-login';
import CookiesHelper from 'frontend/hooks/cookies';

const baseUrlCMS =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9000';

const baseUrlDashboard =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9001';


export const serverCMS = axios.create({
  baseURL: baseUrlCMS,
  timeout: 10000,
  withCredentials: true,
});

export const serverDashboard = axios.create({
  baseURL: baseUrlDashboard,
  timeout: 10000,
  withCredentials: true,
});

serverDashboard.interceptors.response.use(
  res => res,
  err => {
    // Any HTTP Code which is not 2xx will be considered as error
    const statusCode = err.response.status;
    // const history = useHistory();
    // const { signOut } = useGoogleAuth();
    if (statusCode === 401 || statusCode === 403) {
      
      const { signOut } = useGoogleLogout({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        onLogoutSuccess: () => {
          CookiesHelper.removeAllCookies();
          console.log('successful logout');
          window.location = '/sign-in';
        },
        onFailure: () => {
          console.error('Failed to logout!');
        },
      });
      signOut();
      
    }

  }
);

export const addAuthTokenToRequests = (token) => {
  serverCMS.defaults.headers.common.Authorization = `Bearer ${token}`;
  serverDashboard.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default {
  serverCMS,
  serverDashboard,
};
