import { environment as devEnv } from './development';
import { environment as prodEnv } from './production';

const isProd = import.meta.env.MODE === 'production';
export const environment = isProd ? prodEnv : devEnv;

export const baseUrl = environment.port
    ? `${environment.ip}:${environment.port}${environment.contextPath}`
    : `${environment.ip}${environment.contextPath}`;