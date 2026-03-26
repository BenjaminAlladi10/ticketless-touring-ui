import { useMutation } from '@tanstack/react-query';
import http from '@/api/http';

export const useGetQRCode = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await http.post('/users/getqrcode', data);
      return response.data;
    },
  });
};
