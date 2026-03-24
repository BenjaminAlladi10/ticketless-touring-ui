import axios from 'axios';
import { SOCIAL_LINKS } from '@/constants/links';

const githubHttp = axios.create({
  baseURL: SOCIAL_LINKS.GITHUB_API.replace(/\/users\/[^/]+$/, ''), // Base URL without the specific user
});

export default githubHttp;
