import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://saathi-website-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
