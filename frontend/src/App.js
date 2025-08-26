import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

// Components
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`App ${theme}`}>
      <Navbar />
      <div className="container">
        <Routes>
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            } 
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
      <ThemeToggle />
    </div>
  );
}

export default App;
