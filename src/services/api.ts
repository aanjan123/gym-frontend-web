import axios, { AxiosInstance } from 'axios';

let token: string | null = null;
// import.meta?.env?.VITE_BASE_URL ||
const api: AxiosInstance = axios.create({
  baseURL: 'https://gym-app-backend-9rz8.onrender.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (authToken: string | null) => {
  token = authToken;
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
