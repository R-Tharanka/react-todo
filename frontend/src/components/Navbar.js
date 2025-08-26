import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { 
  FaUser, FaSignOutAlt, FaUserEdit, FaClipboardList, 
  FaBars, FaTimes, FaSun, FaMoon
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Don't show navbar on login or register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }
  
  // Define scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  const toggleMobileMenu = () => {
    setShowMenu(!showMenu);
  };
  
  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled 
        ? 'bg-white/95 dark:bg-dark-bg/95 backdrop-blur-sm shadow-lg' 
        : 'bg-white dark:bg-dark-bg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary-purple to-secondary-purple text-white transform transition-transform group-hover:scale-105">
                <FaClipboardList className="h-5 w-5" />
              </div>
              <span className="ml-2 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-purple to-secondary-purple">TaskMaster</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card hover:text-primary-purple dark:hover:text-accent focus:outline-none focus:ring-2 focus:ring-primary-purple"
              aria-label="Toggle menu"
            >
              {showMenu ? 
                <FaTimes className="h-6 w-6" /> : 
                <FaBars className="h-6 w-6" />
              }
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-purple dark:hover:text-accent transition-all focus:outline-none focus:ring-2 focus:ring-primary-purple"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? 
                <FaSun className="h-5 w-5 text-yellow-400" /> : 
                <FaMoon className="h-5 w-5 text-primary-purple" />
              }
            </button>

            {user ? (
              <div className="relative">
                <div 
                  onClick={toggleDropdown} 
                  className="flex items-center cursor-pointer space-x-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="mr-2 text-gray-800 dark:text-gray-200 font-medium">{user.name}</span>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary-purple to-accent flex items-center justify-center text-white overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                </div>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-10 animate-fadeIn">
                    <Link 
                      to="/profile" 
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary-purple hover:text-white dark:hover:text-white transition-colors"
                    >
                      <FaUserEdit className="mr-2" /> Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary-purple hover:text-white dark:hover:text-white transition-colors"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="px-4 py-2 rounded-md bg-primary-purple hover:bg-primary-hover text-white transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 rounded-md border border-primary-purple text-primary-purple dark:text-white hover:bg-primary-purple hover:text-white transition-colors">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ${showMenu ? 'max-h-96' : 'max-h-0'} overflow-hidden bg-white dark:bg-dark-bg border-t border-gray-200 dark:border-gray-800`}>
        <div className="px-4 py-3 space-y-2">
          {/* Theme toggle for mobile */}
          <div className="flex justify-center py-3 border-b border-gray-200 dark:border-gray-700">
            <button 
              onClick={toggleTheme}
              className="flex items-center px-4 py-2 rounded-md text-gray-700 dark:text-white hover:bg-primary-purple hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <><FaSun className="mr-2 text-yellow-400" /> Light Mode</>
              ) : (
                <><FaMoon className="mr-2 text-primary-purple" /> Dark Mode</>
              )}
            </button>
          </div>
          
          {/* User info for mobile */}
          {user ? (
            <div className="pt-3 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-3 py-2">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-purple to-accent flex items-center justify-center text-white overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <FaUser className="h-5 w-5" />
                    )}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 dark:text-white">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Link 
                  to="/profile" 
                  onClick={() => setShowMenu(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:bg-primary-purple hover:text-white transition-colors"
                >
                  <div className="flex items-center">
                    <FaUserEdit className="mr-2" /> Profile
                  </div>
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:bg-primary-purple hover:text-white transition-colors"
                >
                  <div className="flex items-center">
                    <FaSignOutAlt className="mr-2" /> Logout
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-3 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-2 px-3">
                <Link 
                  to="/login" 
                  onClick={() => setShowMenu(false)}
                  className="w-full text-center px-4 py-2 rounded-md bg-gradient-to-r from-primary-purple to-accent text-white hover:opacity-90 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setShowMenu(false)}
                  className="w-full text-center px-4 py-2 rounded-md border border-primary-purple text-primary-purple dark:text-white hover:bg-primary-purple hover:text-white transition-colors"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
