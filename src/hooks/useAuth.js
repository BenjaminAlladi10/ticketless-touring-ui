import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import http from '@/api/http';
import { useNavigate } from "react-router-dom";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await http.get('/users/getcurrentuser');
      return response.data.data;
    },
    retry: false,
    staleTime: Infinity,
  });
};

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
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await http.post('/users/logout');
      return response.data;
    },
    onSuccess: () => {
      queryClient.setQueryData(['currentUser'], null);
      navigate("/");
    }
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async ({ email }) => {
      const response = await http.post('/users/forgot-password', { email });
      return response.data;
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ token, password }) => {
      const response = await http.post(`/users/reset-password/${token}`, { password });
      return response.data;
    },
  });
};

