// API configuration
const API = {
    // Use environment variable for the API URL with fallback for local development
    // In development: http://localhost:5000 (from .env.development)
    // In production: the actual backend URL (from .env.production)
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
};

console.log('API Base URL:', API.baseURL); // Log the API URL for debugging

export default API;
