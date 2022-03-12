import axios from 'axios';

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

export const addAuthTokenToRequests = (token) => {
  serverCMS.defaults.headers.common.Authorization = `Bearer ${token}`;
  serverDashboard.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default {
  serverCMS,
  serverDashboard,
};
