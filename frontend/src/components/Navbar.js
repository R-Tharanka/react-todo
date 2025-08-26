import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { FaUser, FaSignOutAlt, FaUserEdit, FaTasks, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  
  // Don't show navbar on login or register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }
  
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
    <nav className={`fixed top-0 left-0 right-0 bg-white dark:bg-dark-bg shadow-md z-50 ${theme}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FaTasks className="h-6 w-6 text-primary-purple" />
              <span className="ml-2 text-lg font-bold text-gray-800 dark:text-white">TaskMaster</span>
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-white focus:outline-none"
            >
              {showMenu ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
          
          <div className={`hidden md:flex items-center justify-end flex-1 ml-10`}>
            {user ? (
              <div className="relative ml-4">
                <div 
                  onClick={toggleDropdown} 
                  className="flex items-center cursor-pointer"
                >
                  <span className="mr-2 text-gray-800 dark:text-white">{user.name}</span>
                  <div className="w-9 h-9 rounded-full bg-primary-purple flex items-center justify-center text-white overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                </div>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-card-bg border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1 z-10">
                    <Link 
                      to="/profile" 
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-primary-purple hover:text-white"
                    >
                      <FaUserEdit className="mr-2" /> Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-primary-purple hover:text-white"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="px-4 py-2 rounded-md bg-primary-purple text-white hover:bg-opacity-90 transition-colors">Login</Link>
                <Link to="/register" className="px-4 py-2 rounded-md border border-primary-purple text-primary-purple dark:text-white hover:bg-primary-purple hover:text-white transition-colors">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${showMenu ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {user ? (
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary-purple flex items-center justify-center text-white overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <FaUser className="h-6 w-6" />
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
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:bg-primary-purple hover:text-white"
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
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:bg-primary-purple hover:text-white"
                >
                  <div className="flex items-center">
                    <FaSignOutAlt className="mr-2" /> Logout
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-2 px-5">
                <Link 
                  to="/login" 
                  onClick={() => setShowMenu(false)}
                  className="w-full text-center px-4 py-2 rounded-md bg-primary-purple text-white hover:bg-opacity-90 transition-colors"
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
