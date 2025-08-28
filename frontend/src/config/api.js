// API configuration
const API = {
  // Use environment variable for the API URL with no hardcoded fallback
  // In development: http://localhost:5000 (from .env.development)
  // In production: the actual backend URL (from .env.production)
  baseURL: process.env.REACT_APP_API_URL,
};

export default API;
