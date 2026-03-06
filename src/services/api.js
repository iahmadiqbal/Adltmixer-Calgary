import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api",
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout - check if backend URL is correct");
    }
    if (error.message === "Network Error") {
      console.error("Network Error - Backend URL:", api.defaults.baseURL);
      console.error(
        "Make sure VITE_API_BASE_URL is set in Vercel environment variables",
      );
    }
    return Promise.reject(error);
  },
);

export default api;
