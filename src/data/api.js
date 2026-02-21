import axios from "axios";

const API = axios.create({
  baseURL: "https://jain.bteam11.com/api/", // ✅ FIXED BASE URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach JWT automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access"); // ✅ FIXED KEY
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
