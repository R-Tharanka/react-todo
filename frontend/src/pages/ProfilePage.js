import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaCamera, FaSpinner } from 'react-icons/fa';

const ProfilePage = () => {
  const { user, updateProfile, loading, error } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords if either field is filled
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      } else {
        setPasswordError('');
      }
    }
    
    const userData = {
      name,
      email,
      avatar
    };
    
    // Only include password if it was provided
    if (password) {
      userData.password = password;
    }
    
    try {
      await updateProfile(userData);
      setSuccessMessage('Profile updated successfully');
      // Clear passwords
      setPassword('');
      setConfirmPassword('');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      // Error already handled in context
    }
  };
  
  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>User Profile</h1>
        
        {error && <div className="error-message">{error}</div>}
        {passwordError && <div className="error-message">{passwordError}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        
        <div className="avatar-section">
          <div className="avatar-preview">
            {avatar ? (
              <img src={avatar} alt={name} />
            ) : (
              <FaUser size={60} />
            )}
          </div>
          <div className="avatar-input">
            <label htmlFor="avatar">
              <FaCamera className="icon" /> Avatar URL
            </label>
            <input
              type="text"
              id="avatar"
              placeholder="Avatar Image URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <FaUser className="icon" /> Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="icon" /> Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">
              <FaLock className="icon" /> New Password (leave blank to keep current)
            </label>
            <input
              type="password"
              id="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="6"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">
              <FaLock className="icon" /> Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength="6"
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button" 
            disabled={loading}
          >
            {loading ? <FaSpinner className="spinner" /> : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
