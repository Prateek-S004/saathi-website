import axios from 'axios';

const apiClient = axios.create({
  // ✅ CORRECTED: Replace with your live Render backend URL
  baseURL: 'https://saathi.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;