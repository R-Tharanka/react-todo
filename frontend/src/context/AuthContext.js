import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkLoggedIn = async () => {
      setLoading(true);
      try {
        const userInfo = localStorage.getItem('userInfo');
        
        if (userInfo) {
          const parsedUser = JSON.parse(userInfo);
          setUser(parsedUser);
          
          // Configure axios default headers for protected routes
          axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setError('Failed to retrieve authentication status');
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  // Register a new user
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password
      });
      
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // Set auth token in axios defaults
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      return data;
    } catch (error) {
      const message = error.response && error.response.data.message 
        ? error.response.data.message 
        : 'Registration failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password
      });
      
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // Set auth token in axios defaults
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      return data;
    } catch (error) {
      const message = error.response && error.response.data.message 
        ? error.response.data.message 
        : 'Login failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    
    // Remove auth token from axios defaults
    delete axios.defaults.headers.common['Authorization'];
    
    // Redirect to home page
    window.location.href = '/';
  };

  // Update user profile
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.put('/api/users/profile', userData);
      
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      return data;
    } catch (error) {
      const message = error.response && error.response.data.message 
        ? error.response.data.message 
        : 'Profile update failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
