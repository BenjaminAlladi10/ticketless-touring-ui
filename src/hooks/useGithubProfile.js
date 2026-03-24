import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SOCIAL_LINKS } from '@/constants/links';

export const useGithubProfile = () => {
  return useQuery({
    queryKey: ['github-profile'],
    queryFn: async () => {
      const response = await axios.get(SOCIAL_LINKS.GITHUB_API);
      return response.data;
    },
  });
};
