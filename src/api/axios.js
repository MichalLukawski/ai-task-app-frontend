// fontend/src/api/axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  withCredentials: true, // jeśli używasz cookies (opcjonalnie)
});

// ➕ Interceptor – automatyczne dodanie Authorization header
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
