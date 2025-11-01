import axios from "axios";

const axiosInstance = axios.create({
  // 🛑 FIX 1: Use the relative path for the Nginx/Vite proxy
  baseURL: "/api", 
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  // 🛑 FIX 2: Get the token using the correct key name
  const token = localStorage.getItem("userToken"); 
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;

