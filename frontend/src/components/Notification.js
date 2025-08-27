import React, { useState, useEffect } from 'react';

const Notification = ({ message, type, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  if (!isVisible) return null;

  const bgColor = type === 'success' 
    ? 'bg-green-500' 
    : type === 'error' 
      ? 'bg-red-500' 
      : type === 'warning' 
        ? 'bg-yellow-500' 
        : 'bg-blue-500';

  return (
    <div className={`${bgColor} text-white px-4 py-3 rounded shadow-md fixed bottom-4 right-4 z-50 max-w-md`}>
      <div className="flex items-center">
        <span>{message}</span>
        <button 
          className="ml-4 text-white hover:text-gray-200" 
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;
