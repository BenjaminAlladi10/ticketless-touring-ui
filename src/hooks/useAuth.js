import { useMutation } from '@tanstack/react-query';
import http from '@/api/http';

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await http.post('/users/login', { email, password });
      return response.data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await http.post('/users/register', userData);
      return response.data;
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await http.post('/users/logout');
      return response.data;
    },
  });
};
