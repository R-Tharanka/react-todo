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
  
  const getPriorityDotColor = (priority) => {
    switch(priority) {
      case 3: return 'bg-red-500';
      case 2: return 'bg-yellow-500';
      case 1: return 'bg-blue-500';
      default: return 'bg-gray-400';
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
        <span className={`inline-block w-2 h-2 rounded-full mr-1 ${getPriorityDotColor(selectedPriority)}`}></span>
        <FaFlag className={`mx-1 ${getPriorityColor(selectedPriority)}`} />
        <span className="text-gray-700 dark:text-gray-300 ml-1">
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
              <span className={`inline-block w-2 h-2 rounded-full mr-1 ${getPriorityDotColor(priority)}`}></span>
              <FaFlag className={`mx-1 ${getPriorityColor(priority)}`} />
              <span className="ml-1">{getPriorityLabel(priority)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrioritySelect;
