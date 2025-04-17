import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  withCredentials: true, // jeśli używasz cookies – OK
});

// 🧠 Dodaj interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
