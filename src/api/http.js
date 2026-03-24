import axios from 'axios';
import { baseUrl } from '@/environments/index';

const http = axios.create({
  baseURL: baseUrl,
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
