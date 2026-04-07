import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://zenith-wellness.onrender.com/api',
});

api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;

  if (userInfo && userInfo.token) 
  {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export default api;