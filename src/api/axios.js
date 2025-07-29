// src/api/API.js
import axios from 'axios';

const API = axios.create({

  baseURL: import.meta.env.VITE_API_BASE_URL,

  // baseURL: "http://localhost:3000/api",
  
});

// Add token from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Ensure this key matches your login logic
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
