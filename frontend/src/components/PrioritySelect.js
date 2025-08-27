import React, { useState, useRef, useEffect } from 'react';
import { FaFlag } from 'react-icons/fa';

const PrioritySelect = ({ selectedPriority, onPriorityChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePrioritySelect = (priority) => {
    onPriorityChange(priority);
    setIsOpen(false);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 3: return 'text-red-600';
      case 2: return 'text-yellow-600';
      case 1: return 'text-blue-600';
      default: return 'text-gray-400';
    }
  };

  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 3: return 'High';
      case 2: return 'Medium';
      case 1: return 'Low';
      default: return 'No priority';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="flex items-center px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
        onClick={toggleDropdown}
      >
        <FaFlag className={`mr-2 ${getPriorityColor(selectedPriority)}`} />
        <span className="text-gray-700 dark:text-gray-300">
          {getPriorityLabel(selectedPriority)}
        </span>
      </div>
      
      {isOpen && (
        <div className="absolute mt-1 bg-white dark:bg-card-bg rounded-lg shadow-lg py-1 z-10 w-full">
          {[0, 1, 2, 3].map((priority) => (
            <div
              key={priority}
              className={`px-3 py-2 cursor-pointer flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 ${
                selectedPriority === priority ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
              onClick={() => handlePrioritySelect(priority)}
            >
              <FaFlag className={`mr-2 ${getPriorityColor(priority)}`} />
              {getPriorityLabel(priority)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrioritySelect;
