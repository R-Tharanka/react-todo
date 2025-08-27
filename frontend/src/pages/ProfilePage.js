import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TodoContext } from '../context/TodoContext';
import { FaUser, FaEnvelope, FaLock, FaCamera, FaSpinner, FaCheck, FaClock, FaCalendarCheck, FaTasks, FaCog, FaBell } from 'react-icons/fa';

const ProfilePage = () => {
  const { user, updateProfile, loading, error: authError } = useContext(AuthContext);
  const [error, setError] = useState('');
  const { tasks } = useContext(TodoContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [notificationsEnabled, setNotificationsEnabled] = useState(user?.preferences?.notifications || false);
  const [darkModePreference, setDarkModePreference] = useState(user?.preferences?.darkMode || 'system');
  // Use URL-based avatar only
  
  // Calculate task statistics
  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    overdue: 0,
    dueToday: 0
  });
  
  // Sync auth errors with local error state
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      // Current date for comparison
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const stats = {
        total: tasks.length,
        completed: tasks.filter(task => task.completed).length,
        overdue: tasks.filter(task => {
          if (!task.dueDate || task.completed) return false;
          const dueDate = new Date(task.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate < today;
        }).length,
        dueToday: tasks.filter(task => {
          if (!task.dueDate) return false;
          const dueDate = new Date(task.dueDate);
          return dueDate.toDateString() === today.toDateString();
        }).length
      };
      
      setTaskStats(stats);
    }
  }, [tasks]);

  // Handle avatar URL change with basic validation
  const handleAvatarChange = (e) => {
    const url = e.target.value;
    setAvatar(url);
    
    if (url) {
      // Basic URL validation
      const isValidUrl = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i.test(url);
      
      if (isValidUrl) {
        setSuccessMessage('Avatar URL updated. Save changes to confirm.');
        setPasswordError(''); // Clear any previous errors
        setError(''); // Clear any previous errors
      } else {
        setError('Please enter a valid image URL');
        setSuccessMessage('');
      }
      
      // Clear messages after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
        setPasswordError('');
        setError('');
      }, 3000);
    }
  };

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
      avatar: avatar,
      preferences: {
        notifications: notificationsEnabled,
        darkMode: darkModePreference
      }
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
    } catch (err) {
      // Set local error state
      setError(err.message || 'Profile update failed');
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };
  
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-card-bg rounded-xl shadow-lg p-4 md:p-6 mb-8">
          {/* User header with avatar and name */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 animate-fadeIn">
            <div className="flex flex-col items-center gap-3">
              <div className="w-28 h-28 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center border-4 border-primary-purple shadow-lg hover:shadow-xl transition-shadow animate-[profilePulse_2s_ease-in-out_infinite]">
                {avatar ? (
                  <img 
                    src={avatar} 
                    alt={name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '';
                      setAvatar('');
                    }} 
                  />
                ) : (
                  <FaUser size={48} className="text-gray-400" />
                )}
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                    <FaCamera className="mr-1" /> Avatar URL
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="https://example.com/avatar.jpg"
                      value={avatar}
                      onChange={handleAvatarChange}
                      className="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-purple"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{name || 'User'}</h1>
              <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center md:justify-start mt-1">
                <FaEnvelope className="mr-2" /> {email}
              </p>
              
              {/* Task Statistics */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex flex-col items-center bg-indigo-100 dark:bg-indigo-900/40 p-4 rounded-lg shadow hover:shadow-md transition-all transform hover:-translate-y-1 duration-200">
                  <FaTasks className="text-indigo-600 dark:text-indigo-400 text-xl mb-1" />
                  <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{taskStats.total}</div>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400">Total Tasks</div>
                </div>
                
                <div className="flex flex-col items-center bg-green-100 dark:bg-green-900/40 p-4 rounded-lg shadow hover:shadow-md transition-all transform hover:-translate-y-1 duration-200">
                  <FaCheck className="text-green-600 dark:text-green-400 text-xl mb-1" />
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300">{taskStats.completed}</div>
                  <div className="text-xs text-green-600 dark:text-green-400">Completed</div>
                </div>
                
                <div className="flex flex-col items-center bg-yellow-100 dark:bg-yellow-900/40 p-4 rounded-lg shadow hover:shadow-md transition-all transform hover:-translate-y-1 duration-200">
                  <FaCalendarCheck className="text-yellow-600 dark:text-yellow-400 text-xl mb-1" />
                  <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{taskStats.dueToday}</div>
                  <div className="text-xs text-yellow-600 dark:text-yellow-400">Due Today</div>
                </div>
                
                <div className="flex flex-col items-center bg-red-100 dark:bg-red-900/40 p-4 rounded-lg shadow hover:shadow-md transition-all transform hover:-translate-y-1 duration-200">
                  <FaClock className="text-red-600 dark:text-red-400 text-xl mb-1" />
                  <div className="text-2xl font-bold text-red-700 dark:text-red-300">{taskStats.overdue}</div>
                  <div className="text-xs text-red-600 dark:text-red-400">Overdue</div>
                </div>
              </div>
            </div>
          </div>
        
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav className="-mb-px flex space-x-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-4 px-1 transition-all duration-200 ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-primary-purple font-medium text-primary-purple dark:text-primary-purple transform scale-105'
                    : 'border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <FaUser className={`inline mr-2 ${activeTab === 'profile' ? 'animate-bounce' : ''}`} /> Profile
              </button>
              <button
                onClick={() => setActiveTab('preferences')}
                className={`pb-4 px-1 transition-all duration-200 ${
                  activeTab === 'preferences'
                    ? 'border-b-2 border-primary-purple font-medium text-primary-purple dark:text-primary-purple transform scale-105'
                    : 'border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <FaCog className={`inline mr-2 ${activeTab === 'preferences' ? 'animate-spin' : ''}`} /> Preferences
              </button>
            </nav>
          </div>
          
          {/* Error/Success Messages */}
          {(error || authError) && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md flex items-center justify-between animate-fadeIn">
              <div className="flex items-center">
                <span className="mr-2 text-red-600 dark:text-red-400">⚠️</span>
                {error || authError}
              </div>
              <button 
                onClick={() => setError('')}
                className="text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200 transition-colors"
              >
                ×
              </button>
            </div>
          )}
          {passwordError && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md flex items-center justify-between animate-fadeIn">
              <div className="flex items-center">
                <span className="mr-2 text-red-600 dark:text-red-400">🔒</span>
                {passwordError}
              </div>
              <button 
                onClick={() => setPasswordError('')}
                className="text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200 transition-colors"
              >
                ×
              </button>
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-md flex items-center justify-between animate-fadeIn">
              <div className="flex items-center">
                <FaCheck className="mr-2 text-green-600 dark:text-green-400" />
                {successMessage}
              </div>
              <button 
                onClick={() => setSuccessMessage('')}
                className="text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-200 transition-colors"
              >
                ×
              </button>
            </div>
          )}
          
          {/* Profile Tab Content */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-lg space-y-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Basic Information</h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <FaUser className="inline mr-2" /> Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-purple"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <FaEnvelope className="inline mr-2" /> Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-purple"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-lg space-y-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Password</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <FaLock className="inline mr-2" /> New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Leave blank to keep current"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      minLength="6"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-purple"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <FaLock className="inline mr-2" /> Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      minLength="6"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-purple"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit" 
                  className="flex items-center justify-center py-3 px-8 rounded-lg shadow-sm text-white bg-primary-purple hover:bg-opacity-90 focus:outline-none transition-colors transform hover:scale-105 active:scale-95 duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                  ) : (
                    <>
                      <FaCheck className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
          
          {/* Preferences Tab Content */}
          {activeTab === 'preferences' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-lg space-y-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">App Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        <FaBell className="inline mr-2" /> Notifications
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Enable task reminders and notifications
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notificationsEnabled}
                        onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-purple rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-purple"></div>
                    </label>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Theme Preference
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setDarkModePreference('light')}
                        className={`flex items-center justify-center py-2 px-4 rounded-md text-sm transition-all duration-200 ${
                          darkModePreference === 'light'
                            ? 'bg-primary-purple text-white shadow-md transform scale-105'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        <span className="mr-2">☀️</span> Light
                      </button>
                      <button
                        type="button"
                        onClick={() => setDarkModePreference('dark')}
                        className={`flex items-center justify-center py-2 px-4 rounded-md text-sm transition-all duration-200 ${
                          darkModePreference === 'dark'
                            ? 'bg-primary-purple text-white shadow-md transform scale-105'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        <span className="mr-2">🌙</span> Dark
                      </button>
                      <button
                        type="button"
                        onClick={() => setDarkModePreference('system')}
                        className={`flex items-center justify-center py-2 px-4 rounded-md text-sm transition-all duration-200 ${
                          darkModePreference === 'system'
                            ? 'bg-primary-purple text-white shadow-md transform scale-105'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        <span className="mr-2">💻</span> System
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={handleSubmit}
                  className="flex items-center justify-center py-3 px-8 rounded-lg shadow-sm text-white bg-primary-purple hover:bg-opacity-90 focus:outline-none transition-colors transform hover:scale-105 active:scale-95 duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                  ) : (
                    <>
                      <FaCheck className="mr-2" />
                      Save Preferences
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
