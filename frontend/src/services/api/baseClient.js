import axios from 'axios';
import { API_CONFIG } from '../../config/api';

const baseClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS,
});

// Response interceptor for error handling
baseClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const customError = {
            message: error.response?.data?.message || error.message || 'An unknown error occurred',
            status: error.response?.status,
            originalError: error,
        };
        return Promise.reject(customError);
    }
);

export default baseClient;
