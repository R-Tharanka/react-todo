import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { FaUser, FaSignOutAlt, FaUserEdit, FaSearch, FaTasks, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  // Don't show navbar on login or register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };
  
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
    <nav className={`navbar ${theme}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <FaTasks className="logo-icon" />
            <span className="logo-text">TaskMaster</span>
          </Link>
        </div>
        
        <div className="navbar-mobile-toggle" onClick={toggleMobileMenu}>
          {showMenu ? <FaTimes /> : <FaBars />}
        </div>
        
        <div className={`navbar-menu ${showMenu ? 'active' : ''}`}>
          <form className="search-form" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
          
          {user ? (
            <div className="profile-section">
              <div className="profile-info" onClick={toggleDropdown}>
                <span className="user-name">{user.name}</span>
                <div className="avatar">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <FaUser />
                  )}
                </div>
              </div>
              
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile" onClick={() => setShowDropdown(false)}>
                    <FaUserEdit /> Profile
                  </Link>
                  <button onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="auth-button">Login</Link>
              <Link to="/register" className="auth-button">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
