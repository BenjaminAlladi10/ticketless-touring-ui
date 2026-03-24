import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import http from '@/api/http';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await http.get('/users/getallusers');
      return response.data.data;
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await http.post('/users/deleteuser', { _id: id });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
