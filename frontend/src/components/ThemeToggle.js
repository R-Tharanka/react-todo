import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={theme === 'dark-theme' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark-theme' ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle;
