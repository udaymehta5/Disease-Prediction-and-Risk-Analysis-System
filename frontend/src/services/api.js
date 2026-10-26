import axios from 'axios';

// Single Axios instance for all backend requests
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach JWT token if present in localStorage
api.interceptors.request.use(
  (config) => {
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

// Response Interceptor: Handle global 401 unauthorized errors and enhance network errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If there is no response, it is a network error (server down, CORS block, or wrong URL)
    if (!error.response) {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const targetUrl = api.defaults.baseURL || 'http://localhost:5000/api';
      const friendlyMsg = isLocal
        ? `Cannot reach backend server at ${targetUrl}. Please ensure your backend is running on port 5000 (run "npm run dev").`
        : `Cannot connect to API server. If deployed, please ensure VITE_API_URL is configured in your hosting environment variables (e.g., Vercel) and the backend is live.`;
      error.userMessage = friendlyMsg;
      if (error.message === 'Network Error' || !error.message) {
        error.message = friendlyMsg;
      }
    }

    if (error.response && error.response.status === 401) {
      // Clear token if invalid or expired
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // If we are not already on login page, we can optionally redirect
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
