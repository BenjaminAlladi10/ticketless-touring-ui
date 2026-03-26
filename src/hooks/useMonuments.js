import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import http from '@/api/http';

export const useMonuments = () => {
  return useQuery({
    queryKey: ['monuments'],
    queryFn: async () => {
      const response = await http.get('/monuments/getallmonuments');
      return response.data.data;
    },
  });
};

export const useGetMonument = (id) => {
  return useQuery({
    queryKey: ['monuments', id],
    queryFn: async () => {
      const response = await http.post('/monuments/getmonument', { _id: id });
      return response.data.data;
    },
    enabled: !!id,
  });
};

export const useAddMonument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const response = await http.post('/monuments/addmonument', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monuments'] });
    },
  });
};

export const useEditMonument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const response = await http.patch('/monuments/editmonument', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monuments'] });
    },
  });
};

export const useDeleteMonument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await http.post('/monuments/deletemonument', { _id: id });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monuments'] });
    },
  });
};
