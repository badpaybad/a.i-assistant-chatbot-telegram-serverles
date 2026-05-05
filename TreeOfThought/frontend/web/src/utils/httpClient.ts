import axios from 'axios';
import { API_CONFIG } from '../config/apiConfig';
import { notification } from 'antd';

const httpClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

// Add a request interceptor to inject the JWT token
httpClient.interceptors.request.use(
  (config) => {
    // Dynamic retrieval from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const errorData = error.response?.data;
    const errorMessage = errorData?.message || error.message || 'An unexpected error occurred';

    // Global Error Notification
    notification.error({
      message: `API Error: ${status || 'Network Error'}`,
      description: errorMessage,
      duration: 0, // Manual close as requested
      placement: 'topRight',
    });

    if (status === 401) {
      console.warn('Unauthorized access detected, consider logging out user...');
      // Note: We don't force redirect here to avoid interrupting user experience 
      // if they just need to re-login in another tab.
    }

    return Promise.reject(error);
  }
);

export default httpClient;
