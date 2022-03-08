import axios from 'axios';

const baseUrl =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

const server = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  withCredentials: true,
});

export const addAuthTokenToRequests = (token) => {
  server.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default server;
