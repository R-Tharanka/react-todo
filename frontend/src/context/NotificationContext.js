import React, { createContext, useState, useContext } from 'react';
import Notification from '../components/Notification';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Helper functions
  const success = (message) => showNotification(message, 'success');
  const error = (message) => showNotification(message, 'error');
  const warning = (message) => showNotification(message, 'warning');
  const info = (message) => showNotification(message, 'info');

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        removeNotification,
        success,
        error,
        warning,
        info
      }}
    >
      {children}
      <div className="notification-container">
        {notifications.map(({ id, message, type }) => (
          <Notification
            key={id}
            message={message}
            type={type}
            onClose={() => removeNotification(id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
