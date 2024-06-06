import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { REACT_APP_API_URL } from '../consts';

const axiosConfig: AxiosRequestConfig = {
    baseURL: REACT_APP_API_URL
};

const $host: AxiosInstance = axios.create(axiosConfig);
const $authhost: AxiosInstance = axios.create(axiosConfig);

const authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
};

$authhost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authhost
};