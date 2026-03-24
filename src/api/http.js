import axios from 'axios';
import { BACKEND_URL } from '@/constants/links';

const http = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  withCredentials: true,
});

// Request interceptor
http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
