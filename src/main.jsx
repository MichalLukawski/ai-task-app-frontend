//frontend/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { isTokenValid } from './utils/checkAuthToken';

const token = localStorage.getItem('token');
if (token && !isTokenValid(token)) {
  console.warn('❌ Token wygasł. Wylogowano.');
  localStorage.removeItem('token');
  window.location.href = '/login'; // lub użyj routera
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
